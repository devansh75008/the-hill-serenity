/**
 * THE HILL SERENITY - LUXURY BOUTIQUE SANCTUARY
 * Chafi, Nainital District, Uttarakhand, India
 * Frontend Interaction, Ambient Background Video Engine, 3D Architecture Switcher,
 * Booking Engine Hooks, Gallery Lightbox, and Multi-language Logic
 */

// ==========================================================================
// 1. BRAND TAGLINES (5 CURATED OPTIONS)
// ==========================================================================
const TAGLINES = [
  "Where the hills slow you down.",
  "A quiet refuge in the Kumaon mist.",
  "Stillness found between pine and prayer.",
  "Elegance born of stone, cedar, and sacred silence.",
  "Your private sanctuary at the threshold of Kainchi Dham."
];

let currentTaglineIndex = 0;

function switchTagline(index) {
  const display = document.getElementById("heroTaglineText");
  const buttons = document.querySelectorAll(".tagline-pill-btn");

  if (!display) return;

  display.style.opacity = "0";
  setTimeout(() => {
    currentTaglineIndex = index;
    display.textContent = `"${TAGLINES[index]}"`;
    display.style.opacity = "1";

    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  }, 180);
}

// ==========================================================================
// 2. PHOTOGRAPHER SPEC / EDITORIAL MODE TOGGLE
// ==========================================================================
function setPhotoMode(showSpecs) {
  const btnEditorial = document.getElementById("btnEditorialMode");
  const btnSpec = document.getElementById("btnSpecMode");

  if (showSpecs) {
    document.body.classList.add("show-placeholders");
    btnSpec.classList.add("active");
    btnEditorial.classList.remove("active");
  } else {
    document.body.classList.remove("show-placeholders");
    btnEditorial.classList.add("active");
    btnSpec.classList.remove("active");
  }
}

// ==========================================================================
// 3. AMBIENT BACKGROUND VIDEO & MOUNTAIN AUDIO ENGINE
// ==========================================================================
let isVideoPlaying = true;
let isAudioPlaying = false;
let audioCtx = null;
let noiseNode = null;
let gainNode = null;

function toggleAmbientVideo() {
  const video = document.getElementById("bgAmbientVideo");
  const icon = document.getElementById("videoStatusIcon");
  const label = document.getElementById("videoStatusLabel");

  if (!video) return;

  if (video.paused) {
    video.play();
    isVideoPlaying = true;
    if (icon) icon.textContent = "⏸";
    if (label) label.textContent = "Greenery Motion";
  } else {
    video.pause();
    isVideoPlaying = false;
    if (icon) icon.textContent = "▶";
    if (label) label.textContent = "Motion Paused";
  }
}

let opacityModes = ["normal", "high", "soft"];
let currentOpacityIndex = 0;

function cycleVideoOpacity() {
  currentOpacityIndex = (currentOpacityIndex + 1) % opacityModes.length;
  const mode = opacityModes[currentOpacityIndex];
  const label = document.getElementById("opacityLabel");

  document.body.classList.remove("video-opacity-high", "video-opacity-soft");

  if (mode === "high") {
    document.body.classList.add("video-opacity-high");
    if (label) label.textContent = "Vibrant Green";
  } else if (mode === "soft") {
    document.body.classList.add("video-opacity-soft");
    if (label) label.textContent = "Soft Mist";
  } else {
    if (label) label.textContent = "Cinema";
  }
}

/**
 * Web Audio API Mountain Wind Synthesizer
 * Generates organic, calming Himalayan mountain breeze without external audio files
 */
function toggleAmbientAudio() {
  const icon = document.getElementById("soundStatusIcon");
  const label = document.getElementById("soundStatusLabel");

  if (!isAudioPlaying) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Buffer for pink noise (mountain breeze)
      const bufferSize = audioCtx.sampleRate * 3;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
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
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      // Filter for gentle mountain wind
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(420, audioCtx.currentTime);

      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.35, audioCtx.currentTime + 2);

      noiseNode.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      noiseNode.start();
      isAudioPlaying = true;
      if (icon) icon.textContent = "🔊";
      if (label) label.textContent = "Pine Wind On";
    } catch (err) {
      console.warn("Web Audio not supported or blocked", err);
    }
  } else {
    if (gainNode && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
      setTimeout(() => {
        if (noiseNode) noiseNode.stop();
        if (audioCtx) audioCtx.close();
        isAudioPlaying = false;
        if (icon) icon.textContent = "🔇";
        if (label) label.textContent = "Mountain Audio";
      }, 1000);
    }
  }
}

