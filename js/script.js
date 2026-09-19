/* =========================================================
   MOON BESTIE BIRTHDAY — FINAL SCRIPT
   ========================================================= */

"use strict";

let friendName = "";

document.addEventListener("DOMContentLoaded", () => {


  /* =========================================================
     DATE LOCK
     19 SEPTEMBER 2026 — 12:00 AM
     ========================================================= */

  const TEST_MODE = new URLSearchParams(window.location.search).has("test");

  // September = month 8 in JavaScript
  const UNLOCK_DATE = new Date(2026, 8, 20, 0, 0, 0);

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     ELEMENTS 
     ========================================================= */

  const loading = document.getElementById("loading");

  const lockedScreen = document.getElementById("locked-screen");
  const lockedContent = document.getElementById("locked-content");
  const revealMessage = document.getElementById("reveal-message");
  const unlockEnterBtn = document.getElementById("unlock-enter-btn");

  const mainScenes = document.getElementById("main-scenes");

  const countdownDays = document.getElementById("cd-days");
  const countdownHours = document.getElementById("cd-hours");
  const countdownMinutes = document.getElementById("cd-minutes");
  const countdownSeconds = document.getElementById("cd-seconds");

  let countdownTimer = null;
  let isUnlocked = false;

  /* =========================================================
     LOADING SCREEN
     ========================================================= */

  window.addEventListener("load", () => {
    setTimeout(() => {
      loading?.classList.add("hide");
    }, 900);
  });

  /* =========================================================
     DATE CHECK
     ========================================================= */

  function isUnlockedNow() {
    if (TEST_MODE) return true;
    return new Date() >= UNLOCK_DATE;
  }

  function updateCountdown() {
    if (TEST_MODE || new Date() >= UNLOCK_DATE) {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }

      triggerUnlockSequence();
      return;
    }

    const now = new Date();
    const difference = UNLOCK_DATE - now;

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    if (countdownDays)
      countdownDays.textContent =
        String(days).padStart(2, "0");

    if (countdownHours)
      countdownHours.textContent =
        String(hours).padStart(2, "0");

    if (countdownMinutes)
      countdownMinutes.textContent =
        String(minutes).padStart(2, "0");

    if (countdownSeconds)
      countdownSeconds.textContent =
        String(seconds).padStart(2, "0");
  }

  /* =========================================================
     UNLOCK ANIMATION
     ========================================================= */

  function triggerUnlockSequence() {
    if (isUnlocked) return;

    isUnlocked = true;

    if (!reduceMotion) {
      if (typeof window.burstFireworks === "function") {
        window.burstFireworks(
          window.innerWidth / 2,
          window.innerHeight * 0.35
        );

        setTimeout(() => {
          window.burstFireworks(
            window.innerWidth * 0.3,
            window.innerHeight * 0.45
          );
        }, 300);

        setTimeout(() => {
          window.burstFireworks(
            window.innerWidth * 0.7,
            window.innerHeight * 0.45
          );
        }, 600);
      }

      if (typeof window.spawnShootingStar === "function") {
        window.spawnShootingStar();

        setTimeout(
          window.spawnShootingStar,
          400
        );

        setTimeout(
          window.spawnShootingStar,
          800
        );
      }
    }

    if (lockedContent) {
      lockedContent.style.display = "none";
    }

    revealMessage?.classList.add("active");
  }

  /* =========================================================
     ENTER MAIN UNIVERSE
     ========================================================= */

  function enterMainUniverse() {
    lockedScreen?.classList.add("hidden");

    mainScenes?.classList.remove("locked-hidden");

    document
      .getElementById("s-intro")
      ?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth"
      });

    try {
      if (
        window.ytPlayer &&
        window.ytReady
      ) {
        window.ytPlayer.playVideo();
        window.ytPlayer.unMute();

        document
          .getElementById("sound-toggle")
          ?.classList.add("show");
      }
    } catch (error) {
      console.log(
        "YouTube autoplay was blocked by browser policy."
      );
    }
  }

  unlockEnterBtn?.addEventListener(
    "click",
    enterMainUniverse
  );

  /* =========================================================
     INITIAL DATE LOCK
     ========================================================= */

  if (isUnlockedNow()) {
    triggerUnlockSequence();
  } else {
    updateCountdown();

    countdownTimer = setInterval(
      updateCountdown,
      1000
    );
  }

  /* =========================================================
     MOON → ABOUT HER
     ========================================================= */

  const moonWrap =
    document.getElementById("moon-wrap");

  const aboutSection =
    document.getElementById("s-about");

  function goToAboutHer() {
    aboutSection?.scrollIntoView({
      behavior: reduceMotion
        ? "auto"
        : "smooth",
      block: "start"
    });
  }

  moonWrap?.addEventListener(
    "click",
    goToAboutHer
  );

  moonWrap?.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        goToAboutHer();
      }
    }
  );

  /* =========================================================
     STARFIELD
     ========================================================= */

  const starCanvas =
    document.getElementById("starfield");

  const starCtx =
    starCanvas?.getContext("2d");

  let stars = [];
  let starWidth = 0;
  let starHeight = 0;

  function resizeStars() {
    if (!starCanvas) return;

    starWidth =
      starCanvas.width =
      window.innerWidth;

    starHeight =
      starCanvas.height =
      window.innerHeight;

    const count = Math.floor(
      (starWidth * starHeight) / 9000
    );

    stars = new Array(count)
      .fill(null)
      .map(() => ({
        x: Math.random() * starWidth,
        y: Math.random() * starHeight,
        r: Math.random() * 1.3 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005
      }));
  }

  window.addEventListener(
    "resize",
    resizeStars
  );

  resizeStars();

  let pulseFactor = 1;

  function drawStars(time) {
    if (!starCtx) return;

    starCtx.clearRect(
      0,
      0,
      starWidth,
      starHeight
    );

    for (const star of stars) {
      const twinkle = reduceMotion
        ? 0.85
        : (
          0.55 +
          0.45 *
          Math.sin(
            time *
            star.speed +
            star.phase
          )
        ) *
        pulseFactor;

      starCtx.globalAlpha =
        Math.min(twinkle, 1);

      starCtx.fillStyle = "#f2ecd9";

      starCtx.beginPath();

      starCtx.arc(
        star.x,
        star.y,
        star.r,
        0,
        Math.PI * 2
      );

      starCtx.fill();
    }

    starCtx.globalAlpha = 1;
  }

  if (!reduceMotion) {
    function starLoop(time) {
      drawStars(time * 0.06);
      requestAnimationFrame(starLoop);
    }

    requestAnimationFrame(starLoop);
  } else {
    drawStars(0);
  }

  /* =========================================================
     CLOUDS
     ========================================================= */

  const clouds =
    document.getElementById("clouds");

  if (clouds && !reduceMotion) {
    for (let i = 0; i < 5; i++) {
      const cloud =
        document.createElement("div");

      cloud.className = "cloud";

      cloud.style.top =
        10 +
        Math.random() * 70 +
        "vh";

      cloud.style.animationDuration =
        40 +
        Math.random() * 40 +
        "s";

      cloud.style.animationDelay =
        -Math.random() * 40 +
        "s";

      cloud.style.opacity =
        0.3 +
        Math.random() * 0.3;

      clouds.appendChild(cloud);
    }
  }

  /* =========================================================
     EFFECT CANVAS
     ========================================================= */

  const fxCanvas =
    document.getElementById("fx-canvas");

  const fxCtx =
    fxCanvas?.getContext("2d");

  function resizeFX() {
    if (!fxCanvas) return;

    fxCanvas.width =
      window.innerWidth;

    fxCanvas.height =
      window.innerHeight;
  }

  window.addEventListener(
    "resize",
    resizeFX
  );

  resizeFX();

  let shootingStars = [];
  let fireworks = [];

  function spawnShootingStar() {
    if (!fxCanvas) return;

    shootingStars.push({
      x:
        Math.random() *
        fxCanvas.width *
        0.6,

      y:
        Math.random() *
        fxCanvas.height *
        0.3,

      vx:
        6 +
        Math.random() * 4,

      vy:
        3 +
        Math.random() * 2,

      life: 1
    });
  }

  window.spawnShootingStar =
    spawnShootingStar;

  function burstFireworks(x, y) {
    if (!fxCanvas) return;

    for (let i = 0; i < 90; i++) {
      const angle =
        Math.random() *
        Math.PI *
        2;

      const speed =
        1 +
        Math.random() * 4;

      fireworks.push({
        x,
        y,

        vx:
          Math.cos(angle) *
          speed,

        vy:
          Math.sin(angle) *
          speed,

        life: 1,

        decay:
          0.008 +
          Math.random() * 0.01
      });
    }
  }

  window.burstFireworks =
    burstFireworks;

  function fxLoop() {
    if (!fxCtx || !fxCanvas) return;

    fxCtx.clearRect(
      0,
      0,
      fxCanvas.width,
      fxCanvas.height
    );

    shootingStars.forEach(
      (star) => {
        fxCtx.strokeStyle =
          "rgba(242,236,217," +
          star.life +
          ")";

        fxCtx.lineWidth = 2;

        fxCtx.beginPath();

        fxCtx.moveTo(
          star.x,
          star.y
        );

        fxCtx.lineTo(
          star.x -
          star.vx * 6,

          star.y -
          star.vy * 6
        );

        fxCtx.stroke();

        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.02;
      }
    );

    shootingStars =
      shootingStars.filter(
        (star) =>
          star.life > 0
      );

    fireworks.forEach(
      (particle) => {
        fxCtx.globalAlpha =
          Math.max(
            particle.life,
            0
          );

        fxCtx.fillStyle =
          "#f2ecd9";

        fxCtx.beginPath();

        fxCtx.arc(
          particle.x,
          particle.y,
          1.6,
          0,
          Math.PI * 2
        );

        fxCtx.fill();

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;

        particle.vy += 0.01;

        particle.life -=
          particle.decay;
      }
    );

    fxCtx.globalAlpha = 1;

    fireworks =
      fireworks.filter(
        (particle) =>
          particle.life > 0
      );

    requestAnimationFrame(
      fxLoop
    );
  }

  if (!reduceMotion) {
    requestAnimationFrame(
      fxLoop
    );

    setInterval(() => {
      if (
        Math.random() < 0.5
      ) {
        spawnShootingStar();
      }
    }, 6000);
  }

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const scenes =
    document.querySelectorAll(
      "section.scene"
    );

  const sceneObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "in-view"
              );
            }
          }
        );
      },
      {
        threshold: 0.35
      }
    );

  scenes.forEach(
    (scene) =>
      sceneObserver.observe(scene)
  );

  /* =========================================================
     BIRTHDAY FIREWORKS
     ========================================================= */

  const dateScene =
    document.getElementById(
      "s-date"
    );

  let dateFireworksShown =
    false;

  if (dateScene) {
    const dateObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting &&
                !dateFireworksShown
              ) {
                dateFireworksShown = true;

                if (!reduceMotion) {
                  burstFireworks(
                    fxCanvas.width / 2,
                    fxCanvas.height * 0.35
                  );

                  setTimeout(
                    () =>
                      burstFireworks(
                        fxCanvas.width *
                        0.3,

                        fxCanvas.height *
                        0.45
                      ),
                    300
                  );

                  setTimeout(
                    () =>
                      burstFireworks(
                        fxCanvas.width *
                        0.7,

                        fxCanvas.height *
                        0.45
                      ),
                    600
                  );
                }
              }
            }
          );
        },
        {
          threshold: 0.5
        }
      );

    dateObserver.observe(
      dateScene
    );
  }

  /* =========================================================
     INTRO SEQUENCE
     ========================================================= */

  const introLines = [
    "line1",
    "line2",
    "line3",
    "line4",
    "line5"
  ];

  let introIndex = 1;

  function revealNextIntroLine() {
    if (
      introIndex <
      introLines.length
    ) {
      document
        .getElementById(
          introLines[introIndex]
        )
        ?.classList.add("show");

      introIndex++;

      setTimeout(
        revealNextIntroLine,
        1300
      );
    } else {
      document
        .getElementById(
          "name-block"
        )
        ?.classList.add("show");

      document
        .getElementById(
          "enter-block"
        )
        ?.classList.add("show");
    }
  }

  setTimeout(
    revealNextIntroLine,
    1600
  );

  /* =========================================================
     YOUTUBE
     ========================================================= */

  let ytPlayer = null;
  let ytReady = false;

  window.ytPlayer = null;
  window.ytReady = false;

  window.onYouTubeIframeAPIReady =
    function () {
      if (
        typeof YT ===
        "undefined"
      ) {
        return;
      }

      ytPlayer =
        new YT.Player(
          "yt-player",
          {
            events: {
              onReady: () => {
                ytReady = true;

                window.ytPlayer =
                  ytPlayer;

                window.ytReady =
                  true;
              },

              onStateChange: (
                event
              ) => {
                if (
                  event.data ===
                  YT.PlayerState.PLAYING
                ) {
                  pulseFactor = 1.4;
                } else {
                  pulseFactor = 1;
                }
              }
            }
          }
        );
    };

  const youtubeAPI =
    document.createElement(
      "script"
    );

  youtubeAPI.src =
    "https://www.youtube.com/iframe_api";

  document.head.appendChild(
    youtubeAPI
  );

  /* =========================================================
     SOUND BUTTON
     ========================================================= */

  const soundToggle =
    document.getElementById(
      "sound-toggle"
    );

  let muted = false;

  soundToggle?.addEventListener(
    "click",
    () => {
      if (!ytPlayer) return;

      muted = !muted;

      if (muted) {
        ytPlayer.mute();

        soundToggle.textContent =
          "🔇";
      } else {
        ytPlayer.unMute();

        soundToggle.textContent =
          "🔊";
      }
    }
  );

  /* =========================================================
     ENTER NIGHT BUTTON
     ========================================================= */

  const nameInput =
    document.getElementById(
      "name-input"
    );

  const enterBtn =
    document.getElementById(
      "enter-btn"
    );

  enterBtn?.addEventListener(
    "click",
    () => {
      friendName =
        nameInput?.value.trim() ||
        "";

      try {
        if (
          ytPlayer &&
          ytReady
        ) {
          ytPlayer.playVideo();
          ytPlayer.unMute();

          soundToggle?.classList.add(
            "show"
          );
        }
      } catch (error) {
        console.log(
          "YouTube playback requires user interaction."
        );
      }

      document
        .getElementById(
          "s-moon"
        )
        ?.scrollIntoView({
          behavior:
            reduceMotion
              ? "auto"
              : "smooth"
        });

      if (
        !reduceMotion &&
        typeof gsap !==
        "undefined"
      ) {
        gsap.fromTo(
          "#moon-wrap",

          {
            scale: 0.6,
            opacity: 0.4
          },

          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
            delay: 0.3
          }
        );
      }
    }
  );

  nameInput?.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        enterBtn?.click();
      }
    }
  );

  /* =========================================================
     FRIENDSHIP ORBIT
     ========================================================= */

  const orbitWrap = document.getElementById("orbit-wrap");

  const orbitPlanets = [
    { emoji: "🌙", label: "our nonsense", number: 1 },
    { emoji: "✨", label: "our memories", number: 2 },
    { emoji: "💫", label: "trust", number: 3 },
    { emoji: "🌟", label: "inside jokes", number: 4 },
    { emoji: "🫶", label: "late-night talks", number: 5 }
  ];

  const orbitRadii = [90, 140, 175, 130, 105];
  const orbitSpeeds = [18, 25, 20, 28, 22];
  const orbitOffsets = [0, 72, 144, 216, 288];

  if (orbitWrap) {
    // Draw dashed rings
    [90, 140, 175, 130, 105].forEach(r => {
      const ring = document.createElement("div");
      ring.className = "orbit-ring";
      ring.style.width = `${r * 2}px`;
      ring.style.height = `${r * 2}px`;
      orbitWrap.appendChild(ring);
    });

    orbitPlanets.forEach((planet, i) => {
      const body = document.createElement("div");
      body.className = "orbit-body orbit-item";
      body.style.animationDuration = `${orbitSpeeds[i]}s`;
      body.style.animationDelay = `-${(orbitOffsets[i] / 360) * orbitSpeeds[i]}s`;

      const pl = document.createElement("div");
      pl.className = "orbit-planet";
      pl.style.left = `${orbitRadii[i]}px`;
      pl.setAttribute("role", "button");
      pl.setAttribute("tabindex", "0");
      pl.setAttribute("aria-label", `Open memory: ${planet.label}`);
      pl.innerHTML = `${planet.emoji}<span class="tip">${planet.label}</span>`;

      pl.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        pl.classList.add("sparkle-active");
        setTimeout(() => pl.classList.remove("sparkle-active"), 700);
        openMemoryImage(planet.number);
      });

      pl.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMemoryImage(planet.number);
      }, { passive: false });

      pl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pl.click();
        }
      });

      body.appendChild(pl);
      orbitWrap.appendChild(body);
    });
  }

}); // end DOMContentLoaded

