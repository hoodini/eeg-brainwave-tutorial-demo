# Contributing to EEG Brainwave Tutorial

Thank you for your interest in contributing to the EEG Brainwave Tutorial project! This educational web application helps students and researchers learn about EEG data interpretation through interactive visualizations.

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of EEG concepts (helpful but not required)

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hoodini/eeg-brainwave-tutorial.git
   cd eeg-brainwave-tutorial
   ```

2. Open the project in your preferred editor

3. Run locally:
   ```bash
   # Option 1: Direct browser access
   open index.html
   
   # Option 2: Local HTTP server
   python3 -m http.server 8080
   # Navigate to http://localhost:8080
   ```

## 📝 How to Contribute

### Reporting Issues
- Check existing issues before creating a new one
- Use clear, descriptive titles
- Include steps to reproduce the problem
- Mention your browser and operating system
- Add screenshots if applicable

### Feature Requests
- Describe the educational value of the proposed feature
- Explain how it would enhance the learning experience
- Consider compatibility with existing features

### Code Contributions

#### 1. Fork and Branch
```bash
git checkout -b feature/your-feature-name
```

#### 2. Code Guidelines
- **HTML**: Use semantic HTML5 elements
- **CSS**: Follow BEM methodology for class naming
- **JavaScript**: Use ES6+ features, clear variable names
- **Comments**: Add comments for complex algorithms or EEG calculations

#### 3. Educational Content
- Ensure medical/scientific accuracy
- Cite sources for EEG-related information
- Make content accessible to various skill levels
- Include clear explanations for technical terms

#### 4. Testing
- Test in multiple browsers
- Verify responsiveness on different screen sizes
- Check educational content for clarity
- Ensure animations run smoothly

#### 5. Commit Messages
```bash
git commit -m "type: brief description

Longer explanation of the change, including:
- What was changed and why
- Educational impact
- Any technical considerations"
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🧠 Areas for Contribution

### High Priority
- [ ] Real EEG data integration
- [ ] Additional brainwave pattern examples
- [ ] Mobile touch interaction improvements
- [ ] Accessibility enhancements (WCAG compliance)

### Educational Enhancements
- [ ] More interactive quizzes
- [ ] Step-by-step tutorials
- [ ] Clinical case studies
- [ ] Artifact detection training
- [ ] Sleep stage identification

### Technical Improvements
- [ ] Performance optimization
- [ ] Better error handling
- [ ] Unit tests for key functions
- [ ] Internationalization support

### Visual Enhancements
- [ ] Better animations and transitions
- [ ] Dark mode support
- [ ] Improved color accessibility
- [ ] Print-friendly styles

## 🎨 Design Guidelines

### Visual Design
- Maintain professional medical-style appearance
- Use consistent color scheme for brainwave types:
  - Delta: #4CAF50 (Green)
  - Theta: #2196F3 (Blue)
  - Alpha: #FF9800 (Orange)
  - Beta: #9C27B0 (Purple)
  - Gamma: #E91E63 (Pink)

### User Experience
- Keep educational content clear and concise
- Ensure intuitive navigation
- Provide immediate visual feedback
- Maintain smooth 60fps animations

### Accessibility
- Use sufficient color contrast ratios
- Provide alternative text for visual elements
- Ensure keyboard navigation support
- Test with screen readers

## 📚 Educational Standards

### Content Accuracy
- Base all EEG information on peer-reviewed sources
- Clearly distinguish between normal and abnormal patterns
- Include appropriate medical disclaimers
- Avoid oversimplification of complex concepts

### Learning Objectives
Each feature should contribute to these goals:
1. Identify main brainwave types and frequencies
2. Understand clinical significance of EEG patterns
3. Navigate standard electrode placement systems
4. Interpret basic EEG waveform characteristics

## 🔍 Review Process

### Pull Request Checklist
- [ ] Code follows project style guidelines
- [ ] Educational content is accurate and clear
- [ ] Changes are tested across browsers
- [ ] Documentation is updated if needed
- [ ] No breaking changes to existing features

### Review Criteria
- **Functionality**: Does it work as intended?
- **Educational Value**: Does it enhance learning?
- **Code Quality**: Is it maintainable and well-documented?
- **Performance**: Does it maintain smooth animations?
- **Compatibility**: Works across supported browsers?

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and constructive
- Welcome newcomers and different skill levels
- Focus on educational value and scientific accuracy
- Collaborate openly and share knowledge

### Communication
- Use clear, professional language
- Provide helpful feedback on issues and PRs
- Ask questions if something is unclear
- Share educational resources related to EEG

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: GitHub Discussions for questions and ideas
- **Documentation**: Check README.md for setup instructions

## 🙏 Recognition

Contributors will be acknowledged in:
- Repository contributors list
- Release notes for significant contributions
- Educational credits for content contributions

Thank you for helping make EEG education more accessible and interactive! 🧠✨