/**
 * WebGL Module (Simplified)
 * 3D background using Three.js
 */

import { loadScript } from './utils.js';
import { CDN_URLS } from '../config/constants.js';

let scene, camera, renderer, geometries = [];

export async function initWebGL() {
  const loaded = await loadScript(CDN_URLS.THREE_JS);
  if (!loaded || typeof THREE === 'undefined') {
    console.warn('Three.js failed to load');
    return;
  }

  const container = document.querySelector('[data-component="webgl-background"]');
  if (!container) return;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create shapes
  createShapes();

  // Animation
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createShapes() {
  const shapes = [
    new THREE.IcosahedronGeometry(2, 0),
    new THREE.OctahedronGeometry(2),
    new THREE.TetrahedronGeometry(2),
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.TorusGeometry(1.5, 0.5, 16, 100),
  ];

  const material = new THREE.MeshPhongMaterial({
    color: 0x2563eb,
    wireframe: true,
  });

  shapes.forEach((geometry, i) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    geometries.push(mesh);
    scene.add(mesh);
  });

  // Lights
  const light1 = new THREE.PointLight(0x2563eb, 1, 100);
  light1.position.set(10, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x60a5fa, 0.5, 100);
  light2.position.set(-10, -10, -10);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
}

function animate() {
  requestAnimationFrame(animate);

  geometries.forEach(mesh => {
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
  });

  renderer.render(scene, camera);
}
