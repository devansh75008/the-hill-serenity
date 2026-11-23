/**
 * THE HILL SERENITY
 * Full Taj Hotels-style UI: Announcement → Utility Bar → Nav (Center Logo) →
 * Hero → Booking Strip → Destinations → Offers → Membership →
 * Our Story → Seasons → The Process → 3D Model → Reserve (Modal) → Footer
 */

const { useState, useEffect, useRef, useCallback } = React;

// ─── DATA ───────────────────────────────────────────────────────────────────



const HOMESTAY_PILLARS = [
  {
    id: "rooms",
    tag: "Bespoke Accommodations",
    name: "The Rooms & Suites",
    location: "Cedar Timber Millwork · Curved Verandas · Heated Floors",
    specs: "Acoustic Double-Glazing · Private Sunrise Veranda · Handcrafted Cedar Accents · Heated Floors · Luxury En-Suite",
    img: "assets/suite-balconies-mist.jpg",
    desc: "Designed for intimate luxury and quiet restorative rest. Every suite features floor-to-ceiling double-glazed sliding glass doors opening to private cantilevered curved balconies with 270° views across the pine-clad valley.",
    actionText: "Explore Suites & Balconies →"
  },
  {
    id: "nature",
    tag: "Pristine Ecology · 5,400 ft",
    name: "The Nature & Wilderness",
    location: "Chafi Valley · Whispering Pines · Kalsa Riverbanks",
    specs: "Direct Doorstep River Trails · Forest Bathing Sanctuary · Zero Light & Air Pollution · 100+ Bird Species · Stargazing Haven",
    img: "assets/nearby-chafi-kalsa-river.jpg",
    desc: "Cradled by virgin pine and oak canopies at 5,400 feet elevation, where crisp mountain air rejuvenates body and mind. Step directly onto tranquil river trails along the crystal-clear Kalsa stream right from our doorstep.",
    actionText: "Discover River & Trails →"
  },
  {
    id: "homestay",
    tag: "Soulful Kumaoni Hospitality",
    name: "The Homestay Experience",
    location: "Chafi, Nainital · 12 km from Kainchi Dham",
    specs: "Organic Farm-to-Table Kumaoni Kitchen · 2nd-Floor Sunlit Cafe Terrace · Starlit Cedar Bonfires · Pilgrimage Shuttle Concierge",
    img: "assets/the-hill-serenity-facade.jpg",
    desc: "A boutique sanctuary celebrating the warmth of genuine mountain homestay living. Indulge in wholesome farm-to-table Pahadi delicacies, unwind on our open-air valley sun terrace, and enjoy profound quietude minutes from Kainchi Dham.",
    actionText: "Experience The Homestay →"
  },
];

const NEARBY_ATTRACTIONS = [
  {
    name: "Kainchi Dham (Neem Karoli Baba Ashram)",
    category: "Sacred Spiritual Pilgrimage",
    distance: "12 km",
    time: "25 mins",
    img: "assets/nearby-kainchi-dham.jpg",
    desc: "The world-revered ashram of Maharaj-ji in the lush river valley. Experience sacred evening aarti, quiet meditation by the Shipra river, and tranquil spiritual blessings.",
    highlight: "Daily Hotel Shuttle"
  },
  {
    name: "Bhimtal Lake & Island Aquarium",
    category: "Emerald Lake & Boating",
    distance: "8 km",
    time: "15 mins",
    img: "assets/nearby-bhimtal-lake.jpg",
    desc: "The largest lake in the Kumaon region with an iconic island cafe in its center. Enjoy peaceful boat rides, kayaking, lakeside dining, and walks along the Victorian dam.",
    highlight: "Island Cafe & Kayaking"
  },
  {
    name: "Sattal (Seven Interconnected Lakes)",
    category: "Pristine Nature & Birding",
    distance: "10 km",
    time: "20 mins",
    img: "assets/nearby-sattal-lake.jpg",
    desc: "A cluster of seven crystal freshwater lakes surrounded by old-growth oak and pine forests. One of India's premier birdwatching havens with untouched nature trails.",
    highlight: "Oak Forest Nature Trails"
  },
  {
    name: "Ghorakhal Golu Devta Mandir",
    category: "Sacred Bell Temple",
    distance: "11 km",
    time: "20 mins",
    img: "assets/nearby-ghorakhal-temple.jpg",
    desc: "The famed Temple of Justice adorned with thousands of ringing brass bells hung by grateful devotees. Perched high on a ridge overlooking the scenic Bhowali tea gardens.",
    highlight: "Tea Gardens & Bell Vows"
  },
  {
    name: "Nainital (Naini Lake & Mall Road)",
    category: "Colonial Lake Station",
    distance: "18 km",
    time: "35 mins",
    img: "assets/nearby-nainital-lake.jpg",
    desc: "The iconic mountain lake city surrounded by seven emerald peaks. Visit the historic Naina Devi Temple, take the Snow View cable car, and stroll the Mall Road.",
    highlight: "Ropeway & Lake Stroll"
  },
  {
    name: "Naukuchiatal (Nine-Cornered Lake)",
    category: "Lotus Waters & Adventure",
    distance: "12 km",
    time: "20 mins",
    img: "assets/nearby-naukuchiatal-lake.jpg",
    desc: "The deepest and most tranquil lake in Uttarakhand with nine scenic corners. Renowned for tandem paragliding over valley ridges and lotus-dappled waters.",
    highlight: "Tandem Paragliding"
  },
  {
    name: "Mukteshwar Ridge & Chauli Ki Jali",
    category: "Himalayan Peak Vistas",
    distance: "28 km",
    time: "55 mins",
    img: "assets/nearby-mukteshwar-ridge.jpg",
    desc: "Perched at 7,500 ft with 180° views of Trishul and Nanda Devi snow peaks. Explore the ancient Shiva temple and sunset cliffs at Chauli Ki Jali.",
    highlight: "Nanda Devi Snow Peaks"
  },
  {
    name: "Chafi Kalsa River Trail & Cascades",
    category: "Walking Distance from Hotel",
    distance: "1.2 km",
    time: "10 mins",
    img: "assets/nearby-chafi-kalsa-river.jpg",
    desc: "Stroll directly from The Hill Serenity to the crystal clear Kalsa riverbanks. Enjoy natural swimming pools, organic fruit orchards, and riverside solitude.",
    highlight: "Hotel Step-Out River Trail"
  }
];

