/**
 * THE HILL SERENITY - LUXURY ARCHITECTURE & BOUTIQUE SANCTUARY
 * React 18 Application with GSAP ScrollTrigger, Lenis Smooth Scroll, Three.js 3D Model,
 * and Kling AI Background Video Integration.
 */

const { useState, useEffect, useRef } = React;

// ==========================================================================
// 1. DATA COLLECTIONS
// ==========================================================================

const PROCESS_STAGES = [
  {
    id: 1,
    tag: "Stage 01",
    title: "Excavation & River Stone Foundation",
    description: "Deep hillside excavation into the South Gola Range granite bedrock. Reinforced concrete footings anchored with native Chafi river stone retaining walls to ensure century-long seismic stability and natural hill drainage.",
    specs: ["Excavation Depth: 4.2m into bedrock", "Reinforced M30 Hill Grade Concrete", "Traditional Dry-Stack Retaining Walls", "Integrated Rainwater Sub-Drainage"],
    image: "assets/process-stage1-foundation.jpg"
  },
  {
    id: 2,
    tag: "Stage 02",
    title: "Structural Timber & 4 Alpine Gables",
    description: "Erection of the structural skeleton featuring 4 distinct peaked alpine dormer trusses. Heavy-timber deodar joints and shear wall engineering provide natural resistance to Kumaon mountain gusts and heavy monsoon downpours.",
    specs: ["4 Pitch-Steep Alpine Dormers", "Sustainably Sourced Mountain Deodar", "Earthquake-Resilient Steel Tie Brackets", "Multi-Tier Balcony Cantilevers"],
    image: "assets/process-stage2-construction.jpg"
  },
  {
    id: 3,
    tag: "Stage 03",
    title: "Cedar Interiors & Panoramic Glazing",
    description: "Handcrafted interior millwork using fragrant Himalayan cedar. Installation of acoustic double-glazed argon-filled sliding glass doors on all curved verandas, capturing 270-degree valley views with zero thermal loss.",
    specs: ["Argon-Filled Double Glazing", "Hand-Chiselled Chafi Stone Feature Walls", "Underfloor Hydronic Heating Pipes", "Custom Brass Fixtures & Hardware"],
    image: "assets/process-stage3-interiors.jpg"
  },
  {
    id: 4,
    tag: "Stage 04",
    title: "The Completed Sanctuary (Cream & Red Roof)",
    description: "The completed 3-storey architectural sanctuary: textured cream limestone stucco walls, rich alpine crimson terracotta roof tiles, second-floor open-air tea terrace, and warm golden glowing windows overlooking the river valley.",
    specs: ["Crimson Red Shingle Roofline", "Warm Limestone Cream Stucco", "Second-Level Valley Sun Terrace", "Drive-In Reception Portico Bay"],
    image: "assets/process-stage4-completed.jpg"
  }
];

const PROJECTS = [
  {
    id: "serenity",
    title: "The Hill Serenity Sanctuary",
    category: "Boutique Homestay",
    location: "Chafi, South Gola Range, Nainital",
    specs: "3 Storeys • 4 Gables • 10 Bespoke Suites",
    image: "assets/property-cream-redroof-masterpiece.jpg",
    description: "Our signature mountain retreat designed for spiritual seekers and nature immersion. Built with cream stucco, red alpine roofs, and private curved verandas 12 km from Kainchi Dham."
  },
  {
    id: "mukteshwar",
    title: "The Mukteshwar Ridge Chalet",
    category: "Private Residence",
    location: "Mukteshwar, Uttarakhand (7,500 ft)",
    specs: "4 Bedrooms • Stone Hearth • Nanda Devi View",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    description: "A cliffside luxury residence oriented toward the snow peaks of Nanda Devi and Trishul, combining slate gables with floor-to-ceiling glass pavilions."
  },
  {
    id: "sattal",
    title: "Sattal Lakeview Glass Villa",
    category: "Lakefront Villa",
    location: "Sattal Forest Reserve, Uttarakhand",
    specs: "Cantilevered Glass • 5 En-Suites • Private Deck",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    description: "Suspended amidst old-growth oak and pine forests, this modern villa hovers above the pristine waters of the seven interconnected lakes."
  },
  {
    id: "kumaon-estate",
    title: "Chafi Valley River Homestead",
    category: "Heritage Homestead",
    location: "Kalsa Riverbanks, Nainital",
    specs: "Handcrafted River Stone • Organic Orchard",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    description: "A masterclass in vernacular stone masonry, restoring indigenous Kumaoni homestead traditions with state-of-the-art geothermal climate control."
  }
];

