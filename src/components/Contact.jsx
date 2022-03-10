import './Contact.css'
import { React, Component } from 'react'

const libraries = ['places']
const center = {
  lat: 42.199100,
  lng: -88.337110
}
const mapOptions = {
  center,
  zoom: 14,
  mapTypeId: window.google.maps.MapTypeId.ROADMAP
}

export class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: null,
      duration: null,
      origin: null
    }
  }

  componentDidMount = () => {
    this.initMap()
    this.initPlaces()
  }

  componentWillUnmount = () => {
    window.google.maps.event.clearInstanceListeners(this.autocomplete)
  }

  // MAPS JS API
  initMap = () => {
    // map object
    this.map = new window.google.maps.Map(document.getElementById("googleMap"), mapOptions)

    // add marker
    const marker = new window.google.maps.Marker({
      position: center,
      map: this.map
    })

    // directions service
    this.directionsService = new window.google.maps.DirectionsService()
    this.directionsDisplay = new window.google.maps.DirectionsRenderer()

    // bind directionsRenderer to map object
    this.directionsDisplay.setMap(this.map)
  }

  // PLACES API
  initPlaces = () => {
    // Places API takes an input object
    let input = document.getElementById('from')
    this.autocomplete = new window.google.maps.
      places.Autocomplete(input,
        { // specify only data we need to save money
          types: ['address'],
          fields: ['formatted_address']
        }
      )

    // Set bias for places API
    this.autocomplete.bindTo('bounds', this.map)

    // Add required event listener
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace()
      this.setState({
        origin: place.formatted_address
      })
    })
  }

  // GET DIRECTIONS
  calcRoute = (e) => {
    // handle event object
    e.preventDefault()

    // request object
    let request = {
      origin: this.state.origin,
      destination: center,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL
    }

    // process request
    this.directionsService.route(request, (result, status) => {
      if (status === "OK") {
        // get distance and time
        this.directionsDisplay.setDirections(result)
        this.setState({
          distance: result.routes[0].legs[0].distance.text,
          duration: result.routes[0].legs[0].duration.text
        })
      } else {
        console.log('ERROR')
      }
    })
  }

  render() {
    return (
      <div className='mapDiv'>
        <div className="hours">
          <h2>Hours</h2>
          <p>Monday: 9AM - 6PM</p>
          <p>Tuesday: 7AM - 5PM</p>
          <p>Wednesday: 9AM - 5PM</p>
          <p>Thursday: 9AM - 5PM</p>
          <p>Friday: 7AM - 12PM</p>
        </div>

        <form>
          <div className="form-group">
            <input type="text" id='from' placeholder='Get Directions From' />
          </div>
          <div className="form-group">
            <button
              onClick={(e) => this.calcRoute(e)}
            >Route</button>
          </div>
          <div className='navigation'>
            1520 Carlemont Dr, Crystal Lake, IL
            {this.state.distance && <p>Distance: {this.state.distance}</p>}
            {this.state.duration && <p>Duration: {this.state.duration}</p>}
          </div>
        </form>


        <div className="googleMap" id="googleMap">
        </div>
      </div>
    )
  }
}