/* =========================================================
   UNIFIED CINEMATIC MEMORY VIEWER
   ========================================================= */

const memoryViewer = document.getElementById('memory-viewer');
const memoryViewerImg = document.getElementById('memory-viewer-img');
const memoryViewerCaption = document.getElementById('memory-viewer-caption');
const memoryViewerClose = document.getElementById('memory-viewer-close');
const memoryViewerBackdrop = document.getElementById('memory-viewer-backdrop');

let _viewerEscHandler = null;
let _viewerOpen = false;

function openUnifiedViewer(imagePath, caption) {
  if (!memoryViewer) return;

  // Set image and caption
  memoryViewerImg.src = imagePath;
  memoryViewerImg.alt = caption || 'Memory';
  memoryViewerCaption.textContent = caption || '';

  // Reset scale for animation
  const box = document.getElementById('memory-viewer-box');
  if (box) {
    box.style.transform = 'scale(0.8)';
    box.style.opacity = '0';
  }

  memoryViewer.setAttribute('aria-hidden', 'false');
  memoryViewer.classList.add('open');
  document.body.style.overflow = 'hidden';
  _viewerOpen = true;

  // Animate in after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (box) {
        box.style.transition = 'transform 0.5s cubic-bezier(.2,.8,.2,1), opacity 0.5s ease';
        box.style.transform = 'scale(1)';
        box.style.opacity = '1';
      }
    });
  });

  // ESC to close
  if (_viewerEscHandler) document.removeEventListener('keydown', _viewerEscHandler);
  _viewerEscHandler = (e) => { if (e.key === 'Escape') closeUnifiedViewer(); };
  document.addEventListener('keydown', _viewerEscHandler);

  // Error handler
  memoryViewerImg.onerror = () => {
    console.error('Viewer: could not load image:', imagePath);
    memoryViewerCaption.textContent = 'Image could not be loaded.';
  };
}

