import { Component, OnInit } from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-smart-car',
  templateUrl: './smart-car.component.html',
  styleUrls: ['./smart-car.component.css']
})
export class SmartCarComponent implements OnInit {
  private scene:THREE.Scene;
  private camera:THREE.PerspectiveCamera;
  private renderer:THREE.WebGLRenderer;
  private controls:OrbitControls;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const self = this;

    self.threeInit();
  }

  private threeInit(): void {
    const self = this;

    //scene
    self.scene = new THREE.Scene();

    // camera
    let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.3, 0.3, 0.3);
    self.camera = camera;
    self.scene.add(self.camera);

    //light
    const hemiLight = new THREE.HemisphereLight();
    hemiLight.name  = 'hemisphere_light';
    hemiLight.position.set( 0, 10, 0 );

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.name  = 'direction_light';
    dirLight.position.set(0, 0, 20);

    const ambientLight = new THREE.AmbientLight(0xffffff,1.2);
    ambientLight.name = 'ambient_light';

    self.scene.add(hemiLight);
    self.camera.add(dirLight);
    self.camera.add(ambientLight);

    //renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.getElementById("three-view").appendChild(renderer.domElement);
    self.renderer = renderer;

    //controls
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change',function(){
      self.render();
    });
    self.controls = controls;

    self.loadGLTF();
  }

  private render(): void {
    const self = this;

    self.renderer.render(self.scene, self.camera);
  }

  private loadGLTF(): void {
    const self = this;

    const loader = new GLTFLoader();
    loader.load(
      'assets/smart-car.gltf',
      (gltf) => {
        console.log(gltf.scene)
        self.scene.add( gltf.scene );
        self.render();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.log('load -- smart-car.gltf have an error happened!',error);
      },
    );
  }
}
