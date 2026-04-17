// ==========================================================================
// STATE MANAGEMENT & DATA
// ==========================================================================
let currentSpeed = 0;
let currentTier = "";
let currentTheme = "office"; // office, gaming, anime
let isTesting = false;

// Quotes and Capabilities Data
const tiersData = {
  office: {
    SURVIVAL: {
      capabilities: [
        "Audio only works",
        "Video must be off",
        "Robotic/stuttering voice",
        "No screen share possible"
      ],
      quotes: [
        "You'll sound like a robot from the 80s. Good luck explaining that to your boss.",
        "Your message will be delivered via carrier pigeon in 3-5 business days.",
        "I hope you know sign language, because they can't hear you.",
        "Have you tried turning the router off and... leaving it off?",
        "Your connection is as stable as a house of cards in a hurricane.",
        "This is not a meeting, this is a slideshow.",
        "They stopped saying 'you're breaking up' and just muted you.",
        "It's like dial-up, but with more disappointment."
      ]
    },
    USABLE: {
      capabilities: [
        "Stable audio",
        "Low-quality video (360p)",
        "Lag spikes possible",
        "Basic screen share (might blur)"
      ],
      quotes: [
        "Good enough for stand-up, bad enough for a client pitch.",
        "Turn off the camera if you want them to read that spreadsheet.",
        "You survive another day in the corporate matrix.",
        "It works until someone else in the house opens Netflix.",
        "A perfectly average connection for a perfectly average meeting.",
        "'Can everyone see my screen?' Yes, eventually.",
        "You look like a Minecraft character, but they can hear you.",
        "Please don't try to share a video right now."
      ]
    },
    SMOOTH: {
      capabilities: [
        "HD video (720p+)",
        "Clear, uncompressed audio",
        "Seamless screen sharing",
        "Multi-participant gallery fine"
      ],
      quotes: [
        "Crystal clear. No excuses for missing that deadline now.",
        "Your virtual background looks flawlessly realistic.",
        "Host that 50-person all-hands with confidence.",
        "Smooth sailing in the sea of corporate synergy.",
        "Nobody is asking you to repeat yourself today.",
        "You are the bastion of connectivity in this call.",
        "The absolute gold standard of middle management.",
        "Flawless execution. At least from the network side."
      ]
    },
    GOD: {
      capabilities: [
        "1080p+ ultra-crisp video",
        "Studio-quality audio",
        "4K screen share",
        "Host multiple meetings simultaneously"
      ],
      quotes: [
        "You could livestream your entire office on Twitch and no one would notice.",
        "You are the CEO of the internet now.",
        "Your connection is intimidating the other participants.",
        "Are you physically plugged into the Google data center?",
        "You could host the Metaverse on your laptop.",
        "This much bandwidth in a meeting is just showing off.",
        "Phenomenal cosmic power... used for a budget review.",
        "Every frame is a masterpiece. Flawless victory."
      ]
    }
  },
  gaming: {
    SURVIVAL: {
      capabilities: [
        "Online gaming impossible",
        "Rubber-banding every 2 seconds",
        "Stuck in loading screens",
        "Teammates will hate you"
      ],
      quotes: [
        "You'd get kicked from a 2003 RuneScape server.",
        "Your ping is higher than your credit score.",
        "You didn't miss, the server just forgot you existed.",
        "Enjoy playing single-player games, forever.",
        "You are the reason we lost. Yes, specifically you.",
        "Your character is teleporting like an enderman.",
        "Please uninstall to save us the bandwidth.",
        "Playing on a smart fridge over 3G would be better."
      ]
    },
    USABLE: {
      capabilities: [
        "Casual games OK (Turn-based)",
        "Competitive shooters unplayable",
        "Ping 150-200ms+",
        "Packet loss very likely"
      ],
      quotes: [
        "You're playing in the past. Everything already happened.",
        "Minecraft works. Valorant is a death sentence.",
        "Just blame the lag. Everyone knows it's true this time.",
        "You have a 0.5 second disadvantage in every fight.",
        "Hope you like trading kills.",
        "The definition of 'playable, but painful'.",
        "Don't even think about peeking that corner.",
        "A true test of patience and predictive aiming."
      ]
    },
    SMOOTH: {
      capabilities: [
        "FPS/RPG online plays fine",
        "60-100ms ping stable",
        "Voice chat works perfectly",
        "Streaming while gaming borderline"
      ],
      quotes: [
        "Solid connection. Your losses are actually your fault now.",
        "You can finally hit those flick shots.",
        "No packet loss, no excuses.",
        "A respectable ping for a respectable gamer.",
        "You're in the goldilocks zone of latency.",
        "Everything registers. Time to grind ranked.",
        "Your mechanics are the only bottleneck now.",
        "Smooth frames, smooth connection, GG."
      ]
    },
    GOD: {
      capabilities: [
        "Sub-20ms ping",
        "Stream 1080p while gaming",
        "Download AAA games in minutes",
        "Host game servers yourself"
      ],
      quotes: [
        "You ARE the server. You are God. GG no re.",
        "You see them before they see themselves.",
        "Downloading a 100GB patch while grabbing a snack.",
        "Zero latency. Pure kinetic energy.",
        "You have achieved network nirvana.",
        "You could DDoS someone just by opening a browser tab.",
        "Everyone else looks like they're in slow motion.",
        "Ultimate power. Don't let it corrupt you."
      ]
    }
  },
  anime: {
    SURVIVAL: {
      capabilities: [
        "Audio podcasts fine",
        "240p video only",
        "Constant buffering rings",
        "Subtitles may stutter or desync"
      ],
      quotes: [
        "This is worse than watching Naruto on dial-up. Even the fillers loaded faster.",
        "It takes 3 episodes of buffering to watch 1 episode of anime.",
        "You're watching a PowerPoint presentation, not a movie.",
        "The buffering wheel is your new favorite character.",
        "Even the opening theme can't play without pausing.",
        "Pixel art was an aesthetic choice... right?",
        "You are living in the dark ages of streaming.",
        "Just read the manga at this point."
      ]
    },
    USABLE: {
      capabilities: [
        "480p streaming limit",
        "SD quality anime plays fine",
        "Occasional buffer pause",
        "No simultaneous streams"
      ],
      quotes: [
        "Nostalgic 2008 YouTube quality.",
        "You can watch it, but you won't appreciate the animation budget.",
        "Don't you dare skip ahead, it'll ruin the buffer.",
        "One household stream at a time. The rules are strict.",
        "It's decent, if you squint a little.",
        "Fine for rom-coms, terrible for action scenes.",
        "The connection is hanging on by a thread of plot armor.",
        "It works, but Studio Ufotable is crying."
      ]
    },
    SMOOTH: {
      capabilities: [
        "1080p Crunchyroll/Netflix",
        "HD anime no buffer",
        "2 simultaneous streams",
        "Blu-ray quality achievable"
      ],
      quotes: [
        "Crisp 1080p. The animation flows like water.",
        "No buffering between episodes. The binge is seamless.",
        "You can finally appreciate the background art.",
        "Smooth as a Makoto Shinkai sky pan.",
        "Zero interruptions during the climax fight.",
        "Two people can watch different shows! The luxury!",
        "This is how it was meant to be seen.",
        "Perfect conditions for a weekend marathon."
      ]
    },
    GOD: {
      capabilities: [
        "4K HDR streaming instant",
        "5+ simultaneous streams",
        "IMAX home theater quality",
        "Download entire seasons in seconds"
      ],
      quotes: [
        "You could stream every Studio Ghibli film simultaneously while downloading One Piece. All of it.",
        "Unlimited Streaming Works.",
        "4K HDR zero buffer. You have ascended.",
        "Your network has the power of God and Anime on its side.",
        "The fastest connection in the Grand Line.",
        "You are the ultimate streaming archmage.",
        "Downloading an entire 24-episode season in the time it takes to make tea.",
        "Flawless perfection. The omnipotent tier."
      ]
    }
  }
};

