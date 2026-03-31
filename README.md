# 🚀🎮 Ludus Forge Gaming Hackathon
Welcome to the **Ludus Forge Gaming Hackathon** project! This repository hosts the source code for our gaming hack built during the event. The goal of this project is to deliver a browser-based psychological horror puzzle game called **N-BLOCK: Mind's Descent**.

---

## 🎮 About the Game

**N-BLOCK: Mind's Descent** is a psychological horror puzzle game set inside a haunted school building. You play as *Arjun*, a student trying to reach **Room 502** before losing your mind completely.

- Navigate through **5 floors**, each with a unique horror theme
- Solve **unique puzzles** on each floor to unlock the staircase
- Your **Sanity bar** drains as you encounter monsters and make mistakes
- Listen to **faculty whispers** for clues to solve puzzles
- Survive the darkness and reach Room 502!

---

## 🛠️ Technologies Used

### 🎮 Game Development
| Technology | Purpose |
|---|---|
| **Phaser 3** (v3.60.0) | 2D game engine — rendering, physics, camera effects, input, scene management |
| **HTML5 Canvas / WebGL** | Browser graphics APIs used by Phaser for rendering |

### 🌐 Web Technologies
| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and game container |
| **CSS3** | Styling, animations (`@keyframes`), horror overlays, vignette, glitch effects |
| **Vanilla JavaScript (ES6+)** | All game logic, puzzle systems, UI interactions, audio synthesis |

### 🔊 Audio
| Technology | Purpose |
|---|---|
| **Web Audio API** | Fully procedural sounds — heartbeat, eerie drone, jump-scares, door creaks, white noise. No audio files needed |

### 🐍 Backend / Local Server
| Technology | Purpose |
|---|---|
| **Python 3** | Local HTTP server using stdlib modules only (`http.server`, `socketserver`, `webbrowser`) |

### 🚀 Deployment & Version Control
| Technology | Purpose |
|---|---|
| **Git** | Version control |
| **GitHub** | Code repository hosting |
| **GitHub Pages** | Free static site hosting for the live playable game |

### 🔤 Fonts
| Technology | Purpose |
|---|---|
| **Google Fonts** | *Creepster* typeface for the horror aesthetic |

> ✅ **Zero external dependencies** — No `npm`, no `pip`, no build tools. Entirely self-contained in a single HTML file + Python stdlib.

---

## 🕹️ How to Play

### Option 1: Play Online (Recommended)
Visit the live game directly in your browser:
👉 **https://hemanthxctrl.github.io/Ludus-Forge-Gaming-Hackathon/**

### Option 2: Run Locally
1. Clone the repository
2. Double-click `app.py` to launch the local Python server
3. Your browser will automatically open the game

### Controls
| Key | Action |
|---|---|
| `W A S D` or Arrow Keys | Move character |
| `E` | Interact with teachers / puzzles / stairs |

---

## 🗺️ Game Floors

| Floor | Name | Theme | Monster |
|---|---|---|---|
| G | The Threshold | Identity — Who am I? | The Shadow |
| 1 | The Memory Maze | Memory — What do I remember? | The Classmates |
| 2 | The Logic Trap | Reason — Is what I see real? | The Equation |
| 3 | The Guilt Gallery | Shame — What have I done? | The Regret |
| 4 | The Acceptance | Truth — Who must I become? | The Self |

---

## 😱 Horror Features

- 💀 **Dynamic Heartbeat** — speeds up as sanity drops
- 🔊 **Eerie Drone** — unique frequency per floor
- 🩸 **Blood Drip Effect** — appears below 40% sanity
- 💥 **Screen Crack Overlay** — appears below 20% sanity
- ⚡ **Jump Scare Events** — random flashes + shrieks at low sanity
- 📷 **Camera Shake** — triggers when caught by monsters
- 🔴 **Red Flash + Glitch** — fires on wrong puzzle answers
- 🦇 **Flying Bats** — animated throughout all floors

---

## 📁 Project Structure

```
Ludus-Forge-Gaming-Hackathon/
├── 404 SQUAD/
│   └── N-block-mind-descent.html   # Main game file
├── index.html                       # GitHub Pages entry point
├── app.py                           # Local Python server launcher
└── README.md
```

---

## 🤝 Contributing

Feel free to fork and contribute! ⭐

## Contributors

- hemanthxctrl — uppalahemanthsrinivasgmail.com
- P.Gokulesh Varma — vu.241fa04822@gmail.com
- J.Bhanu Teja - bhanujammula0@gmail.com
- Yarra Sri Karthikeya karthikyarra358@gmail.com

 

---

## 📞 Contact

For any queries or suggestions, feel free to open an issue or reach out via GitHub.

Happy hacking! 🎉