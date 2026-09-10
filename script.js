/* ================================================================
   HAPPY BIRTHDAY BBG — script.js
   Everything interactive lives here. Sections are labelled so you
   can find what you need without reading the whole file.
================================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ==============================================================
     CUSTOMIZE #5 — THE FOUR FIREFLY MESSAGES
     These must stay EXACTLY as written — do not fix grammar or
     spelling. Preserve them verbatim.
  ============================================================== */
  var FIREFLY_MESSAGES = [
    "Happy Birthday girl idk how time went through so fast but in the end it's your birthday today",
    "you helped me a lot during the time you even talked to me when no one was helped me win cancer too",
    "You are such a nice kid that I'll treasure you forever",
    "I love you gurl so just don't slip up somewhere"
  ];

  /* ==============================================================
     UTILITIES
  ============================================================== */
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  /* ==============================================================
     AMBIENT: STARS
  ============================================================== */
  function buildStars() {
    var layer = document.getElementById("stars");
    if (!layer) return;
    var count = window.innerWidth < 600 ? 60 : 110;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      s.className = "star";
      s.style.left = rand(0, 100) + "%";
      s.style.top = rand(0, 70) + "%";
      var size = rand(1, 2.4);
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.setProperty("--star-max-opacity", rand(0.35, 0.9).toFixed(2));
      s.style.animationDelay = rand(0, 4) + "s, " + rand(0, 5) + "s";
      frag.appendChild(s);
    }
    layer.appendChild(frag);
  }

  /* ==============================================================
     AMBIENT: DECORATIVE BACKGROUND FIREFLIES (purely visual)
  ============================================================== */
  var ambientFireflyContainer = document.getElementById("bg-fireflies");
  function buildAmbientFireflies() {
    if (!ambientFireflyContainer) return;
    var count = window.innerWidth < 600 ? 10 : 18;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var f = document.createElement("span");
      f.className = "bg-firefly";
      f.style.left = rand(2, 96) + "%";
      f.style.top = rand(5, 92) + "%";
      f.style.setProperty("--dur", rand(10, 20).toFixed(1) + "s");
      f.style.setProperty("--dx1", rand(-30, 30).toFixed(0) + "px");
      f.style.setProperty("--dy1", rand(-40, 10).toFixed(0) + "px");
      f.style.setProperty("--dx2", rand(-30, 30).toFixed(0) + "px");
      f.style.setProperty("--dy2", rand(-15, 25).toFixed(0) + "px");
      f.style.setProperty("--dx3", rand(-30, 30).toFixed(0) + "px");
      f.style.setProperty("--dy3", rand(-10, 25).toFixed(0) + "px");
      f.style.animationDelay = rand(0, 6) + "s, " + rand(0, 4) + "s";
      frag.appendChild(f);
    }
    ambientFireflyContainer.appendChild(frag);
  }

  function quietAmbientLayer() {
    if (!ambientFireflyContainer) return;
    ambientFireflyContainer.style.transition = "opacity 3s ease";
    ambientFireflyContainer.style.opacity = "0.18";
    document.querySelectorAll(".fog").forEach(function (f) {
      f.style.transition = "opacity 3s ease";
      f.style.opacity = "0.15";
    });
  }

  /* ==============================================================
     SCENE 0 — INTRO / "FOLLOW THE LIGHT"
  ============================================================== */
  var introScene = document.getElementById("intro");
  var guideFirefly = document.getElementById("guide-firefly");
  var skipBtn = document.getElementById("skip-intro");
  var mainExperience = document.getElementById("main-experience");
  var introResolved = false;

  function spawnBurst(x, y) {
    var count = prefersReducedMotion ? 0 : 14;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "burst-particle";
      var angle = rand(0, Math.PI * 2);
      var dist = rand(40, 140);
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--by", Math.sin(angle) * dist + "px");
      document.body.appendChild(p);
      (function (el) {
        setTimeout(function () {
          el.remove();
        }, 950);
      })(p);
    }
  }

  function revealMainExperience() {
    if (introResolved) return;
    introResolved = true;

    mainExperience.hidden = false;
    document.body.style.overflow = "";

    introScene.classList.add("fading-out");
    window.setTimeout(function () {
      introScene.style.display = "none";
    }, 1500);
  }

  function captureFirefly(clientX, clientY) {
    if (introResolved) return;

    guideFirefly.classList.add("captured");
    var rect = guideFirefly.getBoundingClientRect();
    var startX = rect.left + rect.width / 2;
    var startY = rect.top + rect.height / 2;
    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;

    guideFirefly.style.transform =
      "translate(" + (targetX - startX) + "px," + (targetY - startY) + "px) scale(1.8)";

    introScene.classList.add("brightening");

    window.setTimeout(function () {
      spawnBurst(targetX, targetY);
    }, prefersReducedMotion ? 0 : 900);

    window.setTimeout(
      revealMainExperience,
      prefersReducedMotion ? 200 : 1500
    );
  }

  if (guideFirefly) {
    guideFirefly.addEventListener("click", function (e) {
      captureFirefly(e.clientX, e.clientY);
    });
  }
  if (skipBtn) {
    skipBtn.addEventListener("click", revealMainExperience);
  }

  // lock scroll while intro is up
  document.body.style.overflow = "hidden";

  /* ==============================================================
     EASTER EGG — "LEVEL 22 UNLOCKED" carving
     Works on hover (desktop) via CSS, and on tap (mobile) via JS.
  ============================================================== */
  var runeEgg = document.getElementById("rune-egg");
  if (runeEgg) {
    runeEgg.addEventListener("click", function () {
      runeEgg.classList.toggle("tapped");
    });
  }

  /* ==============================================================
     SCROLL REVEALS
  ============================================================== */
  function setupRevealObserver() {
    var targets = document.querySelectorAll(".reveal-up");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      targets.forEach(function (t) {
        t.classList.add("in-view");
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    targets.forEach(function (t) {
      obs.observe(t);
    });
  }

  /* ==============================================================
     SCENE 3 — MUSIC PLAYER
  ============================================================== */
  function setupMusicPlayer() {
    var audio = document.getElementById("bday-audio");
    var toggle = document.getElementById("play-toggle");
    var card = document.getElementById("player-card");
    var iconPlay = toggle ? toggle.querySelector(".icon-play") : null;
    var iconPause = toggle ? toggle.querySelector(".icon-pause") : null;
    var fill = document.getElementById("progress-fill");
    var externalLink = document.getElementById("player-external");
    if (!audio || !toggle) return;

    var localTrackFailed = false;

    audio.addEventListener("error", function () {
      localTrackFailed = true;
    });

    toggle.addEventListener("click", function () {
      if (localTrackFailed) {
        // No local audio file added yet — send them to the source instead.
        window.open(externalLink.href, "_blank", "noopener,noreferrer");
        return;
      }
      if (audio.paused) {
        var playPromise = audio.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function () {
            localTrackFailed = true;
            window.open(externalLink.href, "_blank", "noopener,noreferrer");
          });
        }
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", function () {
      iconPlay.hidden = true;
      iconPause.hidden = false;
      toggle.setAttribute("aria-pressed", "true");
      toggle.setAttribute("aria-label", "Pause song");
      card.classList.add("is-playing");
    });

    audio.addEventListener("pause", function () {
      iconPlay.hidden = false;
      iconPause.hidden = true;
      toggle.setAttribute("aria-pressed", "false");
      toggle.setAttribute("aria-label", "Play song");
      card.classList.remove("is-playing");
    });

    audio.addEventListener("timeupdate", function () {
      if (!audio.duration) return;
      fill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    });

    audio.addEventListener("ended", function () {
      fill.style.width = "0%";
    });
  }

  /* ==============================================================
     SCENE 4 — MEMORY GALLERY / SLIDESHOW
  ============================================================== */
  function setupSlideshow() {
    var root = document.getElementById("slideshow");
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll(".slide"));
    var dotsWrap = document.getElementById("slide-dots");
    var prevBtn = document.getElementById("prev-slide");
    var nextBtn = document.getElementById("next-slide");
    var current = 0;
    var AUTO_MS = 2600;
    var timer = null;
    var resumeTimer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Show photo " + (i + 1));
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
    }

    function startAuto() {
      stopAuto();
      if (prefersReducedMotion) return;
      timer = window.setInterval(function () {
        show(current + 1);
      }, AUTO_MS);
    }
    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }
    function pauseThenResume() {
      stopAuto();
      if (resumeTimer) window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(startAuto, 4500);
    }

    dots.forEach(function (d, i) {
      d.addEventListener("click", function () {
        show(i);
        pauseThenResume();
      });
    });
    prevBtn.addEventListener("click", function () {
      show(current - 1);
      pauseThenResume();
    });
    nextBtn.addEventListener("click", function () {
      show(current + 1);
      pauseThenResume();
    });

    // swipe support
    var touchStartX = null;
    root.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].clientX;
        pauseThenResume();
      },
      { passive: true }
    );
    root.addEventListener(
      "touchend",
      function (e) {
        if (touchStartX === null) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          show(current + (dx < 0 ? 1 : -1));
        }
        touchStartX = null;
      },
      { passive: true }
    );

    root.addEventListener("mouseenter", stopAuto);
    root.addEventListener("mouseleave", startAuto);

    show(0);
    startAuto();
  }

  /* ==============================================================
     SCENE 5 — FIREFLY FOREST (exactly 4 interactive fireflies)
  ============================================================== */
  function setupFireflyForest() {
    var field = document.getElementById("forest-field");
    var card = document.getElementById("message-card");
    var textEl = document.getElementById("message-text");
    var closeBtn = document.getElementById("message-close");
    if (!field || !card) return;

    // decorative fireflies — purely visual
    var decorativeCount = window.innerWidth < 600 ? 12 : 20;
    for (var i = 0; i < decorativeCount; i++) {
      var d = document.createElement("span");
      d.className = "firefly";
      d.style.left = rand(2, 95) + "%";
      d.style.top = rand(4, 92) + "%";
      d.style.setProperty("--dur", rand(9, 18).toFixed(1) + "s");
      field.appendChild(d);
    }

    // exactly four special, interactive fireflies
    // positions spread across quadrants so they're findable but not lined up
    var positions = [
      { left: rand(10, 28), top: rand(15, 35) },
      { left: rand(65, 88), top: rand(10, 30) },
      { left: rand(15, 35), top: rand(60, 82) },
      { left: rand(62, 85), top: rand(58, 80) }
    ];

    var openIndex = null;

    positions.forEach(function (pos, idx) {
      var btn = document.createElement("button");
      btn.className = "firefly firefly--special";
      btn.style.left = pos.left + "%";
      btn.style.top = pos.top + "%";
      btn.style.setProperty("--dur", rand(13, 19).toFixed(1) + "s");
      btn.setAttribute("aria-label", "A brighter firefly");
      btn.dataset.index = idx;

      btn.addEventListener("click", function () {
        openMessage(idx, btn);
      });

      field.appendChild(btn);
    });

    function typeMessage(message) {
      textEl.innerHTML = "";
      var cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.innerHTML = "&nbsp;";
      textEl.appendChild(cursor);

      if (prefersReducedMotion) {
        textEl.textContent = message;
        return;
      }

      var i = 0;
      var speed = 26;
      function step() {
        if (i <= message.length) {
          textEl.textContent = message.slice(0, i);
          textEl.appendChild(cursor);
          i++;
          window.setTimeout(step, speed);
        } else {
          cursor.remove();
        }
      }
      step();
    }

    function openMessage(idx, btn) {
      if (openIndex !== null) return; // only one open at a time
      openIndex = idx;

      btn.classList.add("is-found", "firefly--collecting");
      field.classList.add("dimmed");

      card.hidden = false;
      typeMessage(FIREFLY_MESSAGES[idx]);
    }

    function closeMessage() {
      card.hidden = true;
      field.classList.remove("dimmed");
      openIndex = null;
    }

    closeBtn.addEventListener("click", closeMessage);
    card.addEventListener("click", function (e) {
      if (e.target === card) closeMessage();
    });
  }

  /* ==============================================================
     SCENE 6 — FINALE SEQUENCE
  ============================================================== */
  function setupFinale() {
    var finaleScene = document.getElementById("finale");
    if (!finaleScene) return;
    var lines = [
      "finale-1",
      "finale-2",
      "finale-3",
      "finale-4",
      "finale-5",
      "finale-6"
    ];
    var delays = [0, 1400, 3200, 4600, 6000, 7600];
    var triggered = false;

    function play() {
      if (triggered) return;
      triggered = true;
      quietAmbientLayer();
      lines.forEach(function (id, i) {
        window.setTimeout(function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("in-view");
        }, prefersReducedMotion ? 0 : delays[i]);
      });
    }

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            play();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(finaleScene);
  }

  /* ==============================================================
     SCENE 7 — SIGN-OFF
  ============================================================== */
  function setupSignoff() {
    var text = document.querySelector(".signoff-text");
    var sub = document.querySelector(".signoff-sub");
    if (!text) return;
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      text.classList.add("in-view");
      if (sub) sub.classList.add("in-view");
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            text.classList.add("in-view");
            if (sub) sub.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(text);
  }

  /* ==============================================================
     INIT
  ============================================================== */
  function init() {
    buildStars();
    buildAmbientFireflies();
    setupRevealObserver();
    setupMusicPlayer();
    setupSlideshow();
    setupFireflyForest();
    setupFinale();
    setupSignoff();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
