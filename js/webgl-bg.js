/**
 * Three.js Interactive Dark WebGL Background Canvas
 * Creates a subtle, high-end floating particle field with fluid wave movement
 * reacting to mouse position for Mohammed Velom's portfolio.
 */

class WebGLBackground {
  constructor() {
    this.container = document.getElementById('webgl-canvas');
    if (!this.container || typeof THREE === 'undefined') return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    this.init();
  }

  init() {
    // Renderer Setup
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Camera initial position
    this.camera.position.z = 30;

    // Create Particle System
    this.createParticles();

    // Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // Animation Loop
    this.animate();
  }

  createParticles() {
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread particles across 3D space
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      scales[i] = Math.random() * 2.5 + 0.5;
      opacities[i] = Math.random() * 0.6 + 0.15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Shader Material for soft emerald/white floating nodes
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x00C896) },
        time: { value: 0 }
      },
      vertexShader: `
        attribute float scale;
        uniform float time;
        void main() {
          vec3 p = position;
          p.x += sin(time * 0.5 + position.y * 0.1) * 0.5;
          p.y += cos(time * 0.3 + position.x * 0.1) * 0.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = scale * (25.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * 0.45;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth lerp mouse coordinates
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Rotate particle system slowly
    if (this.particles) {
      this.particles.rotation.y += 0.0008;
      this.particles.rotation.x = this.mouseY * 0.15;
      this.particles.rotation.y += this.mouseX * 0.15;
      this.particles.material.uniforms.time.value += 0.015;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global Expose
window.WebGLBackground = WebGLBackground;