function closeUnifiedViewer() {
  if (!memoryViewer || !_viewerOpen) return;
  _viewerOpen = false;

  const box = document.getElementById('memory-viewer-box');
  if (box) {
    box.style.transition = 'transform 0.35s cubic-bezier(.2,.8,.2,1), opacity 0.35s ease';
    box.style.transform = 'scale(0.85)';
    box.style.opacity = '0';
  }

  memoryViewer.classList.remove('open');
  memoryViewer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (_viewerEscHandler) {
    document.removeEventListener('keydown', _viewerEscHandler);
    _viewerEscHandler = null;
  }

  setTimeout(() => {
    if (memoryViewerImg) memoryViewerImg.src = '';
  }, 400);
}

memoryViewerClose?.addEventListener('click', closeUnifiedViewer);
memoryViewerBackdrop?.addEventListener('click', closeUnifiedViewer);

window.openUnifiedViewer = openUnifiedViewer;
window.closeUnifiedViewer = closeUnifiedViewer;

/* =========================================================
   ORBIT MEMORY IMAGE POPUP — now uses unified viewer
   ========================================================= */

/* openMemoryImage defined below — do not duplicate */
/* =========================================================
   ORBIT MEMORY — MAKE EVERY OPTION CLICKABLE
   ========================================================= */

