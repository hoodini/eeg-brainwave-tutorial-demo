class EEGSimulator {
    constructor() {
        this.canvas = document.getElementById('eegCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.spectrumCanvas = document.getElementById('spectrumCanvas');
        this.spectrumCtx = this.spectrumCanvas.getContext('2d');
        
        this.isPlaying = true;
        this.time = 0;
        this.amplitude = 50;
        this.speed = 1;
        
        this.currentWave = 'delta';
        this.waveData = this.generateWaveData();
        
        this.setupCanvas();
        this.setupEventListeners();
        this.animate();
    }
    
    setupCanvas() {
        // Set up main EEG canvas
        this.canvas.width = 800;
        this.canvas.height = 400;
        
        // Set up spectrum canvas
        this.spectrumCanvas.width = 400;
        this.spectrumCanvas.height = 300;
    }
    
    setupEventListeners() {
        // Wave selection buttons
        document.querySelectorAll('.wave-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.wave-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentWave = e.target.dataset.wave;
                this.updateWaveInfo();
                this.waveData = this.generateWaveData();
            });
        });
        
        // Control buttons
        document.getElementById('playPause').addEventListener('click', () => {
            this.isPlaying = !this.isPlaying;
            document.getElementById('playPause').textContent = this.isPlaying ? '⏸️ Pause' : '▶️ Play';
        });
        
        document.getElementById('reset').addEventListener('click', () => {
            this.time = 0;
        });
        
        // Amplitude control
        document.getElementById('amplitude').addEventListener('input', (e) => {
            this.amplitude = parseInt(e.target.value);
            document.getElementById('amplitudeValue').textContent = this.amplitude;
        });
        
        // Speed control
        document.getElementById('speed').addEventListener('input', (e) => {
            this.speed = parseFloat(e.target.value);
            document.getElementById('speedValue').textContent = this.speed + 'x';
        });
        
        // Electrode hover effects
        document.querySelectorAll('.electrode').forEach(electrode => {
            electrode.addEventListener('mouseenter', (e) => {
                const electrodeName = e.target.dataset.electrode;
                this.highlightElectrode(electrodeName);
            });
            
            electrode.addEventListener('mouseleave', () => {
                this.clearElectrodeHighlight();
            });
        });
    }
    
    generateWaveData() {
        const waves = {
            delta: { frequency: 2, color: '#4CAF50', channels: 8 },
            theta: { frequency: 6, color: '#2196F3', channels: 8 },
            alpha: { frequency: 10, color: '#FF9800', channels: 8 },
            beta: { frequency: 20, color: '#9C27B0', channels: 8 },
            gamma: { frequency: 50, color: '#E91E63', channels: 8 }
        };
        
        return waves[this.currentWave];
    }
    
    updateWaveInfo() {
        const waveInfo = {
            delta: {
                name: 'Delta Waves',
                frequency: '0.5-4 Hz',
                amplitude: 'High (100-200 µV)',
                state: 'Deep Sleep, Unconsciousness',
                description: 'Delta waves are the slowest brainwaves and are associated with deep, dreamless sleep. They have the highest amplitude and are crucial for healing and regeneration.',
                significance: [
                    'Present during stages 3 and 4 of NREM sleep',
                    'Associated with growth hormone release',
                    'Important for memory consolidation',
                    'Abnormal delta activity in awake states may indicate brain injury'
                ]
            },
            theta: {
                name: 'Theta Waves',
                frequency: '4-8 Hz',
                amplitude: 'Medium (50-100 µV)',
                state: 'Light Sleep, Deep Meditation, Creativity',
                description: 'Theta waves occur during light sleep, deep meditation, and creative states. They are associated with memory formation and emotional processing.',
                significance: [
                    'Present during REM sleep and drowsiness',
                    'Associated with creativity and insight',
                    'Important for memory consolidation',
                    'Increased during meditation and hypnosis'
                ]
            },
            alpha: {
                name: 'Alpha Waves',
                frequency: '8-13 Hz',
                amplitude: 'Medium (30-50 µV)',
                state: 'Relaxed Wakefulness, Calm Focus',
                description: 'Alpha waves appear when you are awake but relaxed and not actively processing information. They are strongest in the occipital region and indicate a calm, focused state.',
                significance: [
                    'Dominant when eyes are closed and relaxed',
                    'Associated with calm, peaceful mental states',
                    'Reduced during mental effort and stress',
                    'Important marker for meditation depth'
                ]
            },
            beta: {
                name: 'Beta Waves',
                frequency: '13-30 Hz',
                amplitude: 'Low (10-30 µV)',
                state: 'Active Thinking, Problem Solving, Anxiety',
                description: 'Beta waves dominate during active, busy thinking and active concentration. They are associated with normal waking consciousness and can increase with stress.',
                significance: [
                    'Present during active concentration and problem-solving',
                    'Increased during stress and anxiety',
                    'Normal during active mental engagement',
                    'High beta may indicate overthinking or anxiety'
                ]
            },
            gamma: {
                name: 'Gamma Waves',
                frequency: '30-100 Hz',
                amplitude: 'Very Low (5-10 µV)',
                state: 'High-Level Cognitive Function, Consciousness',
                description: 'Gamma waves are the fastest brainwaves and are associated with high-level cognitive functions, consciousness, and binding of distributed brain processes.',
                significance: [
                    'Associated with consciousness and awareness',
                    'Present during high-level cognitive processing',
                    'Involved in binding distributed brain processes',
                    'Increased during moments of insight and learning'
                ]
            }
        };
        
        const info = waveInfo[this.currentWave];
        const waveInfoElement = document.getElementById('waveInfo');
        
        waveInfoElement.innerHTML = `
            <h3 class="wave-name">${info.name}</h3>
            <div class="wave-details">
                <p><strong>Frequency:</strong> <span class="frequency">${info.frequency}</span></p>
                <p><strong>Amplitude:</strong> <span class="amplitude-range">${info.amplitude}</span></p>
                <p><strong>State:</strong> <span class="brain-state">${info.state}</span></p>
                
                <div class="description">
                    <h4>Characteristics:</h4>
                    <p>${info.description}</p>
                    
                    <h4>Clinical Significance:</h4>
                    <ul>
                        ${info.significance.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    drawEEG() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Draw multiple EEG channels
        const channelHeight = this.canvas.height / this.waveData.channels;
        const channelLabels = ['Fp1', 'Fp2', 'F3', 'F4', 'C3', 'C4', 'P3', 'P4'];
        
        for (let channel = 0; channel < this.waveData.channels; channel++) {
            const yOffset = (channel + 0.5) * channelHeight;
            
            // Draw channel label
            this.ctx.fillStyle = '#333';
            this.ctx.font = '12px Inter';
            this.ctx.fillText(channelLabels[channel], 5, yOffset - 15);
            
            // Draw baseline
            this.ctx.strokeStyle = '#e0e0e0';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(40, yOffset);
            this.ctx.lineTo(this.canvas.width - 20, yOffset);
            this.ctx.stroke();
            
            // Draw EEG waveform
            this.ctx.strokeStyle = this.waveData.color;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            
            for (let x = 40; x < this.canvas.width - 20; x += 2) {
                const t = (x - 40) * 0.01 + this.time;
                
                // Add some random noise and channel variation
                const noise = (Math.random() - 0.5) * 5;
                const channelVariation = Math.sin(channel * 0.5) * 10;
                const phaseShift = channel * Math.PI * 0.25;
                
                let y = Math.sin(t * this.waveData.frequency * 0.5 + phaseShift) * this.amplitude * 0.8;
                
                // Add harmonics for more realistic waveform
                y += Math.sin(t * this.waveData.frequency * 1.5 + phaseShift) * this.amplitude * 0.2;
                y += Math.sin(t * this.waveData.frequency * 2 + phaseShift) * this.amplitude * 0.1;
                
                y += noise + channelVariation;
                y = yOffset - y;
                
                if (x === 40) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
        
        // Draw time marker
        this.drawTimeMarker();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines (time)
        for (let x = 40; x < this.canvas.width - 20; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines (amplitude)
        for (let y = 0; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(40, y);
            this.ctx.lineTo(this.canvas.width - 20, y);
            this.ctx.stroke();
        }
    }
    
    drawTimeMarker() {
        this.ctx.fillStyle = '#FF5722';
        this.ctx.font = '14px Inter';
        this.ctx.fillText(`Time: ${(this.time * this.speed).toFixed(1)}s`, this.canvas.width - 100, 20);
        
        this.ctx.fillStyle = this.waveData.color;
        this.ctx.fillText(`${this.waveData.frequency}Hz`, this.canvas.width - 100, 40);
    }
    
    drawSpectrum() {
        this.spectrumCtx.clearRect(0, 0, this.spectrumCanvas.width, this.spectrumCanvas.height);
        
        // Draw frequency spectrum
        const freqBands = [
            { name: 'Delta', freq: 2, color: '#4CAF50' },
            { name: 'Theta', freq: 6, color: '#2196F3' },
            { name: 'Alpha', freq: 10, color: '#FF9800' },
            { name: 'Beta', freq: 20, color: '#9C27B0' },
            { name: 'Gamma', freq: 50, color: '#E91E63' }
        ];
        
        const barWidth = (this.spectrumCanvas.width - 60) / freqBands.length;
        
        freqBands.forEach((band, index) => {
            const x = 30 + index * barWidth;
            const intensity = band.name.toLowerCase() === this.currentWave ? 0.8 : 0.2;
            const height = intensity * (this.spectrumCanvas.height - 60);
            
            // Draw bar
            this.spectrumCtx.fillStyle = band.color;
            this.spectrumCtx.fillRect(x, this.spectrumCanvas.height - 30 - height, barWidth - 10, height);
            
            // Draw label
            this.spectrumCtx.fillStyle = '#333';
            this.spectrumCtx.font = '10px Inter';
            this.spectrumCtx.textAlign = 'center';
            this.spectrumCtx.fillText(band.name, x + barWidth/2 - 5, this.spectrumCanvas.height - 10);
            this.spectrumCtx.fillText(`${band.freq}Hz`, x + barWidth/2 - 5, this.spectrumCanvas.height - 20);
        });
        
        // Add amplitude animation
        const pulseAmplitude = Math.sin(this.time * 2) * 0.1 + 0.9;
        const currentBandIndex = freqBands.findIndex(band => band.name.toLowerCase() === this.currentWave);
        
        if (currentBandIndex !== -1) {
            const x = 30 + currentBandIndex * barWidth;
            const height = 0.8 * (this.spectrumCanvas.height - 60) * pulseAmplitude;
            
            this.spectrumCtx.fillStyle = freqBands[currentBandIndex].color;
            this.spectrumCtx.fillRect(x, this.spectrumCanvas.height - 30 - height, barWidth - 10, height);
        }
    }
    
    highlightElectrode(electrodeName) {
        const electrode = document.querySelector(`[data-electrode="${electrodeName}"]`);
        if (electrode) {
            electrode.classList.add('active');
            
            // Show tooltip with electrode info
            this.showElectrodeTooltip(electrodeName, electrode);
        }
    }
    
    clearElectrodeHighlight() {
        document.querySelectorAll('.electrode').forEach(el => {
            el.classList.remove('active');
        });
        this.hideElectrodeTooltip();
    }
    
    showElectrodeTooltip(electrodeName, electrode) {
        const electrodeInfo = {
            'Fpz': 'Frontal Polar Midline - Attention, working memory',
            'Fp1': 'Left Frontal Polar - Executive functions',
            'Fp2': 'Right Frontal Polar - Executive functions',
            'F7': 'Left Frontal - Language processing (Broca\'s area)',
            'F3': 'Left Frontal - Motor planning, working memory',
            'Fz': 'Frontal Midline - Attention, error monitoring',
            'F4': 'Right Frontal - Motor planning, spatial processing',
            'F8': 'Right Frontal - Spatial attention',
            'T3': 'Left Temporal - Auditory processing, language',
            'C3': 'Left Central - Motor cortex (right body movement)',
            'Cz': 'Central Midline - Motor control, balance',
            'C4': 'Right Central - Motor cortex (left body movement)',
            'T4': 'Right Temporal - Auditory processing',
            'T5': 'Left Posterior Temporal - Language comprehension',
            'P3': 'Left Parietal - Spatial processing, attention',
            'Pz': 'Parietal Midline - Attention, spatial awareness',
            'P4': 'Right Parietal - Spatial processing, attention',
            'T6': 'Right Posterior Temporal - Visual-spatial processing',
            'O1': 'Left Occipital - Visual processing',
            'Oz': 'Occipital Midline - Visual processing',
            'O2': 'Right Occipital - Visual processing'
        };
        
        // Create or update tooltip
        let tooltip = document.getElementById('electrode-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'electrode-tooltip';
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                max-width: 200px;
                line-height: 1.4;
            `;
            document.body.appendChild(tooltip);
        }
        
        tooltip.innerHTML = `<strong>${electrodeName}</strong><br>${electrodeInfo[electrodeName] || 'EEG electrode position'}`;
        tooltip.style.display = 'block';
        
        // Position tooltip near electrode
        const rect = electrode.getBoundingClientRect();
        tooltip.style.left = rect.left + 20 + 'px';
        tooltip.style.top = rect.top - 10 + 'px';
    }
    
    hideElectrodeTooltip() {
        const tooltip = document.getElementById('electrode-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
    
    animate() {
        if (this.isPlaying) {
            this.time += 0.05 * this.speed;
        }
        
        this.drawEEG();
        this.drawSpectrum();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Educational content and interactions
class EEGEducation {
    constructor() {
        this.setupEducationalFeatures();
    }
    
    setupEducationalFeatures() {
        // Add interactive features for learning
        this.addWaveComparisons();
        this.addQuizFeatures();
    }
    
    addWaveComparisons() {
        // Allow users to compare different wave types
        const compareBtn = document.createElement('button');
        compareBtn.textContent = '🔍 Compare Waves';
        compareBtn.className = 'control-btn';
        compareBtn.style.marginLeft = '20px';
        
        document.querySelector('.controls').appendChild(compareBtn);
        
        compareBtn.addEventListener('click', () => {
            this.showWaveComparison();
        });
    }
    
    showWaveComparison() {
        // Create comparison modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        content.innerHTML = `
            <h2>Brainwave Comparison Chart</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: #f5f5f5;">
                    <th style="padding: 10px; border: 1px solid #ddd;">Wave Type</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Frequency</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Amplitude</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Mental State</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; color: #4CAF50; font-weight: bold;">Delta</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">0.5-4 Hz</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">High (100-200 µV)</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Deep Sleep</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; color: #2196F3; font-weight: bold;">Theta</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">4-8 Hz</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Medium (50-100 µV)</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Light Sleep, Meditation</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; color: #FF9800; font-weight: bold;">Alpha</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">8-13 Hz</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Medium (30-50 µV)</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Relaxed Wakefulness</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; color: #9C27B0; font-weight: bold;">Beta</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">13-30 Hz</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Low (10-30 µV)</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Active Thinking</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; color: #E91E63; font-weight: bold;">Gamma</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">30-100 Hz</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Very Low (5-10 µV)</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">High-Level Processing</td>
                </tr>
            </table>
            <button onclick="this.closest('.modal').remove()" style="padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
        `;
        
        modal.appendChild(content);
        modal.className = 'modal';
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    addQuizFeatures() {
        // Add a simple quiz button
        const quizBtn = document.createElement('button');
        quizBtn.textContent = '🎯 Test Knowledge';
        quizBtn.className = 'control-btn';
        
        document.querySelector('.controls').appendChild(quizBtn);
        
        quizBtn.addEventListener('click', () => {
            this.startQuiz();
        });
    }
    
    startQuiz() {
        const questions = [
            {
                question: "Which brainwave is associated with deep sleep?",
                options: ["Alpha", "Beta", "Delta", "Gamma"],
                correct: 2
            },
            {
                question: "What frequency range characterizes Alpha waves?",
                options: ["0.5-4 Hz", "4-8 Hz", "8-13 Hz", "13-30 Hz"],
                correct: 2
            },
            {
                question: "Which brain state is associated with Beta waves?",
                options: ["Deep sleep", "Meditation", "Active thinking", "Unconsciousness"],
                correct: 2
            }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        
        const showQuestion = () => {
            if (currentQuestion >= questions.length) {
                alert(`Quiz Complete! Score: ${score}/${questions.length}`);
                return;
            }
            
            const q = questions[currentQuestion];
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                text-align: center;
            `;
            
            content.innerHTML = `
                <h3>Question ${currentQuestion + 1}/${questions.length}</h3>
                <p style="margin: 20px 0; font-size: 1.1rem;">${q.question}</p>
                ${q.options.map((option, index) => `
                    <button onclick="selectAnswer(${index})" style="display: block; width: 100%; margin: 10px 0; padding: 10px; background: #f0f0f0; border: none; border-radius: 5px; cursor: pointer;">${option}</button>
                `).join('')}
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            window.selectAnswer = (index) => {
                if (index === q.correct) {
                    score++;
                    content.innerHTML += '<p style="color: green; margin-top: 20px;">✓ Correct!</p>';
                } else {
                    content.innerHTML += '<p style="color: red; margin-top: 20px;">✗ Incorrect. The correct answer is: ' + q.options[q.correct] + '</p>';
                }
                
                setTimeout(() => {
                    modal.remove();
                    currentQuestion++;
                    showQuestion();
                }, 2000);
            };
        };
        
        showQuestion();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new EEGSimulator();
    const education = new EEGEducation();
    
    // Initialize with delta wave info
    simulator.updateWaveInfo();
});