// ==========================================================================
// 4. ARCHITECTURAL 3D RENDER SWITCHER
// ==========================================================================
const ARCH_RENDERS = {
  front: {
    src: "assets/architecture-elevation-front.jpg",
    badge: "Front Elevation • 3 Storeys & 4 Gabled Dormers",
    caption: "Architectural front elevation showing drive-in reception portico, curved suite balconies, and top-floor valley lookout."
  },
  isometric: {
    src: "assets/architecture-isometric-3d.jpg",
    badge: "3D Isometric View • Arched Stone Wing & Tea Terrace",
    caption: "Elevated aerial view highlighting the 2nd-floor outdoor sun terrace with dining umbrella, arched river-stone wall, and road approach."
  }
};

function switchArchRender(type, btn) {
  const data = ARCH_RENDERS[type];
  if (!data) return;

  const img = document.getElementById("archMainRender");
  const badge = document.getElementById("archRenderBadge");
  const buttons = document.querySelectorAll(".arch-tab-btn");

  if (img) {
    img.style.opacity = "0.4";
    setTimeout(() => {
      img.src = data.src;
      img.style.opacity = "1";
    }, 150);
  }

  if (badge) badge.textContent = data.badge;

  buttons.forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

// ==========================================================================
// 5. DATE INITIALIZATION & QUICK AVAILABILITY BAR
// ==========================================================================
function initDatePickers() {
  const today = new Date();
  
  const checkInDate = new Date();
  checkInDate.setDate(today.getDate() + 1);

  const checkOutDate = new Date();
  checkOutDate.setDate(today.getDate() + 4);

  const formatDate = (d) => d.toISOString().split("T")[0];

  const quickIn = document.getElementById("quickCheckIn");
  const quickOut = document.getElementById("quickCheckOut");
  const formIn = document.getElementById("formCheckIn");
  const formOut = document.getElementById("formCheckOut");

  const minDateStr = formatDate(today);
  const inStr = formatDate(checkInDate);
  const outStr = formatDate(checkOutDate);

  [quickIn, quickOut, formIn, formOut].forEach((el) => {
    if (el) el.min = minDateStr;
  });

  if (quickIn) quickIn.value = inStr;
  if (quickOut) quickOut.value = outStr;
  if (formIn) formIn.value = inStr;
  if (formOut) formOut.value = outStr;
}

function handleQuickCheck(e) {
  e.preventDefault();
  const checkIn = document.getElementById("quickCheckIn").value;
  const checkOut = document.getElementById("quickCheckOut").value;
  const guests = document.getElementById("quickGuests").value;
  const purpose = document.getElementById("quickPurpose").value;

  const formIn = document.getElementById("formCheckIn");
  const formOut = document.getElementById("formCheckOut");
  const formGuests = document.getElementById("formGuests");
  const formPurpose = document.getElementById("formPurpose");

  if (formIn) formIn.value = checkIn;
  if (formOut) formOut.value = checkOut;
  if (formGuests) {
    if (guests.includes("1")) formGuests.value = "1 Guest";
    else if (guests.includes("2")) formGuests.value = "2 Guests";
    else if (guests.includes("3")) formGuests.value = "3 Guests";
    else if (guests.includes("Family")) formGuests.value = "4 Guests";
    else formGuests.value = "5+ Guests";
  }
  if (formPurpose) formPurpose.value = purpose;

  const contactSec = document.getElementById("contact");
  if (contactSec) {
    contactSec.scrollIntoView({ behavior: "smooth" });
    const nameInput = document.getElementById("guestName");
    if (nameInput) setTimeout(() => nameInput.focus(), 600);
  }
}

// ==========================================================================
// 6. ROOMS FILTER & MODAL DATA
// ==========================================================================
const ROOM_DATA = {
  deodar: {
    title: "The Deodar Valley Suite",
    subtitle: "Signature 620 sq.ft Cantilevered Balcony Suite",
    price: "₹14,500",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    specs: ["620 sq.ft", "Handcrafted King Teak Bed", "Max 3 Guests", "Pine Valley Facing"],
    amenities: [
      "Cantilevered cedarwood balcony with outdoor loungers",
      "Deep forest-view soaking bathtub & brass fixtures",
      "Wood-burning cast iron stove & silent convection heating",
      "Hand-pressed organic hill herbal shampoo and bath oils",
      "Complimentary high-speed optic fiber Wi-Fi (200 Mbps)",
      "Daily fresh fruit hamper from local Ramgarh orchards",
      "Artisanal French press with estate ground coffee and local tea blends"
    ],
    description: "Suspended amidst the fragrant canopy of old-growth deodar pines, our signature suite is an intimate haven for those seeking solitude and majestic valley vistas. Floor-to-ceiling glass doors open directly to your private balcony, where the morning mist swirls across the ridges as the sun ascends over the Kumaon peaks."
  },
  heritage: {
    title: "The Kumaon Heritage Room",
    subtitle: "480 sq.ft Ground Terrace Suite with Chafi Stone Walls",
    price: "₹11,500",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    specs: ["480 sq.ft", "King or Twin Beds", "Max 2 Adults + 1 Child", "Direct Herb Garden Patio"],
    amenities: [
      "Ground-level walkout to private plum and apple orchard",
      "Exposed hand-chiselled native Chafi river-stone walls",
      "Handwoven Almora woollen throws & brass bedside lamps",
      "Brass rain shower with continuous solar hot water",
      "Pet friendly upon prior request (direct garden access)",
      "Underfloor bathroom heating for winter warmth"
    ],
    description: "Honouring classical Kumaoni homestead architecture, this ground-level sanctuary features thick stone walls that provide natural climate insulation throughout the year. Step directly onto gravel stone pathways lined with wild mint, lavender, and mountain roses."
  },
  mist: {
    title: "The Mist Veranda Room",
    subtitle: "540 sq.ft Upper-Ridge Suite with Ergonomic Study Desk",
    price: "₹13,000",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    specs: ["540 sq.ft", "King Plush Bed", "Max 2 Adults", "Panoramic Mountain Ridge View"],
    amenities: [
      "Handcrafted oak study desk facing the mountain expanse",
      "Dedicated high-speed mesh router for uninterrupted video calls",
      "Covered wooden veranda with cushioned daybed",
      "Silent convective heating & double-glazed acoustic windows",
      "Pahadi herbal infusion bar & electric kettle",
      "Curated library of Kumaon history, Jim Corbett, and Maharaj-ji literature"
    ],
    description: "Designed for writers, thinkers, and travellers seeking an inspiring mountain workation. The Mist Veranda Room captures the changing moods of the Kumaon sky, from ethereal morning fog to dramatic evening starscapes."
  },
  villa: {
    title: "Pine Duplex Family Villa",
    subtitle: "980 sq.ft Standalone Two-Tier Mountain Chalet",
    price: "₹24,000",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    specs: ["980 sq.ft", "2 King En-Suite Bedrooms", "Up to 5 Guests", "Private Stargazing Lawn"],
    amenities: [
      "Two private master bedrooms with dedicated en-suite bathrooms",
      "Spacious living parlour with wood-burning stone fireplace",
      "Private dining pantry with refrigerator & induction warming",
      "Exclusive enclosed lawn with private bonfire pit",
      "Dedicated villa butler service throughout your stay",
      "Complimentary baby cot and child-friendly meal tailoring"
    ],
    description: "A private mountain home for extended families or close friends traveling together. Set slightly apart from the main wing, this two-storey sanctuary offers absolute privacy, a crackling fireplace lounge, and an exclusive grassy knoll for private stargazing and family dinners."
  }
};

function filterRooms(category, btn) {
  const buttons = document.querySelectorAll(".room-tab-btn");
  buttons.forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const cards = document.querySelectorAll(".room-card");
  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function openRoomModal(roomId) {
  const room = ROOM_DATA[roomId];
  if (!room) return;

  const contentWrap = document.getElementById("roomModalContent");
  contentWrap.innerHTML = `
    <span class="eyebrow">${room.subtitle}</span>
    <h2 style="font-size: 2.3rem; color: var(--color-pine-dark); margin-bottom: 0.5rem;">${room.title}</h2>
    <div style="font-size: 1.4rem; font-family: var(--font-serif); color: var(--color-gold-dark); font-weight: 600; margin-bottom: 1.5rem;">
      Starting at ${room.price} <span style="font-size: 0.85rem; font-family: var(--font-sans); color: var(--color-slate); font-weight: 400;">/ night + taxes</span>
    </div>
    
    <div style="margin-bottom: 1.5rem; border-radius: var(--radius-xs); overflow: hidden; height: 320px;">
      <img src="${room.image}" alt="${room.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; padding: 0.8rem 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
      ${room.specs.map(s => `<span style="font-size: 0.8rem; font-weight: 600; color: var(--color-pine-deep); text-transform: uppercase;">• ${s}</span>`).join("")}
    </div>

    <p style="font-size: 0.95rem; color: var(--color-slate); line-height: 1.8; margin-bottom: 1.5rem;">
      ${room.description}
    </p>

    <h4 style="font-size: 1.1rem; color: var(--color-pine-dark); margin-bottom: 0.8rem;">Bespoke In-Suite Amenities</h4>
    <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 2rem;">
      ${room.amenities.map(a => `<li style="font-size: 0.85rem; color: var(--color-pine-soft); display: flex; align-items: baseline; gap: 0.5rem;"><span style="color: var(--color-gold);">✓</span> ${a}</li>`).join("")}
    </ul>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn btn-primary" onclick="closeModal('roomModal'); prefillBooking('${room.title}');">
        Reserve This Suite (Pre-Launch Priority)
      </button>
      <a href="https://wa.me/919876543210?text=Namaste!%20I%20am%20interested%20in%20reserving%20the%20${encodeURIComponent(room.title)}%20at%20The%20Hill%20Serenity." target="_blank" class="btn btn-outline">
        Chat on WhatsApp
      </a>
    </div>
  `;

  openModal("roomModal");
}

function prefillBooking(roomName) {
  const roomSelect = document.getElementById("roomPref");
  if (roomSelect) {
    for (let i = 0; i < roomSelect.options.length; i++) {
      if (roomSelect.options[i].text.toLowerCase().includes(roomName.toLowerCase())) {
        roomSelect.selectedIndex = i;
        break;
      }
    }
  }

  const contactSec = document.getElementById("contact");
  if (contactSec) {
    contactSec.scrollIntoView({ behavior: "smooth" });
    const nameInput = document.getElementById("guestName");
    if (nameInput) setTimeout(() => nameInput.focus(), 500);
  }
}

// ==========================================================================
// 7. GALLERY FILTER & FULLSCREEN LIGHTBOX (INCLUDING 3D ARCHITECTURE)
// ==========================================================================
const GALLERY_ITEMS = [
  { src: "assets/architecture-elevation-front.jpg", title: "Architectural Front Elevation", sub: "3-Storey Alpine Dormers, Covered Portico & Balconies" },
  { src: "assets/architecture-isometric-3d.jpg", title: "Architectural 3D Isometric View", sub: "Arched Stone Feature Wall, Tea Terrace & Valley Approach" },
  { src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85", title: "Handcrafted River Stone Verandas", sub: "Architecture & Grounds • Chafi" },
  { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85", title: "The Deodar Valley Suite", sub: "Suites & Interiors • Veranda View" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85", title: "Morning Mist Rising Over South Gola Range", sub: "Surroundings • Kumaon Pine Valley" },
  { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=85", title: "Organic Kumaoni Harvest", sub: "Cuisine & Farm • The Cedar Hearth" },
  { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85", title: "Forest-View Soaking Tub", sub: "Suites & Interiors • Brass & Stone" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85", title: "Kalsa Riverbank Pathway", sub: "Surroundings • Pure Mountain Waters" }
];

let currentLightboxIndex = 0;

function filterGallery(group, btn) {
  const buttons = document.querySelectorAll(".gallery-filter-btn");
  buttons.forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const items = document.querySelectorAll(".gallery-item");
  items.forEach((item) => {
    const itemGroup = item.getAttribute("data-group");
    if (group === "all" || itemGroup === group) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function openLightbox(index) {
  const item = GALLERY_ITEMS[index];
  if (!item) return;

  currentLightboxIndex = index;
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const title = document.getElementById("lightboxTitle");
  const sub = document.getElementById("lightboxSubtitle");

  img.src = item.src;
  title.textContent = item.title;
  sub.textContent = item.sub;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function handleLightboxBackdrop(e) {
  if (e.target.id === "lightboxModal") {
    closeLightbox();
  }
}

// ==========================================================================
// 8. KAINCHI DHAM GUIDE MODAL
// ==========================================================================
function openKainchiGuideModal() {
  openModal("kainchiModal");
}

// ==========================================================================
// 9. GENERIC MODAL CONTROLLERS
// ==========================================================================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function handleBackdropClick(e, id) {
  if (e.target.id === id) {
    closeModal(id);
  }
}

// ==========================================================================
// 10. VIP WAITLIST FORM HANDLING
// ==========================================================================
function handleWaitlistSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("waitlistName").value.trim();
  const email = document.getElementById("waitlistEmail").value.trim();

  if (!name || !email) return;

  const memberCode = "HS-VIP-" + Math.floor(1000 + Math.random() * 9000);
  const waitlistData = {
    name,
    email,
    memberCode,
    dateJoined: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem("theHillSerenityWaitlist") || "[]");
    existing.push(waitlistData);
    localStorage.setItem("theHillSerenityWaitlist", JSON.stringify(existing));
  } catch (err) {
    console.warn("Storage not available", err);
  }

  const modalContent = document.getElementById("vipModalContent");
  modalContent.innerHTML = `
    <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">✨</div>
    <span class="eyebrow" style="color: var(--color-gold-dark);">Founding Guest Certificate</span>
    <h2 style="font-size: 2rem; color: var(--color-pine-dark); margin-bottom: 0.5rem;">Welcome to the Inner Circle</h2>
    <p style="font-size: 0.95rem; color: var(--color-slate); line-height: 1.6; margin-bottom: 1.5rem;">
      Thank you, <strong>${name}</strong>. Your privileged pre-launch status has been registered for <strong>${email}</strong>.
    </p>

    <div style="background-color: var(--color-sand); border: 2px dashed var(--color-gold); padding: 1.25rem; border-radius: var(--radius-xs); margin-bottom: 1.5rem;">
      <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.16em; color: var(--color-pine-soft); font-weight: 700; display: block; margin-bottom: 0.3rem;">Your VIP Invitation Code</span>
      <strong style="font-family: var(--font-serif); font-size: 2rem; letter-spacing: 0.1em; color: var(--color-pine-dark);">${memberCode}</strong>
      <div style="font-size: 0.76rem; color: var(--color-gold-dark); margin-top: 0.4rem; font-weight: 600;">
        Privileges: ₹3,000 Dining Credit + 25% Off Suite Tariff + Priority Kainchi Transfer
      </div>
    </div>

    <p style="font-size: 0.85rem; color: var(--color-muted); margin-bottom: 1.5rem;">
      Our concierge will reach out directly prior to our official Spring 2025 opening to offer you early-access room selection.
    </p>

    <button class="btn btn-primary" onclick="closeModal('vipModal')">
      Return to Sanctuary Overview
    </button>
  `;

  openModal("vipModal");
  document.getElementById("waitlistForm").reset();
}

// ==========================================================================
// 11. RESERVATION ENQUIRY & WHATSAPP ENGINE DISPATCH
// ==========================================================================
function handleEnquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const phone = document.getElementById("guestPhone").value.trim();
  const email = document.getElementById("guestEmail").value.trim();
  const room = document.getElementById("roomPref").value;
  const checkIn = document.getElementById("formCheckIn").value;
  const checkOut = document.getElementById("formCheckOut").value;
  const guests = document.getElementById("formGuests").value;
  const purpose = document.getElementById("formPurpose").value;
  const notes = document.getElementById("guestNotes").value.trim();

  const refCode = "HS-RES-" + Math.floor(10000 + Math.random() * 90000);

  const waText = 
`*New Reservation Enquiry - The Hill Serenity, Chafi*
Ref: ${refCode}
----------------------------------------
• *Guest Name:* ${name}
• *Phone:* ${phone}
• *Email:* ${email}
• *Suite Preference:* ${room}
• *Dates:* ${checkIn} to ${checkOut}
• *Guests:* ${guests}
• *Stay Purpose:* ${purpose}
• *Special Notes/Diet:* ${notes ? notes : "None specified"}
----------------------------------------
_Please confirm room availability and applicable pre-launch privileges._`;

  const encodedWa = encodeURIComponent(waText);
  const waUrl = `https://wa.me/919876543210?text=${encodedWa}`;

  dispatchBookingEngineHook({
    refCode, name, phone, email, room, checkIn, checkOut, guests, purpose, notes
  });

  const modalContent = document.getElementById("vipModalContent");
  modalContent.innerHTML = `
    <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">🏔️</div>
    <span class="eyebrow" style="color: var(--color-gold-dark);">Reservation Request Received</span>
    <h2 style="font-size: 2rem; color: var(--color-pine-dark); margin-bottom: 0.5rem;">Namaste, ${name}</h2>
    <p style="font-size: 0.95rem; color: var(--color-slate); line-height: 1.6; margin-bottom: 1.5rem;">
      Your enquiry for <strong>${room}</strong> (${checkIn} to ${checkOut}) has been securely logged with our hospitality concierge under reference:
    </p>

    <div style="background-color: var(--color-sand); border: 1px solid var(--color-gold); padding: 1.25rem; border-radius: var(--radius-xs); margin-bottom: 1.5rem;">
      <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--color-muted); font-weight: 700; display: block; margin-bottom: 0.2rem;">Enquiry Tracking Reference</span>
      <strong style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-pine-dark);">${refCode}</strong>
    </div>

    <p style="font-size: 0.88rem; color: var(--color-slate); margin-bottom: 1.5rem;">
      To receive instantaneous confirmation and discuss customised meal or Kainchi Dham pilgrimage arrangements directly with our resident host, tap below:
    </p>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <a href="${waUrl}" target="_blank" class="btn btn-gold" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
        <span>💬</span> Complete Confirmation on WhatsApp
      </a>
      <button class="btn btn-outline btn-sm" onclick="closeModal('vipModal')">
        Close & Receive Confirmation by Email
      </button>
    </div>
  `;

  openModal("vipModal");
  document.getElementById("enquiryForm").reset();
}

function dispatchBookingEngineHook(data) {
  console.log("[The Hill Serenity] Booking Engine Hook Payload:", data);
}

// ==========================================================================
// 12. FAQ ACCORDION
// ==========================================================================
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const isActive = item.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((el) => {
    el.classList.remove("active");
  });

  if (!isActive) {
    item.classList.add("active");
  }
}

// ==========================================================================
// 13. MULTI-LANGUAGE PREVIEW TOGGLE (ENGLISH / HINDI)
// ==========================================================================
let isHindi = false;

function toggleLanguage() {
  isHindi = !isHindi;
  const label = document.getElementById("currentLangLabel");
  const heroTitle = document.querySelector(".hero-title");
  const heroBadge = document.querySelector(".hero-badge span:last-child");

  if (isHindi) {
    if (label) label.textContent = "HI";
    if (heroTitle) heroTitle.innerHTML = "द हिल सेरेनिटी";
    if (heroBadge) heroBadge.textContent = "शुभारंभ वसंत २०२५ • चाफी, नैनीताल";
  } else {
    if (label) label.textContent = "EN";
    if (heroTitle) heroTitle.innerHTML = "The Hill Serenity";
    if (heroBadge) heroBadge.textContent = "Opening Spring 2025 • Chafi, Nainital";
  }
}

// ==========================================================================
// 14. MOBILE MENU & SCROLL EFFECTS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initDatePickers();

  const header = document.getElementById("siteHeader");
  const ambientVideo = document.getElementById("bgAmbientVideo");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Header sticky transition
    if (scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll parallax depth for background video
    if (ambientVideo) {
      const scale = 1 + Math.min(scrollY / 8000, 0.08);
      const translateY = Math.min(scrollY / 25, 40);
      ambientVideo.style.transform = `scale(${scale}) translateY(-${translateY}px)`;
    }
  });

  // Mobile nav toggle
  const toggleBtn = document.getElementById("mobileNavToggle");
  const navMenu = document.getElementById("navMenu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  // Language toggle button
  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) {
    langBtn.addEventListener("click", toggleLanguage);
  }

  // Set current year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeModal("roomModal");
      closeModal("kainchiModal");
      closeModal("vipModal");
    }
  });
});
