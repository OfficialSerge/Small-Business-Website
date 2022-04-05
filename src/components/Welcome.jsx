import './Welcome.css'

export function Welcome({ toggleWelcome, setWelcome }) {
  // TOGGLE WELCOME
  function handleChange(event) {
    event.preventDefault()
    setWelcome(!toggleWelcome)
  }

  return (
    <div className='welcomeDiv' >
        <div className="imageDiv">
          <img src="/assets/cat.jpg" alt=':(' />
          <button onClick={(e) => { handleChange(e) }}>X</button>
        </div>

      <h1>Welcome to Randall North Dental Care, schedule an appointment with us and let us help you rediscover your smile. </h1>
    </div>
  )
}