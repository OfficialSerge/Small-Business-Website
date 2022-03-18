import './App.css'

// MODELS
import torusGradient from './assets/5.jpg'
import blue from './assets/Blue.glb'
import green from './assets/Green.glb'
import pink from './assets/Pink.glb'

// THREEJS
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'
import gsap from 'gsap'

// REACT
import React, { Component } from "react"
import { Navbar } from './components/Navbar'
import { Contact } from './components/Contact'
import { StaffInfo } from './components/Staff/StaffInfo'
import { List } from './components/List'
import { Accordion } from './components/Accordion'

const objectsDistance = 4
const parameters = {
  materialColor: '#ffeded'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.appRef = React.createRef()
    this.state = {
      width: 0,
      height: 0,
      selected: null
    }
  }

  componentDidMount = () => {
    // Cheat to always load at the top of the page on refresh
    window.location.href = 'http://localhost:3000/#home'

    this.sceneSetup()
    this.assetSetup()

    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)

    this.addCustomSceneObjects()
    this.startAnimationLoop()
    //this.guiSetup()
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.cancelAnimationFrame(this.requestID)
  }

  // GUI TO HELP WITH DESIGN
  guiSetup = () => {
    // Debug
    this.gui = new dat.GUI()

    // Lighting
    this.gui.add(this.directionalLight, 'intensity').min(0).max(1).step(0.1).name('Directional Light')
    this.gui.add(this.ambientLight, 'intensity').min(0).max(1).step(0.1).name('Ambient Light')
    this.gui.add(this.directionalLight.position, 'x').min(- 5).max(5).step(0.1)
    this.gui.add(this.directionalLight.position, 'y').min(- 5).max(5).step(0.1)
    this.gui.add(this.directionalLight.position, 'z').min(- 5).max(5).step(0.1)

    // Light Helper
    const directionalLightHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera)
    this.scene.add(directionalLightHelper)
  }

  // DYNAMICALLY CHANGE GRID-TEMPLATE-ROWS
  componentDidUpdate = () => {
    if (this.state.width < 550) {
      if (this.state.selected != null) {
        return this.appRef.current.style['grid-template-rows'] = '100vh 300vh 130vh 100vh'
      }
      return this.appRef.current.style['grid-template-rows'] = '100vh 300vh 100vh 100vh'
    }
  }

  // MANAGE SELECTED STATE
  handleSelectedChange = (i) => {
    // Open or close a selected blind
    if (this.state.selected === i) {
      return this.setState({ selected: null })
    }
    // Open blind and close another at same time
    this.setState({ selected: i })
  }

  // LOAD ASSETS
  assetSetup = () => {
    // Gradient map for torus
    const loader = new THREE.TextureLoader()
    this.gradient = loader.load(torusGradient,
      undefined, // OnLoad
      undefined, // OnProgress
      function (err) {
        console.log(err)
      }
    )
    this.gradient.magFilter = THREE.NearestFilter

    // Load Candy
    const gltfLoader = new GLTFLoader()
    this.blueCandy1 = null
    gltfLoader.loadAsync(blue).then((gltf) => {
      this.blueCandy1 = gltf.scene
      this.blueCandy1.scale.set(0.4, 0.4, 0.4)
      this.blueCandy1.position.set(3, -0.5, 0)
      this.scene.add(this.blueCandy1)
    })
    this.blueCandy2 = null
    gltfLoader.loadAsync(blue).then((gltf) => {
      this.blueCandy2 = gltf.scene
      this.blueCandy2.scale.set(0.4, 0.4, 0.4)
      this.blueCandy2.position.set(-2, 0, 0)
      this.scene.add(this.blueCandy2)
    })
    this.blueCandy3 = null
    gltfLoader.loadAsync(blue).then((gltf) => {
      this.blueCandy3 = gltf.scene
      this.blueCandy3.scale.set(0.5, 0.5, 0.5)
      this.blueCandy3.position.set(0, 2, 0)
      this.scene.add(this.blueCandy3)
    })

    this.pinkCandy1 = null
    gltfLoader.loadAsync(pink).then((gltf) => {
      this.pinkCandy1 = gltf.scene
      this.pinkCandy1.scale.set(0.4, 0.4, 0.4)
      this.pinkCandy1.position.set(1, -1, 0)
      this.scene.add(this.pinkCandy1)
    })

    this.greenCandy1 = null
    gltfLoader.loadAsync(green).then((gltf) => {
      this.greenCandy1 = gltf.scene
      this.greenCandy1.scale.set(0.4, 0.4, 0.4)
      this.greenCandy1.position.set(-4, 1.5, 0)
      this.scene.add(this.greenCandy1)
    })
  }

  // THREEJS SETUP
  sceneSetup = () => {
    this.width = this.mount.clientWidth
    this.height = this.mount.clientHeight

    this.setState({
      width: this.width,
      height: this.height
    })

    this.cursor = {
      x: this.mount.clientX,
      y: this.mount.clientY
    }

    // Scrolling over site sections
    this.currentSection = 0

    // Scene, Camera, Renderer
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.1, 100)
    this.camera.position.z = 8
    this.scene.add(this.camera)
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(this.width, this.height)
    this.renderer.shadowMap.enabled = true
    this.renderer.outputEncoding = THREE.sRGBEncoding // must configure for gltf
    this.mount.appendChild(this.renderer.domElement) // mount using React ref

    // Clock: used for controling animation
    this.clock = new THREE.Clock()
    this.previousTime = 0
  }

  // GEOMETRY SETUP
  addCustomSceneObjects = () => {
    // Doughnut
    // const material = new THREE.MeshToonMaterial({ color: parameters.materialColor, gradientMap: this.gradient })
    // this.torus = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
    // this.torus.position.x = 2
    // this.torus.castShadow = true
    // this.scene.add(this.torus)

    // Plane
    // this.plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: '#d8e1f1' }))
    // this.plane.rotation.set(-Math.PI / 2.2, 0, 0)
    // this.plane.position.y = -objectsDistance + 2.5
    // this.plane.receiveShadow = true
    // this.scene.add(this.plane)

    // Particles
    const count = 200, positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    const particlesGeo = new THREE.BufferGeometry()
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({ color: '#6080a8', sizeAttenuation: true, size: 0.05 })
    this.particles = new THREE.Points(particlesGeo, particlesMaterial)
    this.scene.add(this.particles)

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    this.directionalLight.position.set(2.5, 3, 2)
    this.scene.add(this.directionalLight, this.ambientLight)

    this.directionalLight.castShadow = true // tell light to cast shadow
    this.directionalLight.shadow.mapSize.width = 512 * 5 // this is the shadowmap resolution
    this.directionalLight.shadow.mapSize.height = 512

    this.directionalLight.shadow.camera.near = 1 // how close to the light do shadows start
    this.directionalLight.shadow.camera.far = 5 // how far from the camera will we allow shadow renders

    this.directionalLight.shadow.camera.top = 1.5 // by shrinking the dimensions of the shadow map we improve picture quality
    this.directionalLight.shadow.camera.bottom = -1.5 // the shadowmap resolution stays the same so it just looks better
    this.directionalLight.shadow.camera.left = -5
    this.directionalLight.shadow.camera.right = 5

    this.directionalLight.shadow.radius = 20 // control shadow edge blur
    this.directionalLight.shadow.blurSamples = 5
  };

  // ANIMATION LOOP
  startAnimationLoop = () => {
    // Time stuff
    const elapsedTime = this.clock.getElapsedTime()
    const deltaTime = elapsedTime - this.previousTime
    this.previousTime = elapsedTime

    // Animate torus
    // this.torus.rotation.x += deltaTime * 0.1
    // this.torus.rotation.y += deltaTime * 0.12

    // Particle movement
    this.particles.position.y = window.scrollY / this.height * objectsDistance

    // Parallax effect
    const parallaxX = this.cursor.x ? this.cursor.x : 0
    const parallaxY = this.cursor.y ? -this.cursor.y : 0
    this.camera.position.x += (parallaxX - this.camera.position.x) * deltaTime
    this.camera.position.y += (parallaxY - this.camera.position.y) * deltaTime

    // CANDY
    this.blueCandy1 && this.blueCandy1.rotation.set(-Math.PI / 1.5, 0, this.blueCandy1.rotation.z += deltaTime * 0.4)
    this.blueCandy2 && this.blueCandy2.rotation.set(-Math.PI / 3, 0, this.blueCandy2.rotation.z += deltaTime * 0.25)
    this.blueCandy3 && this.blueCandy3.rotation.set(-Math.PI / 4, Math.PI / 8, this.blueCandy3.rotation.z += deltaTime * 0.5)
    this.pinkCandy1 && this.pinkCandy1.rotation.set(-Math.PI / 1.5, Math.PI / 8, this.pinkCandy1.rotation.z += deltaTime * 0.3)
    this.greenCandy1 && this.greenCandy1.rotation.set(-Math.PI / 1.5, Math.PI / 8, this.greenCandy1.rotation.z += deltaTime * 0.35)

    // Make room for contact info
    // if (window.scrollY > 1562) {
    //   this.torus.position.y = (window.scrollY - 1562) / this.height * objectsDistance
    //   this.plane.position.y = (-objectsDistance + 2.5) + ((window.scrollY - 1562) / this.height * objectsDistance)
    //   this.directionalLight.position.y = 3 + ((window.scrollY - 1562) / this.height * objectsDistance)
    // }

    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  // HANDLE EVENT
  handleWindowResize = () => {
    // Update sizes
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // Update camera
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  };

  // HANDLE EVENT
  handleScroll = () => {
    const scroll = window.scrollY
    const section = Math.round(scroll / this.height)

    // Handle gsap animations
    if (section !== this.currentSection) {
      this.currentSection = section

      // Start timeline
      // const timeLine = gsap.timeline()
      // timeLine
      //   .to( // Apply translation
      //     this.torus.position, 
      //     {
      //       duration: 7.5,
      //       ease: 'elastic',
      //       x: section % 2 === 0 ? 2 : -2
      //     }
      //   ).to( // Apply rotation
      //     this.torus.rotation,
      //     {
      //       duration: 1.5,
      //       y: '+=8'
      //     }, '-=7.5' // use position arg to control overlap    
      //   )
    }
  }

  // HANDLE EVENT
  handleMouseMove = (e) => {
    this.cursor.x = e.clientX / this.width - 0.5
    this.cursor.y = e.clientY / this.height - 0.5
  }

  render() {
    return (
      <div className='app' ref={this.appRef}>
        <div className='webgl' ref={ref => (this.mount = ref)} />

        {/** Initial welcome */}
        <section id='home' className="section1">
          <Navbar />
        </section>

        {/** Staff section */}
        <section id='staff' className="section2">
          <StaffInfo />
        </section>

        {/** Services */}
        <section id='services' className="section3">
          {this.state.width > 550 ? <Accordion /> : <List selected={this.state.selected} setSelected={this.handleSelectedChange} />}
        </section>

        {/** Contact info */}
        <section id='contact' className="section4">
          <Contact />
        </section>
      </div>
    )
  }
}

export default App;