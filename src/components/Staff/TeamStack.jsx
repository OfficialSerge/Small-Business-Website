import { useState, useEffect } from 'react'

export function TeamStack() {
  const [current, setCurrent] = useState(1)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    if (seconds === 9) {
      setCurrent(current === 3 ? 1 : current + 1)
      setSeconds(0)
    }

    return () => clearInterval(interval)
  }, [seconds, current])

  return (
    <div className="container" style={{ 'grid-area': 'tea' }}>
      <div className="imgSlider">
        <div className={`slide${current === 1 ? ' active' : ''}`}>
          <img src="/assets/team1.jpg" alt=':(' style={{ 'width': '100%', 'height': 'auto', 'zoom': '25%', 'margin-top': '9vmin' }} />
        </div>

        <div className={`slide${current === 2 ? ' active' : ''}`}>
          <img src="/assets/team2.jpg" alt=':(' />
        </div>

        <div className={`slide${current === 3 ? ' active' : ''}`}>
          <img src="/assets/team3.jpg" alt=':(' />
        </div>

        <div className="btnContainer">
          <div className={`btn ${current === 1 ? 'active' : ''}`} onClick={() => setCurrent(1)}></div>
          <div className={`btn ${current === 2 ? 'active' : ''}`} onClick={() => setCurrent(2)}></div>
          <div className={`btn ${current === 3 ? 'active' : ''}`} onClick={() => setCurrent(3)}></div>
        </div>

        <h1>Our Team</h1>
      </div>

      <div className="containerText">
        <p>
          Our staff has been with us for several years, refining essential skills during their tenure and working feverishly
          to set a standard of care and comfort that can't be found elsewhere. Our staff looks forward to helping each and
          everyone of our patients rediscover their smiles.

        </p>
      </div>
    </div>
  )
}