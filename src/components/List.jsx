import './List.css'
import React, { Component } from "react"
import parse from 'html-react-parser'

const data = [
  {
    title: 'Fillings',
    body: `
    <p><b>Direct Resorations</b> are fillings placed immediately into a prepared cavity in a single visit.</p>
    <br />
    <p><b>Indirect Resorations</b> are custom fitted to the tooth and require a mold, they tipically take two or three
      visits.
    </p>
    `
  },
  {
    title: 'Crowns',
    body: `
    <p><b>Crowns</b> are synthetic caps placed on top of a compremised tooth to help restore functionality and appearance.</p>
    `
  },
  {
    title: 'Implants',
    body: `
    <p><b>Implants</b> TO DO</p>
    `
  },
  {
    title: 'Dentures',
    body: `
    <p><b>Complete Dentures</b> will fully replace a patient's upper or lower teeth.</p>
    <br />
    <p><b>Partial Dentures</b> will replace several missing teeth and help compliment any remaining healthy teeth.</p>
    <br />
    <p>Dentures can improve chewing ability, speech, and provide support for facial muscles. Make sure to rinse
      your dentures with water and carefully brush them so they stay clean overnight, they fair well in a cup of water
      when you're not wearing them.
    </p>
    `
  },
  {
    title: 'Cosmetic',
    body: `
    <p><b>Bonding</b> will use an enamel-like material to fill any gaps in teeth, it gets polished and shaped to the tooth surface.</p>
    <br />
    <p><b>Veneers</b> use thin sheets of porcelain or plastic to reshape and whiten teeth entirely. This proceedure typically takes
      three visits and is permanent.</p>
    <br />
    <p><b>Whitening</b>, when done properly, can last as long as 5 years. While whitening tooth paste can be somewhat effective, a
      dental hygenist can offer the best experience.</p>
    `
  },
  {
    title: 'Bridges',
    body: `
    <p><b>Bridges</b> are similar to partial dentures as they can help cover several compremised teeth and restore the tooth shape,
    except for the fact that dentures are better sutied when teeth are completely missing.</p>
    `
  },
  {
    title: 'Root Canals',
    body: `
    <p><b>Root Canals</b> can help halt the spread of infection within a tooth before the tooth 
    needs to be removed, it takes about three visits and involves removing infected material via a small 
    hole in the top of a tooth and filling the space with an elastic material till a permanent seal is formed. </p>
    `
  }
]

export function List({ selected, setSelected }) {
  // SET STATE OF SELECTED
  function handleChange(i) {
    setSelected(i)
  }

  return (
    <div className='list'>
      {
        data.map((item, i) =>
          <div className="item">
            <div className="title" onClick={() => handleChange(i)}>
              <h2>{item.title}</h2>
              <span>{selected === i ? '-' : '+'}</span>
            </div>

            <div className={selected === i ? "card show" : "card"}>{parse(item.body)}</div>
          </div>
        )
      }
    </div>
  )
}