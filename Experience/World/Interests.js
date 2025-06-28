import * as THREE from 'three'
import Experience from '../Experience.js'
import { EventEmitter } from 'events'
import gsap from 'gsap'

export default class Interests {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.debug = this.experience.debug
    this.device = this.sizes.device
    this.scrolling = this.experience.scrolling

    this.sizes.on('switchdevice', (device) => {
      this.device = device
      console.log(device);
    })

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('interest1')
    }

    this.obj = {
      x: 4,
      y: 1.2,
      z: 0.5
    }

    // Setup
    this.points = []
    this.raycaster = new THREE.Raycaster()
    this.setInterests()
    this.showInfos()
  }

  setInterests() {
    this.points = [
      {
        position: new THREE.Vector3(-11.6, -0.2, 0.6),
        element: document.querySelector('.disp1')
      },
      {
        position: new THREE.Vector3(-6.45, -0.5, 0.8),
        element: document.querySelector('.mcba')  //SSG-2-1
      },
      {
        position: new THREE.Vector3(-5.2, 0.25, 0.8),
        element: document.querySelector('.mudac')  //SSG-4-1
      },
      {
        position: new THREE.Vector3(-3.4, -0.2, 0.8),
        element: document.querySelector('.elysee')  //SSG-7-1
      },
      {
        position: new THREE.Vector3(-2.5, 0.5, 0.8),
        element: document.querySelector('.arcadia')  //ACC-2-1
      },
      {
        position: new THREE.Vector3(0.085, 0.5, 0.8),
        element: document.querySelector('.nabi')    //ACC-2-2
      },
      {
        position: new THREE.Vector3(0.25, 1.6, 0.8),
        element: document.querySelector('.lumen')  //ACC-1-DSG-2
      },
      {
        position: new THREE.Vector3(0.25, -0.2, 0.8),
        element: document.querySelector('.a1s5d4')    //ACC-1-SSG-5-DSG-4
      },
      {
        position: new THREE.Vector3(2.7, 0.5, 0.8),
        element: document.querySelector('.acc-2-3')   //ACC-2-3
      },
      {
        position: new THREE.Vector3(3.8, -0.2, 0.8),
        element: document.querySelector('.point1')  //SSG-7-2
      },    
      {
        position: new THREE.Vector3(5.8, 0.2, 0.8),
        element: document.querySelector('.ssg-4-2')  //SSG-4-2
      },
      {
        position: new THREE.Vector3(7, -0.5, 0.8),
        element: document.querySelector('.ssg-2-2')  //SSG-2-2
      },
      {
        position: new THREE.Vector3(12.15, -0.2, 0.6),
        element: document.querySelector('.disp2')
      },
    ]

    // Debug
    if(this.debug.active) {
        this.debugFolder
        .add(this.points[2].position, 'x')
        .name('x2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[2].position, 'y')
        .name('y2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[2].position, 'z')
        .name('z2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'x')
        .name('x1')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'y')
        .name('y1')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'z')
        .name('z1')
        .min(-10)
        .max(10)
        .step(0.01)
    }
  }

  showInfos() {
    const disp1 = document.querySelector('.disp1')
    const mcba = document.querySelector('.mcba')
    const mudac = document.querySelector('.mudac')
    const elysee = document.querySelector('.elysee')
    const arcadia = document.querySelector('.arcadia')
    const nabi = document.querySelector('.nabi')
    const lumen = document.querySelector('.lumen')
    const a1s5d4 = document.querySelector('.a1s5d4')
    const acc2_3 = document.querySelector('.acc-2-3')
    const point1 = document.querySelector('.point1')
    const ssg4_2 = document.querySelector('.ssg-4-2')
    const ssg2_2 = document.querySelector('.ssg-2-2')
    const disp2 = document.querySelector('.disp2')

    const closeIcn = document.querySelector('.close')

    const infoPanel = document.querySelector('.info-panel')

    const infoPanelTypes = document.querySelector('.info-panel-types');

    function renderTypes(types) {
      return types.map(type => `
        <div class="info-type-block">
          <img class="info-type-image" src="${type.image}" alt="">
          <table class="info-type-table">
            <tr><th>Tên</th><td>${type.name}</td></tr>
            <tr><th>Ký hiệu</th><td>${type.symbol}</td></tr>
            <tr><th>Số lượng</th><td>${type.quantity}</td></tr>
            <tr><th>Vị trí</th><td>${type.position}</td></tr>
          </table>
        </div>
      `).join('');
    }

    let infoPanelRightStyle = '0'

    const infos = [
      {
        types: [
          {
            image: '/images/VWDT-5000.jpg',
            name: 'Cảm biến chuyển bị',
            symbol: 'DISP',
            quantity: 1,
            position: 'Khe hở giữa mố và dầm đầu cầu'
          }
        ]
      },
      {
        types: [
          {
            image: '/images/VWS-2000.jpg',
            name: 'Cảm biến quan trắc biến dạng tĩnh trong vật liệu thép và bê tông',
            symbol: 'SSG',
            quantity: 2,
            position: 'Tầng 1'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/VWS-2000.jpg',
            name: 'Cảm biến quan trắc biến dạng tĩnh trong vật liệu thép và bê tông',
            symbol: 'SSG',
            quantity: 4,
            position: 'Tầng 1'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/VWS-2000.jpg',
            name: 'Cảm biến quan trắc biến dạng tĩnh trong vật liệu thép và bê tông',
            symbol: 'SSG',
            quantity: 7,
            position: 'Tầng 1'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/TE-4030.jpg',
            name: 'Thiết bị đo dao động dây cáp treo',
            symbol: 'ACC',
            quantity: 2,
            position: 'Tầng 1'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/TE-4030.jpg',
            name: 'Thiết bị đo dao động dây cáp treo',
            symbol: 'ACC',
            quantity: 2,
            position: 'Tầng 1'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/TE-4030.jpg',
            name: 'Thiết bị đo dao động vòm cầu',
            symbol: 'ACC',
            quantity: 1,
            position: 'Tầng 1'
          },
          {
            image: '/images/ST-350.jpg',
            name: 'Cảm biến ứng suất động',
            symbol: 'DSG',
            quantity: 2,
            position: 'Tầng 2'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/VWS-2000.jpg',
            name: 'Cảm biến quan trắc biến dạng tĩnh trong vật liệu thép và bê tông',
            symbol: 'SSG',
            quantity: 5,
            position: 'Tầng 1'
          },
          {
            image: '/images/TE-4030.jpg',
            name: 'Thiết bị đo dao động dầm chủ',
            symbol: 'ACC',
            quantity: 1,
            position: 'Tầng 1'
          },
          {
            image: '/images/ST-350.jpg',
            name: 'Cảm biến ứng suất động',
            symbol: 'DSG',
            quantity: 4,
            position: 'Tầng 2'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/TE-4030.jpg',
            name: 'Thiết bị đo dao động dây cáp treo',
            symbol: 'ACC',
            quantity: 2,
            position: 'Tầng 1'
          }
        ],
      },
      {
        types: [
          {
            image: '/images/VWS-2000.jpg',
            name: 'Cảm biến quan trắc biến dạng tĩnh trong vật liệu thép và bê tông',
            symbol: 'SSG',
            quantity: 7,
            position: 'Tầng 1'
          },
        ],
      },
      {
        types: [
          {
            image: '/images/VWS-2000.jpg',
            name: 'Cảm biến quan trắc biến dạng tĩnh trong vật liệu thép và bê tông',
            symbol: 'SSG',
            quantity: 4,
            position: 'Tầng 1'
          },
        ],
      },
      {
        types: [
          {
            image: '/images/VWS-2000.jpg',
            name: 'Cảm biến quan trắc biến dạng tĩnh trong vật liệu thép và bê tông',
            symbol: 'SSG',
            quantity: 2,
            position: 'Tầng 1'
          },
        ],
      },
      {
        types: [
          {
            image: '/images/VWDT-5000.jpg',
            name: 'Cảm biến chuyển bị',
            symbol: 'DISP',
            quantity: 1,
            position: 'Khe hở giữa mố và dầm cuối cầu'
          }
        ],
      },
    ]

    if (this.device === 'desktop') {
      infoPanelRightStyle  = '-33%'
    } else {
      infoPanelRightStyle  = '-100%'
    }

    disp1.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[0].types);
    });

    mcba.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[1].types);
    });

    mudac.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[2].types);
    });

    elysee.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[3].types);
    });

    arcadia.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[4].types);
    });

    nabi.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[5].types);
    });

    lumen.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[6].types);
    });

    a1s5d4.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[7].types);
    });

    acc2_3.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[8].types);
    });

    point1.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[9].types);
    });

    ssg4_2.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[10].types);
    });

    ssg2_2.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[11].types);
    });

    disp2.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelTypes.innerHTML = renderTypes(infos[12].types);
    });

    closeIcn.addEventListener('click', () => {
      infoPanel.style.right = infoPanelRightStyle
    });
  }

  resize() {}

  update() {
    for(const point of this.points) {
      const screenPosition = point.position.clone()
      screenPosition.project(this.camera.orthographicCamera)

      point.element.classList.add('visible')

      // this.raycaster.setFromCamera(screenPosition, this.camera.orthographicCamera)
      // const intersects = this.raycaster.intersectObjects(this.scene.children, true)

      // if(intersects.length === 0) {
      //   point.element.classList.add('visible')
      // } else {
      //   const intersectionDistance = intersects[0].distance
      //   const pointDistance = point.position.distanceTo(this.camera.orthographicCamera.position)

      //   if(intersectionDistance < pointDistance) {
      //     point.element.classList.remove('visible')
      //   } else {
      //     point.element.classList.add('visible')
      //   }
      // }

      const translateX = screenPosition.x * this.sizes.width * 0.5
      const translateY = - screenPosition.y * this.sizes.height * 0.5
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }
  }
}
