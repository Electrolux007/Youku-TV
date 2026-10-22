import React, { useState, useEffect } from 'react'
import '../App.css'

const API_URL = 'https://kitsu.io/api/edge/trending/anime'

const Landingpage = () => {
  const [current, setCurrent] = useState(0)
  const [slideData, setSlideData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const getSlides = async () => {
      try {
        const res = await fetch(API_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.api+json' },
        })

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`)
        }

        const json = await res.json()

        const withBanners = json.data
          .filter((anime) => anime.attributes.coverImage?.original)
          .slice(0, 5)

        if (withBanners.length === 0) {
          throw new Error('No banner images found')
        }

        setSlideData(withBanners)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('Fetch failed:', err)
        setError(err.message)
      }
    }

    getSlides()
    return () => controller.abort()
  }, [])

  if (error) {
    return <div className='mainbody'>Error loading slides: {error}</div>
  }

  if (slideData.length === 0) {
    return <div className='mainbody'>Loading...</div>
  }

  const goPrev = () => setCurrent((current - 1 + slideData.length) % slideData.length)
  const goNext = () => setCurrent((current + 1) % slideData.length)

  const slideElements = slideData.map((slide) => {
    const attrs = slide.attributes
    const title = attrs.titles?.en || attrs.canonicalTitle

    return (
      <div
        key={slide.id}
        className='slide'
        style={{ backgroundImage: `url(${attrs.coverImage.original})` }}
      >
        <div className='slide-overlay'>
          <div className='slide-meta'>
            {attrs.averageRating && (
              <span className='slide-pill slide-pill-rating'>
                ★ {Math.round(attrs.averageRating)}%
              </span>
            )}
            {attrs.subtype && <span className='slide-pill'>{attrs.subtype}</span>}
          </div>

          <h2 className='slide-title'>{title}</h2>
          <p className='slide-desc'>{attrs.synopsis}</p>

          <div className='slide-actions'>
            <button className='slide-btn'>▶ Watch now</button>
            <button className='slide-btn slide-btn-ghost'>+ My list</button>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='mainbody'>
      <div className='carousel'>
        <div
          className='carousel-track'
          style={{ transform: `translateX(${current * -100}%)` }}
        >
          {slideElements}
        </div>

        <button
          className='carousel-arrow carousel-arrow-left'
          onClick={goPrev}
          aria-label='Previous slide'
        >
          ‹
        </button>
        <button
          className='carousel-arrow carousel-arrow-right'
          onClick={goNext}
          aria-label='Next slide'
        >
          ›
        </button>

        <div className='carousel-dots'>
          {slideData.map((slide, index) => (
            <button
              key={slide.id}
              className={`carousel-dot ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="videos-body">
          <div className="grid-container">
            <div className="video"></div>
            <div className="video"></div>
            <div className="video"></div>
          </div>
      </div>
    </div>
  )
}

export default Landingpage