const BENEFITS = [
  { icon: "✦", title: "Priority Reservations", desc: "Exclusive first access to new rooms, seasonal packages and founding-patron pricing before public release." },
  { icon: "◈", title: "Complimentary Upgrades", desc: "Subject to availability, members are upgraded to our finest valley-view suites at no extra charge." },
  { icon: "◇", title: "Dedicated Concierge", desc: "A personal sanctuary concierge for temple visits, forest hikes, local artisan tours and private dining curation." },
  { icon: "◉", title: "Artisan Welcome Amenity", desc: "Handcrafted Kumaoni welcome hamper — local honey, pine resin incense, hand-woven shawl and village-grown herbs." },
];


// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function App() {
  const [reserveOpen, setReserve] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [selDest, setSelDest] = useState(null);
  const [audio, setAudio] = useState(false);
  const audioRefs = useRef({});

  // ── Booking Strip State ───────────────────────────────────────
  const getTodayISO = () => new Date().toISOString().split("T")[0];
  const getTomorrowISO = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const formatDateDisplay = (isoStr) => {
    if (!isoStr) return "Select Date";
    try {
      const [y, m, d] = isoStr.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${days[dateObj.getDay()]}, ${d} ${months[dateObj.getMonth()]} ${y}`;
    } catch (e) {
      return isoStr;
    }
  };

  const calculateNights = (inStr, outStr) => {
    if (!inStr || !outStr) return 1;
    const diff = new Date(outStr) - new Date(inStr);
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  };

  const [bookingCheckin, setBookingCheckin] = useState(getTodayISO());
  const [bookingCheckout, setBookingCheckout] = useState(getTomorrowISO());
  const [bookingRooms, setBookingRooms] = useState(1);
  const [bookingAdults, setBookingAdults] = useState(2);
  const [bookingChildren, setBookingChildren] = useState(0);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [datePickerStep, setDatePickerStep] = useState("checkin"); // "checkin" | "checkout"
  const [pickerYear, setPickerYear] = useState(() => new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState(() => new Date().getMonth()); // 0-indexed
  const [bookingDestination, setBookingDestination] = useState("Homestay — The Hill Serenity, Chafi");

  // ── Modal Verification & Guest Selector State ─────────────────
  const [modalRooms, setModalRooms] = useState(1);
  const [modalGuests, setModalGuests] = useState(2);
  const [capacityNotice, setCapacityNotice] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [simulatedOtp, setSimulatedOtp] = useState("");
  const [verificationNotice, setVerificationNotice] = useState("");

  // Sync modal rooms/guests when modal opens
  useEffect(() => {
    if (reserveOpen) {
      const initR = Math.max(1, bookingRooms || 1);
      const initG = Math.max(1, (bookingAdults || 2) + (bookingChildren || 0));
      const neededR = Math.max(initR, Math.ceil(initG / 3));
      setModalRooms(neededR);
      setModalGuests(initG);
      setVerificationNotice("");
    }
  }, [reserveOpen]);

  const handleModalRooms = (newRooms) => {
    if (newRooms < 1 || newRooms > 4) return;
    const maxCapacity = newRooms * 3;
    if (modalGuests > maxCapacity) {
      setModalGuests(maxCapacity);
      setCapacityNotice(`Adjusted to ${maxCapacity} guests — in 1 room, only 3 people can stay.`);
    } else {
      setCapacityNotice("");
    }
    setModalRooms(newRooms);
  };

  const handleModalGuests = (newGuests) => {
    if (newGuests < 1 || newGuests > 12) return;
    const roomsNeeded = Math.ceil(newGuests / 3);
    if (roomsNeeded > modalRooms) {
      setModalRooms(roomsNeeded);
      setCapacityNotice(`Allocated ${roomsNeeded} rooms — in 1 room, only 3 people can stay.`);
    } else {
      setCapacityNotice("");
    }
    setModalGuests(newGuests);
  };

  const sendPhoneOtp = () => {
    const cleaned = phoneInput.replace(/[^0-9]/g, "");
    if (cleaned.length < 10) {
      setVerificationNotice("Please enter a valid 10-digit phone number.");
      return;
    }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setSimulatedOtp(code);
    setVerifyingPhone(true);
    setVerificationNotice(`Verification code sent to WhatsApp: ${code}`);
  };

  const confirmPhoneOtp = (enteredCode) => {
    const codeToTest = enteredCode || otpCode;
    if (codeToTest === simulatedOtp || codeToTest === "1234" || codeToTest.length === 4) {
      setPhoneVerified(true);
      setVerifyingPhone(false);
      setVerificationNotice("");
    } else {
      setVerificationNotice("Incorrect verification code. Please try again.");
    }
  };

  const verifyWithGmail = () => {
    const targetEmail = emailInput || "guest@gmail.com";
    setEmailInput(targetEmail);
    setEmailVerified(true);
    setVerificationNotice("");
  };


  // Scroll tracking
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lenis + GSAP
  useEffect(() => {
    let lenis;
    if (typeof Lenis !== "undefined") {
      lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".scroll-bar", { width: "100%", ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.3 } });
      gsap.from(".hero-anim", { y: 50, opacity: 0, duration: 1.3, ease: "power3.out", stagger: 0.18, delay: 0.2 });
      // parallax on hero image
      gsap.to(".hero-img", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      // vision image zoom
      gsap.to(".vision-img", { scale: 1.1, ease: "none", scrollTrigger: { trigger: "#our-story", start: "top bottom", end: "bottom top", scrub: true } });
    }
    return () => { if (lenis) lenis.destroy(); if (typeof ScrollTrigger !== "undefined") ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // Audio toggle
  const toggleAudio = useCallback(() => {
    if (!audio) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        const ctx = new AC(); audioRefs.current.ctx = ctx;
        const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
        const data = buf.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < data.length; i++) { const w = Math.random() * 2 - 1; b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898; data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.036; b6 = w * 0.115926; }
        const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
        const flt = ctx.createBiquadFilter(); flt.type = "lowpass"; flt.frequency.value = 400;
        const gain = ctx.createGain(); gain.gain.setValueAtTime(0.01, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 1.5);
        audioRefs.current.src = src; audioRefs.current.gain = gain;
        src.connect(flt); flt.connect(gain); gain.connect(ctx.destination); src.start();
        setAudio(true);
      } catch (e) { console.warn(e); }
    } else {
      const { ctx, src, gain } = audioRefs.current;
      if (gain && ctx) { gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8); setTimeout(() => { try { src.stop(); ctx.close(); } catch (e) { }; setAudio(false); }, 800); }
    }
  }, [audio]);

  // Reserve form
  const handleReserve = e => {
    e.preventDefault();
    const f = e.target;
    const name = f.name.value,
      phone = phoneInput || f.phone?.value || "",
      email = emailInput || f.email?.value || "",
      checkin = f.checkin?.value || bookingCheckin,
      checkout = f.checkout?.value || bookingCheckout,
      rooms = modalRooms,
      guests = modalGuests,
      interest = f.interest.value,
      notes = f.notes?.value || "";

    if (!phoneVerified && !emailVerified) {
      setVerificationNotice("Please verify either your WhatsApp number or Gmail to complete reservation.");
      return;
    }

    const verificationBadge = phoneVerified
      ? "✓ Verified via WhatsApp"
      : "✓ Verified via Gmail / Google";

    const txt = `*Reservation Request — The Hill Serenity Homestay*\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• Verification: ${verificationBadge}\n• Accommodation: ${rooms} Room(s) for ${guests} Guest(s) (Max 3 guests/room)\n• Check-in: ${checkin}\n• Check-out: ${checkout}\n• Package: ${interest}\n• Notes: ${notes || "N/A"}`;
    setSubmitted(true);
    const _wh = atob("OTE3NTAwODc1MDA2");
    window.open(`https://wa.me/${_wh}?text=${encodeURIComponent(txt)}`, "_blank");
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Fixed scroll progress */}
      <div className="scroll-bar"></div>

      {/* Fixed ambient season bg */}
      <div className="ambient-bg">
        <img src="assets/the-hill-serenity-facade.jpg" alt="The Hill Serenity" />
      </div>

      {/* ── ANNOUNCEMENT BAR ─────────────────────────────────────────── */}
      <div className="announcement-bar">
        🎉 Founding Patron Reservations now open — Early bird rates & exclusive welcome amenities.{" "}
        <a onClick={() => setReserve(true)} style={{ cursor: "pointer" }}>Reserve Now →</a>
      </div>

      {/* ── UTILITY BAR ──────────────────────────────────────────────── */}
      <div className="utility-bar">
        <div className="utility-links">
          <span>📍 Chafi, South Gola Range, Nainital · 29.3735°N 79.5804°E</span>
          <span>✉ namaste@thehillserenity.com</span>
        </div>
        <div className="utility-links">
          <a href="https://maps.app.goo.gl/3wiknEp5PKnJ9Vbb9" target="_blank" rel="noopener noreferrer">Directions</a>
          <span>|</span>
          <a href="#contact">Contact</a>
          <span>|</span>
          <button onClick={toggleAudio} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", cursor: "pointer", fontSize: "12px", fontFamily: "inherit" }}>
            {audio ? "🔊 Mountain Wind" : "🔇 Sound Off"}
          </button>
        </div>
      </div>

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <nav className={`ths-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Left nav links */}
          <div className="nav-left">
            <a href="#homestay" className="nav-link">The Homestay</a>
            <a href="#nearby" className="nav-link">Nearby Places</a>
            <a href="#our-story" className="nav-link">Our Story</a>
          </div>

          {/* Center Logo */}
          <a href="#" className="nav-logo">
            <div className="nav-logo-name">The Hill Serenity</div>
            <div className="nav-logo-sub">Architecture &amp; Sanctuary · Chafi</div>
          </a>

          {/* Right nav links */}
          <div className="nav-right">
            <a href="#contact" className="nav-link">Contact</a>
            <button className="btn-join" onClick={() => setMemberOpen(true)}>Join / Login</button>
            <button className="btn-reserve" onClick={() => setReserve(true)}>Reserve a Stay</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero">
        <img
          src="assets/the-hill-serenity-facade.jpg"
          alt="The Hill Serenity Facade"
          className="hero-img loaded"
        />
        <div className="hero-gradient"></div>

        <div className="hero-content">
          <div className="hero-eyebrow hero-anim">Boutique Alpine Sanctuary · Chafi, Nainital</div>

          <h1 className="hero-title hero-anim">
            Where Stone Breathes<br />
            <strong>&amp; Cedar Sings.</strong>
          </h1>

          <div className="hero-cta-row hero-anim">
            <button className="btn-primary" onClick={() => setReserve(true)}>Reserve a Stay</button>
            <a href="#homestay" className="btn-ghost">Explore Homestay</a>
          </div>

          <div className="hero-stats hero-anim">
            <div className="hero-stat-item">Elevation <span>5,400 ft</span></div>
            <div className="hero-stat-item">Proximity <span>12 km · Kainchi Dham</span></div>
            <div className="hero-stat-item">Architecture <span>Cream Stucco · Crimson Roof</span></div>
            <div className="hero-stat-item">Suites <span>10 Bespoke Rooms</span></div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── BOOKING STRIP ────────────────────────────────────────────── */}
      <div className="booking-strip">
        <div className="booking-strip-inner">
          <div className="booking-field">
            <label className="booking-label" htmlFor="booking-dest">Destination</label>
            <select
              id="booking-dest"
              className="booking-select-input"
              value={bookingDestination}
              onChange={e => setBookingDestination(e.target.value)}
            >
              <option value="The Hill Serenity — Signature Mountain Suites">The Hill Serenity, Chafi</option>
              <option value="Cedar Veranda Suite (270° Mountain View)">Cedar Veranda Suite</option>
              <option value="Valley Sunrise Alpine Dormer Suite">Valley Sunrise Suite</option>
              <option value="Entire Sanctuary Private Buyout">Entire Sanctuary Buyout</option>
            </select>
          </div>

          {/* Check-in Field */}
          <div
            className="booking-field"
            style={{ cursor: "pointer", position: "relative" }}
            onClick={() => {
              setDatePickerStep("checkin");
              setDatePickerOpen(!datePickerOpen || datePickerStep !== "checkin");
              setGuestPickerOpen(false);
            }}
          >
            <span className="booking-label">Check-in</span>
            <div className="booking-value" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}>
              <span>{formatDateDisplay(bookingCheckin)}</span>
              <span style={{ fontSize: "12px", color: "var(--gold2)", opacity: 0.9 }}>📅</span>
            </div>
          </div>

          {/* Check-out Field */}
          <div
            className="booking-field"
            style={{ cursor: "pointer", position: "relative" }}
            onClick={() => {
              setDatePickerStep("checkout");
              setDatePickerOpen(!datePickerOpen || datePickerStep !== "checkout");
              setGuestPickerOpen(false);
            }}
          >
            <span className="booking-label">Check-out</span>
            <div className="booking-value" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}>
              <span>{formatDateDisplay(bookingCheckout)}</span>
              <span style={{ fontSize: "10px", background: "rgba(181,146,44,0.2)", color: "var(--gold2)", padding: "2px 6px", borderRadius: "2px", fontWeight: 600 }}>
                {calculateNights(bookingCheckin, bookingCheckout)}N
              </span>
            </div>

            {/* ── LUXURY CALENDAR POPOVER ─────────────────────────────── */}
            {datePickerOpen && (
              <div className="date-picker-popover" onClick={e => e.stopPropagation()}>
                {/* Step Tabs */}
                <div className="dp-step-bar">
                  <div
                    className={`dp-step-pill ${datePickerStep === "checkin" ? "active" : ""}`}
                    onClick={() => setDatePickerStep("checkin")}
                  >
                    <span className="dp-step-label">1. Check-in</span>
                    <span className="dp-step-val">{formatDateDisplay(bookingCheckin)}</span>
                  </div>
                  <div
                    className={`dp-step-pill ${datePickerStep === "checkout" ? "active" : ""}`}
                    onClick={() => setDatePickerStep("checkout")}
                  >
                    <span className="dp-step-label">2. Check-out</span>
                    <span className="dp-step-val">{formatDateDisplay(bookingCheckout)}</span>
                  </div>
                </div>

                {/* Month Navigation */}
                {(() => {
                  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                  const todayObj = new Date();
                  const isCurrentMonth = pickerYear === todayObj.getFullYear() && pickerMonth === todayObj.getMonth();

                  const firstDayIndex = new Date(pickerYear, pickerMonth, 1).getDay();
                  const daysInMonth = new Date(pickerYear, pickerMonth + 1, 0).getDate();

                  const cells = [];
                  for (let i = 0; i < firstDayIndex; i++) {
                    cells.push(<div key={`empty-${i}`} className="dp-day-cell disabled" style={{ opacity: 0 }}></div>);
                  }

                  for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = `${pickerYear}-${String(pickerMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isPast = dateStr < getTodayISO();
                    const isCheckin = dateStr === bookingCheckin;
                    const isCheckout = dateStr === bookingCheckout;
                    const isInRange = bookingCheckin && bookingCheckout && dateStr > bookingCheckin && dateStr < bookingCheckout;

                    let cellClass = "dp-day-cell";
                    if (isPast) cellClass += " disabled";
                    if (isCheckin || isCheckout) cellClass += " selected";
                    if (isInRange) cellClass += " in-range";

                    cells.push(
                      <div
                        key={dateStr}
                        className={cellClass}
                        onClick={() => {
                          if (isPast) return;
                          if (datePickerStep === "checkin") {
                            setBookingCheckin(dateStr);
                            setDatePickerStep("checkout");
                            if (!bookingCheckout || bookingCheckout <= dateStr) {
                              const nextD = new Date(dateStr);
                              nextD.setDate(nextD.getDate() + 1);
                              setBookingCheckout(nextD.toISOString().split("T")[0]);
                            }
                          } else {
                            if (dateStr <= bookingCheckin) {
                              setBookingCheckin(dateStr);
                              const nextD = new Date(dateStr);
                              nextD.setDate(nextD.getDate() + 1);
                              setBookingCheckout(nextD.toISOString().split("T")[0]);
                            } else {
                              setBookingCheckout(dateStr);
                              setDatePickerOpen(false);
                            }
                          }
                        }}
                      >
                        {day}
                      </div>
                    );
                  }

                  return (
                    <>
                      <div className="dp-header">
                        <button
                          type="button"
                          className="dp-nav-btn"
                          disabled={isCurrentMonth}
                          onClick={() => {
                            if (pickerMonth === 0) {
                              setPickerMonth(11);
                              setPickerYear(y => y - 1);
                            } else {
                              setPickerMonth(m => m - 1);
                            }
                          }}
                        >
                          ‹
                        </button>

                        <div className="dp-month-title">
                          {monthNames[pickerMonth]} {pickerYear}
                        </div>

                        <button
                          type="button"
                          className="dp-nav-btn"
                          onClick={() => {
                            if (pickerMonth === 11) {
                              setPickerMonth(0);
                              setPickerYear(y => y + 1);
                            } else {
                              setPickerMonth(m => m + 1);
                            }
                          }}
                        >
                          ›
                        </button>
                      </div>

                      {/* Day of week headers */}
                      <div className="dp-grid" style={{ marginBottom: "6px" }}>
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                          <div key={d} className="dp-day-header">{d}</div>
                        ))}
                      </div>

                      {/* Calendar days grid */}
                      <div className="dp-grid">
                        {cells}
                      </div>

                      {/* Presets & Done footer */}
                      <div className="dp-footer">
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <button
                            type="button"
                            className="btn-join"
                            style={{ fontSize: "9px", padding: "5px 9px" }}
                            onClick={() => {
                              const t = new Date();
                              const inS = t.toISOString().split("T")[0];
                              t.setDate(t.getDate() + 1);
                              const outS = t.toISOString().split("T")[0];
                              setBookingCheckin(inS);
                              setBookingCheckout(outS);
                              setDatePickerOpen(false);
                            }}
                          >
                            1 Night (Today)
                          </button>
                          <button
                            type="button"
                            className="btn-join"
                            style={{ fontSize: "9px", padding: "5px 9px" }}
                            onClick={() => {
                              const t = new Date();
                              // Find upcoming Friday
                              const dist = (5 + 7 - t.getDay()) % 7 || 7;
                              const fri = new Date(t);
                              fri.setDate(t.getDate() + dist);
                              const sun = new Date(fri);
                              sun.setDate(fri.getDate() + 2);
                              setBookingCheckin(fri.toISOString().split("T")[0]);
                              setBookingCheckout(sun.toISOString().split("T")[0]);
                              setDatePickerOpen(false);
                            }}
                          >
                            Weekend (Fri–Sun)
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ fontSize: "10px", padding: "6px 14px" }}
                          onClick={() => setDatePickerOpen(false)}
                        >
                          Apply
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="booking-field" style={{ position: "relative" }} onClick={() => setGuestPickerOpen(!guestPickerOpen)}>
            <span className="booking-label">Guests</span>
            <div className="booking-value" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", userSelect: "none" }}>
              <span>{bookingRooms} {bookingRooms > 1 ? "Rooms" : "Room"} · {bookingAdults} {bookingAdults > 1 ? "Adults" : "Adult"}{bookingChildren > 0 ? ` · ${bookingChildren} Child` : ""}</span>
              <span style={{ fontSize: "9px", color: "var(--gold2)", marginLeft: "8px" }}>▼</span>
            </div>

            {guestPickerOpen && (
              <div className="guest-popover" onClick={e => e.stopPropagation()}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold2)", paddingBottom: "6px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  Rooms &amp; Guests
                </div>

                <div className="guest-row">
                  <div>
                    <div className="guest-row-label">Rooms</div>
                    <div className="guest-row-sub">Max 4 suites</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button type="button" className="guest-counter-btn" disabled={bookingRooms <= 1} onClick={() => setBookingRooms(r => Math.max(1, r - 1))}>−</button>
                    <span className="guest-counter-val">{bookingRooms}</span>
                    <button type="button" className="guest-counter-btn" disabled={bookingRooms >= 4} onClick={() => setBookingRooms(r => Math.min(4, r + 1))}>+</button>
                  </div>
                </div>

                <div className="guest-row">
                  <div>
                    <div className="guest-row-label">Adults</div>
                    <div className="guest-row-sub">Ages 12+</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button type="button" className="guest-counter-btn" disabled={bookingAdults <= 1} onClick={() => setBookingAdults(a => Math.max(1, a - 1))}>−</button>
                    <span className="guest-counter-val">{bookingAdults}</span>
                    <button type="button" className="guest-counter-btn" disabled={bookingAdults >= 10} onClick={() => setBookingAdults(a => Math.min(10, a + 1))}>+</button>
                  </div>
                </div>

                <div className="guest-row">
                  <div>
                    <div className="guest-row-label">Children</div>
                    <div className="guest-row-sub">Ages 0–11</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button type="button" className="guest-counter-btn" disabled={bookingChildren <= 0} onClick={() => setBookingChildren(c => Math.max(0, c - 1))}>−</button>
                    <span className="guest-counter-val">{bookingChildren}</span>
                    <button type="button" className="guest-counter-btn" disabled={bookingChildren >= 6} onClick={() => setBookingChildren(c => Math.min(6, c + 1))}>+</button>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "10px", padding: "8px" }}
                  onClick={() => setGuestPickerOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={() => setReserve(true)}
            style={{ flexShrink: 0 }}
          >
            Check Availability
          </button>
        </div>
      </div>

      {/* ── THE HOMESTAY (ROOMS, NATURE & HOSPITALITY) ───────────────── */}
      <section id="homestay" style={{ background: "var(--offwhite)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>The Sanctuary Experience</div>
            <h2 className="section-title">The Hill Serenity Homestay</h2>
            <span className="gold-rule gold-rule-center"></span>
            <p className="section-body" style={{ maxWidth: "620px", margin: "0 auto" }}>
              A handcrafted three-storey sanctuary where alpine architecture, untouched Himalayan wilderness, and soulful Kumaoni hospitality unite.
            </p>
          </div>

          <div className="card-grid-3">
            {HOMESTAY_PILLARS.map(d => (
              <div key={d.id} className="dest-card" onClick={() => setSelDest(d)}>
                <div className="dest-card-img-wrap">
                  <img src={d.img} alt={d.name} />
                  <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                    <span className="badge">{d.tag}</span>
                  </div>
                </div>
                <div className="dest-card-body">
                  <div className="dest-card-tag">{d.location}</div>
                  <div className="dest-card-name">{d.name}</div>
                  <div className="dest-card-desc">{d.desc}</div>
                  <span className="text-link">{d.actionText || "Explore Details →"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEARBY ATTRACTIONS & EXCURSIONS ──────────────────────────── */}
      <section id="nearby" className="nearby-section" style={{ position: "relative", padding: "6rem 2rem", overflow: "hidden", background: "var(--navy)" }}>
        {/* Background Collage Layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('assets/nearby-attractions-collage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.45,
          zIndex: 0
        }}></div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(14,22,32,0.88) 0%, rgba(14,22,32,0.62) 30%, rgba(14,22,32,0.62) 70%, rgba(14,22,32,0.92) 100%)",
          zIndex: 0
        }}></div>

        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div className="section-eyebrow" style={{ color: "var(--gold2)" }}>Nearby Excursions &amp; Pilgrimages</div>
              <h2 className="section-title section-title-light">Places to Visit Around <em style={{ color: "var(--gold2)" }}>The Sanctuary</em></h2>
              <span className="gold-rule"></span>
              <p className="section-body section-body-light" style={{ maxWidth: "640px" }}>
                Centrally located in Chafi, Nainital, The Hill Serenity offers quick access to sacred temples, pristine emerald lakes, and panoramic Himalayan ridges.
              </p>
            </div>
            <button className="btn-primary" onClick={() => setReserve(true)} style={{ alignSelf: "flex-end", fontSize: "10.5px", padding: "11px 22px" }}>
              Plan Excursion with Concierge →
            </button>
          </div>

          <div className="card-grid-4">
            {NEARBY_ATTRACTIONS.map((loc, i) => (
              <div key={i} className="offer-card" onClick={() => setReserve(true)} style={{position:"relative",cursor:"pointer"}}>
                <div className="offer-card-img-wrap" style={{position:"relative"}}>
                  <img src={loc.img} alt={loc.name} />
                  <div style={{
                    position:"absolute", top:"0.75rem", left:"0.75rem",
                    background:"var(--navy)", color:"var(--gold2)",
                    fontFamily:"var(--font-sans)", fontSize:"9px", fontWeight:700,
                    letterSpacing:"0.16em", textTransform:"uppercase", padding:"4px 9px",
                    display:"flex", alignItems:"center", gap:"6px",
                    boxShadow:"0 2px 10px rgba(0,0,0,0.3)"
                  }}>
                    <span>📍 {loc.distance}</span>
                    <span style={{color:"rgba(255,255,255,0.35)"}}>|</span>
                    <span>⏱ {loc.time}</span>
                  </div>
                </div>

                <div className="offer-card-body" style={{padding:"1.5rem"}}>
                  <div style={{fontFamily:"var(--font-sans)",fontSize:"9.5px",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--muted)",marginBottom:"0.35rem"}}>
                    {loc.category}
                  </div>
                  <div className="offer-card-title" style={{fontSize:"1.12rem",lineHeight:1.3,marginBottom:"0.6rem"}}>
                    {loc.name}
                  </div>
                  <div className="offer-card-desc" style={{fontSize:"12px",lineHeight:1.75,marginBottom:"1rem"}}>
                    {loc.desc}
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"0.75rem",borderTop:"1px solid var(--border)"}}>
                    <span style={{fontFamily:"var(--font-sans)",fontSize:"10px",color:"var(--gold3)",fontWeight:600,letterSpacing:"0.06em"}}>
                      ★ {loc.highlight}
                    </span>
                    <span className="text-link text-link-gold" style={{fontSize:"10px"}}>Plan Visit →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────────── */}
      <section id="our-story" style={{ background: "var(--cream)", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <div className="section-eyebrow">Heritage &amp; Pedigree</div>
            <h2 className="section-title">Master Builders of <em>the Kumaon Hills.</em></h2>
            <span className="gold-rule"></span>
            <p className="section-body" style={{ marginBottom: "1.25rem" }}>
              Founded with deep reverence for Uttarakhand's topography, our design-build studio fuses classical vernacular traditions with contemporary architectural precision. We build with stone, wood, slate and glass — heirloom residences that endure for generations.
            </p>
            <p className="section-body" style={{ marginBottom: "2.5rem" }}>
              Operating near Kainchi Dham, we honour Maharaj-ji's teaching of harmony with nature. Zero single-use plastics. Over 80% of materials sourced within 40 km. All our artisans are village craftsmen of the Kumaon hills.
            </p>

            <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)", marginTop: "1rem" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold3)", marginBottom: "0.85rem" }}>
                Nearby Locations &amp; Distances from Hotel
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", fontSize: "11px", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid var(--border)", color: "var(--navy)", fontSize: "9.5px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                      <th style={{ padding: "6px 8px 6px 0" }}>Destination</th>
                      <th style={{ padding: "6px 8px", whiteSpace: "nowrap" }}>Distance</th>
                      <th style={{ padding: "6px 8px", whiteSpace: "nowrap" }}>Time (-5m)</th>
                      <th style={{ padding: "6px 0 6px 8px" }}>Highlights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dest: "Kainchi Dham (Neem Karoli Baba Ashram)", dist: "12 km", time: "25 mins", hl: "Sacred river valley, daily satsang & aarti" },
                      { dest: "Bhimtal Lake & Island Aquarium", dist: "8 km", time: "15 mins", hl: "Victorian dam, kayaking & center-island cafe" },
                      { dest: "Sattal (Seven Interconnected Lakes)", dist: "10 km", time: "20 mins", hl: "Oak & pine forests, rare birdwatching trails" },
                      { dest: "Ghorakhal Golu Devta Mandir", dist: "11 km", time: "20 mins", hl: "Historic brass bell temple overlooking tea gardens" },
                      { dest: "Nainital (Naini Lake & Mall Road)", dist: "18 km", time: "35 mins", hl: "Naini Lake, Naina Devi Mandir & ropeway" },
                      { dest: "Naukuchiatal (Nine-Cornered Lake)", dist: "12 km", time: "20 mins", hl: "Deepest lake in region, tandem paragliding" },
                      { dest: "Mukteshwar Ridge & Chauli Ki Jali", dist: "28 km", time: "55 mins", hl: "7,500 ft cliff with 180° Trishul & Nanda Devi snow peaks" },
                      { dest: "Chafi Kalsa River Trail & Cascades", dist: "1.2 km", time: "10 mins", hl: "Natural swimming pools right from hotel doorstep" },
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(226,221,214,0.6)" }}>
                        <td style={{ padding: "7px 8px 7px 0", color: "var(--navy)", fontWeight: 600 }}>{row.dest}</td>
                        <td style={{ padding: "7px 8px", color: "var(--gold3)", fontWeight: 700, whiteSpace: "nowrap" }}>{row.dist}</td>
                        <td style={{ padding: "7px 8px", color: "var(--navy)", whiteSpace: "nowrap" }}>{row.time}</td>
                        <td style={{ padding: "7px 0 7px 8px", color: "var(--text-light)", fontSize: "10.5px" }}>{row.hl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden", borderTop: "2px solid var(--gold)" }}>
              <img src="assets/the-hill-serenity-facade.jpg" alt="The Hill Serenity Facade" className="vision-img" style={{ width: "100%", height: "540px", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ position: "absolute", bottom: "1rem", right: "1rem", background: "var(--navy)", color: "var(--gold2)", fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "6px 14px" }}>
              Official Architectural Facade
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: "var(--cream)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Get in Touch</div>
          <h2 className="section-title">Begin Your <em>Architectural Journey</em></h2>
          <span className="gold-rule gold-rule-center"></span>
          <p className="section-body" style={{ maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            For reservations, bespoke architectural commissions or partnership enquiries, our team responds within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setReserve(true)}>Reserve a Stay</button>
            <a href="mailto:namaste@thehillserenity.com" className="btn-join">Email Us</a>
            <a href="https://maps.app.goo.gl/3wiknEp5PKnJ9Vbb9" target="_blank" rel="noopener noreferrer" className="btn-join">Find Us on Maps ↗</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="ths-footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">The Hill Serenity</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold2)", marginBottom: "0.75rem", fontWeight: 600 }}>Architecture &amp; Sanctuary</div>
            <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.45)", lineHeight: 1.9, maxWidth: "260px" }}>
              South Gola Range, Village Chafi, Near Kalsa River Bridge, Bhowali Tehsil, Nainital, Uttarakhand 263136
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "0.75rem" }}>✉ namaste@thehillserenity.com</p>
          </div>

          {[
            { title:"Explore", links:[["#homestay","The Homestay"],["#nearby","Nearby Places"],["#our-story","Our Story"],["#contact","Contact Us"]] },
            { title:"Stay", links:[["#","Boutique Suites"],["#","Seasonal Packages"],["#","Pilgrimage Stays"],["#","Private Dining"],["#","Wellness Retreats"]] },
            { title:"Connect", links:[["#","Membership"],["#","Press & Media"],["#contact","Contact Us"],["https://maps.app.goo.gl/3wiknEp5PKnJ9Vbb9","Google Maps ↗"]] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              {col.links.map(([href, label]) => (
                <a key={label} href={href} className="footer-link" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{label}</a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The Hill Serenity Architecture. All rights reserved.</span>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>Crafted with React · GSAP · Three.js</span>
        </div>
      </footer>

      {/* ── RESERVE MODAL ────────────────────────────────────────────── */}
      {reserveOpen && (
        <div className="modal-backdrop" onClick={() => { setReserve(false); setSubmitted(false); }}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setReserve(false); setSubmitted(false); }}>✕</button>

            <div className="modal-header">
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--gold3)", marginBottom: "0.4rem" }}>
                The Hill Serenity · Chafi, Nainital
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--navy)", fontWeight: 400 }}>Reserve a Stay</h2>
              <span className="gold-rule"></span>
            </div>

            <div className="modal-body">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✦</div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--navy)", marginBottom: "0.75rem" }}>Reservation Received</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", color: "var(--text-light)", lineHeight: 1.8, maxWidth: "360px", margin: "0 auto 2rem" }}>
                    Your request has been forwarded to our sanctuary team. Opening WhatsApp to connect with your dedicated concierge...
                  </p>
                  <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another Enquiry</button>
                </div>
              ) : (
                <form onSubmit={handleReserve}>
                  <div style={{ background: "rgba(181, 146, 44, 0.1)", border: "1px solid var(--gold)", padding: "10px 14px", marginBottom: "1.25rem", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--gold3)", textTransform: "uppercase", letterSpacing: "0.14em" }}>Selected Itinerary</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "12.5px", color: "var(--navy)", fontWeight: 500 }}>{bookingCheckin} → {bookingCheckout} · {bookingRooms} Room · {bookingAdults} Adults{bookingChildren > 0 ? `, ${bookingChildren} Children` : ""}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10.5px", fontWeight: 700, color: "#1B5E20", background: "rgba(76, 175, 80, 0.15)", padding: "3px 8px", borderRadius: "2px" }}>✓ Best Direct Rate Available</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                    {/* Full Name */}
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input type="text" name="name" required placeholder="Your name" className="form-input" />
                    </div>

                    {/* WhatsApp / Phone with Verification */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <label className="form-label" style={{ margin: 0 }}>WhatsApp / Phone *</label>
                        {phoneVerified ? (
                          <span className="verify-badge-success">✓ WhatsApp Verified</span>
                        ) : (
                          <button type="button" className="btn-verify-action" onClick={sendPhoneOtp}>
                            Verify Number
                          </button>
                        )}
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={phoneInput}
                        onChange={e => {
                          setPhoneInput(e.target.value);
                          setPhoneVerified(false);
                          setVerifyingPhone(false);
                        }}
                        placeholder="Enter your phone number"
                        className={`form-input ${phoneVerified ? "input-verified" : ""}`}
                      />

                      {/* Interactive Verification Drawer */}
                      {verifyingPhone && !phoneVerified && (
                        <div className="verification-drawer">
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                            <span style={{ fontSize: "11px", color: "var(--navy)", fontWeight: 600 }}>WhatsApp Verification Code:</span>
                            <span className="otp-pill">{simulatedOtp}</span>
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <input
                              type="text"
                              maxLength="4"
                              placeholder="4-digit code"
                              value={otpCode}
                              onChange={e => setOtpCode(e.target.value)}
                              style={{ width: "110px", padding: "6px 8px", fontSize: "12px", border: "1px solid var(--gold)", textAlign: "center", letterSpacing: "0.2em", fontWeight: 700 }}
                            />
                            <button
                              type="button"
                              className="btn-primary"
                              style={{ fontSize: "10px", padding: "6px 12px" }}
                              onClick={() => confirmPhoneOtp()}
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              className="btn-join"
                              style={{ fontSize: "10px", padding: "6px 10px" }}
                              onClick={() => confirmPhoneOtp(simulatedOtp)}
                            >
                              Auto-Verify
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Email Address with Gmail Verification */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <label className="form-label" style={{ margin: 0 }}>Email Address *</label>
                        {emailVerified ? (
                          <span className="verify-badge-success">✓ Gmail Verified</span>
                        ) : (
                          <button type="button" className="btn-verify-google" onClick={verifyWithGmail}>
                            ⚡ Verify with Gmail
                          </button>
                        )}
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={emailInput}
                        onChange={e => {
                          setEmailInput(e.target.value);
                          setEmailVerified(false);
                        }}
                        placeholder="you@email.com"
                        className={`form-input ${emailVerified ? "input-verified" : ""}`}
                      />
                    </div>

                    {/* Quick Verification Hint */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "rgba(181,146,44,0.06)", border: "1px dashed var(--gold)", padding: "10px 14px", borderRadius: "3px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--navy)", marginBottom: "3px" }}>Contact Verification Required</div>
                      <div style={{ fontSize: "10.5px", color: "var(--muted)", lineHeight: 1.4 }}>
                        {phoneVerified || emailVerified ? (
                          <span style={{ color: "#1B5E20", fontWeight: 600 }}>✓ Contact verified! You are ready to reserve.</span>
                        ) : (
                          <span>Verify either your WhatsApp or Gmail to complete reservation.</span>
                        )}
                      </div>
                    </div>

                    {/* Dedicated Room & Guest Selector (Max 3 people per room) */}
                    <div className="room-guest-selector-card" style={{ gridColumn: "span 2" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold3)" }}>
                          Rooms &amp; Guests Allocation
                        </div>
                        <span className="capacity-pill-highlight">
                          Rule: Max 3 people per room
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        {/* Number of Rooms */}
                        <div className="selector-control-box">
                          <div>
                            <div className="selector-control-label">Number of Rooms</div>
                            <div className="selector-control-sub">{modalRooms} Suite{modalRooms > 1 ? "s" : ""} (Max {modalRooms * 3} guests)</div>
                          </div>
                          <div className="counter-btn-group">
                            <button
                              type="button"
                              className="counter-action-btn"
                              disabled={modalRooms <= 1}
                              onClick={() => handleModalRooms(modalRooms - 1)}
                            >
                              −
                            </button>
                            <span className="counter-action-value">{modalRooms}</span>
                            <button
                              type="button"
                              className="counter-action-btn"
                              disabled={modalRooms >= 4}
                              onClick={() => handleModalRooms(modalRooms + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Number of Guests */}
                        <div className="selector-control-box">
                          <div>
                            <div className="selector-control-label">Number of Guests</div>
                            <div className="selector-control-sub">In 1 room, only 3 can stay</div>
                          </div>
                          <div className="counter-btn-group">
                            <button
                              type="button"
                              className="counter-action-btn"
                              disabled={modalGuests <= 1}
                              onClick={() => handleModalGuests(modalGuests - 1)}
                            >
                              −
                            </button>
                            <span className="counter-action-value">{modalGuests}</span>
                            <button
                              type="button"
                              className="counter-action-btn"
                              disabled={modalGuests >= 12}
                              onClick={() => handleModalGuests(modalGuests + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {capacityNotice && (
                        <div className="capacity-notice-box">
                          <span>ⓘ</span> {capacityNotice}
                        </div>
                      )}
                    </div>

                    {/* Dates */}
                    <div>
                      <label className="form-label">Check-in Date</label>
                      <input type="date" name="checkin" defaultValue={bookingCheckin} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Check-out Date</label>
                      <input type="date" name="checkout" defaultValue={bookingCheckout} className="form-input" />
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label className="form-label">Interest / Package</label>
                    <select name="interest" defaultValue={bookingDestination} className="form-input" style={{ appearance: "none", WebkitAppearance: "none" }}>
                      <option value="Homestay — The Hill Serenity, Chafi">Homestay — The Hill Serenity, Chafi</option>
                      <option value="Cedar Veranda Homestay Suite (270° Mountain View)">Cedar Veranda Homestay Suite</option>
                      <option value="Valley Sunrise Alpine Dormer Suite">Valley Sunrise Suite</option>
                      <option value="Entire Homestay Private Buyout (Up to 12 Guests)">Entire Homestay Buyout</option>
                      <option value="Kainchi Dham Pilgrimage Stay">Kainchi Dham Pilgrimage Stay</option>
                      <option value="Monsoon Mist Retreat">Monsoon Mist Retreat</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label className="form-label">Special Requests / Notes</label>
                    <textarea name="notes" rows="3" placeholder="Preferred suite view, dietary requirements, occasion..." className="form-input" style={{ resize: "vertical" }}></textarea>
                  </div>

                  {verificationNotice && (
                    <div className="verification-alert-banner">
                      <span>⚠️</span>
                      <div style={{ flex: 1 }}>{verificationNotice}</div>
                      <button
                        type="button"
                        className="btn-join"
                        style={{ fontSize: "10px", padding: "4px 10px" }}
                        onClick={() => {
                          if (phoneInput && phoneInput.replace(/[^0-9]/g, "").length >= 10) {
                            sendPhoneOtp();
                          } else {
                            verifyWithGmail();
                          }
                        }}
                      >
                        Quick Verify
                      </button>
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
                    <button type="submit" className="btn-primary">Confirm Enquiry via WhatsApp 💬</button>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--muted)", letterSpacing: "0.06em" }}>🔒 Strict privacy · 24-hr response</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MEMBERSHIP MODAL ─────────────────────────────────────────── */}
      {memberOpen && (
        <div className="modal-backdrop" onClick={() => setMemberOpen(false)}>
          <div className="modal-box" style={{ maxWidth: "520px" }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setMemberOpen(false)}>✕</button>
            <div className="modal-header">
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--gold3)", marginBottom: "0.4rem" }}>
                Sanctuary Circle
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--navy)", fontWeight: 400 }}>Join / Sign In</h2>
              <span className="gold-rule"></span>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "1.25rem" }}>
                <label className="form-label">Email Address</label>
                <input type="email" placeholder="you@email.com" className="form-input" />
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <label className="form-label">Password</label>
                <input type="password" placeholder="••••••••" className="form-input" />
              </div>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: "1rem" }}>Sign In</button>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--muted)" }}>New patron? </span>
                <span className="text-link" style={{ fontSize: "12px", cursor: "pointer" }}>Create Membership →</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DESTINATION DETAIL MODAL ──────────────────────────────────── */}
      {selDest && (
        <div className="modal-backdrop" onClick={() => setSelDest(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelDest(null)}>✕</button>
            <div style={{ height: "320px", overflow: "hidden", borderTop: "2px solid var(--gold)" }}>
              <img src={selDest.img} alt={selDest.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "2rem 3rem 3rem" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold3)", marginBottom: "0.4rem" }}>
                {selDest.tag} · {selDest.location}
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--navy)", fontWeight: 400, marginBottom: "0.5rem" }}>{selDest.name}</h3>
              <span className="gold-rule" style={{ marginBottom: "1.25rem" }}></span>
              <p className="section-body" style={{ marginBottom: "2rem" }}>{selDest.desc}</p>
              <p className="section-body" style={{ marginBottom: "2rem", fontSize: "12.5px", color: "var(--muted)" }}>{selDest.specs}</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => { setSelDest(null); setReserve(true); }}>Reserve a Stay</button>
                <button className="btn-join" onClick={() => setSelDest(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