const orbitMemoryData = [
  {
    number: 1,
    label: "our nonsense",
    image: "images/memories/1.jpeg"
  },
  {
    number: 2,
    label: "our memories",
    image: "images/memories/2.jpeg"
  },
  {
    number: 3,
    label: "trust",
    image: "images/memories/3.jpeg"
  },
  {
    number: 4,
    label: "inside jokes",
    image: "images/memories/4.jpeg"
  },
  {
    number: 5,
    label: "late-night talks",
    image: "images/memories/5.jpeg"
  }
];


/* ---------------------------------------------------------
   EXISTING FUNCTION — KEEP THIS
   --------------------------------------------------------- */

function openMemoryImage(number, originEl = null) {

  const data = orbitMemoryData[number - 1];

  if (!data) {
    console.warn("No memory found for:", number);
    return;
  }

  console.log(`Orbit clicked: ${data.label} -> ${data.image}`);

  /* Click -> visible sparkle burst -> unified viewer */
  sparkleAndOpen(data.image, data.label, originEl);
}


/* orbit-item events are now wired inside DOMContentLoaded above */
/* =========================================================
   LETTER
   ========================================================= */

const envelope = document.getElementById("envelope");
const letterText = document.getElementById("letter-text");
const envelopeHint = document.getElementById("envelope-hint");

envelope?.addEventListener("click", () => {
  envelope.classList.add("open");

  setTimeout(() => {
    letterText?.classList.add("shown");

    if (envelopeHint) {
      envelopeHint.style.display = "none";
    }
  }, 500);
});
/* =========================================================
   MEMORY GALLERY — BLACK QUOTE FRAMES
   17 PHOTOS — CIRCULAR MEMORY STYLE
   ========================================================= */

const galleryInner = document.getElementById("gallery-inner");
const galleryStage = document.getElementById("gallery-stage");


/* =========================================================
   17 MEMORY PHOTOS
   ========================================================= */

const memoryPhotos = [
  {
    num: 1,
    quote: "My favourite kind of chaos. 😂",
    caption: "One of those moments I would happily replay."
  },
  {
    num: 2,
    quote: "Certified nonsense partner. 😂",
    caption: "Certified nonsense moment."
  },
  {
    num: 3,
    quote: "Some memories never really fade.",
    caption: "Some memories never really fade."
  },
  {
    num: 4,
    quote: "Chasing moments, collecting memories.",
    caption: "Chasing moonlight and memories."
  },
  {
    num: 5,
    quote: "Under the same beautiful moon. 🌙",
    caption: "Under the same beautiful moon."
  },
  {
    num: 6,
    quote: "Forever one of my favourites. ❤️",
    caption: "Forever one of my favourite memories."
  },
  {
    num: 7,
    quote: "Soft moments. Loud laughter. ✨",
    caption: "Soft starlight and shared laughter."
  },
  {
    num: 8,
    quote: "A little spark in the dark.",
    caption: "A little spark in the dark sky."
  },
  {
    num: 9,
    quote: "Written somewhere in the stars. 🌌",
    caption: "Another story written in the stars."
  },
  {
    num: 10,
    quote: "Unforgettable, just like you. 🫶",
    caption: "Unforgettable moments with my bestie."
  },
  {
    num: 11,
    quote: "You make ordinary nights brighter.",
    caption: "Making every night a little brighter."
  },
  {
    num: 12,
    quote: "One memory. An entire galaxy. 🌌",
    caption: "A memory worth an entire galaxy."
  },
  {
    num: 13,
    quote: "Her little universe. 🌙",
    caption: "Her little universe, perfectly captured."
  },
  {
    num: 14,
    quote: "This one still makes me smile. ❤️",
    caption: "This one always makes me smile."
  },
  {
    num: 15,
    quote: "A moment worth replaying forever.",
    caption: "One of those moments I would happily replay."
  },
  {
    num: 16,
    quote: "Best memories are made unexpectedly.",
    caption: "A beautiful memory with my bestie."
  },
  {
    num: 17,
    quote: "Some people become memories. You became a feeling. ❤️",
    caption: "A memory I will always keep close."
  }
];


/* =========================================================
   FLOATING POSITIONS
   9 TOP + 8 BOTTOM
   ========================================================= */

const cardPositions = [

  /* TOP ROW — 9 */

  { left: "1%", top: "3%", rot: "-4deg" },
  { left: "12%", top: "3%", rot: "3deg" },
  { left: "23%", top: "3%", rot: "-2deg" },
  { left: "34%", top: "3%", rot: "4deg" },
  { left: "45%", top: "3%", rot: "-3deg" },
  { left: "56%", top: "3%", rot: "2deg" },
  { left: "67%", top: "3%", rot: "-3deg" },
  { left: "78%", top: "3%", rot: "4deg" },
  { left: "89%", top: "3%", rot: "-2deg" },

  /* BOTTOM ROW — 8 */

  { left: "1%", top: "53%", rot: "3deg" },
  { left: "14%", top: "53%", rot: "-4deg" },
  { left: "27%", top: "53%", rot: "2deg" },
  { left: "40%", top: "53%", rot: "-3deg" },
  { left: "53%", top: "53%", rot: "4deg" },
  { left: "66%", top: "53%", rot: "-2deg" },
  { left: "79%", top: "53%", rot: "3deg" },
  { left: "92%", top: "53%", rot: "-3deg" }
];


/* =========================================================
   FLOAT ANIMATIONS
   ========================================================= */

