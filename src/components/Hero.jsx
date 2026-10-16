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

export default function Hero() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [videoReady, setVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [bufferProgress, setBufferProgress] = useState(0)

  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducedMotion) return

    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let duration = 0
    let targetProgress = 0
    let currentTime = 0
    let rafId = null
    let ready = false
    let lastBuffer = 0

    // --- Video event handlers ---

    const onLoadedMetadata = () => {
      duration = video.duration
      if (!isFinite(duration) || isNaN(duration) || duration === 0) {
        setVideoError(true)
      }
    }

    const onLoadedData = () => {
      ready = true
      video.currentTime = 0
      currentTime = 0
      setVideoReady(true)
    }

    const onError = () => setVideoError(true)

    const onProgress = () => {
      if (video.buffered.length > 0 && duration > 0) {
        const end = video.buffered.end(video.buffered.length - 1) / duration
        if (Math.abs(end - lastBuffer) > 0.05) {
          lastBuffer = end
          setBufferProgress(end)
        }
      }
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('error', onError)
    video.addEventListener('progress', onProgress)

    // --- Passive scroll handler — only updates target, no DOM writes ---

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      targetProgress = Math.min(1, Math.max(0, -rect.top / scrollable))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial call

    // --- RAF loop — smooth interpolation, direct DOM/video manipulation ---

    const tick = () => {
      // Fade text content based on scroll progress (works even before video ready)
      if (contentRef.current) {
        const opacity = Math.max(0, 1 - targetProgress * 4) // fully faded by 25% scroll
        contentRef.current.style.opacity = String(opacity)
        contentRef.current.style.transform = `translateY(${-targetProgress * 60}px)`
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = String(
          Math.max(0, 1 - targetProgress * 8) // faded by 12.5% scroll
        )
      }

      // Seek video only when ready
      if (ready && duration > 0) {
        const targetTime = targetProgress * duration
        currentTime += (targetTime - currentTime) * SMOOTHING

        // Only seek when the difference is meaningful (prevents seek flooding)
        if (Math.abs(video.currentTime - currentTime) > 0.001) {
          video.currentTime = currentTime
        }
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('error', onError)
      video.removeEventListener('progress', onProgress)
      if (rafId) cancelAnimationFrame(rafId)
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
          {/* Fallback image — always present behind video, crossfades out */}
          <img
            className={`hero__fallback ${videoReady && !videoError ? 'hero__fallback--hidden' : ''}`}
            src={FALLBACK_IMG}
            alt="Luxury modern architecture"
          />
          {/* Scroll-driven video — no autoplay, no loop, scrubbed via currentTime */}
          {!videoError && (
            <video
              ref={videoRef}
              className={`hero__video ${videoReady ? 'hero__video--visible' : ''}`}
              preload="auto"
              muted
              playsInline
              tabIndex={-1}
              src={VIDEO_URL}
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
