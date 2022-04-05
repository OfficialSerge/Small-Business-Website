// FIREBASE
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

// CSS
import './App.css'

// MODELS
import redLoli from './models/red.glb'
import tealLoli from './models/teal.glb'
import blueLoli from './models/blue.glb'
import yellowLoli from './models/yellow.glb'
import blueGum from './models/blueGum.glb'
import purpleGum from './models/purpleGum.glb'
import orangeGum from './models/orangeGum.glb'
import greenGum from './models/greenGum.glb'

// THREEJS
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// REACT
import React, { Component } from "react"
import { Welcome } from './components/Welcome'
import { Navbar } from './components/Navbar'
import { Contact } from './components/Contact'
import { StaffInfo } from './components/Staff/StaffInfo'
import { List } from './components/List'
import { Accordion } from './components/Accordion'

// INIT FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAf-_k0N9KwJjvkzeEZh9qWVXYEs9cdKoI",
  authDomain: "rndc-341820.firebaseapp.com",
  projectId: "rndc-341820",
  storageBucket: "rndc-341820.appspot.com",
  messagingSenderId: "111844360169",
  appId: "1:111844360169:web:c57602e7138835cbc8d578",
  measurementId: "G-Q2Z6LMRX2X"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

class App extends Component {
  constructor(props) {
    super(props)
    this.appRef = React.createRef()
    this.state = {
      scrollTop: true,
      width: window.innerWidth,
      height: window.innerHeight,
      cursorX: 0,
      cursorY: 0,
      selected: null, // USED WITH LIST.JSX
      toggleWelcome: true
    }
  }

  componentDidMount = () => {
    this.sceneSetup()
    this.assetSetup()

    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('click', this.handleClick)

    this.startAnimationLoop()
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('click', this.handleClick)
    window.cancelAnimationFrame(this.requestID)
  }

  // DYNAMICALLY CHANGE GRID-TEMPLATE-ROWS
  componentDidUpdate = () => {
    // adjust layout per screen size
    if (this.state.width < 550) {
      if (this.state.selected != null) {
        return this.appRef.current.style['grid-template-rows'] = '100vh 600vh 130vh 100vh'
      }
      return this.appRef.current.style['grid-template-rows'] = '100vh 600vh 100vh 100vh'
    }

    // remove event listeners for when we scroll and don't need them
    if (!this.state.scrollTop) {
      window.removeEventListener('click', this.handleClick)
      window.removeEventListener('mousemove', this.handleMouseMove)

    } else {
      window.addEventListener('click', this.handleClick)
      window.addEventListener('mousemove', this.handleMouseMove)

    }
  }

  // MANAGE SELECTED STATE
  handleSelectedChange = (i) => {
    if (this.state.selected === i) {
      return this.setState({ selected: null })
    }

    this.setState({ selected: i })
  }

  // MANAGE TOGGLEWELCOME STATE
  handleWelcomeChange = (boolean) => {
    this.state.toggleWelcome = boolean
  }

  // LOAD ASSETS
  assetSetup = () => {
    // INIT SHADERS
    const pinkMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float offset;

        void main() {
          vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
          gl_Position = projectionMatrix * pos;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;

        void main() {
          gl_FragColor = vec4( uColor, 1.0 );
        }
      `,
      uniforms: {
        offset: { type: 'f', value: 0.02 },
        uColor: { value: new THREE.Color(0xf9b6ed) } // We send this color data to the fragment
      }
    })
    const blueMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float offset;

        void main() {
          vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
          gl_Position = projectionMatrix * pos;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;

        void main() {
          gl_FragColor = vec4( uColor, 1.0 );
        }
      `,
      uniforms: {
        offset: { type: 'f', value: 0.02 },
        uColor: { value: new THREE.Color(0xa5cffa) } // We send this color data to the fragment
      }
    })
    const yellowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float offset;