const floatAnims = [
  "cardFloat1",
  "cardFloat2",
  "cardFloat3",
  "cardFloat4",
  "cardFloat5",
  "cardFloat6",
  "cardFloat7",
  "cardFloat8",
  "cardFloat9",
  "cardFloat10",
  "cardFloat11",
  "cardFloat12",
  "cardFloat13",
  "cardFloat14",
  "cardFloat1",
  "cardFloat5",
  "cardFloat9"
];

const floatDurations = [
  10, 13, 11, 15, 9, 12, 14, 10, 13,
  11, 15, 9, 12, 14, 10, 13, 11
];

const floatDelays = [
  0, -3, -6, -1, -4, -7, -2, -5, -8,
  -0.5, -3.5, -6.5, -1.5, -4.5, -7, -2.5, -5.5
];


/* =========================================================
   CREATE 17 BLACK MEMORY FRAMES
   ========================================================= */

if (galleryInner) {

  galleryInner.innerHTML = "";

  memoryPhotos.forEach((photo, i) => {

    const pos = cardPositions[i];

    const imagePath =
      `images/memories/${photo.num}.jpeg`;

    const card =
      document.createElement("div");

    card.className =
      "photo-card memory-black-card";


    /* POSITION */

    card.style.left =
      pos.left;

    card.style.top =
      pos.top;


    /* ROTATION */

    card.style.setProperty(
      "--card-rot",
      pos.rot
    );


    /* FLOAT */

    card.style.animationName =
      floatAnims[i];

    card.style.animationDuration =
      `${floatDurations[i]}s`;

    card.style.animationDelay =
      `${floatDelays[i]}s`;

    card.style.animationTimingFunction =
      "ease-in-out";

    card.style.animationIterationCount =
      "infinite";

    card.style.animationDirection =
      "alternate";


    /* ACCESSIBILITY */

    card.setAttribute(
      "tabindex",
      "0"
    );

    card.setAttribute(
      "role",
      "button"
    );

    card.setAttribute(
      "aria-label",
      `Memory ${photo.num}: ${photo.caption}`
    );


    /* =====================================================
       BLACK FRAME
       QUOTE CENTER
       CIRCULAR IMAGE
       ===================================================== */

    card.innerHTML = `

      <div class="memory-black-frame">

        <!-- CENTER QUOTE -->

        <div class="memory-center-quote">

          <span class="memory-quote-mark">“</span>

          <span class="memory-quote-text">
            ${photo.quote}
          </span>

          <span class="memory-quote-mark bottom">
            ”
          </span>

        </div>


        <!-- CIRCULAR IMAGE -->

        <div class="memory-circle">

          <div class="memory-circle-glow"></div>

          <div class="memory-circle-ring">

            <img
              class="memory-circle-image"
              src="${imagePath}"
              alt="Memory ${photo.num}"
              loading="lazy"
            >

          </div>

        </div>


        <!-- MEMORY NUMBER -->

        <div class="memory-number">
          MEMORY ${String(i + 1).padStart(2, "0")}
        </div>

      </div>

    `;


    /* =====================================================
       IMAGE ERROR
       ===================================================== */

    const image =
      card.querySelector(".memory-circle-image");

    if (image) {

      image.addEventListener(
        "error",
        function () {

          this.style.display = "none";

          const circle =
            this.closest(".memory-circle-ring");

          if (circle) {

            circle.innerHTML = `
              <div class="memory-image-fallback">
                🌙
              </div>
            `;

          }

          console.warn(
            "Gallery image not found:",
            imagePath
          );

        }
      );

    }


    /* =====================================================
       CLICK → SPARKLE → IMAGE OPEN
       ===================================================== */

    card.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        card.classList.add(
          "memory-card-selected"
        );

        card.style.animationPlayState =
          "paused";


        /* OPEN IMAGE */

        sparkleAndOpen(
          imagePath,
          photo.caption,
          card
        );


        setTimeout(() => {

          card.classList.remove(
            "memory-card-selected"
          );

          card.style.animationPlayState =
            "running";

        }, 1200);

      }
    );


    /* =====================================================
       KEYBOARD
       ===================================================== */

    card.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();
          event.stopPropagation();

          card.click();

        }

      }
    );


    galleryInner.appendChild(card);

  });

}


/* =========================================================
   SPARKLE EFFECT
   ========================================================= */

function spawnFlipSparkles(originEl, onDone) {
  const finish = typeof onDone === "function" ? onDone : () => { };

  if (!originEl || !document.body) {
    finish();
    return;
  }

  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const layer = document.createElement("div");
  layer.className = "memory-sparkle-layer";
  layer.style.left = `${cx}px`;
  layer.style.top = `${cy}px`;
  document.body.appendChild(layer);

  const ring = document.createElement("span");
  ring.className = "memory-sparkle-ring";
  layer.appendChild(ring);

  const flash = document.createElement("span");
  flash.className = "memory-sparkle-flash";
  layer.appendChild(flash);

  const symbols = ["✦", "✧", "✦", "⋆"];
  const colors = ["#ffffff", "#f2ecd9", "#ffd9f5", "#fff5a0", "#d9f0ff", "#cfd4ff"];
  const particleCount = 34;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "memory-sparkle-particle";
    particle.textContent = symbols[i % symbols.length];
    particle.style.color = colors[i % colors.length];
    particle.style.fontSize = `${10 + Math.random() * 14}px`;
    particle.style.setProperty("--angle", `${(i / particleCount) * 360 + (Math.random() * 16 - 8)}deg`);
    particle.style.setProperty("--distance", `${70 + Math.random() * 150}px`);
    particle.style.setProperty("--delay", `${Math.random() * 90}ms`);
    particle.style.setProperty("--spin", `${Math.random() * 260 - 130}deg`);
    layer.appendChild(particle);
  }

  originEl.classList.add("sparkling", "memory-card-selected");

  /* Let the viewer appear only after the sparkle has visibly burst. */
  window.setTimeout(() => {
    finish();
  }, 700);

  window.setTimeout(() => {
    layer.remove();
    originEl.classList.remove("sparkling", "memory-card-selected");
  }, 1150);
}


/* =========================================================
   SPARKLE → OPEN VIEWER
   ========================================================= */

function sparkleAndOpen(
  imagePath,
  caption,
  originEl
) {

  if (originEl) {

    originEl.classList.add(
      "sparkling"
    );


    setTimeout(
      () => {

        originEl.classList.remove(
          "sparkling"
        );

      },
      900
    );

  }


  spawnFlipSparkles(
    originEl,
    () => {

      if (
        typeof openUnifiedViewer ===
        "function"
      ) {

        openUnifiedViewer(
          imagePath,
          caption
        );

      }

    }
  );

}


