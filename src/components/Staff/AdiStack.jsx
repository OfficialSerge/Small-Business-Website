import { useState, useEffect } from 'react'

export function AdiStack() {
  const [current, setCurrent] = useState(1)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    if (seconds === 10) {
      setCurrent(current === 3 ? 1 : current + 1)
      setSeconds(0)
    }

    return () => clearInterval(interval)
  }, [seconds, current])

  return (
    <div className="container">
      <div className="imgSlider">
        <div className={`slide${current === 1 ? ' active' : ''}`}>
          <img src="/assets/adi1.jpg" alt=':(' />
        </div>

        <div className={`slide${current === 2 ? ' active' : ''}`}>
          <img src="/assets/adi2.jpg" alt=':(' />
        </div>

        <div className={`slide${current === 3 ? ' active' : ''}`}>
          <img src="/assets/adi3.jpg" alt=':(' />
        </div>

        <div className="btnContainer">
          <div className={`btn ${current === 1 ? 'active' : ''}`} onClick={() => setCurrent(1)}></div>
          <div className={`btn ${current === 2 ? 'active' : ''}`} onClick={() => setCurrent(2)}></div>
          <div className={`btn ${current === 3 ? 'active' : ''}`} onClick={() => setCurrent(3)}></div>
        </div>

        <h1>Dr. Pop</h1>
      </div>

      <div className="containerText">
        <p>
          Dr. Adrian Pop has been practicing dentistry since 2013 when he recieved his Doctor of Dental Surgery degree from the University 
          of Chicago, he performs minor oral surgery and root canal treatments in office.
          
        </p>
      </div>
    </div>
  )
}