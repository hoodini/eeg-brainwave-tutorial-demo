# GitHub Copilot Instructions for EEG Brainwave Tutorial

## Project Overview
Educational web app for learning EEG (electroencephalogram) brainwave interpretation. Pure vanilla JavaScript (no frameworks) with dual-class architecture and real-time Canvas animation at 60fps. Three core files: `index.html`, `script.js`, `styles.css`.

## Architecture Pattern: Two-Class System

### EEGSimulator Class (`script.js`)
**Central controller** for all canvas rendering, animation, and wave mathematics. Single source of truth for application state.

```javascript
// State lives here - never duplicate state elsewhere
this.isPlaying = true;          // Animation control
this.showAllWaves = false;      // Display mode: single wave vs composite
this.currentWave = 'delta';     // Active wave type (delta/theta/alpha/beta/gamma)
this.time = 0;                  // Animation timeline counter
this.amplitude = 50;            // User-controlled amplitude (10-100)
this.speed = 1;                 // Playback speed multiplier (0.1-3)
```

**Key responsibilities:**
- Dual canvas rendering (`eegCanvas` for waveforms, `spectrumCanvas` for frequency bars)
- Wave data generation with harmonics: `y = sin(t × freq × 0.5 + phase) × amp × weight`
- Event handling for all UI controls (wave buttons, sliders, electrode hovers)
- 60fps animation loop via `requestAnimationFrame`

### EEGEducation Class (`script.js`)
**Educational features only** - modal dialogs, comparison charts, quiz system. Never touches canvas or animation state.

```javascript
// Creates separate UI overlays, never modifies simulator state
addWaveComparisons()  // Adds comparison button → shows modal
startQuiz()          // Interactive quiz in modal overlay
```

## Critical Patterns

### Wave Data Structure
**Two distinct modes** with different data shapes:

```javascript
// Single wave mode: waveData object
{ frequency: 10, color: '#FF9800', channels: 8 }

// Composite mode: allWaveData object with 5 wave types
{
  delta: { frequency: 2, color: '#4CAF50', amplitude: 0.4 },
  theta: { frequency: 6, color: '#2196F3', amplitude: 0.3 },
  // ... 3 more wave types
}
```

**Color coding convention** (Material Design, used consistently):
- Delta: `#4CAF50` (green) - Deep sleep
- Theta: `#2196F3` (blue) - Meditation
- Alpha: `#FF9800` (orange) - Relaxed
- Beta: `#9C27B0` (purple) - Active thinking
- Gamma: `#E91E63` (pink) - High-level cognition

### Canvas Rendering Pipeline
**Strict order** - deviation causes visual artifacts:

```javascript
animate() {
  // 1. Update time
  if (this.isPlaying) this.time += 0.05 * this.speed;
  
  // 2. EEG Canvas: clearRect → drawGrid → drawWaves → drawTimeMarker
  // 3. Spectrum Canvas: clearRect → drawSpectrum (frequency bars)
  
  requestAnimationFrame(() => this.animate());
}
```

**Drawing optimization rules:**
- Use `ctx.beginPath()` once per waveform, not per point
- Step through x-coordinates in increments of 2-4px (not 1px)
- Add noise last: `y += (Math.random() - 0.5) * 5;`

### Multi-Channel Wave Synthesis
**8 channels for single mode, 5 channels for composite mode:**

```javascript
// Each channel gets phase shift for realistic EEG appearance
const phaseShift = channel * Math.PI * 0.25;
let y = Math.sin(t * frequency * 0.5 + phaseShift) * amplitude * 0.8;

// Add harmonics (2nd and 3rd) for realistic waveform shape
y += Math.sin(t * frequency * 1.5 + phaseShift) * amplitude * 0.2;
y += Math.sin(t * frequency * 2 + phaseShift) * amplitude * 0.1;
```

### Event Handling Convention
**All event listeners in `setupEventListeners()`** - never scattered across methods:

```javascript
// Wave button clicks
document.querySelectorAll('.wave-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // 1. Update UI (remove/add active class)
    // 2. Update state (this.currentWave)
    // 3. Regenerate data (this.waveData = this.generateWaveData())
    // 4. Update info panel (this.updateWaveInfo())
  });
});

// Slider controls - always update both state AND display text
document.getElementById('amplitude').addEventListener('input', (e) => {
  this.amplitude = parseInt(e.target.value);
  document.getElementById('amplitudeValue').textContent = this.amplitude;
});
```

## HTML/CSS Integration Points

### SVG Electrode Map (10-20 System)
**21 electrodes** at specific positions in `index.html`. Each has `data-electrode` attribute for hover tooltips:

```html
<circle cx="150" cy="50" r="8" class="electrode" data-electrode="Fpz" fill="#4CAF50"/>
```

**Hover interaction** triggers `highlightElectrode()` which creates/positions tooltip with electrode function description.