/* =========================================================
   MEMORY REVEAL
   ========================================================= */

function openMemoryReveal(
  index,
  caption,
  card
) {

  const imagePath =
    `images/memories/${index + 1}.jpeg`;


  sparkleAndOpen(
    imagePath,
    caption,
    card
  );

}


/* =========================================================
   IF YOU WERE PART OF THE NIGHT
   ========================================================= */

const flipCardData = [

  {
    image:
      "images/memories/14.jpeg",
    caption:
      "She’d be the moon I’d spend every night looking up at."
  },

  {
    image:
      "images/memories/15.jpeg",
    caption:
      "The star I’d always notice first."
  },

  {
    image:
      "images/memories/7.jpeg",
    caption:
      "The cloud that makes moonlight more interesting."
  },

  {
    image:
      "images/memories/12.jpeg",
    caption:
      "A galaxy I’d happily get lost in forever."
  },

  {
    image:
      "images/memories/13.jpeg",
    caption:
      "The night I’d never want to end."
  }

];


/* =========================================================
   FLIP CARD CLICK EVENTS
   ========================================================= */

document
  .querySelectorAll(".flip-card")
  .forEach(
    (card, index) => {

      const fresh =
        card.cloneNode(true);


      card.parentNode.replaceChild(
        fresh,
        card
      );


      fresh.addEventListener(
        "click",
        (event) => {

          event.preventDefault();
          event.stopPropagation();


          const data =
            flipCardData[index];


          if (!data) return;


          fresh.classList.add(
            "sparkling"
          );


          setTimeout(
            () => {

              fresh.classList.remove(
                "sparkling"
              );

            },
            900
          );


          spawnFlipSparkles(
            fresh,
            () => {

              if (
                typeof openUnifiedViewer ===
                "function"
              ) {

                openUnifiedViewer(
                  data.image,
                  data.caption
                );

              }

            }
          );

        }
      );


      fresh.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            fresh.click();

          }

        }
      );

    }
  );

/* =========================================================
   FINAL WISH — ROBUST CLICK + SPARKLE + PARTICLE TEXT
   ========================================================= */

const wishStar = document.getElementById("wish-star");
const wishCanvas = document.getElementById("wish-canvas");
const wishCtx = wishCanvas?.getContext("2d");
let wishTriggered = false;
let wishHitTarget = null;

function sizeWishCanvas() {
  if (!wishCanvas) return;
  const rect = wishCanvas.getBoundingClientRect();
  wishCanvas.width = Math.max(1, Math.round(rect.width));
  wishCanvas.height = Math.max(1, Math.round(rect.height));
}

function createWishSparkleBurst(x, y) {
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  Object.assign(layer.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "2147483646",
    overflow: "visible"
  });

  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    transform: "translate(-50%, -50%) scale(.2)",
    background: "rgba(255,255,255,.98)",
    boxShadow: "0 0 18px rgba(255,255,255,.95), 0 0 50px rgba(255,230,130,.9), 0 0 95px rgba(255,190,80,.65)",
    opacity: "0"
  });
  layer.appendChild(flash);

  const ring = document.createElement("div");
  Object.assign(ring.style, {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: "26px",
    height: "26px",
    border: "2px solid rgba(255,240,190,.92)",
    borderRadius: "50%",
    transform: "translate(-50%, -50%) scale(.25)",
    opacity: "0",
    boxShadow: "0 0 20px rgba(255,225,150,.85)"
  });
  layer.appendChild(ring);

  const chars = ["✦", "✧", "✦", "⋆", "✩", "✨", "·"];
  for (let i = 0; i < 44; i += 1) {
    const s = document.createElement("span");
    s.textContent = chars[i % chars.length];
    const angle = Math.random() * Math.PI * 2;
    const dist = 42 + Math.random() * 125;
    const size = 10 + Math.random() * 12;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    Object.assign(s.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      fontSize: `${size}px`,
      lineHeight: "1",
      color: i % 3 === 0 ? "#ffffff" : "#ffe6a3",
      textShadow: "0 0 8px rgba(255,255,255,.95), 0 0 22px rgba(255,205,110,.85)",
      transform: "translate(-50%, -50%) scale(.2) rotate(0deg)",
      opacity: "0"
    });
    s.dataset.dx = String(dx);
    s.dataset.dy = String(dy);
    s.dataset.rot = String((Math.random() - .5) * 260);
    layer.appendChild(s);
  }

  document.body.appendChild(layer);

  const start = performance.now();
  const duration = 920;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const e = easeOut(t);

    const fp = Math.min(1, t / 0.18);
    flash.style.opacity = String(1 - Math.min(1, t / 0.55));
    flash.style.transform = `translate(-50%, -50%) scale(${0.2 + fp * 5.2})`;

    const rp = Math.min(1, t / 0.9);
    ring.style.opacity = String((1 - rp) * 0.95);
    ring.style.transform = `translate(-50%, -50%) scale(${0.25 + e * 8.5})`;

    const sparks = layer.querySelectorAll("span");
    sparks.forEach((s) => {
      const dx = Number(s.dataset.dx || 0);
      const dy = Number(s.dataset.dy || 0);
      const rot = Number(s.dataset.rot || 0);
      s.style.opacity = String(t < 0.12 ? t / 0.12 : Math.max(0, 1 - (t - 0.12) / 0.88));
      s.style.transform = `translate(calc(-50% + ${dx * e}px), calc(-50% + ${dy * e}px)) scale(${0.2 + Math.sin(Math.min(1, t / 0.25) * Math.PI) * 1.15}) rotate(${rot * e}deg)`;
    });

    if (t < 1) requestAnimationFrame(frame);
    else layer.remove();
  }

  requestAnimationFrame(frame);
}

