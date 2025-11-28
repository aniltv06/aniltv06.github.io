/**
 * WebGL Module (Optimized)
 * 3D background using Three.js with aggressive performance optimizations
 */

import { loadScript } from './utils.js';
import { CDN_URLS } from '../config/constants.js';

let scene, camera, renderer, geometries = [];
let animationId = null;
let lastFrameTime = 0;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
let isVisible = true;

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

  // Renderer - Optimized settings
  renderer = new THREE.WebGLRenderer({
    antialias: false,  // Disabled for performance
    alpha: true,
    powerPreference: 'low-power'  // Hint to use integrated GPU
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);  // Force 1:1 pixel ratio (no HiDPI scaling)
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create shapes
  createShapes();

  // Setup visibility detection
  setupVisibilityDetection(container);

  // Animation
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/**
 * Detect when WebGL background is visible/hidden
 */
function setupVisibilityDetection(container) {
  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible && !animationId) {
      animate();
    }
  });

  // Pause when scrolled out of view (using Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) {
        animate();
      }
    });
  }, { threshold: 0 });

  observer.observe(container);
}

function createShapes() {
  const shapes = [
    new THREE.IcosahedronGeometry(2, 0),
    new THREE.OctahedronGeometry(2),
    new THREE.TetrahedronGeometry(2),
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.TorusGeometry(1.5, 0.5, 16, 100),
  ];

  // Use MeshBasicMaterial - no lighting calculations needed
  const material = new THREE.MeshBasicMaterial({
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

  // Note: Lights removed - not needed with MeshBasicMaterial
}

function animate(currentTime = 0) {
  // Exit if not visible (tab hidden or scrolled out of view)
  if (!isVisible) {
    animationId = null;
    return;
  }

  animationId = requestAnimationFrame(animate);

  // Throttle to 30 FPS
  const elapsed = currentTime - lastFrameTime;
  if (elapsed < FRAME_INTERVAL) {
    return;
  }
  lastFrameTime = currentTime - (elapsed % FRAME_INTERVAL);

  // Animate shapes
  geometries.forEach(mesh => {
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
  });

  renderer.render(scene, camera);
}
