# EEG Brainwave Tutorial - Architecture Diagram

```mermaid
graph TD
    %% HTML Structure Layer
    HTML[index.html<br/>📄 Main Document] --> Head[HTML Head<br/>📋 Meta & Links]
    HTML --> Body[HTML Body<br/>🏗️ Structure]
    
    Head --> GoogleFonts[Google Fonts<br/>🔤 Inter Font Family]
    Head --> StylesLink[styles.css Link<br/>🎨 Stylesheet Reference]
    
    Body --> Container[Container<br/>📦 Main Wrapper]
    Container --> Header[Header<br/>🧠 Title & Description]
    Container --> WaveNav[Wave Navigation<br/>🎛️ Wave Selector Buttons]
    Container --> MainContent[Main Content<br/>📊 Grid Layout]
    Container --> TutorialSection[Tutorial Section<br/>📚 Educational Cards]
    Container --> Footer[Footer<br/>ℹ️ Info Text]
    
    %% Main Content Structure
    MainContent --> VisualizationPanel[Visualization Panel<br/>📈 Left Column]
    MainContent --> InfoPanel[Info Panel<br/>📝 Right Column]
    
    %% Visualization Panel Components
    VisualizationPanel --> EEGDisplay[EEG Display<br/>📺 Canvas Container]
    VisualizationPanel --> FrequencySpectrum[Frequency Spectrum<br/>📊 Spectrum Canvas]
    
    EEGDisplay --> EEGCanvas[eegCanvas<br/>🎨 Main Visualization]
    EEGDisplay --> Controls[Controls<br/>🎮 Interactive Elements]
    FrequencySpectrum --> SpectrumCanvas[spectrumCanvas<br/>📈 Frequency Bars]
    
    Controls --> PlayPauseBtn[Play/Pause Button<br/>⏯️ Animation Control]
    Controls --> ResetBtn[Reset Button<br/>🔄 Time Reset]
    Controls --> AmplitudeSlider[Amplitude Slider<br/>📏 Wave Height]
    Controls --> SpeedSlider[Speed Slider<br/>⚡ Animation Speed]
    
    %% Info Panel Components
    InfoPanel --> WaveInfo[Wave Info<br/>📋 Dynamic Content]
    InfoPanel --> ElectrodeMap[Electrode Map<br/>🧠 SVG Brain Map]
    
    ElectrodeMap --> BrainSVG[brainSvg<br/>🎯 Interactive SVG]
    BrainSVG --> ElectrodeCircles[Electrode Circles<br/>⚪ 21 Positions]
    BrainSVG --> ElectrodeLegend[Electrode Legend<br/>🏷️ Color Categories]
    
    %% CSS Styling Layer
    CSS[styles.css<br/>🎨 Styling System] --> GlobalStyles[Global Styles<br/>🌐 Reset & Base]
    CSS --> LayoutStyles[Layout Styles<br/>📐 Grid & Flexbox]
    CSS --> ComponentStyles[Component Styles<br/>🧩 Individual Elements]
    CSS --> AnimationStyles[Animation Styles<br/>🎬 Transitions & Effects]
    CSS --> ResponsiveStyles[Responsive Styles<br/>📱 Media Queries]
    
    %% JavaScript Architecture
    JS[script.js<br/>⚙️ Main Logic] --> EEGSimulator[EEGSimulator Class<br/>🧮 Core Functionality]
    JS --> EEGEducation[EEGEducation Class<br/>🎓 Learning Features]
    JS --> InitScript[Initialization<br/>🚀 DOMContentLoaded]
    
    %% EEGSimulator Class Methods
    EEGSimulator --> Constructor[constructor()<br/>🏗️ Setup & Initialize]
    EEGSimulator --> SetupCanvas[setupCanvas()<br/>📐 Canvas Configuration]
    EEGSimulator --> SetupEvents[setupEventListeners()<br/>👂 Event Binding]
    EEGSimulator --> GenerateWave[generateWaveData()<br/>🌊 Wave Configuration]
    EEGSimulator --> UpdateInfo[updateWaveInfo()<br/>📝 Content Updates]
    EEGSimulator --> DrawEEG[drawEEG()<br/>🎨 Main Rendering]
    EEGSimulator --> DrawSpectrum[drawSpectrum()<br/>📊 Spectrum Rendering]
    EEGSimulator --> AnimateLoop[animate()<br/>🔄 Animation Loop]
    EEGSimulator --> ElectrodeInteraction[Electrode Methods<br/>🎯 Hover & Tooltip]
    
    %% EEGEducation Class Methods
    EEGEducation --> EduConstructor[constructor()<br/>🎓 Educational Setup]
    EEGEducation --> WaveComparison[addWaveComparisons()<br/>🔍 Comparison Feature]
    EEGEducation --> QuizFeatures[addQuizFeatures()<br/>🎯 Quiz System]
    EEGEducation --> ShowComparison[showWaveComparison()<br/>📊 Modal Display]
    EEGEducation --> StartQuiz[startQuiz()<br/>❓ Quiz Logic]
    
    %% Event Flow Connections
    WaveNav --> SetupEvents
    Controls --> SetupEvents
    ElectrodeCircles --> ElectrodeInteraction
    
    %% Data Flow
    GenerateWave --> WaveData[(Wave Data<br/>📊 Configuration Object)]
    WaveData --> DrawEEG
    WaveData --> DrawSpectrum
    WaveData --> UpdateInfo
    
    %% Canvas Rendering Pipeline
    DrawEEG --> ClearCanvas[clearRect()<br/>🧹 Clear Canvas]
    DrawEEG --> DrawGrid[drawGrid()<br/>📏 Background Grid]
    DrawEEG --> MultiChannel[Multi-channel Loop<br/>🔢 8 EEG Channels]
    DrawEEG --> WaveCalculation[Wave Mathematics<br/>🔢 Sine + Harmonics]
    DrawEEG --> DrawTimeMarker[drawTimeMarker()<br/>⏰ Time Display]
    
    MultiChannel --> ChannelLabels[Channel Labels<br/>🏷️ Fp1, Fp2, F3, F4...]
    MultiChannel --> Baselines[Baseline Drawing<br/>➖ Reference Lines]
    MultiChannel --> WaveformPath[Waveform Path<br/>〰️ Signal Lines]
    
    %% Spectrum Rendering
    DrawSpectrum --> FreqBands[Frequency Bands<br/>📊 5 Wave Types]
    DrawSpectrum --> BarChart[Bar Chart Rendering<br/>📊 Visual Bars]
    DrawSpectrum --> PulseAnimation[Pulse Animation<br/>💓 Active Wave Highlight]
    
    %% Mathematical Wave Generation
    WaveCalculation --> SineWave[Fundamental Sine<br/>sin(t × frequency)]
    WaveCalculation --> Harmonics[Harmonic Overlay<br/>2nd & 3rd Harmonics]
    WaveCalculation --> NoiseGeneration[Random Noise<br/>🎲 Realistic Variation]
    WaveCalculation --> PhaseShift[Channel Phase Shift<br/>🔄 Inter-channel Variation]
    
    %% Educational Features
    WaveComparison --> ComparisonModal[Comparison Modal<br/>📋 Dynamic Table]
    QuizFeatures --> QuizModal[Quiz Modal<br/>❓ Interactive Questions]
    QuizModal --> ScoreTracking[Score Tracking<br/>🏆 Progress Management]
    
    %% Electrode Interaction System
    ElectrodeInteraction --> HighlightElectrode[highlightElectrode()<br/>✨ Visual Highlight]
    ElectrodeInteraction --> ShowTooltip[showElectrodeTooltip()<br/>💬 Info Display]
    ElectrodeInteraction --> ClearHighlight[clearElectrodeHighlight()<br/>🧹 State Cleanup]
    
    %% Animation System
    AnimateLoop --> RequestAnimationFrame[requestAnimationFrame<br/>🎬 60fps Loop]
    AnimateLoop --> TimeUpdate[Time Increment<br/>⏰ Based on Speed]
    AnimateLoop --> ConditionalUpdate[Conditional Updates<br/>🔄 Play/Pause State]
    
    %% State Management
    StateManagement[(Application State<br/>📊 Central Data)] --> IsPlaying[isPlaying<br/>▶️ Animation State]
    StateManagement --> CurrentWave[currentWave<br/>🌊 Active Wave Type]
    StateManagement --> TimeValue[time<br/>⏰ Current Time]
    StateManagement --> AmplitudeValue[amplitude<br/>📏 Wave Height]
    StateManagement --> SpeedValue[speed<br/>⚡ Animation Speed]
    
    %% External Dependencies
    ExternalDeps[External Dependencies<br/>🌐 Third-party Resources] --> GoogleFonts
    ExternalDeps --> CanvasAPI[Canvas 2D API<br/>🎨 Drawing Functions]
    ExternalDeps --> DOMEvents[DOM Events<br/>👂 User Interactions]
    ExternalDeps --> RequestAnimFrame[RequestAnimationFrame<br/>🎬 Browser Animation API]
    
    %% File Connections
    HTML -.->|references| CSS
    HTML -.->|includes| JS
    
    %% Runtime Connections
    InitScript --> EEGSimulator
    InitScript --> EEGEducation
    EEGSimulator -.->|updates| WaveInfo
    SetupEvents -.->|binds to| Controls
    SetupEvents -.->|binds to| WaveNav
    SetupEvents -.->|binds to| ElectrodeCircles
    
    %% Styling Connections
    CSS -.->|styles| HTML
    CSS -.->|styles| EEGCanvas
    CSS -.->|styles| SpectrumCanvas
    CSS -.->|styles| BrainSVG
    CSS -.->|styles| Controls
    CSS -.->|styles| WaveNav
    
    %% Color Coding
    classDef htmlClass fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef cssClass fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef jsClass fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef canvasClass fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef stateClass fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef eventClass fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    
    class HTML,Head,Body,Container,Header,WaveNav,MainContent,TutorialSection,Footer,VisualizationPanel,InfoPanel,EEGDisplay,FrequencySpectrum,Controls,WaveInfo,ElectrodeMap htmlClass
    class CSS,GlobalStyles,LayoutStyles,ComponentStyles,AnimationStyles,ResponsiveStyles cssClass
    class JS,EEGSimulator,EEGEducation,InitScript,Constructor,SetupCanvas,SetupEvents,GenerateWave,UpdateInfo,DrawEEG,DrawSpectrum,AnimateLoop,ElectrodeInteraction jsClass
    class EEGCanvas,SpectrumCanvas,BrainSVG,ClearCanvas,DrawGrid,MultiChannel,WaveCalculation,DrawTimeMarker canvasClass
    class StateManagement,IsPlaying,CurrentWave,TimeValue,AmplitudeValue,SpeedValue,WaveData stateClass
    class PlayPauseBtn,ResetBtn,AmplitudeSlider,SpeedSlider,ElectrodeCircles,WaveComparison,QuizFeatures eventClass
```

## Architecture Overview

This Mermaid diagram illustrates the comprehensive architecture of the EEG Brainwave Tutorial project, showing:

### 🏗️ **Structural Layers**
- **HTML Layer**: Document structure, semantic elements, and UI components
- **CSS Layer**: Styling system with responsive design and animations  
- **JavaScript Layer**: Two main classes handling core functionality and education

### 🔄 **Data Flow**
- User interactions flow through event listeners
- State changes trigger UI updates and canvas redraws
- Mathematical calculations drive realistic wave generation

### 🎨 **Rendering Pipeline**
- Canvas-based visualization with optimized drawing operations
- Real-time animation using requestAnimationFrame
- Multi-channel EEG display with mathematical wave synthesis

### 🎓 **Educational Features**
- Interactive electrode mapping with tooltips
- Comparison modals and quiz systems
- Dynamic content updates based on selected wave types

### 🎯 **Key Connections**
- Event-driven architecture connecting UI to functionality
- State management coordinating between different components
- Modular class design enabling easy feature extensions

The diagram uses color coding to distinguish different architectural layers and shows both structural relationships and runtime data flow patterns.