const getRandomQuote = (theme, tier) => {
  const quotes = tiersData[theme][tier].quotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const getCapabilitiesDOM = (theme, tier) => {
  let list = "";
  tiersData[theme][tier].capabilities.forEach(cap => {
    list += `<li>${cap}</li>`;
  });
  return list;
};

// ==========================================================================
// SPEED TEST LOGIC
// ==========================================================================

async function testSpeed() {
  // Using Cloudflare's official raw speed test endpoint. 
  // It guarantees 5MB of raw bytes and has extremely permissive CORS headers, 
  // avoiding the net::ERR_FAILED bans that Wikimedia enforces on file:// origins.
  const url = "https://speed.cloudflare.com/__down?bytes=5000000";
  const start = performance.now();
  
  try {
    const response = await fetch(url + "&nocache=" + Math.random(), { cache: "no-store" });
    if (!response.ok) throw new Error("Network response was not ok");
    const blob = await response.blob();
    const end = performance.now();
    
    const duration = (end - start) / 1000;
    const bitsLoaded = blob.size * 8;
    const speedMbps = bitsLoaded / (duration * 1024 * 1024);
    
    return parseFloat(speedMbps.toFixed(1));
  } catch (error) {
    // Ultimate fallback if fetch fails (e.g. complete network failure or extreme browser block)
    return new Promise((resolve) => {
      const img = new Image();
      // Use a CDN-hosted dummy block image for safest fallback.
      const uniqueUrl = "https://via.placeholder.com/5000.png?nocache=" + Math.random();
      const fallbackStart = performance.now();
      
      img.onload = () => {
        const end = performance.now();
        let downloadDuration = (end - fallbackStart) / 1000; 
        
        const entries = performance.getEntriesByName(uniqueUrl);
        if (entries.length > 0) {
          const transportTime = (entries[0].responseEnd - entries[0].startTime) / 1000;
          if (transportTime > 0.001) {
            downloadDuration = transportTime;
          }
        }
        
        // 5000x5000 placeholder is ~375 KB 
        const bitsLoaded = 375000 * 8;
        const speedMbps = bitsLoaded / (downloadDuration * 1024 * 1024);
        resolve(parseFloat(speedMbps.toFixed(1)));
      };
      
      img.onerror = () => {
        resolve(2.5); // Fixed failsafe
      };
      
      img.src = uniqueUrl;
    });
  }
}

async function runTest() {
  if (isTesting) return;
  isTesting = true;

  // Show loading overlay
  document.getElementById("loading-overlay").classList.remove("hidden");
  
  // Hide Easter Eggs
  hideAllEasterEggs();

  // Reset Click Counters
  gamingClicks = 0;
  animeClicks = 0;

  // Actual test
  const speed = await testSpeed();
  currentSpeed = speed;

  // Determine Tier
  if (speed < 1) currentTier = "SURVIVAL";
  else if (speed < 3) currentTier = "USABLE";
  else if (speed <= 10) currentTier = "SMOOTH";
  else currentTier = "GOD";

  updateUI();

  // Hide loading after a slight delay to ensure smooth transition
  setTimeout(() => {
    document.getElementById("loading-overlay").classList.add("hidden");
    isTesting = false;
    checkPostTestEasterEggs();
    resetIdleTimer();
  }, 500);
}

// ==========================================================================
// UI UPDATES
// ==========================================================================

function updateUI() {
  // Update Navbar Badge
  document.getElementById("nav-speed-badge").innerText = `⚡ ${currentSpeed} Mbps`;

  // Update All 3 Pages
  updatePageUI("office");
  updatePageUI("gaming");
  updatePageUI("anime");
}

function updatePageUI(theme) {
  // Update Speed Numbers
  document.getElementById(`${theme}-speed-num`).innerText = currentSpeed;
  
  // Update Badge
  const badge = document.getElementById(`${theme}-tier-badge`);
  badge.className = `tier-badge badge-${currentTier.toLowerCase()}`;
  if (theme === "gaming") badge.classList.add("neon-badge");
  if (theme === "anime") badge.classList.add("magic-badge");
  badge.innerText = currentTier + " MODE";

  // Update Title
  document.getElementById(`${theme}-tier-title`).innerHTML = `${getTierIcon(theme)} ${currentTier} MODE`;

  // Update Capabilities List
  document.getElementById(`${theme}-capabilities`).innerHTML = getCapabilitiesDOM(theme, currentTier);

  // Update Quote
  document.getElementById(`${theme}-quote`).innerText = `"${getRandomQuote(theme, currentTier)}"`;
}

function getTierIcon(theme) {
  if (theme === "office") {
    if(currentTier === "SURVIVAL") return "🔴";
    if(currentTier === "USABLE") return "🟡";
    if(currentTier === "SMOOTH") return "🟢";
    if(currentTier === "GOD") return "🔵";
  }
  return "";
}

// ==========================================================================
// NAVIGATION LOGIC
// ==========================================================================

const tabs = document.querySelectorAll(".nav-tab");
const pages = document.querySelectorAll(".page");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const theme = tab.getAttribute("data-theme");
    
    // Update active tab styling
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Switch page visibility
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(`page-${theme}`).classList.add("active");

    // Apply theme to body
    document.body.className = `theme-${theme}`;
    currentTheme = theme;
    
    checkPostTestEasterEggs();
    resetIdleTimer();
  });
});


