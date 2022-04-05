import './Navbar.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

export function Navbar() {
  let [clicked, setClick] = useState('')

  // HELP WITH NAVBAR STYLING
  async function timeStop() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setClick('')
  }

  // WAIT WHEN NAVBAR ELEMENT IS CLICKED
  useEffect(() => {
    if (clicked) {
      timeStop();
    }
  }, [clicked])

  return (
    <div className='Navbar'>
      <ul>
        <li><Link to="home" smooth={true} duration={1000}>Randall North Dental Care</Link></li>

        <li><Link to="contact" smooth={true} duration={1000}
          onClick={() => setClick('contact')}
          style={{ 
            'transitionDelay': clicked === 'contact' && '1s',
            'transitionDuration': clicked === 'contact' && '0.5s'
         }}>Contact</Link>
        </li>

        <li><Link to="services" smooth={true} duration={1000}
          onClick={() => setClick('services')}
          style={{ 
            'transitionDelay': clicked === 'services' && '1s',
            'transitionDuration': clicked === 'services' && '0.5s'
         }}>Services</Link>
        </li>

        <li><Link to="staff" smooth={true} duration={1000}
          onClick={() => setClick('staff')}
          style={{  
            'transitionDelay': clicked === 'staff' && '1s',
            'transitionDuration': clicked === 'staff' && '0.5s'
          }}>Staff</Link>
        </li>
      </ul>
    </div>
  )
}