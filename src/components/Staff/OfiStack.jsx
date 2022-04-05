import { useState, useEffect } from 'react'

export function OfiStack() {
  const [current, setCurrent] = useState(1)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    if (seconds === 11) {
      setCurrent(current === 3 ? 1 : current + 1)
      setSeconds(0)
    }

    return () => clearInterval(interval)
  }, [seconds, current])

  return (
    <div className="container" style={{'grid-area':'ofi'}}>
      <div className="imgSlider">
        <div className={`slide${current === 1 ? ' active' : ''}`}>
          <img src="/assets/Ofi1.jpg" alt=':(' />
        </div>

        <div className={`slide${current === 2 ? ' active' : ''}`}>
          <img src="/assets/Ofi2.jpg" alt=':(' />
        </div>

        <div className={`slide${current === 3 ? ' active' : ''}`}>
          <img src="/assets/Ofi3.jpg" alt=':(' />
        </div>

        <div className="btnContainer">
          <div className={`btn ${current === 1 ? 'active' : ''}`} onClick={() => setCurrent(1)}></div>
          <div className={`btn ${current === 2 ? 'active' : ''}`} onClick={() => setCurrent(2)}></div>
          <div className={`btn ${current === 3 ? 'active' : ''}`} onClick={() => setCurrent(3)}></div>
        </div>

        <h1>Dr. Pod</h1>
      </div>

      <div className="containerText">
        <p>
          Romanian born, Dr. Pod immagrated to the US and graduated the International Dental Program at the University of Illinois 
          Chicago in 2005. Dr. Pod then proceeded to work as part time faculty at UIC, specializing in urgent care, while also 
          practicing general dentistry outside UIC. She runs in her freetime.

        </p>
      </div>
    </div>
  )
}