// ==========================================================================
// 2. THREE.JS 3D ARCHITECTURAL MODEL COMPONENT
// ==========================================================================
function Interactive3DViewer() {
  const mountRef = useRef(null);
  const [lightMode, setLightMode] = useState("golden");

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a120e);
    scene.fog = new THREE.FogExp2(0x0a120e, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(14, 8, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Orbit Controls (Simulated with Mouse Drag for Zero Friction)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotY = 0.5;
    let rotX = 0.25;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rotY += deltaX * 0.007;
      rotX = Math.max(-0.2, Math.min(0.8, rotX + deltaY * 0.005));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      rotY += deltaX * 0.009;
      rotX = Math.max(-0.2, Math.min(0.8, rotX + deltaY * 0.007));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xf5efe3, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffb266, 1.4);
    sunLight.position.set(20, 25, 15);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Ground Plane (Mountain Grass & Soil)
    const groundGeo = new THREE.CylinderGeometry(18, 18, 0.4, 32);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x182b20, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Group for the 3D Building
    const buildingGroup = new THREE.Group();

    // 1. Main Cream Stucco Building Body (3 Storeys)
    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe3,
      roughness: 0.7,
      metalness: 0.05
    });

    const bodyGeo = new THREE.BoxGeometry(8.5, 4.8, 5.5);
    const bodyMesh = new THREE.Mesh(bodyGeo, creamMat);
    bodyMesh.position.y = 2.4;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    buildingGroup.add(bodyMesh);

    // 2. The 4 Alpine Gabled Roofs in Crimson Terracotta Red (#A83232)
    const roofRedMat = new THREE.MeshStandardMaterial({
      color: 0xa83232,
      roughness: 0.45,
      metalness: 0.1
    });

    const gableWidth = 8.5 / 4;
    for (let i = 0; i < 4; i++) {
      const gableGeo = new THREE.ConeGeometry(gableWidth * 0.75, 1.8, 4);
      const gable = new THREE.Mesh(gableGeo, roofRedMat);
      gable.position.set(-8.5 / 2 + gableWidth * (i + 0.5), 4.8 + 0.9, 0);
      gable.rotation.y = Math.PI / 4;
      gable.scale.set(1.1, 1, 1.4);
      gable.castShadow = true;
      buildingGroup.add(gable);
    }

    // 3. Ground Level Drive-In Portico (Left side entrance)
    const porticoMat = new THREE.MeshStandardMaterial({ color: 0x243b30, roughness: 0.6 });
    const porticoGeo = new THREE.BoxGeometry(4.5, 1.8, 3.2);
    const portico = new THREE.Mesh(porticoGeo, porticoMat);
    portico.position.set(-3.2, 0.9, 3.2);
    portico.castShadow = true;
    buildingGroup.add(portico);

    // Second-Floor Sun Terrace Deck (On top of Portico) with Umbrella
    const deckMat = new THREE.MeshStandardMaterial({ color: 0xdcd4c4, roughness: 0.5 });
    const deckGeo = new THREE.BoxGeometry(4.5, 0.15, 3.2);
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(-3.2, 1.85, 3.2);
    buildingGroup.add(deck);

    // Umbrella
    const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(-3.2, 2.45, 3.2);
    buildingGroup.add(pole);

    const canopyGeo = new THREE.ConeGeometry(0.9, 0.4, 8);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xa83232 });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(-3.2, 3.0, 3.2);
    buildingGroup.add(canopy);

    // 4. Glowing Windows & Semicircular Balconies
    const glowWindowMat = new THREE.MeshStandardMaterial({
      color: 0xffa034,
      emissive: 0xff8c1a,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    for (let f = 1; f <= 2; f++) {
      for (let b = 0; b < 3; b++) {
        // Window
        const win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.3), glowWindowMat);
        win.position.set(-2 + b * 2.2, f * 1.5 + 0.8, 2.76);
        buildingGroup.add(win);

        // Curved Balcony
        const balGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.45, 16, 1, false, 0, Math.PI);
        const balMat = new THREE.MeshStandardMaterial({ color: 0x1f2421, metalness: 0.8 });
        const bal = new THREE.Mesh(balGeo, balMat);
        bal.position.set(-2 + b * 2.2, f * 1.5 + 0.2, 2.76);
        bal.rotation.y = Math.PI;
        buildingGroup.add(bal);
      }
    }

    // 5. Pine Trees around the Property
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817 });
    const pineLeavesMat = new THREE.MeshStandardMaterial({ color: 0x1c3a2b, roughness: 0.8 });

    const treePositions = [
      [-6, 0, -4], [-7, 0, 1], [-5.5, 0, -6],
      [6, 0, -3], [7.5, 0, 2], [6.5, 0, -6]
    ];

    treePositions.forEach(([tx, ty, tz]) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.2), treeTrunkMat);
      trunk.position.y = 0.6;
      tree.add(trunk);

      for (let i = 0; i < 3; i++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(1.1 - i * 0.25, 1.4, 6), pineLeavesMat);
        cone.position.y = 1.3 + i * 0.8;
        cone.castShadow = true;
        tree.add(cone);
      }
      tree.position.set(tx, ty, tz);
      buildingGroup.add(tree);
    });

    scene.add(buildingGroup);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (!isDragging) {
        rotY += 0.002;
      }

      // Camera position from spherical coordinates
      const radius = 17;
      camera.position.x = radius * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = Math.max(2, radius * Math.sin(rotX) + 3);
      camera.position.z = radius * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 2.2, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative spline-canvas-wrap" ref={mountRef}>
      <div className="canvas-hint-pill">
        <span>⟳ Drag to Orbit 3D Architecture • Cream Walls & Red Alpine Roof</span>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. MAIN REACT APP COMPONENT
