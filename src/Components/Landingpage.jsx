import React, { useState, useEffect } from 'react'
import '../App.css'

const API_URL = 'https://kitsu.io/api/edge/trending/anime?limit=20'

const Landingpage = () => {
  const [current, setCurrent] = useState(0)
  const [animeList, setAnimeList] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const getAnime = async () => {
      try {
        const res = await fetch(API_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.api+json' },
        })

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`)
        }

        const json = await res.json()

        if (!json.data || json.data.length === 0) {
          throw new Error('No anime found')
        }

        setAnimeList(json.data)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('Fetch failed:', err)
        setError(err.message)
      }
    }

    getAnime()
    return () => controller.abort()
  }, [])

  if (error) {
    return <div className='mainbody'>Error loading anime: {error}</div>
  }

  if (animeList.length === 0) {
    return <div className='mainbody'>Loading...</div>
  }

  // Carousel only uses titles that have a wide cover image
  const slideData = animeList
    .filter((anime) => anime.attributes.coverImage?.original)
    .slice(0, 5)

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

  const cardElements = animeList.map((anime) => {
    const attrs = anime.attributes
    const title = attrs.titles?.en || attrs.canonicalTitle
    const poster = attrs.posterImage?.medium || attrs.posterImage?.small

    return (
      <div key={anime.id} className='video'>
        <div className='video-poster-wrap'>
          {poster && (
            <img
              className='video-poster'
              src={poster}
              alt={title}
              loading='lazy'
            />
          )}
          {attrs.subtype && <span className='video-badge'>{attrs.subtype}</span>}
        </div>

        <h3 className='video-title'>{title}</h3>

        <p className='video-info'>
          {attrs.averageRating && (
            <span className='video-rating'>★ {Math.round(attrs.averageRating)}%</span>
          )}
          {attrs.averageRating && attrs.episodeCount && ' · '}
          {attrs.episodeCount && `${attrs.episodeCount} eps`}
        </p>
      </div>
    )
  })

  return (
    <div className='mainbody'>
      {slideData.length > 0 && (
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
      )}

      <div className='videos-body'>
        <h2 className='section-title'>Trending now</h2>
        <div className='grid-container'>{cardElements}</div>
      </div>
    </div>
  )
}

export default Landingpage