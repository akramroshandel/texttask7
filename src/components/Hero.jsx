import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

/*
 * Scroll-driven video hero.
 *
 * The video is NEVER autoplayed. Instead, the user's scroll position
 * directly scrubs the video timeline via `video.currentTime`.
 *
 * Architecture:
 *   .hero-scroll  (300vh tall — creates scroll space)
 *     .hero-sticky  (100vh, position: sticky — pins the viewport)
 *       video / fallback image / overlay / content / loading
 *
 * The scroll handler (passive) only updates a local `targetProgress` variable.
 * A requestAnimationFrame loop interpolates `currentTime` toward the target
 * with a smoothing factor to prevent jerky seeking. No React state is used
 * for per-frame updates — all DOM/video manipulation is via refs.
 *
 * Video seeking optimization:
 *   - H.264 MP4 with frequent keyframes is ideal for random-access seeking
 *   - A WebM/VP9 alternative with similar keyframe spacing would also help
 *   - Moderate bitrate (3-8 Mbps for 1080p) reduces buffering during seeks
 *   - preload="auto" ensures the browser buffers aggressively
 *   - We only call video.currentTime = ... (never video.play())
 */

const VIDEO_URL =
  'https://media.base44.com/videos/public/6ad0f04df2339452f575f73b/78dc915b6_pool-villa-exterior-to-interior-walkthrough-rev8-1920x1080-30fps-watermarked.mp4'
const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=1920&h=1080&fit=crop&q=80'

// Scroll distance for the hero experience (in viewport heights)
const SCROLL_HEIGHT_VH = 300

// Smoothing factor for currentTime interpolation.
// Higher = more responsive but potentially jerky.
// Lower = smoother but more lag. 0.15 is a good balance.
const SMOOTHING = 0.15
// This clip is 30 fps. Sub-frame seeks only interrupt decoding without
// producing a different image.
const FRAME_DURATION = 1 / 30