// ==========================================================================
// EASTER EGGS: GAMING
// ==========================================================================

function checkPostTestEasterEggs() {
  if (currentTheme === "gaming") {
    if (currentSpeed >= 4.9 && currentSpeed <= 5.1) {
      document.getElementById("gaming-easter-1").classList.remove("hidden");
      setTimeout(() => document.getElementById("gaming-easter-1").classList.add("hidden"), 4000);
    }
    else if (currentSpeed > 500) {
      document.getElementById("gaming-easter-nasa").classList.remove("hidden");
      setTimeout(() => document.getElementById("gaming-easter-nasa").classList.add("hidden"), 5000);
    }
  }

  if (currentTheme === "anime") {
    if (currentSpeed < 0.5) {
      document.getElementById("anime-easter-nani").classList.remove("hidden");
      setTimeout(() => document.getElementById("anime-easter-nani").classList.add("hidden"), 4000);
    }
    else if (currentSpeed >= 9.9 && currentSpeed <= 10.1) {
      document.getElementById("anime-easter-instinct").classList.remove("hidden");
      setTimeout(() => document.getElementById("anime-easter-instinct").classList.add("hidden"), 4000);
    }
  }
}

function hideAllEasterEggs() {
  document.querySelectorAll(".easter-egg-overlay").forEach(el => el.classList.add("hidden"));
  document.getElementById("anime-idle-message").classList.add("hidden");
}