        void main() {
          vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
          gl_Position = projectionMatrix * pos;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;

        void main() {
          gl_FragColor = vec4( uColor, 1.0 );
        }
      `,
      uniforms: {
        offset: { type: 'f', value: 0.02 },
        uColor: { value: new THREE.Color(0xffe8a8) } // We send this color data to the fragment
      }
    })
    const purpleMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float offset;

        void main() {
          vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
          gl_Position = projectionMatrix * pos;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;

        void main() {
          gl_FragColor = vec4( uColor, 1.0 );
        }
      `,
      uniforms: {
        offset: { type: 'f', value: 0.02 },
        uColor: { value: new THREE.Color(0xd699ff) } // We send this color data to the fragment
      }
    })
    const orangeMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float offset;

        void main() {
          vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
          gl_Position = projectionMatrix * pos;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;

        void main() {
          gl_FragColor = vec4( uColor, 1.0 );
        }
      `,
      uniforms: {
        offset: { type: 'f', value: 0.02 },
        uColor: { value: new THREE.Color(0xffbf8f) } // We send this color data to the fragment
      }
    })
    const greenMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float offset;

        void main() {
          vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );
          gl_Position = projectionMatrix * pos;
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor;

        void main() {
          gl_FragColor = vec4( uColor, 1.0 );
        }
      `,
      uniforms: {
        offset: { type: 'f', value: 0.02 },
        uColor: { value: new THREE.Color(0x9aeb7c) } // We send this color data to the fragment
      }
    })

    // INIT GLTFLOADER
    const gltfLoader = new GLTFLoader()
    this.objectsToTest = []

    // LOAD MODELS MOBILE RES
    if (this.state.width < 550) {
      gltfLoader.loadAsync(redLoli).then((gltf) => {
        this.redLoli = gltf.scene
        this.redLoli.scale.set(0.4, 0.4, 0.4)
        this.redLoli.position.set(-0.75, -0.5, 1)

        this.redShader = new THREE.Mesh(this.redLoli.children[0].geometry, pinkMaterial)
        this.redShader.scale.set(0.4, 0.4, 0.4)
        this.redShader.position.set(-0.75, -0.5, 1)
        this.redShader.material.depthWrite = false

        this.scene.add(this.redLoli)
        this.outScene.add(this.redShader)
        this.objectsToTest.push(this.redLoli.children[0])
      })
      gltfLoader.loadAsync(yellowLoli).then((gltf) => {
        this.yellowLoli = gltf.scene
        this.yellowLoli.scale.set(0.4, 0.4, 0.4)
        this.yellowLoli.position.set(1, 1.75, -0.5)

        this.yellowShader = new THREE.Mesh(this.yellowLoli.children[0].geometry, yellowMaterial)
        this.yellowShader.scale.set(0.4, 0.4, 0.4)
        this.yellowShader.position.set(1, 1.75, -0.5)
        this.yellowShader.material.depthWrite = false

        this.scene.add(this.yellowLoli)
        this.scene.add(this.yellowShader)
        this.objectsToTest.push(this.yellowLoli.children[0])
      })
      gltfLoader.loadAsync(orangeGum).then((gltf) => {
        this.orangeGum1 = gltf.scene
        this.orangeGum1.position.set(-2, 3, -8)
        this.orangeGum1.rotation.x = Math.PI / 16
        this.orangeGum1.rotation.z = -Math.PI / 8

        this.orangeShader1 = new THREE.Mesh(this.orangeGum1.children[0].geometry, orangeMaterial)
        this.orangeShader1.scale.set(0.47, 0.47, 0.47)
        this.orangeShader1.position.set(-2, 3, -8)
        this.orangeShader1.material.depthWrite = false

        this.scene.add(this.orangeGum1)
        this.outScene.add(this.orangeShader1)
        this.objectsToTest.push(this.orangeGum1.children[0])
      })
      gltfLoader.loadAsync(blueGum).then((gltf) => {
        this.blueGum1 = gltf.scene
        this.blueGum1.position.set(0.75, -0.5, -8)
        this.blueGum1.rotation.x = Math.PI / 16
        this.blueGum1.rotation.z = Math.PI / 8

        this.blueGumShader1 = new THREE.Mesh(this.blueGum1.children[0].geometry, blueMaterial)
        this.blueGumShader1.scale.set(0.47, 0.47, 0.47)
        this.blueGumShader1.position.set(0.75, -0.5, -8)
        this.blueGumShader1.material.depthWrite = false

        this.scene.add(this.blueGum1)
        this.outScene.add(this.blueGumShader1)
        this.objectsToTest.push(this.blueGum1.children[0])
      })
      gltfLoader.loadAsync(greenGum).then((gltf) => {
        this.greenGum2 = gltf.scene
        this.greenGum2.position.set(3, -3, -8)
        this.greenGum2.rotation.x = Math.PI / 8
        this.greenGum2.rotation.z = -Math.PI / 16

        this.greenShader2 = new THREE.Mesh(this.greenGum2.children[0].geometry, greenMaterial)
        this.greenShader2.scale.set(0.47, 0.47, 0.47)
        this.greenShader2.position.set(3, -3, -8)
        this.greenShader2.material.depthWrite = false

        this.scene.add(this.greenGum2)
        this.outScene.add(this.greenShader2)
        this.objectsToTest.push(this.greenGum2.children[0])
      })

      // DESKTOP RES
    } else {
      gltfLoader.loadAsync(yellowLoli).then((gltf) => {
        this.yellowLoli = gltf.scene
        this.yellowLoli.scale.set(0.4, 0.4, 0.4)
        this.yellowLoli.position.set(1, 1.75, -0.5)

        this.yellowShader = new THREE.Mesh(this.yellowLoli.children[0].geometry, yellowMaterial)
        this.yellowShader.scale.set(0.4, 0.4, 0.4)
        this.yellowShader.position.set(1, 1.75, -0.5)
        this.yellowShader.material.depthWrite = false

        this.scene.add(this.yellowLoli)
        this.scene.add(this.yellowShader)
        this.objectsToTest.push(this.yellowLoli.children[0])
      })
      gltfLoader.loadAsync(redLoli).then((gltf) => {
        this.redLoli = gltf.scene
        this.redLoli.scale.set(0.4, 0.4, 0.4)
        this.redLoli.position.set(-0.75, -0.5, 1)

        this.redShader = new THREE.Mesh(this.redLoli.children[0].geometry, pinkMaterial)
        this.redShader.scale.set(0.4, 0.4, 0.4)
        this.redShader.position.set(-0.75, -0.5, 1)
        this.redShader.material.depthWrite = false

        this.scene.add(this.redLoli)
        this.outScene.add(this.redShader)
        this.objectsToTest.push(this.redLoli.children[0])
      })
      gltfLoader.loadAsync(tealLoli).then((gltf) => {
        this.tealLoli = gltf.scene
        this.tealLoli.scale.set(0.4, 0.4, 0.4)
        this.tealLoli.position.set(3.5, -0.5, 0)

        this.tealShader = new THREE.Mesh(this.tealLoli.children[0].geometry, blueMaterial)
        this.tealShader.scale.set(0.4, 0.4, 0.4)
        this.tealShader.position.set(3.5, -0.5, 0)
        this.tealShader.material.depthWrite = false

        this.scene.add(this.tealLoli)
        this.outScene.add(this.tealShader)
        this.objectsToTest.push(this.tealLoli.children[0])
      })
      gltfLoader.loadAsync(blueLoli).then((gltf) => {
        this.blueLoli = gltf.scene
        this.blueLoli.scale.set(0.4, 0.4, 0.4)
        this.blueLoli.position.set(-3, 1, 1)

        this.blueShader = new THREE.Mesh(this.blueLoli.children[0].geometry, blueMaterial)
        this.blueShader.scale.set(0.4, 0.4, 0.4)
        this.blueShader.position.set(-3, 1, 1)
        this.blueShader.material.depthWrite = false

        this.scene.add(this.blueLoli)
        this.outScene.add(this.blueShader)
        this.objectsToTest.push(this.blueLoli.children[0])
      })
      gltfLoader.loadAsync(blueGum).then((gltf) => {
        this.blueGum1 = gltf.scene
        this.blueGum1.position.set(0.75, -0.5, -8)
        this.blueGum1.rotation.x = Math.PI / 16
        this.blueGum1.rotation.z = Math.PI / 8

        this.blueGumShader1 = new THREE.Mesh(this.blueGum1.children[0].geometry, blueMaterial)
        this.blueGumShader1.scale.set(0.47, 0.47, 0.47)
        this.blueGumShader1.position.set(0.75, -0.5, -8)
        this.blueGumShader1.material.depthWrite = false

        this.scene.add(this.blueGum1)
        this.outScene.add(this.blueGumShader1)
        this.objectsToTest.push(this.blueGum1.children[0])
      })
      gltfLoader.loadAsync(purpleGum).then((gltf) => {
        this.purpleGum1 = gltf.scene
        this.purpleGum1.position.set(7, 3, -8)
        this.purpleGum1.rotation.x = Math.PI / 16
        this.purpleGum1.rotation.z = Math.PI / 8

        this.purpleShader1 = new THREE.Mesh(this.purpleGum1.children[0].geometry, purpleMaterial)
        this.purpleShader1.scale.set(0.47, 0.47, 0.47)
        this.purpleShader1.position.set(7, 3, -8)
        this.purpleShader1.material.depthWrite = false

        this.scene.add(this.purpleGum1)
        this.outScene.add(this.purpleShader1)
        this.objectsToTest.push(this.purpleGum1.children[0])
      })
      gltfLoader.loadAsync(orangeGum).then((gltf) => {
        this.orangeGum1 = gltf.scene
        this.orangeGum1.position.set(-2, 3, -8)
        this.orangeGum1.rotation.x = Math.PI / 16
        this.orangeGum1.rotation.z = -Math.PI / 8

        this.orangeShader1 = new THREE.Mesh(this.orangeGum1.children[0].geometry, orangeMaterial)
        this.orangeShader1.scale.set(0.47, 0.47, 0.47)
        this.orangeShader1.position.set(-2, 3, -8)
        this.orangeShader1.material.depthWrite = false

        this.scene.add(this.orangeGum1)
        this.outScene.add(this.orangeShader1)
        this.objectsToTest.push(this.orangeGum1.children[0])
      })
      gltfLoader.loadAsync(greenGum).then((gltf) => {
        this.greenGum1 = gltf.scene
        this.greenGum1.position.set(-7, -2, -8)
        this.greenGum1.rotation.x = Math.PI / 8
        this.greenGum1.rotation.z = -Math.PI / 16

        this.greenShader1 = new THREE.Mesh(this.greenGum1.children[0].geometry, greenMaterial)
        this.greenShader1.scale.set(0.47, 0.47, 0.47)
        this.greenShader1.position.set(-7, -2, -8)
        this.greenShader1.material.depthWrite = false

        this.scene.add(this.greenGum1)
        this.outScene.add(this.greenShader1)
        this.objectsToTest.push(this.greenGum1.children[0])
      })
      gltfLoader.loadAsync(greenGum).then((gltf) => {
        this.greenGum2 = gltf.scene
        this.greenGum2.position.set(3, -3, -8)
        this.greenGum2.rotation.x = Math.PI / 8
        this.greenGum2.rotation.z = -Math.PI / 16

        this.greenShader2 = new THREE.Mesh(this.greenGum2.children[0].geometry, greenMaterial)
        this.greenShader2.scale.set(0.47, 0.47, 0.47)
        this.greenShader2.position.set(3, -3, -8)
        this.greenShader2.material.depthWrite = false

        this.scene.add(this.greenGum2)
        this.outScene.add(this.greenShader2)
        this.objectsToTest.push(this.greenGum2.children[0])
      })
    }
  }

  // THREEJS + GSAP
  sceneSetup = () => {
    // SCENE
    this.scene = new THREE.Scene()
    this.outScene = new THREE.Scene()

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(35, this.state.width / this.state.height, 0.1, 100)
    this.camera.position.z = 8
    this.scene.add(this.camera)

    // LIGHTS
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    this.scene.add(this.ambientLight)
    
    // RENDERER 
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      stencil: false
    })

    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.autoClear = false
    this.renderer.setSize(this.state.width, this.state.height)
    this.mount.appendChild(this.renderer.domElement)

    // RAYCASTER
    this.raycastor = new THREE.Raycaster()

    // CLOCK
    this.clock = new THREE.Clock()
    this.previousTime = 0
  }

  // ANIMATION LOOP
  startAnimationLoop = () => {
    // GET DELTA TIME
    const elapsedTime = this.clock.getElapsedTime()
    const deltaTime = elapsedTime - this.previousTime
    this.previousTime = elapsedTime

    // PARALLAX EFFECT
    this.camera.position.x += (this.state.cursorX - this.camera.position.x) * deltaTime
    this.camera.position.y += (-this.state.cursorY - this.camera.position.y) * deltaTime

    // CANDY ROTATIONS
    this.yellowLoli && this.yellowLoli.rotation.set(0, this.yellowLoli.rotation.y += deltaTime * 0.4, Math.PI / 16)
    this.redLoli && this.redLoli.rotation.set(-Math.PI / 8, this.redLoli.rotation.y += deltaTime * 0.35, 0)
    this.tealLoli && this.tealLoli.rotation.set(-Math.PI / 16, this.tealLoli.rotation.y -= deltaTime * 0.3, Math.PI / 12)
    this.blueLoli && this.blueLoli.rotation.set(Math.PI / 4, this.blueLoli.rotation.y -= deltaTime * 0.3, 0)

    // GUMDROP ROTATIONS
    this.blueGum1 && this.blueGum1.rotation.set(this.blueGum1.rotation.x, this.blueGum1.rotation.y += deltaTime * 0.75, this.blueGum1.rotation.z)
    this.purpleGum1 && this.purpleGum1.rotation.set(this.purpleGum1.rotation.x, this.purpleGum1.rotation.y -= deltaTime * 0.66, this.purpleGum1.rotation.z)
    this.orangeGum1 && this.orangeGum1.rotation.set(this.orangeGum1.rotation.x, this.orangeGum1.rotation.y -= deltaTime * 0.9, this.orangeGum1.rotation.z)
    this.greenGum1 && this.greenGum1.rotation.set(this.greenGum1.rotation.x, this.greenGum1.rotation.y += deltaTime, this.greenGum1.rotation.z)
    this.greenGum2 && this.greenGum2.rotation.set(this.greenGum2.rotation.x, this.greenGum2.rotation.y += deltaTime, this.greenGum2.rotation.z)

    // UPDATE SHADERS 
    this.yellowShader && this.yellowShader.rotation.set(this.yellowLoli.rotation.x, this.yellowLoli.rotation.y, this.yellowLoli.rotation.z)
    this.redShader && this.redShader.rotation.set(this.redLoli.rotation.x, this.redLoli.rotation.y, this.redLoli.rotation.z)
    this.tealShader && this.tealShader.rotation.set(this.tealLoli.rotation.x, this.tealLoli.rotation.y, this.tealLoli.rotation.z)
    this.blueShader && this.blueShader.rotation.set(this.blueLoli.rotation.x, this.blueLoli.rotation.y, this.blueLoli.rotation.z)

    this.blueGumShader1 && this.blueGumShader1.rotation.set(this.blueGum1.rotation.x, this.blueGum1.rotation.y, this.blueGum1.rotation.z)
    this.purpleShader1 && this.purpleShader1.rotation.set(this.purpleGum1.rotation.x, this.purpleGum1.rotation.y, this.purpleGum1.rotation.z)
    this.orangeShader1 && this.orangeShader1.rotation.set(this.orangeGum1.rotation.x, this.orangeGum1.rotation.y, this.orangeGum1.rotation.z)
    this.greenShader1 && this.greenShader1.rotation.set(this.greenGum1.rotation.x, this.greenGum1.rotation.y, this.greenGum1.rotation.z)
    this.greenShader2 && this.greenShader2.rotation.set(this.greenGum2.rotation.x, this.greenGum2.rotation.y, this.greenGum2.rotation.z)

    // RENDER SCENE
    this.renderer.render(this.outScene, this.camera)
    this.renderer.render(this.scene, this.camera)

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop)
  };

  // HANDLE EVENT
  handleWindowResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // ASPECT RATIO 
    this.camera.aspect = this.state.width / this.state.height
    this.camera.updateProjectionMatrix()

    // RENDERER SIZE
    this.renderer.setSize(this.state.width, this.state.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  };

  // HANDLE EVENT
  handleScroll = () => {
    if (window.scrollY < 600) {
      this.setState({
        scrollTop: true
      })

    } else {
      this.setState({
        scrollTop: false
      })
    }
  }

  // HANDLE EVENT
  handleMouseMove = (e) => {
    this.setState({
      cursorX: e.clientX / this.state.width - 0.5,
      cursorY: e.clientY / this.state.height - 0.5
    })
  }

  // HANDLE EVENT
  handleClick = (e) => {
    // MOUSE OBJ FOR RAYCASTER
    const mouse = {
      x: e.clientX / this.state.width * 2 - 1,
      y: - (e.clientY / this.state.height) * 2 + 1
    }

    // CALCULATE INTERSECTIONS
    this.raycastor.setFromCamera(mouse, this.camera)
    const intersects = this.raycastor.intersectObjects(this.objectsToTest, false)

    // GET INTERSECTION OBJ
    let currentIntersect = null
    if (intersects.length) {
      currentIntersect = intersects[0].object
    }

    // SET ANIMATION TARGET
    let targetCandy = null, targetGum = null, shader = null
    if (currentIntersect) {
      switch (currentIntersect) {
        case this.yellowLoli.children[0]:
          targetCandy = this.yellowLoli
          shader = this.yellowShader
          break

        case this.redLoli.children[0]:
          targetCandy = this.redLoli
          shader = this.redShader
          break

        case this.tealLoli.children[0]:
          targetCandy = this.tealLoli
          shader = this.tealShader
          break

        case this.blueLoli.children[0]:
          targetCandy = this.blueLoli
          shader = this.blueShader
          break

        case this.blueGum1.children[0]:
          targetGum = this.blueGum1
          shader = this.blueGumShader1
          break

        case this.purpleGum1.children[0]:
          targetGum = this.purpleGum1
          shader = this.purpleShader1
          break

        case this.orangeGum1.children[0]:
          targetGum = this.orangeGum1
          shader = this.orangeShader1
          break

        case this.greenGum1.children[0]:
          targetGum = this.greenGum1
          shader = this.greenShader1
          break

        case this.greenGum2.children[0]:
          targetGum = this.greenGum2
          shader = this.greenShader2
          break
      }
    }

    // ANIMATE CANDY
    if (targetCandy) {
      const random = Math.floor(Math.random() * 2)
      const timeLine = window.gsap.timeline()
      timeLine
        .to(
          targetCandy.rotation,
          {
            duration: 6,
            ease: 'elastic',
            y: random === 0 ? '+=8' : '-=8'
          }
        ).to(
          targetCandy.scale,
          {
            duration: 5,
            ease: 'elastic',
            x: targetCandy.scale.x === 1 ? '0.4' : '1',
            y: targetCandy.scale.y === 1 ? '0.4' : '1',
            z: targetCandy.scale.z === 1 ? '0.4' : '1'
          }, '-=4'
        ).to(
          shader.scale,
          {
            duration: 5,
            ease: 'elastic',
            x: shader.scale.x === 1 ? '0.4' : '1',
            y: shader.scale.y === 1 ? '0.4' : '1',
            z: shader.scale.z === 1 ? '0.4' : '1'
          }, '-=5'
        )

    // ANIMATE GUMDROP
    } else if (targetGum) {
      const random = Math.floor(Math.random() * 2)
      const timeLine = window.gsap.timeline()
      timeLine
        .to(
          targetGum.scale,
          {
            duration: 4,
            ease: 'elastic',
            x: targetGum.scale.x === 1 ? '2' : '1',
            y: targetGum.scale.y === 1 ? '2' : '1',
            z: targetGum.scale.z === 1 ? '2' : '1'
          }
        ).to(
          shader.scale,
          {
            duration: 4,
            ease: 'elastic',
            x: shader.scale.x === 0.47 ? '0.95' : '0.47',
            y: shader.scale.y === 0.47 ? '0.95' : '0.47',
            z: shader.scale.z === 0.47 ? '0.95' : '0.47'
          }, '-=4'
        ).to(
          targetGum.rotation,
          {
            duration: 3,
            ease: 'elastic',
            x: random === 0 ? '+=6.28318' : '-=6.28318',
            z: random === 0 ? '+=3.14159' : '-=6.28318'
          }, '-=4'
        )
    }
  }

  render() {
    return (
      <div className='app' ref={this.appRef}>
        <div className='webgl' ref={ref => (this.mount = ref)} />

        <section id='home' className="section one">
          <Navbar />
          {this.state.toggleWelcome && <Welcome toggleWelcome={this.state.toggleWelcome} setWelcome={this.handleWelcomeChange} />}
        </section>

        <section id='staff' className="section two">
          <StaffInfo />
        </section>

        <section id='services' className="section three">
          {this.state.width > 550 ? <Accordion /> : <List selected={this.state.selected} setSelected={this.handleSelectedChange} />}
        </section>

        <section id='contact' className="section four">
          <Contact />
        </section>
      </div>
    )
  }
}

export default App;