export default function Hero() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [videoReady, setVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [bufferProgress, setBufferProgress] = useState(0)

  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducedMotion) return

    const video = videoRef.current
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!video || !container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setVideoError(true)
      return
    }

    let duration = 0
    let targetProgress = 0
    let renderedProgress = 0
    let currentTime = video.currentTime
    let seekFramePending = false
    let rafId = null
    let videoFrameId = null
    let ready = false
    let hasFrame = false
    let failed = false
    let lastBuffer = 0
    const hasVideoFrameCallback = typeof video.requestVideoFrameCallback === 'function'

    const onError = () => {
      failed = true
      ready = false
      setVideoReady(false)
      setVideoError(true)
    }

    // Only a decoded, drawn frame advances the text animation. A completed
    // seek alone does not mean the browser has presented the new video frame.
    const drawFrame = (mediaTime) => {
      if (failed || video.seeking || video.readyState < 2 || !video.videoWidth) return
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        if (!hasFrame && ctx.getImageData(0, 0, 1, 1).data[3] !== 0) {
          hasFrame = true
          setVideoReady(true)
        }
        if (hasFrame && duration > 0) {
          renderedProgress = Math.min(1, Math.max(0, mediaTime / duration))
        }
      } catch (error) {
        console.error('Unable to draw the hero video frame.', error)
        onError()
      }
    }

    const onReady = () => {
      if (failed || video.readyState < 2) return
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      if (!ready) {
        duration = video.duration
        currentTime = video.currentTime
        ready = true
      }
      if (!hasFrame) drawFrame(video.currentTime)
    }

    // Paused or hidden videos may not deliver a frame callback for every
    // seek. Draw the completed seek on RAF and leave a paint before seeking
    // again; frame callbacks can still refresh the canvas when available.
    const onSeeked = () => {
      seekFramePending = true
    }
    const onVideoFrame = (_now, metadata) => {
      drawFrame(metadata.mediaTime)
      if (!failed) videoFrameId = video.requestVideoFrameCallback(onVideoFrame)
    }

    const onProgress = () => {
      if (video.buffered.length > 0 && duration > 0) {
        const end = video.buffered.end(video.buffered.length - 1) / duration
        if (Math.abs(end - lastBuffer) > 0.05) {
          lastBuffer = end
          setBufferProgress(end)
        }
      }
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('error', onError)
    video.addEventListener('progress', onProgress)
    canvas.addEventListener('contextlost', onError)
    if (hasVideoFrameCallback) {
      videoFrameId = video.requestVideoFrameCallback(onVideoFrame)
    }
    // Also handle media that loaded from cache before the effect subscribed.
    if (video.error) onError()
    else onReady()
    onProgress()

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      targetProgress = scrollable > 0
        ? Math.min(1, Math.max(0, -rect.top / scrollable))
        : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    const tick = () => {
      const drawSeekFrame = seekFramePending && !video.seeking
      if (drawSeekFrame) {
        drawFrame(video.currentTime)
        seekFramePending = false
      }

      // Keep the headline visible if media loading or drawing has failed.
      const visualProgress = hasFrame && !failed ? renderedProgress : 0
      if (contentRef.current) {
        contentRef.current.style.opacity = String(Math.max(0, 1 - visualProgress * 4))
        contentRef.current.style.transform = `translateY(${-visualProgress * 60}px)`
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = String(Math.max(0, 1 - visualProgress * 8))
      }

      if (ready) {
        const lastFrame = Math.max(0, duration - FRAME_DURATION)
        const targetTime = Math.min(targetProgress * duration, lastFrame)
        currentTime += (targetTime - currentTime) * SMOOTHING
        const frameTime = Math.min(
          lastFrame,
          Math.round(currentTime / FRAME_DURATION) * FRAME_DURATION
        )
        if (!drawSeekFrame && !video.seeking && video.readyState >= 2 &&
            Math.abs(video.currentTime - frameTime) >= FRAME_DURATION / 2) {
          video.currentTime = frameTime
        }
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('error', onError)
      video.removeEventListener('progress', onProgress)
      canvas.removeEventListener('contextlost', onError)
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (videoFrameId !== null) video.cancelVideoFrameCallback(videoFrameId)
    }
  }, [reducedMotion])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/properties${query ? `?search=${encodeURIComponent(query)}` : ''}`)
  }

  const heroContent = (
    <div className="container hero__content" ref={contentRef}>
      <p className="hero__eyebrow">
        <span className="hero__eyebrow-line" /> Premium Real Estate
      </p>
      <h1 className="hero__title">
        Find a Place<br />
        You'll Love to Call Home
      </h1>
      <p className="hero__subtitle">
        Discover exceptional properties curated for those who appreciate
        quality, comfort, and timeless design.
      </p>
      <form className="hero__search" onSubmit={handleSearch}>
        <div className="hero__search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search by location, type, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-gold hero__search-btn">
          Search
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  )

  // --- Reduced motion: static hero with fallback image ---

  if (reducedMotion) {
    return (
      <section className="hero--static">
        <div className="hero__bg">
          <img src={FALLBACK_IMG} alt="Luxury modern architecture" />
          <div className="hero__overlay" />
        </div>
        {heroContent}
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>
    )
  }

  // --- Scroll-driven video hero ---

  return (
    <section
      className="hero-scroll"
      ref={containerRef}
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      <div className="hero-sticky">
        <div className="hero__bg">
          {/* Keep the poster behind the canvas, including during failed draws. */}
          <img
            className="hero__fallback"
            src={FALLBACK_IMG}
            alt="Luxury modern architecture"
          />
          {/* Hidden video — used only for decoding; canvas renders the visible frame */}
          {!videoError && (
            <video
              ref={videoRef}
              className="hero__video-source"
              preload="auto"
              muted
              playsInline
              crossOrigin="anonymous"
              tabIndex={-1}
              src={VIDEO_URL}
            />
          )}
          {/* Canvas is revealed only after a decoded frame has been drawn. */}
          {!videoError && (
            <canvas
              ref={canvasRef}
              className={`hero__video ${videoReady ? 'hero__video--visible' : ''}`}
              width={1920}
              height={1080}
            />
          )}
          <div className="hero__overlay" />
        </div>

        {heroContent}

        {/* Minimal loading indicator — thin gold progress bar */}
        {!videoReady && !videoError && (
          <div className="hero__loading">
            <div className="hero__loading-track">
              <div
                className="hero__loading-fill"
                style={{ width: `${Math.max(5, bufferProgress * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="hero__scroll" ref={scrollIndicatorRef}>
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </div>
    </section>
  )
}