function revealWishText() {
  if (!wishCanvas || !wishCtx) return;

  sizeWishCanvas();

  const name = (typeof friendName !== "undefined" && friendName) ? friendName : "you";
  const text = `HAPPY BIRTHDAY ${name.toUpperCase()} ❤️`;

  const offCanvas = document.createElement("canvas");
  offCanvas.width = wishCanvas.width;
  offCanvas.height = wishCanvas.height;
  const offCtx = offCanvas.getContext("2d");
  if (!offCtx) return;

  const fontSize = Math.max(18, Math.min(38, wishCanvas.width / Math.max(1, text.length * 0.55)));
  offCtx.font = `${fontSize}px Outfit, sans-serif`;
  offCtx.fillStyle = "#fff";
  offCtx.textAlign = "center";
  offCtx.textBaseline = "middle";
  offCtx.fillText(text, offCanvas.width / 2, offCanvas.height / 2);

  const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height).data;
  const targets = [];
  const step = 3;

  for (let y = 0; y < offCanvas.height; y += step) {
    for (let x = 0; x < offCanvas.width; x += step) {
      const alpha = imageData[(y * offCanvas.width + x) * 4 + 3];
      if (alpha > 120) targets.push({ x, y });
    }
  }

  const particles = targets.map((target) => ({
    x: Math.random() * wishCanvas.width,
    y: Math.random() * wishCanvas.height,
    tx: target.x,
    ty: target.y
  }));

  let progress = 0;
  function animateText() {
    progress += (typeof reduceMotion !== "undefined" && reduceMotion) ? 1 : 0.045;
    wishCtx.clearRect(0, 0, wishCanvas.width, wishCanvas.height);
    wishCtx.fillStyle = "#f2ecd9";

    const p = Math.min(progress, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    particles.forEach((particle) => {
      const x = particle.x + (particle.tx - particle.x) * ease;
      const y = particle.y + (particle.ty - particle.y) * ease;
      wishCtx.beginPath();
      wishCtx.arc(x, y, 1.4, 0, Math.PI * 2);
      wishCtx.fill();
    });

    if (progress < 1) requestAnimationFrame(animateText);
  }
  animateText();
}

function runWishSequence(event) {
  if (wishTriggered) return;
  if (!wishStar) return;

  wishTriggered = true;
  event?.preventDefault?.();
  event?.stopPropagation?.();
  event?.stopImmediatePropagation?.();

  const r = wishStar.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;

  createWishSparkleBurst(x, y);

  wishStar.style.setProperty("pointer-events", "none", "important");
  wishStar.style.cursor = "default";

  window.setTimeout(() => {
    revealWishText();
    wishStar.style.display = "none";
    if (wishHitTarget) {
      wishHitTarget.remove();
      wishHitTarget = null;
    }
  }, 620);
}

function makeWishHitTarget() {
  if (!wishStar || !document.body) return;
  if (wishHitTarget) return;

  const hit = document.createElement("button");
  hit.type = "button";
  hit.id = "wish-star-hit-target";
  hit.setAttribute("aria-label", "Tap the star to make a wish");
  Object.assign(hit.style, {
    position: "fixed",
    width: "150px",
    height: "150px",
    padding: "0",
    margin: "0",
    border: "0",
    background: "transparent",
    opacity: "0",
    pointerEvents: "auto",
    cursor: "pointer",
    zIndex: "2147483645",
    display: "block"
  });

  hit.addEventListener("pointerdown", runWishSequence, true);
  hit.addEventListener("click", runWishSequence, true);
  document.body.appendChild(hit);
  wishHitTarget = hit;

  const place = () => {
    if (!wishHitTarget || wishTriggered) return;
    const r = wishStar.getBoundingClientRect();
    wishHitTarget.style.left = `${r.left + r.width / 2 - 75}px`;
    wishHitTarget.style.top = `${r.top + r.height / 2 - 75}px`;
    hit.hidden = r.width < 1 || r.height < 1 || getComputedStyle(wishStar).display === "none";
  };

  place();
  window.addEventListener("resize", place, { passive: true });
  window.addEventListener("scroll", place, { passive: true });
  window.setTimeout(place, 250);
  window.setTimeout(place, 1000);
  window.setTimeout(place, 2000);
}

if (wishStar) {
  Object.assign(wishStar.style, {
    pointerEvents: "auto",
    cursor: "pointer",
    position: "relative",
    zIndex: "2147483644",
    touchAction: "manipulation"
  });

  wishStar.addEventListener("pointerdown", runWishSequence, true);
  wishStar.addEventListener("click", runWishSequence, true);
  wishStar.addEventListener("touchend", runWishSequence, { passive: false, capture: true });
  wishStar.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") runWishSequence(event);
  }, true);

  sizeWishCanvas();
  makeWishHitTarget();
}

window.addEventListener("resize", sizeWishCanvas, { passive: true });

/* =========================================================
   REPLAY
   ========================================================= */

document
  .getElementById(
    "replay-btn"
  )
  ?.addEventListener(
    "click",
    () => {
      window.location.reload();
    }
  );



/* =========================================================
   FINAL INTERACTION BRIDGE — SINGLE RELIABLE CLICK SYSTEM
   ---------------------------------------------------------
   This is intentionally at the very end of the file so it can
   override older click handlers without rewriting the visual FX.
   It also has a coordinate fallback for transparent overlays.
   ========================================================= */