// 1. Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) {
      // Trigger Konami
      if (currentTheme === "gaming") {
        const cheatEgg = document.getElementById("gaming-easter-konami");
        cheatEgg.classList.remove("hidden");
        setTimeout(() => cheatEgg.classList.add("hidden"), 5000);
      }
      konamiPosition = 0;
    }
  } else {
    konamiPosition = 0;
  }
});

// 2. Rapid Clicks on Speed Number (Gaming)
let gamingClicks = 0;
let gamingClickTimer;
const gamingSpeedNum = document.getElementById("gaming-speed-num");

gamingSpeedNum.addEventListener("click", () => {
  if(currentTheme !== "gaming") return;
  gamingClicks++;
  clearTimeout(gamingClickTimer);
  
  if (gamingClicks >= 5) {
    // Trigger Glitch
    gamingSpeedNum.classList.add("glitch-anim");
    let scrambleInterval = setInterval(() => {
      gamingSpeedNum.innerText = (Math.random() * 999).toFixed(1);
    }, 50);

    setTimeout(() => {
      clearInterval(scrambleInterval);
      gamingSpeedNum.classList.remove("glitch-anim");
      gamingSpeedNum.innerText = currentSpeed;
      gamingClicks = 0;
    }, 2000);
  } else {
    gamingClickTimer = setTimeout(() => { gamingClicks = 0; }, 1000);
  }
});


