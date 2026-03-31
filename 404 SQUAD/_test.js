
        // ═══════════════════════════════════════════════════════════════
        // N-BLOCK: MIND'S DESCENT — COMPLETE GAME
        // ═══════════════════════════════════════════════════════════════

        // ── FLOOR DATA ──────────────────────────────────────────────────
        const FLOORS = [
            {
                id: 'G',
                name: 'THE THRESHOLD',
                theme: 'IDENTITY — WHO AM I?',
                sanityStart: 100, sanityEnd: 80,
                bgColor: 0x0a0a0f,
                wallColor: 0x1a1a2a,
                floorColor: 0x0d0d15,
                monsterColor: 0x8888ff,
                monsterLabel: 'THE SHADOW',
                faculty: {
                    name: 'DR. MEERA — English & Philosophy',
                    whisper: '"The one that does not belong will repeat itself. A lie always gives itself away by saying the same thing twice."'
                },
                puzzle: {
                    type: 'lockers',
                    title: 'THE LOCKER SEQUENCE',
                    body: 'Five lockers line the corridor. Each has a symbol sequence. One locker has a flaw — a repeated pair. Find it. Open it. Take the staircase key.',
                    options: [
                        { label: '★ ◆ ★ ◆ ●', correct: false },
                        { label: '◆ ★ ◆ ★ ◆', correct: false },
                        { label: '● ◆ ★ ◆ ●', correct: false },
                        { label: '★ ★ ◆ ● ◆', correct: true },  // ★★ repeated pair
                        { label: '◆ ● ★ ◆ ●', correct: false },
                    ]
                }
            },
            {
                id: '1',
                name: 'THE MEMORY MAZE',
                theme: 'MEMORY — WHAT DO I REMEMBER?',
                sanityStart: 80, sanityEnd: 60,
                bgColor: 0x0f0a0a,
                wallColor: 0x2a1a1a,
                floorColor: 0x150d0d,
                monsterColor: 0xff8888,
                monsterLabel: 'THE CLASSMATES',
                faculty: {
                    name: 'PROF. RAJAN — History',
                    whisper: '"You need not remember all of it. The key number is the one that appears in every important date. Think of what we studied — 1, 9, 4, 7."'
                },
                puzzle: {
                    type: 'sequence',
                    title: 'THE BLACKBOARD SEQUENCE',
                    body: 'A sequence of numbers flashed on the cracked blackboard. Enter it correctly. The sequence starts with 1947. Remember what Prof. Rajan said about the key number.',
                    answer: '19478',
                    placeholder: 'Enter the sequence...',
                    hint: 'The sequence: 1947 followed by the digit that appears in every number of the sequence'
                }
            },
            {
                id: '2',
                name: 'THE LOGIC TRAP',
                theme: 'REASON — IS WHAT I SEE REAL?',
                sanityStart: 60, sanityEnd: 38,
                bgColor: 0x0a0f0a,
                wallColor: 0x1a2a1a,
                floorColor: 0x0d150d,
                monsterColor: 0x88ff88,
                monsterLabel: 'THE EQUATION',
                faculty: {
                    name: 'MS. PRIYA — Mathematics',
                    whisper: '"Trust only what is divisible by itself and one. The primes will hold your weight. The composites will not."'
                },
                puzzle: {
                    type: 'grid',
                    title: 'THE TILE CROSSING',
                    body: 'A 4×4 grid of tiles. Step only on tiles that are PRIME numbers. The composites will collapse. Cross to reach the staircase.',
                    // 4x4 grid, values 1-16. Primes: 2,3,5,7,11,13
                    tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                    primes: [2, 3, 5, 7, 11, 13],
                    correctPath: [2, 3, 5, 7, 11, 13] // player must click all primes
                }
            },
            {
                id: '3',
                name: 'THE GUILT GALLERY',
                theme: 'SHAME — WHAT HAVE I DONE?',
                sanityStart: 38, sanityEnd: 18,
                bgColor: 0x0f0f0a,
                wallColor: 0x2a2a1a,
                floorColor: 0x15150d,
                monsterColor: 0xffff88,
                monsterLabel: 'THE REGRET',
                faculty: {
                    name: 'DR. ANAND — Psychology',
                    whisper: '"We do not heal by reordering the past. We heal by accepting when each wound was made. First came the silence, then the words, then the consequence."'
                },
                puzzle: {
                    type: 'order',
                    title: 'THE GUILT GALLERY',
                    body: 'Three memory paintings on the wall. Arrange their plaques in the correct chronological order. Dr. Anand\'s whisper is your only guide.',
                    items: [
                        { id: 'c', label: 'THE CONSEQUENCE — I stopped trying' },
                        { id: 'w', label: 'THE WORDS — I said things I cannot unsay' },
                        { id: 's', label: 'THE SILENCE — I said nothing when I should have spoken' },
                    ],
                    correctOrder: ['s', 'w', 'c']
                }
            },
            {
                id: '4',
                name: 'THE ACCEPTANCE',
                theme: 'TRUTH — WHO MUST I BECOME?',
                sanityStart: 18, sanityEnd: 100,
                bgColor: 0x0a0a0a,
                wallColor: 0x1a1a1a,
                floorColor: 0x0d0d0d,
                monsterColor: 0xffffff,
                monsterLabel: 'THE SELF',
                faculty: {
                    name: 'PRINCIPAL KRISHNAMURTHY',
                    whisper: '"You always had what you needed, Arjun. You just refused to look. The room is unlocked from within. Stand still. Face it. Hold."'
                },
                puzzle: {
                    type: 'hold',
                    title: 'ROOM 502',
                    body: 'The door to Room 502. Five locks — four already open. The fifth has no key. Hold the door for 5 seconds. Do not let go. Do not run.',
                }
            }
        ];

        // ── GAME STATE ───────────────────────────────────────────────────
        const GS = {
            currentFloor: 0,
            sanity: 100,
            gameActive: false,
            puzzleSolved: false,
            facultyClueRead: false,
            nearFaculty: false,
            nearPuzzle: false,
            nearStairs: false,
            puzzleOpen: false,
            whisperOpen: false,
            attempts: 0,
            gridSelected: [],
            orderItems: null,
            draggingCard: null,
        };

        // ── DOM REFS ─────────────────────────────────────────────────────
        const $sanityBar = document.getElementById('sanity-bar');
        const $sanityVal = document.getElementById('sanity-value');
        const $floorLabel = document.getElementById('floor-label');
        const $whisperBox = document.getElementById('whisper-box');
        const $whisperName = document.getElementById('whisper-name');
        const $whisperText = document.getElementById('whisper-text');
        const $puzzleModal = document.getElementById('puzzle-modal');
        const $puzzleTitle = document.getElementById('puzzle-title');
        const $puzzleBody = document.getElementById('puzzle-body');
        const $puzzleInput = document.getElementById('puzzle-input-area');
        const $puzzleAttempts = document.getElementById('puzzle-attempts');
        const $notif = document.getElementById('notif');
        const $hint = document.getElementById('interact-hint');
        const $vignette = document.getElementById('vignette');
        const $noise = document.getElementById('noise-overlay');
        const $endScreen = document.getElementById('end-screen');
        const $endTitle = document.getElementById('end-title');
        const $endSub = document.getElementById('end-subtitle');
        const $ft = document.getElementById('floor-transition');
        const $ftFloor = document.getElementById('ft-floor');
        const $ftName = document.getElementById('ft-name');
        const $ftTheme = document.getElementById('ft-theme');

        // ── SANITY UPDATE ────────────────────────────────────────────────
        function setSanity(val) {
            GS.sanity = Math.max(0, Math.min(100, val));
            $sanityBar.style.width = GS.sanity + '%';
            $sanityVal.textContent = Math.round(GS.sanity) + '%';
            // Color shift
            if (GS.sanity > 60) {
                $sanityBar.style.background = 'linear-gradient(90deg,#00ff88,#88ff00)';
            } else if (GS.sanity > 30) {
                $sanityBar.style.background = 'linear-gradient(90deg,#ff8800,#ffcc00)';
            } else {
                $sanityBar.style.background = 'linear-gradient(90deg,#ff3344,#ff6600)';
            }
            // Vignette
            const intensity = Math.max(0, (100 - GS.sanity) / 100);
            $vignette.style.background = `radial-gradient(ellipse at center, transparent ${40 - intensity * 30}%, rgba(0,0,0,${0.7 * intensity}) 100%)`;
            $noise.style.opacity = intensity * 0.4;

            if (GS.sanity <= 0 && GS.gameActive) triggerLose();
        }
        function drainSanity(amount) { setSanity(GS.sanity - amount); }
        function restoreSanity(amount) { setSanity(GS.sanity + amount); }

        // ── NOTIFICATIONS ────────────────────────────────────────────────
        let notifTimeout;
        function showNotif(msg, good = false) {
            $notif.textContent = msg;
            $notif.className = good ? 'good' : '';
            $notif.style.display = 'block';
            clearTimeout(notifTimeout);
            notifTimeout = setTimeout(() => $notif.style.display = 'none', 2200);
        }

        // ── WHISPER (FACULTY CLUE) ───────────────────────────────────────
        function openWhisper() {
            const f = FLOORS[GS.currentFloor];
            $whisperName.textContent = f.faculty.name;
            $whisperText.textContent = f.faculty.whisper;
            $whisperBox.style.display = 'block';
            GS.whisperOpen = true;
            if (!GS.facultyClueRead) {
                GS.facultyClueRead = true;
                setTimeout(() => { restoreSanity(5); showNotif('THEIR VOICE GROUNDS YOU  +5 SANITY', true); }, 600);
            }
        }
        document.getElementById('whisper-close').onclick = () => {
            $whisperBox.style.display = 'none';
            GS.whisperOpen = false;
        };

        // ── PUZZLE SYSTEM ────────────────────────────────────────────────
        function openPuzzle() {
            if (GS.puzzleSolved) { showNotif('PUZZLE ALREADY SOLVED'); return; }
            const f = FLOORS[GS.currentFloor];
            const p = f.puzzle;
            $puzzleTitle.textContent = p.title;
            $puzzleBody.textContent = p.body;
            $puzzleInput.innerHTML = '';
            $puzzleAttempts.textContent = '';
            GS.attempts = 0;
            GS.gridSelected = [];
            GS.puzzleOpen = true;
            $puzzleModal.style.display = 'block';

            if (p.type === 'lockers') buildLockerPuzzle(p);
            else if (p.type === 'sequence') buildSequencePuzzle(p);
            else if (p.type === 'grid') buildGridPuzzle(p);
            else if (p.type === 'order') buildOrderPuzzle(p);
            else if (p.type === 'hold') buildHoldPuzzle(p);
        }

        function closePuzzle() {
            $puzzleModal.style.display = 'none';
            GS.puzzleOpen = false;
        }

        // PUZZLE TYPE 1: Multiple choice lockers
        function buildLockerPuzzle(p) {
            p.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'puzzle-btn';
                btn.textContent = `LOCKER ${i + 1}: ${opt.label}`;
                btn.onclick = () => {
                    if (opt.correct) onPuzzleCorrect();
                    else onPuzzleWrong(btn);
                };
                $puzzleInput.appendChild(btn);
            });
        }

        // PUZZLE TYPE 2: Sequence input
        function buildSequencePuzzle(p) {
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.id = 'puzzle-number-input';
            inp.className = 'puzzle-number-input';
            inp.style.cssText = 'background:#111;border:1px solid #333;color:#fff;padding:10px 16px;font-family:Courier New,monospace;font-size:13px;width:100%;border-radius:2px;outline:none;letter-spacing:2px;';
            inp.placeholder = p.placeholder;
            inp.maxLength = 10;

            const sub = document.createElement('button');
            sub.textContent = 'SUBMIT SEQUENCE';
            sub.style.cssText = 'background:#111;border:1px solid #ff6b35;color:#ff6b35;padding:10px 24px;font-family:Courier New,monospace;font-size:12px;cursor:pointer;border-radius:2px;letter-spacing:2px;margin-top:4px;width:100%;';
            sub.onclick = () => {
                const val = inp.value.replace(/\s/g, '');
                if (val === p.answer) onPuzzleCorrect();
                else onPuzzleWrong(sub);
            };
            inp.onkeydown = (e) => { if (e.key === 'Enter') sub.click(); };

            $puzzleInput.appendChild(inp);
            $puzzleInput.appendChild(sub);
            setTimeout(() => inp.focus(), 100);
        }

        // PUZZLE TYPE 3: Grid / prime tiles
        function buildGridPuzzle(p) {
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:6px;';
            const found = new Set();
            const total = p.primes.length;

            p.tiles.forEach(num => {
                const tile = document.createElement('div');
                tile.className = 'grid-tile';
                tile.textContent = num;
                tile.dataset.num = num;
                tile.onclick = () => {
                    if (tile.classList.contains('collapsed') || tile.classList.contains('selected')) return;
                    if (p.primes.includes(num)) {
                        tile.classList.add('selected');
                        found.add(num);
                        if (found.size === total) onPuzzleCorrect();
                    } else {
                        tile.classList.add('wrong-tile');
                        setTimeout(() => tile.classList.add('collapsed'), 400);
                        onPuzzleWrong(null);
                    }
                };
                grid.appendChild(tile);
            });
            $puzzleInput.appendChild(grid);
            const hint = document.createElement('div');
            hint.style.cssText = 'color:#333;font-size:10px;letter-spacing:1px;margin-top:8px;';
            hint.textContent = `SELECT ALL ${total} PRIME TILES — PRIMES ARE DIVISIBLE ONLY BY 1 AND THEMSELVES`;
            $puzzleInput.appendChild(hint);
        }

        // PUZZLE TYPE 4: Drag-to-order paintings
        function buildOrderPuzzle(p) {
            const area = document.createElement('div');
            area.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

            // Shuffle the items
            let items = [...p.items].sort(() => Math.random() - 0.5);
            GS.orderItems = items.map(i => i.id);

            const renderCards = () => {
                area.innerHTML = '';
                GS.orderItems.forEach((id, idx) => {
                    const item = p.items.find(i => i.id === id);
                    const card = document.createElement('div');
                    card.className = 'painting-card';
                    card.textContent = `${idx + 1}. ${item.label}`;
                    card.draggable = true;
                    card.dataset.idx = idx;
                    card.ondragstart = () => { GS.draggingCard = idx; card.style.opacity = '0.4'; };
                    card.ondragend = () => { card.style.opacity = '1'; };
                    card.ondragover = (e) => { e.preventDefault(); };
                    card.ondrop = () => {
                        if (GS.draggingCard === null || GS.draggingCard === idx) return;
                        const arr = [...GS.orderItems];
                        const [moved] = arr.splice(GS.draggingCard, 1);
                        arr.splice(idx, 0, moved);
                        GS.orderItems = arr;
                        GS.draggingCard = null;
                        renderCards();
                    };
                    area.appendChild(card);
                });

                const sub = document.createElement('button');
                sub.textContent = 'CONFIRM ORDER';
                sub.style.cssText = 'background:#111;border:1px solid #ff6b35;color:#ff6b35;padding:10px 24px;font-family:Courier New,monospace;font-size:12px;cursor:pointer;border-radius:2px;letter-spacing:2px;margin-top:8px;width:100%;';
                sub.onclick = () => {
                    const correct = p.correctOrder.join('') === GS.orderItems.join('');
                    if (correct) onPuzzleCorrect();
                    else onPuzzleWrong(sub);
                };
                area.appendChild(sub);

                const hint2 = document.createElement('div');
                hint2.style.cssText = 'color:#333;font-size:10px;letter-spacing:1px;margin-top:6px;text-align:center;';
                hint2.textContent = 'DRAG CARDS TO REORDER · CLICK CONFIRM WHEN READY';
                area.appendChild(hint2);
            };

            renderCards();
            $puzzleInput.appendChild(area);
        }

        // PUZZLE TYPE 5: Hold button (final floor)
        let holdInterval = null;
        let holdProgress = 0;
        function buildHoldPuzzle(p) {
            // Show recap of previous solutions
            const recap = document.createElement('div');
            recap.style.cssText = 'color:#333;font-size:10px;letter-spacing:1px;margin-bottom:12px;line-height:2;border-left:2px solid #1a1a1a;padding-left:12px;';
            recap.innerHTML = '✓ FLOOR G — LOCKER 4 OPENED<br>✓ FLOOR 1 — SEQUENCE: 19478<br>✓ FLOOR 2 — PRIME TILES STEPPED<br>✓ FLOOR 3 — SILENCE → WORDS → CONSEQUENCE';
            $puzzleInput.appendChild(recap);

            const btn = document.createElement('button');
            btn.id = 'hold-btn';
            btn.style.cssText = 'background:#0a0a0a;border:2px solid #ff6b35;color:#ff6b35;padding:18px 40px;font-family:Courier New,monospace;font-size:13px;cursor:pointer;border-radius:2px;letter-spacing:3px;position:relative;overflow:hidden;width:100%;display:block;';
            btn.textContent = 'HOLD TO OPEN — 5 SECONDS';

            const prog = document.createElement('div');
            prog.id = 'hold-progress';
            prog.style.cssText = 'position:absolute;bottom:0;left:0;height:3px;background:#ff6b35;width:0%;transition:none;';
            btn.appendChild(prog);

            btn.onmousedown = btn.ontouchstart = () => {
                holdProgress = 0;
                holdInterval = setInterval(() => {
                    holdProgress += 2;
                    prog.style.width = holdProgress + '%';
                    if (holdProgress >= 100) {
                        clearInterval(holdInterval);
                        onPuzzleCorrect();
                    }
                }, 100);
            };
            const stop = () => {
                clearInterval(holdInterval);
                if (holdProgress < 100) {
                    holdProgress = 0;
                    prog.style.width = '0%';
                }
            };
            btn.onmouseup = btn.ontouchend = btn.onmouseleave = stop;

            $puzzleInput.appendChild(btn);
        }

        // ── PUZZLE OUTCOMES ──────────────────────────────────────────────
        function onPuzzleCorrect() {
            GS.puzzleSolved = true;
            closePuzzle();
            restoreSanity(10);
            showNotif('PUZZLE SOLVED  +10 SANITY', true);
            GS.nearStairs = true; // stairs unlocked
            setTimeout(() => {
                showNotif('STAIRCASE UNLOCKED — REACH THE STAIRS', true);
            }, 2500);
        }

        function onPuzzleWrong(el) {
            GS.attempts++;
            drainSanity(10);
            showNotif(`WRONG  -10 SANITY  (ATTEMPT ${GS.attempts})`);
            if (el) {
                el.classList.add('wrong');
                setTimeout(() => el.classList.remove('wrong'), 500);
            }
            $puzzleAttempts.textContent = `ATTEMPTS: ${GS.attempts}`;
        }

        // ── FLOOR TRANSITION ─────────────────────────────────────────────
        function showFloorTransition(idx, cb) {
            const f = FLOORS[idx];
            $ftFloor.textContent = idx === 0 ? 'GROUND FLOOR' : `FLOOR ${f.id}`;
            $ftName.textContent = f.name;
            $ftTheme.textContent = f.theme;
            $ft.style.display = 'flex';
            setTimeout(() => {
                $ft.style.display = 'none';
                if (cb) cb();
            }, 2800);
        }

        // ── WIN / LOSE ───────────────────────────────────────────────────
        function triggerWin() {
            GS.gameActive = false;
            $endTitle.textContent = 'ROOM 502';
            $endTitle.style.color = '#00ff88';
            $endSub.textContent = 'ARJUN SITS AT HIS DESK. SANITY RESTORED. THE EXAM BEGINS.';
            $endSub.style.color = '#555';
            $endScreen.style.display = 'flex';
            if (phaserGame) phaserGame.scene.pause('GameScene');
        }

        function triggerLose() {
            GS.gameActive = false;
            $endTitle.textContent = 'SWALLOWED';
            $endTitle.style.color = '#ff3344';
            $endSub.textContent = '"HE NEVER MADE IT TO CLASS."';
            $endSub.style.color = '#555';
            $endScreen.style.display = 'flex';
            if (phaserGame) phaserGame.scene.pause('GameScene');
        }

        document.getElementById('end-restart').onclick = () => {
            $endScreen.style.display = 'none';
            resetGame();
        };

        function resetGame() {
            GS.currentFloor = 0;
            GS.sanity = 100;
            GS.gameActive = false;
            GS.puzzleSolved = false;
            GS.facultyClueRead = false;
            GS.nearFaculty = false;
            GS.nearPuzzle = false;
            GS.nearStairs = false;
            GS.puzzleOpen = false;
            GS.whisperOpen = false;
            GS.attempts = 0;
            setSanity(100);
            if (phaserGame) {
                phaserGame.scene.stop('GameScene');
                phaserGame.scene.start('GameScene');
            }
        }

        // ── INTERACT HINT ────────────────────────────────────────────────
        function updateHint() {
            if (GS.puzzleSolved && GS.nearStairs) {
                $hint.textContent = '[ E ] CLIMB STAIRS';
                $hint.style.color = '#00ff88';
            } else if (GS.nearFaculty) {
                $hint.textContent = '[ E ] LISTEN TO TEACHER';
                $hint.style.color = '#ff6b35';
            } else if (GS.nearPuzzle) {
                $hint.textContent = GS.puzzleSolved ? '[ PUZZLE SOLVED ]' : '[ E ] EXAMINE PUZZLE';
                $hint.style.color = GS.puzzleSolved ? '#00ff88' : '#aaa';
            } else {
                $hint.textContent = 'WASD · MOVE';
                $hint.style.color = '#222';
            }
        }

        // ═══════════════════════════════════════════════════════════════
        // PHASER SCENE
        // ═══════════════════════════════════════════════════════════════
        class GameScene extends Phaser.Scene {
            constructor() { super('GameScene'); }

            create() {
                this.floorData = FLOORS[GS.currentFloor];
                $floorLabel.textContent = GS.currentFloor === 0 ? 'FLOOR G' : `FLOOR ${this.floorData.id}`;
                setSanity(this.floorData.sanityStart);

                GS.puzzleSolved = false;
                GS.facultyClueRead = false;
                GS.nearFaculty = false;
                GS.nearPuzzle = false;
                GS.nearStairs = false;
                GS.puzzleOpen = false;
                GS.whisperOpen = false;
                GS.gameActive = true;

                this.buildLevel();
                this.buildPlayer();
                this.buildMonster();
                this.buildInteractibles();
                this.setupKeys();
                this.setupSanityDrain();
                this.cameras.main.setBackgroundColor(this.floorData.bgColor);
            }

            // ── LEVEL ──────────────────────────────────────────────────────
            buildLevel() {
                const fd = this.floorData;
                const W = 800, H = 600;
                const g = this.add.graphics();

                // Floor
                g.fillStyle(fd.floorColor, 1);
                g.fillRect(0, 0, W, H);

                // Hallway walls (top and bottom strips)
                g.fillStyle(fd.wallColor, 1);
                g.fillRect(0, 0, W, 80);      // top wall
                g.fillRect(0, H - 80, W, 80);   // bottom wall

                // Wall detail lines
                g.lineStyle(1, 0xffffff, 0.03);
                for (let x = 0; x < W; x += 40) {
                    g.strokeLineShape(new Phaser.Geom.Line(x, 80, x, H - 80));
                }
                for (let y = 80; y < H - 80; y += 40) {
                    g.strokeLineShape(new Phaser.Geom.Line(0, y, W, y));
                }

                // Lockers / decorations on top wall
                g.fillStyle(fd.wallColor + 0x101010, 1);
                for (let i = 0; i < 5; i++) {
                    g.fillRect(60 + i * 140, 88, 60, 55);
                    g.lineStyle(1, 0xffffff, 0.06);
                    g.strokeRect(60 + i * 140, 88, 60, 55);
                }

                // Staircase door (right side) — only shows after puzzle solved
                this.stairDoor = this.add.graphics();
                this.drawStairDoor(false);

                // Darkness zones
                this.darkZones = [
                    new Phaser.Geom.Rectangle(200, 80, 120, 440),
                    new Phaser.Geom.Rectangle(500, 80, 120, 440),
                ];
                this.darkZones.forEach(z => {
                    const dg = this.add.graphics();
                    dg.fillStyle(0x000000, 0.35);
                    dg.fillRect(z.x, z.y, z.width, z.height);
                });

                // Floor number label
                this.add.text(W / 2, H - 55, `FLOOR ${this.floorData.id === 'G' ? 'G' : this.floorData.id} — ${this.floorData.name}`, {
                    font: '10px Courier New',
                    fill: '#222',
                    letterSpacing: 3
                }).setOrigin(0.5);

                // Sanity flicker effect (ambient)
                this.time.addEvent({
                    delay: Phaser.Math.Between(3000, 8000),
                    callback: this.flickerLights,
                    callbackScope: this,
                    loop: true
                });
            }

            drawStairDoor(open) {
                this.stairDoor.clear();
                if (open) {
                    this.stairDoor.fillStyle(0x00ff88, 0.15);
                    this.stairDoor.fillRect(720, 200, 60, 180);
                    this.stairDoor.lineStyle(2, 0x00ff88, 0.8);
                    this.stairDoor.strokeRect(720, 200, 60, 180);
                    this.add.text(750, 290, '↑', { font: 'bold 24px Courier New', fill: '#00ff88' }).setOrigin(0.5);
                } else {
                    this.stairDoor.fillStyle(0x111111, 1);
                    this.stairDoor.fillRect(720, 200, 60, 180);
                    this.stairDoor.lineStyle(1, 0x222222, 1);
                    this.stairDoor.strokeRect(720, 200, 60, 180);
                }
            }

            flickerLights() {
                this.cameras.main.flash(Phaser.Math.Between(30, 120), 10, 10, 10);
            }

            // ── PLAYER ────────────────────────────────────────────────────
            buildPlayer() {
                const g = this.add.graphics();
                g.fillStyle(0xffffff, 1);
                g.fillRect(-10, -14, 20, 28);
                g.fillStyle(0xdddddd, 1);
                g.fillCircle(0, -18, 9);
                // Backpack
                g.fillStyle(0x888888, 1);
                g.fillRect(-8, -10, 6, 16);

                const tex = this.add.renderTexture(0, 0, 20, 28).setVisible(false);
                tex.draw(g, 10, 14);

                this.player = this.add.graphics();
                this.playerX = 60;
                this.playerY = 300;
                this.drawPlayer();

                // Shadow (floor G monster concept — a trailing ghost)
                this.shadowX = 60;
                this.shadowY = 300;
                this.shadowGraphic = this.add.graphics();
                this.shadowTrail = [];
                this.posHistory = [];
            }

            drawPlayer() {
                this.player.clear();
                this.player.fillStyle(0xffffff, 1);
                this.player.fillRect(this.playerX - 9, this.playerY - 12, 18, 26);
                this.player.fillStyle(0xdddddd, 0.9);
                this.player.fillCircle(this.playerX, this.playerY - 16, 9);
                // Bag
                this.player.fillStyle(0x888888, 0.8);
                this.player.fillRect(this.playerX - 14, this.playerY - 10, 6, 14);
            }

            // ── MONSTER ───────────────────────────────────────────────────
            buildMonster() {
                const fd = this.floorData;
                this.monsterX = 380;
                this.monsterY = 300;
                this.monsterGraphic = this.add.graphics();
                this.monsterSpeed = 1.4 + GS.currentFloor * 0.2;
                this.monsterPatrol = true;
                this.monsterDir = 1;
                this.monsterPatrolMin = 200;
                this.monsterPatrolMax = 600;
                this.monsterAware = false;
                this.monsterAwareTimer = 0;
                this.drawMonster();
            }

            drawMonster() {
                const fd = this.floorData;
                this.monsterGraphic.clear();
                const alpha = this.monsterAware ? 0.9 : 0.55;

                // Each floor gets a different monster shape
                const fl = GS.currentFloor;
                this.monsterGraphic.fillStyle(fd.monsterColor, alpha);

                if (fl === 0) {
                    // Shadow — mirror of player
                    this.monsterGraphic.fillRect(this.monsterX - 9, this.monsterY - 12, 18, 26);
                    this.monsterGraphic.fillCircle(this.monsterX, this.monsterY - 16, 9);
                    this.monsterGraphic.lineStyle(1, fd.monsterColor, 0.3);
                    this.monsterGraphic.strokeRect(this.monsterX - 11, this.monsterY - 14, 22, 30);
                } else if (fl === 1) {
                    // Classmates — three small blobs
                    [-18, 0, 18].forEach(dx => {
                        this.monsterGraphic.fillCircle(this.monsterX + dx, this.monsterY, 10);
                        this.monsterGraphic.fillRect(this.monsterX + dx - 5, this.monsterY + 8, 10, 18);
                    });
                } else if (fl === 2) {
                    // Equation — floating chalkboard
                    this.monsterGraphic.fillRect(this.monsterX - 20, this.monsterY - 15, 40, 30);
                    this.monsterGraphic.lineStyle(1, fd.monsterColor, 0.5);
                    this.monsterGraphic.strokeRect(this.monsterX - 20, this.monsterY - 15, 40, 30);
                    // Math symbols
                    this.monsterGraphic.fillStyle(0x000000, 0.5);
                    this.monsterGraphic.fillCircle(this.monsterX - 8, this.monsterY, 3);
                    this.monsterGraphic.fillCircle(this.monsterX + 8, this.monsterY, 3);
                } else if (fl === 3) {
                    // Regret — shapeless expanding mass
                    const pulse = 1 + 0.15 * Math.sin(Date.now() / 400);
                    for (let r = 30; r > 0; r -= 8) {
                        this.monsterGraphic.fillStyle(fd.monsterColor, alpha * (r / 30) * 0.5);
                        this.monsterGraphic.fillCircle(this.monsterX, this.monsterY, r * pulse);
                    }
                } else if (fl === 4) {
                    // The Self — towering shadow with face
                    this.monsterGraphic.fillRect(this.monsterX - 14, this.monsterY - 30, 28, 50);
                    this.monsterGraphic.fillCircle(this.monsterX, this.monsterY - 38, 14);
                    // Eyes
                    this.monsterGraphic.fillStyle(0x000000, 1);
                    this.monsterGraphic.fillCircle(this.monsterX - 5, this.monsterY - 40, 3);
                    this.monsterGraphic.fillCircle(this.monsterX + 5, this.monsterY - 40, 3);
                }
            }

            // ── INTERACTIBLES ─────────────────────────────────────────────
            buildInteractibles() {
                const fd = this.floorData;

                // Faculty member (teacher) — left area
                this.teacherX = 160;
                this.teacherY = 300;
                this.teacherGraphic = this.add.graphics();
                this.drawTeacher();

                // Pulsing teacher label
                this.teacherLabel = this.add.text(this.teacherX, this.teacherY - 36, '?', {
                    font: 'bold 14px Courier New',
                    fill: '#ff6b35'
                }).setOrigin(0.5);

                this.tweens.add({
                    targets: this.teacherLabel,
                    alpha: 0.2,
                    duration: 900,
                    yoyo: true,
                    repeat: -1
                });

                // Puzzle object — center-right area
                this.puzzleX = 520;
                this.puzzleY = 300;
                this.puzzleGraphic = this.add.graphics();
                this.drawPuzzleObject();

                this.puzzleLabel = this.add.text(this.puzzleX, this.puzzleY - 40, '⬡', {
                    font: '18px Courier New',
                    fill: '#4488ff'
                }).setOrigin(0.5);

                this.tweens.add({
                    targets: this.puzzleLabel,
                    y: this.puzzleY - 46,
                    duration: 1200,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });

                // Stairs (far right, unlocked after puzzle)
                this.stairsX = 750;
                this.stairsY = 290;
            }

            drawTeacher() {
                this.teacherGraphic.clear();
                // Teacher figure (slightly taller, different color)
                this.teacherGraphic.fillStyle(0xff6b35, 0.7);
                this.teacherGraphic.fillRect(this.teacherX - 10, this.teacherY - 16, 20, 30);
                this.teacherGraphic.fillStyle(0xff8855, 0.8);
                this.teacherGraphic.fillCircle(this.teacherX, this.teacherY - 22, 11);
            }

            drawPuzzleObject() {
                this.puzzleGraphic.clear();
                const fl = GS.currentFloor;
                if (fl === 0) {
                    // Lockers
                    for (let i = -2; i <= 2; i++) {
                        this.puzzleGraphic.fillStyle(0x223355, 0.8);
                        this.puzzleGraphic.fillRect(this.puzzleX + i * 22 - 9, this.puzzleY - 18, 18, 36);
                        this.puzzleGraphic.lineStyle(1, 0x4488ff, 0.4);
                        this.puzzleGraphic.strokeRect(this.puzzleX + i * 22 - 9, this.puzzleY - 18, 18, 36);
                    }
                } else if (fl === 1) {
                    // Blackboard
                    this.puzzleGraphic.fillStyle(0x1a2a1a, 0.9);
                    this.puzzleGraphic.fillRect(this.puzzleX - 32, this.puzzleY - 22, 64, 44);
                    this.puzzleGraphic.lineStyle(1, 0x446644, 0.6);
                    this.puzzleGraphic.strokeRect(this.puzzleX - 32, this.puzzleY - 22, 64, 44);
                } else if (fl === 2) {
                    // Tile grid miniature
                    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
                        const col = [2, 3, 5, 7, 11, 13].includes(r * 4 + c + 1) ? 0x224422 : 0x221111;
                        this.puzzleGraphic.fillStyle(col, 0.8);
                        this.puzzleGraphic.fillRect(this.puzzleX - 28 + c * 14, this.puzzleY - 28 + r * 14, 12, 12);
                    }
                } else if (fl === 3) {
                    // Paintings on wall
                    for (let i = 0; i < 3; i++) {
                        this.puzzleGraphic.fillStyle(0x2a2a1a, 0.9);
                        this.puzzleGraphic.fillRect(this.puzzleX - 42 + i * 30, this.puzzleY - 24, 24, 36);
                        this.puzzleGraphic.lineStyle(1, 0x886644, 0.5);
                        this.puzzleGraphic.strokeRect(this.puzzleX - 42 + i * 30, this.puzzleY - 24, 24, 36);
                    }
                } else if (fl === 4) {
                    // Door
                    this.puzzleGraphic.fillStyle(0x1a1a1a, 1);
                    this.puzzleGraphic.fillRect(this.puzzleX - 22, this.puzzleY - 34, 44, 68);
                    this.puzzleGraphic.lineStyle(2, 0xff6b35, 0.8);
                    this.puzzleGraphic.strokeRect(this.puzzleX - 22, this.puzzleY - 34, 44, 68);
                    // Five lock dots
                    for (let i = 0; i < 5; i++) {
                        this.puzzleGraphic.fillStyle(GS.currentFloor > 4 ? 0x00ff88 : 0x333333, 1);
                        this.puzzleGraphic.fillCircle(this.puzzleX - 12 + i * 6, this.puzzleY - 10, 3);
                    }
                }
            }

            // ── KEYS ──────────────────────────────────────────────────────
            setupKeys() {
                this.keys = this.input.keyboard.addKeys({
                    up: Phaser.Input.Keyboard.KeyCodes.W,
                    down: Phaser.Input.Keyboard.KeyCodes.S,
                    left: Phaser.Input.Keyboard.KeyCodes.A,
                    right: Phaser.Input.Keyboard.KeyCodes.D,
                    upArr: Phaser.Input.Keyboard.KeyCodes.UP,
                    downArr: Phaser.Input.Keyboard.KeyCodes.DOWN,
                    leftArr: Phaser.Input.Keyboard.KeyCodes.LEFT,
                    rightArr: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                    interact: Phaser.Input.Keyboard.KeyCodes.E,
                });

                this.input.keyboard.on('keydown-E', () => {
                    if (!GS.gameActive || GS.puzzleOpen) return;
                    if (GS.whisperOpen) { $whisperBox.style.display = 'none'; GS.whisperOpen = false; return; }
                    if (GS.nearStairs && GS.puzzleSolved) {
                        this.advanceFloor();
                    } else if (GS.nearFaculty) {
                        openWhisper();
                    } else if (GS.nearPuzzle) {
                        openPuzzle();
                    }
                });
            }

            // ── SANITY DRAIN IN DARK ZONES ────────────────────────────────
            setupSanityDrain() {
                this.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        if (!GS.gameActive || GS.puzzleOpen) return;
                        const inDark = this.darkZones.some(z =>
                            this.playerX > z.x && this.playerX < z.x + z.width &&
                            this.playerY > z.y && this.playerY < z.y + z.height
                        );
                        if (inDark) {
                            drainSanity(1);
                            showNotif('DARKNESS CREEPS IN  -1 SANITY');
                        }
                    },
                    loop: true
                });
            }

            // ── UPDATE LOOP ───────────────────────────────────────────────
            update() {
                if (!GS.gameActive || GS.puzzleOpen || GS.whisperOpen) return;

                const spd = 2.8;
                let moved = false;

                const up = this.keys.up.isDown || this.keys.upArr.isDown;
                const down = this.keys.down.isDown || this.keys.downArr.isDown;
                const left = this.keys.left.isDown || this.keys.leftArr.isDown;
                const right = this.keys.right.isDown || this.keys.rightArr.isDown;

                if (up) { this.playerY -= spd; moved = true; }
                if (down) { this.playerY += spd; moved = true; }
                if (left) { this.playerX -= spd; moved = true; }
                if (right) { this.playerX += spd; moved = true; }

                // Clamp to hallway
                this.playerX = Phaser.Math.Clamp(this.playerX, 20, 780);
                this.playerY = Phaser.Math.Clamp(this.playerY, 88, 512);

                this.drawPlayer();

                // Monster update
                this.updateMonster(moved);

                // Check proximity
                this.checkProximity();

                // Position history for shadow (Floor G monster)
                if (GS.currentFloor === 0) {
                    this.posHistory.push({ x: this.playerX, y: this.playerY });
                    if (this.posHistory.length > 90) this.posHistory.shift(); // ~3 sec at 30fps
                    if (this.posHistory.length >= 90) {
                        const hist = this.posHistory[0];
                        this.monsterX = hist.x;
                        this.monsterY = hist.y;
                        this.drawMonster();
                    }
                }

                updateHint();
            }

            updateMonster(playerMoved) {
                const fd = this.floorData;
                if (GS.currentFloor === 0) return; // handled via history above

                const dx = this.playerX - this.monsterX;
                const dy = this.playerY - this.monsterY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const detectionRange = 180;

                // Floor 3: Regret expands when player stands still
                if (GS.currentFloor === 3 && !playerMoved) {
                    this.monsterSpeed = Math.min(this.monsterSpeed + 0.02, 3.5);
                } else {
                    this.monsterSpeed = Math.max(1.4 + GS.currentFloor * 0.2, this.monsterSpeed - 0.01);
                }

                // Floor 4: mirror movement with delay (handled differently — monster copies player)
                if (GS.currentFloor === 4) {
                    // Convergence — monster slowly follows
                    this.monsterX += (dx / dist) * 0.5;
                    this.monsterY += (dy / dist) * 0.5;
                    this.drawMonster();
                    // Catch check
                    if (dist < 24) this.monsterCatch();
                    return;
                }

                // Aware detection
                if (dist < detectionRange) {
                    this.monsterAware = true;
                    this.monsterAwareTimer = 120;
                }
                if (this.monsterAwareTimer > 0) this.monsterAwareTimer--;
                else this.monsterAware = false;

                if (this.monsterAware) {
                    // Chase
                    this.monsterX += (dx / dist) * this.monsterSpeed * 1.4;
                    this.monsterY += (dy / dist) * this.monsterSpeed * 1.4;
                } else {
                    // Patrol
                    this.monsterX += this.monsterSpeed * this.monsterDir;
                    if (this.monsterX > this.monsterPatrolMax || this.monsterX < this.monsterPatrolMin) {
                        this.monsterDir *= -1;
                    }
                }

                this.drawMonster();

                if (dist < 24) this.monsterCatch();
            }

            monsterCatch() {
                drainSanity(15);
                showNotif('CAUGHT!  -15 SANITY');
                // Reset player to floor start
                this.playerX = 60;
                this.playerY = 300;
                this.monsterX = 380;
                this.monsterY = 300;
                this.cameras.main.shake(400, 0.015);
                this.cameras.main.flash(200, 40, 0, 0);
            }

            checkProximity() {
                const REACH = 70;

                // Faculty
                const dTeach = Math.hypot(this.playerX - this.teacherX, this.playerY - this.teacherY);
                GS.nearFaculty = dTeach < REACH;

                // Puzzle
                const dPuzz = Math.hypot(this.playerX - this.puzzleX, this.playerY - this.puzzleY);
                GS.nearPuzzle = dPuzz < REACH;

                // Stairs
                const dStairs = Math.hypot(this.playerX - this.stairsX, this.playerY - this.stairsY);
                GS.nearStairs = dStairs < REACH;

                // Unlock stair door visually
                if (GS.puzzleSolved) {
                    this.drawStairDoor(true);
                }
            }

            // ── FLOOR ADVANCE ─────────────────────────────────────────────
            advanceFloor() {
                GS.gameActive = false;
                restoreSanity(10); // floor clear bonus
                showNotif('FLOOR CLEARED  +10 SANITY', true);

                const next = GS.currentFloor + 1;

                if (next >= FLOORS.length) {
                    // WIN
                    setTimeout(() => triggerWin(), 1200);
                    return;
                }

                setTimeout(() => {
                    showFloorTransition(next, () => {
                        GS.currentFloor = next;
                        $floorLabel.textContent = `FLOOR ${FLOORS[next].id}`;
                        this.scene.restart();
                    });
                }, 1000);
            }
        }

        // ── MENU ─────────────────────────────────────────────────────────
        document.getElementById('menu-start').onclick = () => {
            document.getElementById('menu-screen').style.display = 'none';
            showFloorTransition(0, () => {
                phaserGame.scene.start('GameScene');
            });
        };

        // ── PHASER INIT ───────────────────────────────────────────────────
        let phaserGame;
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            backgroundColor: '#000000',
            scene: [GameScene],
            audio: { disableWebAudio: false },
        };

        phaserGame = new Phaser.Game(config);

        // Hide canvas until game starts
        phaserGame.events.once('ready', () => {
            const canvas = document.querySelector('#game-container canvas');
            if (canvas) {
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';
            }
        });

        // ── AMBIENT SANITY FLICKER (CSS) ──────────────────────────────────
        setInterval(() => {
            if (!GS.gameActive) return;
            if (GS.sanity < 40 && Math.random() < 0.15) {
                document.body.style.filter = `hue-rotate(${Phaser.Math.Between(-10, 10)}deg)`;
                setTimeout(() => document.body.style.filter = '', 120);
            }
        }, 800);
    
