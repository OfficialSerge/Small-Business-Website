import './Accordion.css'
import { useState } from 'react'

export function Accordion() {
  let [tab, setTab] = useState(null)
  function selectTab(e, value) {
    e.preventDefault()
    setTab(value)
  }
  
  return (
    <div className='folder'>
      <ul className='tabs'>
        <li><a href='Filling' onClick={(e) => selectTab(e, 'Filling')} >Fillings</a></li>
        <li><a href='Crowns' onClick={(e) => selectTab(e, 'Crowns')} >Crowns</a></li>
        <li><a href='Implants' onClick={(e) => selectTab(e, 'Implants')} >Implants</a></li>
        <li><a href='Dentures' onClick={(e) => selectTab(e, 'Dentures')} >Dentures</a></li>
        <li><a href='Cosmetic' onClick={(e) => selectTab(e, 'Cosmetic')} >Cosmetic Dentistry</a></li>
        <li><a href='Bridges' onClick={(e) => selectTab(e, 'Bridges')} >Bridges</a></li>
        <li><a href='Root' onClick={(e) => selectTab(e, 'Root')} >Root Canal</a></li>
      </ul>

      <div className='content'>
        <div className='tabText'>
          {tab === 'Filling' &&
            <>
              <h2>Fillings</h2>
              <br />
              <p><b>Direct Resorations</b> are fillings placed immediately into a prepared cavity in a single visit.</p>
              <br />
              <p><b>Indirect Resorations</b> are custom fitted to the tooth and require a mold, they tipically take two or three
                visits.
              </p>
            </>
          }
          {tab === 'Crowns' &&
            <>
              <h2>Crowns</h2>
              <br />
              <p><b>Crowns</b> are synthetic caps placed on top of a compremised tooth to help restore functionality and appearance.</p>
            </>
          }
          {tab === 'Implants' &&
            <>
              <h2>Implants</h2>
              <br />
              <p><b>Implants</b> TO DO</p>
            </>
          }
          {tab === 'Dentures' &&
            <>
              <h2>Dentures</h2>
              <br />
              <p><b>Complete Dentures</b> will fully replace a patient's upper or lower teeth.</p>
              <br />
              <p><b>Partial Dentures</b> will replace several missing teeth and help compliment any remaining healthy teeth.</p>
              <br />
              <p>Dentures can improve chewing ability, speech, and provide support for facial muscles. Make sure to rinse
                your dentures with water and carefully brush them so they stay clean overnight, they fair well in a cup of water
                when you're not wearing them.
              </p>
            </>
          }
          {tab === 'Cosmetic' &&
            <>
              <h2>Cosmetic Dentistry</h2>
              <br />
              <p><b>Bonding</b> will use an enamel-like material to fill any gaps in teeth, it gets polished and shaped to the tooth surface.</p>
              <br />
              <p><b>Veneers</b> use thin sheets of porcelain or plastic to reshape and whiten teeth entirely. This proceedure typically takes
                three visits and is permanent.</p>
              <br />
              <p><b>Whitening</b>, when done properly, can last as long as 5 years. While whitening tooth paste can be somewhat effective, a
                dental hygenist can offer the best experience.</p>
            </>
          }
          {tab === 'Bridges' &&
            <>
              <h2>Bridges</h2>
              <br />
              <p><b>Bridges</b> are similar to partial dentures as they can help cover several compremised teeth and restore the tooth shape,
                except for the fact that dentures are better sutied when teeth are completely missing.</p>
            </>
          }
          {tab === 'Root' &&
            <>
              <h2>Root Canals</h2>
              <br />
              <p><b>Root Canals</b> can help halt the spread of infection within a tooth before the tooth needs to be removed, it
               takes about three visits and involves removing infected material via a small hole in the top of a tooth and filling
               the space with an elastic material till a permanent seal is formed. </p>
            </>
          }
        </div>
      </div>
    </div>
  )
}  