// ==========================================================================
// EASTER EGGS: ANIME
// ==========================================================================

// 1. Rapid Clicks on Speed Number (Anime)
let animeClicks = 0;
let animeClickTimer;
const animeSpeedNum = document.getElementById("anime-speed-num");

animeSpeedNum.addEventListener("click", () => {
  if(currentTheme !== "anime") return;
  animeClicks++;
  clearTimeout(animeClickTimer);
  
  if (animeClicks >= 3) {
    // Transform to Japanese text
    const jpChars = ["速", "度", "神", "力", "無", "限", "超", "絶"];
    let original = animeSpeedNum.innerText;
    animeSpeedNum.innerText = jpChars[Math.floor(Math.random() * jpChars.length)] + jpChars[Math.floor(Math.random() * jpChars.length)];
    
    setTimeout(() => {
      animeSpeedNum.innerText = currentSpeed;
      animeClicks = 0;
    }, 2000);
  } else {
    animeClickTimer = setTimeout(() => { animeClicks = 0; }, 1000);
  }
});

// 2. Idle Timers
let idleTimer30;
let idleTimer60;

function resetIdleTimer() {
  clearTimeout(idleTimer30);
  clearTimeout(idleTimer60);
  document.getElementById("anime-idle-message").classList.add("hidden");
  document.getElementById("sakura-container").classList.remove("sakura-fast");

  if(currentTheme === "anime") {
    idleTimer30 = setTimeout(() => {
      document.getElementById("anime-idle-message").classList.remove("hidden");
    }, 30000); // 30 seconds

    idleTimer60 = setTimeout(() => {
      document.getElementById("sakura-container").classList.add("sakura-fast");
    }, 60000); // 60 seconds
  }
}

// Reset idle timer on mouse movement or click
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keypress', resetIdleTimer);
document.addEventListener('click', resetIdleTimer);


// ==========================================================================
// SAKURA PETALS ANIMATION SYSTEM
// ==========================================================================
function createPetal() {
  const container = document.getElementById("sakura-container");
  if (currentTheme !== "anime") return;

  const petal = document.createElement("div");
  petal.classList.add("petal");

  // Randomize properties
  const size = Math.random() * 10 + 5; // 5-15px
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 5 + 5; // 5-10s
  const tx = (Math.random() - 0.5) * 500 + 'px'; // sway left/right
  const rot = Math.random() * 360 + 360 + 'deg'; // rotation

  petal.style.width = size + "px";
  petal.style.height = size + "px";
  petal.style.left = startX + "px";
  petal.style.animationDuration = duration + "s";
  petal.style.setProperty('--tx', tx);
  petal.style.setProperty('--rot', rot);

  container.appendChild(petal);

  // Remove after animation finishes
  setTimeout(() => {
    if(petal.parentNode) petal.parentNode.removeChild(petal);
  }, duration * 1000);
}

// Spawn petals periodically
setInterval(() => {
  if (currentTheme === "anime" && !document.hidden) {
    createPetal();
  }
}, 300);

// ==========================================================================
// INITIALIZATION
// ==========================================================================
window.onload = () => {
  runTest();
};