### Dynamic Content Injection
**Wave info panel updates** happen via `innerHTML` replacement in `updateWaveInfo()`:

```javascript
// Checks mode: showAllWaves ? composite view : single wave view
waveInfoElement.innerHTML = `<h3>${info.name}</h3>...`;
```

### CSS Grid Layout
**Main content uses CSS Grid** (not flexbox) for responsive two-column layout:

```css
.main-content {
  display: grid;
  grid-template-columns: 2fr 1fr;  /* Visualization panel : Info panel */
  gap: 30px;
}
```

## Development Workflows

### Quick Local Testing
```bash
# No build step required - just open in browser
open index.html

# Or use HTTP server for testing (avoids CORS issues)
python -m http.server 8080
# or
npx serve .
```

### Key Testing Scenarios
1. **Wave switching** - Verify waveform frequency changes, info panel updates, color transitions
2. **All Waves toggle** - Check that 5-channel composite view displays with correct emphasis
3. **Amplitude/Speed sliders** - Ensure smooth animation without stutter
4. **Electrode hover** - Tooltip appears near cursor, correct info displayed
5. **Compare Waves modal** - Overlay displays, closes on outside click
6. **Quiz flow** - Questions display sequentially, score tracks correctly

### Performance Debugging
```javascript
// Add FPS counter in animate() for performance testing
const fps = 1000 / (performance.now() - lastTime);
console.log(`FPS: ${fps.toFixed(1)}`);
```

**Target: 60fps consistently**. If dropping frames:
1. Reduce canvas drawing step size (increase from 2 to 4px)
2. Simplify harmonics (remove 3rd harmonic calculation)
3. Check for memory leaks in event listeners

## Medical/Scientific Accuracy

### Wave Definitions (Clinically Accurate)
These frequency ranges and amplitudes are **not arbitrary** - they match ACNS standards:

```javascript
// Delta: 0.5-4 Hz, 100-200 µV - Deep sleep, NREM stages 3-4
// Theta: 4-8 Hz, 50-100 µV - Light sleep, REM, meditation
// Alpha: 8-13 Hz, 30-50 µV - Relaxed wakefulness, posterior dominant rhythm
// Beta: 13-30 Hz, 10-30 µV - Active cognition, motor planning
// Gamma: 30-100 Hz, 5-10 µV - Binding, consciousness, high-level processing
```

**When adding features:** Verify medical accuracy with neuroscience references. Educational content must be factually correct.

### 10-20 Electrode System
**Standard clinical placement** - electrode names are not arbitrary:
- **F** = Frontal, **C** = Central, **T** = Temporal, **P** = Parietal, **O** = Occipital
- **Odd numbers** = Left hemisphere, **Even numbers** = Right hemisphere
- **z suffix** = Midline (zero line)

Example: `F3` = Left Frontal, `Pz` = Parietal Midline

## Common Modification Patterns

### Adding a New Wave Type
1. Add to `generateWaveData()` waves object with frequency/color/channels
2. Add button in `index.html` with `data-wave="newtype"`
3. Add wave info in `updateWaveInfo()` waveInfo object
4. Add to spectrum bars in `drawSpectrum()` freqBands array
5. Update README.md brainwave table

### Adding UI Controls
1. Add HTML element in `index.html` controls div
2. Add event listener in `setupEventListeners()`
3. Update state property in EEGSimulator
4. Trigger redraw if visual update needed (animation loop handles automatically)

### Modifying Canvas Rendering
**Always test both display modes:**
- Single wave mode: `this.showAllWaves = false`
- Composite mode: `this.showAllWaves = true`

Changes to `drawEEG()` affect both modes - check conditional branches carefully.

## File Change Impact Analysis

- **`script.js` changes**: Usually require full browser refresh (no hot reload)
- **`styles.css` changes**: Often update live in browser
- **`index.html` changes**: Require refresh, check SVG structure doesn't break electrode hover
- **`README.md` changes**: No app impact, but keep feature list synced with actual functionality

## Gotchas & Edge Cases

- **Canvas coordinate system**: Top-left is (0,0), y-increases downward. Wave amplitudes are inverted: `y = yOffset - amplitude`
- **Event listener cleanup**: None currently implemented - if adding/removing dynamic elements, add `.removeEventListener()`
- **Mobile performance**: Canvas is computationally expensive. Animation may lag on older mobile devices (currently no fallback)
- **Browser compatibility**: `requestAnimationFrame` requires polyfill for IE11 (not currently supported)
- **Modal z-index**: Educational modals use `z-index: 2000`, tooltips use `z-index: 1000` - maintain this hierarchy

## No Build System
**Intentional architecture decision**: Keep entry barrier low for educational users and contributors. No webpack, no npm dependencies, no transpilation. Pure ES6 browser JavaScript. When adding features, maintain this philosophy.
