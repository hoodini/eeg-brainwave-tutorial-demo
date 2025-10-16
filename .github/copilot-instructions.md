# EEG Brainwave Tutorial - AI Coding Assistant Instructions

## Project Overview
Interactive educational web app for learning EEG data interpretation with real-time Canvas-based visualizations. Built as a client-side single-page application using vanilla HTML/CSS/JavaScript with no build system or external dependencies.

## Core Architecture

### Two-Class System
- **`EEGSimulator`**: Canvas rendering, animation loop, wave mathematics, user controls
- **`EEGEducation`**: Modal dialogs, quiz system, comparison features, educational content

### State Management Pattern
Central state in `EEGSimulator` constructor properties:
```javascript
this.isPlaying = true;        // Animation control
this.showAllWaves = false;    // Display mode toggle
this.currentWave = 'delta';   // Active wave type
this.time = 0;               // Animation time counter
```

### Canvas Rendering Pipeline
1. `clearRect()` → `drawGrid()` → `drawSingleWave()`/`drawAllWaves()` → `drawTimeMarker()`
2. Dual canvas system: eegCanvas (main EEG) + spectrumCanvas (frequency bars)
3. Animation via `requestAnimationFrame()` at 60fps in `animate()` loop

## Mathematical Wave Generation
**Wave synthesis formula**: `sin(t × frequency × 0.5 + phaseShift) × amplitude × weight`
- Harmonics: Add 2nd (1.5×) and 3rd (2×) frequency components for realism
- Noise: `(Math.random() - 0.5) × variance` for authentic EEG appearance
- Phase shifts: `channel × Math.PI × 0.25` for inter-channel variation

## Wave Data Structure
```javascript
// Single wave mode (generateWaveData)
{ frequency: 10, color: '#FF9800', channels: 8 }

// All waves mode (generateAllWaveData) 
{ frequency: 10, color: '#FF9800', amplitude: 0.5 }
```

## Event-Driven UI Updates
- Wave selection → `updateWaveInfo()` → `generateWaveData()` → visual refresh
- Control changes → immediate state update → DOM text updates
- Mode toggle → UI opacity changes + `showAllWaves` flag → different render path

## Educational Content System
- Wave information stored as nested objects in `updateWaveInfo()`
- Dynamic HTML generation with template literals
- Modal creation via `createElement()` with inline styles
- Electrode tooltips positioned using `getBoundingClientRect()`

## Development Patterns

### Canvas Drawing Conventions
- Always call `clearRect()` first, then layer: grid → baselines → waveforms → markers
- Use `beginPath()` + `moveTo()/lineTo()` + `stroke()` pattern
- Set `strokeStyle`/`fillStyle` before each drawing operation

### DOM Manipulation Style
- Query selectors with semantic IDs: eegCanvas, waveInfo, wave-btn
- Event delegation on parent containers where possible
- Inline styles for dynamic/modal elements, CSS classes for static styling

### Animation Performance
- Update `time` only when playing: `if (this.isPlaying) this.time += 0.05 * this.speed`
- Batch DOM updates to avoid layout thrashing
- Use `globalAlpha` for overlay effects, reset to 1.0 after use

## File Relationships
- `index.html`: Structure + SVG electrode map (21 positioned circles)
- `styles.css`: Grid layouts, button styling, responsive breakpoints, pulse animations
- `script.js`: All functionality in two classes + initialization

## Quick Commands
```bash
# Local development
python -m http.server 8080

# Test in browser  
http://localhost:8080
```

## Extension Guidelines
- New wave types: Add to both `generateWaveData()` and `generateAllWaveData()` objects
- Educational features: Extend `EEGEducation` class methods
- UI controls: Follow existing pattern in `setupEventListeners()`
- Keep medical accuracy: Cite sources for EEG-related content in comments