(() => {
  "use strict";

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const $ = (selector) => document.querySelector(selector);

  const byPoint = (el, x, y) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 &&
      x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const revealLetter = () => {
    const envelope = $("#envelope");
    const letterText = $("#letter-text");
    const hint = $("#envelope-hint");
    if (!envelope) return;
    envelope.classList.add("open");
    if (hint) hint.style.display = "none";
    window.setTimeout(() => letterText?.classList.add("shown"), 500);
  };

  const enterNight = () => {
    const input = $("#name-input");
    const value = input?.value?.trim() || "";
    if (value) {
      friendName = value;
      window.__palkiFriendName = value;
    }

    try {
      if (window.ytPlayer && window.ytReady) {
        window.ytPlayer.playVideo?.();
        window.ytPlayer.unMute?.();
        $("#sound-toggle")?.classList.add("show");
      }
    } catch (_) { }

    scrollToId("s-moon");
  };

  const enterUniverse = () => {
    const locked = $("#locked-screen");
    const main = $("#main-scenes");
    locked?.classList.add("hidden");
    locked?.setAttribute("aria-hidden", "true");
    if (locked) locked.style.pointerEvents = "none";
    main?.classList.remove("locked-hidden");
    main?.setAttribute("aria-hidden", "false");
    scrollToId("s-intro");
  };

  const openMoon = () => scrollToId("s-about");

  const openGallery = (card) => {
    if (!card) return;

    const img = card.querySelector("img");
    const src = img?.getAttribute("src") || "";
    const match = src.match(/(?:^|\/)(\d+)\.jpeg(?:$|\?)/i);
    const number = Number(card.dataset.memoryNumber || match?.[1] || 0);
    if (!number) return;

    const photo = (window.__palkiMemoryPhotos || [])[number - 1];
    const caption = photo?.caption || card.getAttribute("aria-label") || `Memory ${number}`;
    const path = `images/memories/${number}.jpeg`;

    /* IMPORTANT: never open immediately. Always sparkle first. */
    sparkleAndOpen(path, caption, card);
  };

  const openOrbit = (planet) => {
    const number = Number(planet?.dataset.memoryNumber || 0);
    if (number && typeof window.openMemoryImage === "function") {
      window.openMemoryImage(number, planet);
      return;
    }
    if (number && typeof window.openUnifiedViewer === "function") {
      window.openUnifiedViewer(`images/memories/${number}.jpeg`, planet.querySelector(".tip")?.textContent || "Memory");
    }
  };

  const flipData = [
    { image: "images/memories/14.jpeg", caption: "She’d be the moon I’d spend every night looking up at." },
    { image: "images/memories/15.jpeg", caption: "The star I’d always notice first." },
    { image: "images/memories/7.jpeg", caption: "The cloud that makes moonlight more interesting." },
    { image: "images/memories/12.jpeg", caption: "A galaxy I’d happily get lost in forever." },
    { image: "images/memories/13.jpeg", caption: "The night I’d never want to end." }
  ];

  const openFlip = (card) => {
    const cards = [...document.querySelectorAll(".flip-card")];
    const index = cards.indexOf(card);
    const data = flipData[index];
    if (!data) return;
    card.classList.add("open");
    sparkleAndOpen(data.image, data.caption, card);
  };

  const handlers = new WeakMap();
  const bindCapture = (selector, handler) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((el) => {
      if (handlers.has(el)) return;
      const fn = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        handler(el, event);
      };
      el.addEventListener("click", fn, true);
      handlers.set(el, fn);
    });
  };

  function refreshBindings() {
    bindCapture("#unlock-enter-btn", () => enterUniverse());
    bindCapture("#enter-btn", () => enterNight());
    bindCapture("#moon-wrap", () => openMoon());
    bindCapture("#envelope", () => revealLetter());
    bindCapture("#replay-btn", () => window.location.reload());
    bindCapture("#wish-star", (star) => runWishSequence({ preventDefault() { }, stopPropagation() { }, stopImmediatePropagation() { } }));
    bindCapture("#memory-viewer-close", () => window.closeUnifiedViewer?.());
    bindCapture("#memory-viewer-backdrop", () => window.closeUnifiedViewer?.());

    document.querySelectorAll(".photo-card").forEach((card, index) => {
      if (!card.dataset.memoryNumber) card.dataset.memoryNumber = String(index + 1);
    });
    bindCapture(".photo-card", (card) => openGallery(card));

    document.querySelectorAll(".orbit-planet").forEach((planet, index) => {
      if (!planet.dataset.memoryNumber) planet.dataset.memoryNumber = String(index + 1);
    });
    bindCapture(".orbit-planet", (planet) => openOrbit(planet));
    bindCapture(".flip-card", (card) => openFlip(card));

    const input = $("#name-input");
    if (input && !input.dataset.finalKeyBound) {
      input.dataset.finalKeyBound = "1";
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          enterNight();
        }
      }, true);
    }
  }

  /* Keep data available to the gallery bridge. */
  if (typeof memoryPhotos !== "undefined") {
    window.__palkiMemoryPhotos = memoryPhotos;
  }

  /* Fix orbit data access for the bridge. */
  window.openMemoryImage = typeof openMemoryImage === "function" ? openMemoryImage : window.openMemoryImage;

  /* Keyboard accessibility: Enter/Space on custom interactive elements. */
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key !== "Enter" && key !== " ") return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const clickable = target.closest(
      "#unlock-enter-btn,#enter-btn,#moon-wrap,.photo-card,.orbit-planet,#envelope,.flip-card,#replay-btn,#wish-star"
    );
    if (!clickable) return;

    if (target.matches("input,textarea")) return;
    event.preventDefault();
    event.stopPropagation();
    clickable.click();
  }, true);

  /* Coordinate fallback for transparent overlays. */
  document.addEventListener("pointerdown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest(
      "#unlock-enter-btn,#enter-btn,#moon-wrap,.photo-card,.orbit-planet,#envelope,.flip-card,#replay-btn,#wish-star,#memory-viewer-close,#memory-viewer-backdrop"
    )) return;

    const x = event.clientX;
    const y = event.clientY;
    const selectors = [
      "#unlock-enter-btn",
      "#name-input",
      "#enter-btn",
      "#moon-wrap",
      ".photo-card",
      ".orbit-planet",
      "#envelope",
      ".flip-card",
      "#replay-btn",
      "#wish-star",
      "#memory-viewer-close",
      "#memory-viewer-backdrop"
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      for (const el of elements) {
        if (!byPoint(el, x, y)) continue;
        event.preventDefault();
        event.stopPropagation();
        if (el.matches("#unlock-enter-btn")) return enterUniverse();
        if (el.matches("#name-input")) { el.focus(); return; }
        if (el.matches("#enter-btn")) return enterNight();
        if (el.matches("#moon-wrap")) return openMoon();
        if (el.matches(".photo-card")) return openGallery(el);
        if (el.matches(".orbit-planet")) return openOrbit(el);
        if (el.matches("#envelope")) return revealLetter();
        if (el.matches(".flip-card")) return openFlip(el);
        if (el.matches("#replay-btn")) return window.location.reload();
        if (el.matches("#wish-star")) return runWishSequence(event);
        if (el.matches("#memory-viewer-close,#memory-viewer-backdrop")) return window.closeUnifiedViewer?.();
      }
    }
  }, true);

  /* Ensure the scenes cannot stay permanently blocked after the unlock click. */
  const repair = () => {
    ["#starfield", "#fx-canvas", "#clouds", "#birthday-explosion"].forEach((sel) => {
      const el = $(sel);
      if (el) el.style.pointerEvents = "none";
    });
    const locked = $("#locked-screen");
    const main = $("#main-scenes");
    if (main && !main.classList.contains("locked-hidden")) {
      if (locked) {
        locked.classList.add("hidden");
        locked.style.pointerEvents = "none";
      }
    }
    $("#name-input")?.removeAttribute("disabled");
    $("#name-input")?.removeAttribute("readonly");
    $("#enter-btn")?.removeAttribute("disabled");
    refreshBindings();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", repair, { once: true });
  } else {
    repair();
  }

  [250, 800, 1600, 3000].forEach((delay) => window.setTimeout(repair, delay));

  const observer = new MutationObserver(() => repair());
  observer.observe(document.body, { childList: true, subtree: true });
})();