// ==========================================================================
function ArchitectureApp() {
  const [activeStage, setActiveStage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const videoRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const noiseNodeRef = useRef(null);

  // Initialize Lenis Smooth Scroll and GSAP ScrollTrigger
  useEffect(() => {
    // Lenis setup
    let lenis;
    if (typeof Lenis !== "undefined") {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // GSAP ScrollTrigger Animations
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Scroll Progress Indicator
      gsap.to(".scroll-progress-line", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3
        }
      });

      // Hero Title Staggered Reveal
      gsap.from(".hero-anim-title", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.2
      });

      // Vision Image Zoom on Scroll
      gsap.to(".vision-zoom-img", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: "#vision",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Parallax Cards
      gsap.utils.toArray(".parallax-card").forEach((card) => {
        gsap.to(card, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }

    return () => {
      if (lenis) lenis.destroy();
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Ambient Video Toggle
  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Mountain Breeze Audio Synthesizer (Web Audio API)
  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.038;
          b6 = white * 0.115926;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        noiseNodeRef.current = source;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 1.5);
        gainNodeRef.current = gain;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start();
        setIsAudioPlaying(true);
      } catch (e) {
        console.warn("Audio Context blocked", e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          if (noiseNodeRef.current) noiseNodeRef.current.stop();
          if (audioCtxRef.current) audioCtxRef.current.close();
          setIsAudioPlaying(false);
        }, 800);
      }
    }
  };

  const handleEnquiry = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const service = form.service.value;
    const message = form.message.value;

    const waText = `*Architectural Commission Enquiry - The Hill Serenity*\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• Interest: ${service}\n• Message: ${message || "N/A"}`;
    const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waText)}`;

    setFormSubmitted(true);
    window.open(waUrl, "_blank");
  };

  return (
    <div className="relative min-h-screen text-cream">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-line"></div>

      {/* FIXED KLING-AI BACKGROUND VIDEO (CREAM WALLS & RED ROOF PROPERTY) */}
      <div className="cinema-bg-container">
        <video
          ref={videoRef}
          className="cinema-bg-video"
          autoPlay
          muted
          loop
          playsInline
          poster="assets/property-cream-redroof-masterpiece.jpg"
        >
          <source src="assets/kling-ai-property-cream-redroof.mp4" type="video/mp4" />
          <source src="assets/mountain-greenery-loop.mp4" type="video/mp4" />
        </video>
        <div className="cinema-bg-overlay"></div>
      </div>

      {/* FLOATING AMBIENT CONTROLLER */}
      <aside className="ambient-pill-ctrl">
        <button
          onClick={toggleVideo}
          className="flex items-center gap-1.5 text-xs text-gold hover:text-white transition"
          title="Toggle Kling AI Cinematic Video Motion"
        >
          <span>{isVideoPlaying ? "⏸" : "▶"}</span>
          <span>{isVideoPlaying ? "Motion" : "Paused"}</span>
        </button>
        <div className="w-px h-3 bg-white/20"></div>
        <button
          onClick={toggleAudio}
          className="flex items-center gap-1.5 text-xs text-gold hover:text-white transition"
          title="Toggle Real-Time Himalayan Mountain Breeze Sound"
        >
          <span>{isAudioPlaying ? "🔊" : "🔇"}</span>
          <span>{isAudioPlaying ? "Pine Audio" : "Audio Off"}</span>
        </button>
      </aside>

      {/* LUXURY NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 bg-obsidian/75 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-gold flex items-center justify-center font-serif text-lg font-bold text-gold">
              HS
            </div>
            <div>
              <span className="font-serif text-lg tracking-widest text-cream uppercase block leading-none">
                The Hill Serenity
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark block mt-1">
                Architecture & Sanctuary • Chafi
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em]">
            <a href="#vision" className="hover:text-gold transition">Our Vision</a>
            <a href="#process" className="hover:text-gold transition">The Process</a>
            <a href="#model3d" className="hover:text-gold transition">3D Model</a>
            <a href="#projects" className="hover:text-gold transition">Projects</a>
            <a href="#about" className="hover:text-gold transition">About</a>
            <a href="#contact" className="hover:text-gold transition">Contact</a>
          </nav>

          <a href="#contact" className="btn-gold-glow text-xs py-2.5 px-5">
            Commission Sanctuary
          </a>
        </div>
      </header>

      {/* ==========================================================================
          SECTION 1: HERO
          ========================================================================== */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow-line mb-6 hero-anim-title">
            Bespoke Himalayan Architecture • Chafi, Nainital
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight mb-8 hero-anim-title">
            Where Stone Breathes <br />
            <span className="italic text-gold">& Cedar Sings.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-cream/80 font-light leading-relaxed mb-10 hero-anim-title">
            An award-winning 3-storey alpine sanctuary crafted with native river stone, warm cream limestone stucco, and four steep crimson red gables overlooking the South Gola Range near Kainchi Dham.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 hero-anim-title">
            <a href="#process" className="btn-gold-glow">
              Explore The Construction Process ↓
            </a>
            <a href="#model3d" className="btn-outline-gold">
              Inspect 3D Digital Model ⛶
            </a>
          </div>
        </div>

        {/* Hero Bottom Telemetry */}
        <div className="absolute bottom-6 left-0 w-full px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-cream/60 border-t border-border/30 pt-4">
            <div>Elevation: <span className="text-gold">5,400 FT</span></div>
            <div>Coordinates: <span className="text-gold">29.3735° N, 79.5804° E</span></div>
            <div>Proximity: <span className="text-gold">12 KM to Kainchi Dham</span></div>
            <div>Architecture: <span className="text-gold">Cream Stucco • Red Roof</span></div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 2: OUR VISION
          ========================================================================== */}
      <section id="vision" className="relative py-32 px-6 z-10 bg-pine-dark/85 backdrop-blur-md border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="eyebrow-line mb-4">Architectural Philosophy</div>
              <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-8">
                Architecture as a Sacred Dialogue with the Ridge.
              </h2>
              <p className="text-cream/80 leading-relaxed text-base mb-6">
                True mountain luxury does not impose itself upon the landscape. It listens. In the valley of Chafi, where the Kalsa river carves through deodar-forested slopes, our architectural practice builds living sanctuaries that belong to the earth.
              </p>
              <p className="text-cream/80 leading-relaxed text-base mb-10">
                Every stone is hand-hewn by generational Kumaoni masons. The signature 4-dormer gabled roofline naturally sheds heavy Himalayan rains and winter flurries, while generous floor-to-ceiling double glazing invites the morning mist and golden mountain twilight inside.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/40">
                <div>
                  <div className="font-serif text-3xl text-gold">100%</div>
                  <div className="text-[11px] uppercase tracking-wider text-cream/70 mt-1">Native River Stone</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-gold">4 Gables</div>
                  <div className="text-[11px] uppercase tracking-wider text-cream/70 mt-1">Crimson Red Roof</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-gold">Passive</div>
                  <div className="text-[11px] uppercase tracking-wider text-cream/70 mt-1">Solar Thermal Design</div>
                </div>
              </div>
            </div>

            {/* Cinematic Photography Frame */}
            <div className="relative rounded-sm overflow-hidden border border-border shadow-2xl">
              <img
                src="assets/property-cream-redroof-masterpiece.jpg"
                alt="The Hill Serenity in Cream Colour and Red Roof at Golden Hour"
                className="w-full h-[520px] object-cover vision-zoom-img"
              />
              <div className="absolute bottom-4 left-4 bg-obsidian/85 backdrop-blur-md px-4 py-2 border border-border text-xs uppercase tracking-widest text-gold">
                The Hill Serenity • Chafi Valley Elevation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 3: OUR PROCESS (BRICK BY BRICK, FLOOR BY FLOOR)
          Inspired by MATTXWEBB viral construction evolution
          ========================================================================== */}
      <section id="process" className="relative py-32 px-6 z-10 bg-obsidian/95">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="eyebrow-line mb-4">Evolution of a Masterpiece</div>
            <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-4">
              Brick by Brick. Floor by Floor.
            </h2>
            <p className="text-cream/75 text-base">
              Follow the construction metamorphosis from mountain earthwork to structural timber gables, handcrafted cedar interiors, and the completed glowing sanctuary.
            </p>

            {/* Interactive Stage Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {PROCESS_STAGES.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(i)}
                  className={`stage-nav-pill ${activeStage === i ? "active" : ""}`}
                >
                  {st.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Display Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center glass-panel p-8 md:p-12 rounded-sm">
            <div className="lg:col-span-7">
              <div className="process-stage-visual">
                <img
                  src={PROCESS_STAGES[activeStage].image}
                  alt={PROCESS_STAGES[activeStage].title}
                  className="process-stage-img"
                />
                <div className="absolute top-4 left-4 bg-obsidian/90 backdrop-blur-md px-3.5 py-1.5 border border-border text-xs uppercase tracking-widest text-gold font-bold">
                  {PROCESS_STAGES[activeStage].tag}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-bold block mb-2">
                Construction Milestone {activeStage + 1} of 4
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-cream mb-4">
                {PROCESS_STAGES[activeStage].title}
              </h3>
              <p className="text-cream/80 leading-relaxed text-sm mb-6">
                {PROCESS_STAGES[activeStage].description}
              </p>

              <h4 className="text-xs uppercase tracking-wider text-gold mb-3 font-semibold">
                Key Engineering Deliverables
              </h4>
              <ul className="space-y-2 mb-8">
                {PROCESS_STAGES[activeStage].specs.map((spec, sIdx) => (
                  <li key={sIdx} className="text-xs text-cream/75 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : 3))}
                  className="btn-outline-gold text-xs py-2 px-4"
                >
                  ← Previous Stage
                </button>
                <button
                  onClick={() => setActiveStage((prev) => (prev < 3 ? prev + 1 : 0))}
                  className="btn-gold-glow text-xs py-2 px-4"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 4: 3D DIGITAL TWIN & SPLINE MODEL
          ========================================================================== */}
      <section id="model3d" className="relative py-32 px-6 z-10 bg-pine-dark/90 backdrop-blur-md border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="eyebrow-line mb-4">Real-Time 3D Digital Twin</div>
            <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-4">
              Explore the 3D Architecture
            </h2>
            <p className="text-cream/75 text-base">
              Interact with the full three-dimensional spatial blueprint. Inspect the 4 crimson red roof gables, cream stone facade, curved veranda suites, and second-level sun terrace in 360 degrees.
            </p>
          </div>

          <Interactive3DViewer />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="glass-panel-subtle p-4 rounded text-center">
              <span className="block text-gold font-serif text-xl">4 Alpine Gables</span>
              <span className="text-[11px] uppercase tracking-wider text-cream/60">Terracotta Red Pitch</span>
            </div>
            <div className="glass-panel-subtle p-4 rounded text-center">
              <span className="block text-gold font-serif text-xl">Sun Terrace</span>
              <span className="text-[11px] uppercase tracking-wider text-cream/60">Outdoor Cafe Deck</span>
            </div>
            <div className="glass-panel-subtle p-4 rounded text-center">
              <span className="block text-gold font-serif text-xl">Covered Portico</span>
              <span className="text-[11px] uppercase tracking-wider text-cream/60">Protected Ground Parking</span>
            </div>
            <div className="glass-panel-subtle p-4 rounded text-center">
              <span className="block text-gold font-serif text-xl">Curved Balconies</span>
              <span className="text-[11px] uppercase tracking-wider text-cream/60">Panoramic Valley Framing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 5: PROJECTS GALLERY
          ========================================================================== */}
      <section id="projects" className="relative py-32 px-6 z-10 bg-obsidian/95 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="eyebrow-line mb-4">Selected Portfolio</div>
              <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
                Himalayan Masterpieces
              </h2>
            </div>
            <p className="text-cream/70 max-w-md text-sm">
              Each residential commission represents a custom synthesis of indigenous hill geology, sustainable timber engineering, and quiet five-star luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-sm overflow-hidden border border-border/50 bg-pine-dark/60 cursor-pointer transition-all duration-500 hover:border-gold hover:shadow-2xl"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="h-[360px] overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-cream/50">
                      {proj.specs}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-cream group-hover:text-gold transition">
                    {proj.title}
                  </h3>
                  <p className="text-cream/70 text-sm mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-bold">
                    <span>Inspect Case Study</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 6: ABOUT US
          ========================================================================== */}
      <section id="about" className="relative py-32 px-6 z-10 bg-pine-dark/85 backdrop-blur-md border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="eyebrow-line mb-4">Pedigree & Heritage</div>
              <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-8">
                Master Builders of the Kumaon Hills.
              </h2>
              <p className="text-cream/80 leading-relaxed text-base mb-6">
                Founded with a deep reverence for Uttarakhand's topography, our design-build studio fuses classical vernacular traditions with contemporary architectural precision. We build with stone, wood, slate, and glass to create heirloom residences that endure for generations.
              </p>
              <p className="text-cream/80 leading-relaxed text-base mb-8">
                Operating close to Kainchi Dham, we honor Maharaj-ji's teaching of harmony with nature. We maintain a zero single-use plastic standard, source over 80% of building materials within 40 km, and employ local village artisans.
              </p>

              <div className="flex gap-4">
                <a href="#contact" className="btn-gold-glow">Commission a Project</a>
                <a href="https://maps.app.goo.gl/3wiknEp5PKnJ9Vbb9" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                  Locate on Google Maps ↗
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded border border-border overflow-hidden h-72">
                <img
                  src="assets/architecture-isometric-3d.jpg"
                  alt="3D Architectural Model"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded border border-border overflow-hidden h-72 mt-8">
                <img
                  src="assets/architecture-elevation-front.jpg"
                  alt="Front Elevation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 7: CONTACT & COMMISSION FORM
          ========================================================================== */}
      <section id="contact" className="relative py-32 px-6 z-10 bg-obsidian">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="eyebrow-line mb-4">Start Your Commission</div>
            <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-4">
              Begin Your Architectural Journey
            </h2>
            <p className="text-cream/70 text-base max-w-xl mx-auto">
              Whether you are seeking early founding guest reservations or commissioning a private mountain residence, our studio is at your service.
            </p>
          </div>

          <div className="glass-panel p-8 md:p-14 rounded-sm border border-border">
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-serif text-3xl text-cream mb-2">Enquiry Sent with Honor</h3>
                <p className="text-cream/80 text-sm max-w-md mx-auto mb-6">
                  Your architectural consultation request has been forwarded directly to our principal architects. Opening WhatsApp to connect with our concierge...
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-outline-gold text-xs"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Vikramaditya Sharma"
                    className="w-full bg-obsidian/80 border border-border/70 rounded-sm px-4 py-3 text-cream text-sm focus:border-gold outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-obsidian/80 border border-border/70 rounded-sm px-4 py-3 text-cream text-sm focus:border-gold outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full bg-obsidian/80 border border-border/70 rounded-sm px-4 py-3 text-cream text-sm focus:border-gold outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                    Interest / Service *
                  </label>
                  <select
                    name="service"
                    className="w-full bg-obsidian/80 border border-border/70 rounded-sm px-4 py-3 text-cream text-sm focus:border-gold outline-none transition"
                  >
                    <option value="Boutique Stay Reservation at The Hill Serenity">
                      Boutique Stay Reservation at The Hill Serenity
                    </option>
                    <option value="Bespoke Architectural Mountain Commission">
                      Bespoke Architectural Mountain Commission
                    </option>
                    <option value="Kainchi Dham Pilgrimage VIP Package">
                      Kainchi Dham Pilgrimage VIP Package
                    </option>
                    <option value="Property Investor / Buyout Enquiry">
                      Property Investor / Buyout Enquiry
                    </option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                    Vision & Project Notes
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your proposed timeline, preferred suite, or mountain residence vision..."
                    className="w-full bg-obsidian/80 border border-border/70 rounded-sm px-4 py-3 text-cream text-sm focus:border-gold outline-none transition"
                  ></textarea>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
                  <button type="submit" className="btn-gold-glow w-full md:w-auto">
                    Submit Enquiry & Connect on WhatsApp 💬
                  </button>
                  <span className="text-xs text-cream/50">
                    🔒 Strict Confidentiality • Direct Principal Architect Response
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/30 bg-obsidian py-12 px-6 relative z-10 text-xs text-cream/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-widest text-cream">THE HILL SERENITY</span>
            <span>•</span>
            <span>South Gola Range, Chafi, Nainital, Uttarakhand 263136</span>
          </div>
          <div>
            © {new Date().getFullYear()} The Hill Serenity Architecture. Crafted with React, GSAP & Kling AI.
          </div>
        </div>
      </footer>

      {/* CASE STUDY MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel max-w-3xl w-full p-8 md:p-12 rounded relative border border-gold"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-xl text-cream/70 hover:text-white"
            >
              ✕
            </button>
            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
              {selectedProject.category} • {selectedProject.location}
            </span>
            <h3 className="font-serif text-3xl text-cream mb-4">{selectedProject.title}</h3>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-80 object-cover rounded mb-6 border border-border"
            />
            <p className="text-cream/80 text-sm leading-relaxed mb-6">{selectedProject.description}</p>
            <div className="flex gap-4">
              <a href="#contact" onClick={() => setSelectedProject(null)} className="btn-gold-glow text-xs">
                Inquire on this Architecture
              </a>
              <button onClick={() => setSelectedProject(null)} className="btn-outline-gold text-xs">
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mount React Root
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<ArchitectureApp />);
}
