# Arjuna Dwi Damara Putra — Machine Learning Engineer Portfolio

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-22c55e?style=flat&logo=github)](https://carroveloce.github.io/arjuna-portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Live](https://img.shields.io/badge/Status-Live%20Online-00F0FF)](https://carroveloce.github.io/arjuna-portfolio/)

> Public Portfolio Website: **[https://carroveloce.github.io/arjuna-portfolio/](https://carroveloce.github.io/arjuna-portfolio/)**

A modern, high-performance, dark-tech single-page portfolio website showcasing the profile, experience, projects, skills, education, and certifications of **Arjuna Dwi Damara Putra**, Machine Learning Engineer.

---

## 🌟 Highlights & Features

- **Modern AI/ML Dark Aesthetic**: Engineered with obsidian `#0B0F17` base, neon cyan `#00F0FF`, and electric violet `#818CF8` accents with glassmorphism cards and subtle ambient glow effects.
- **Interactive Neural Network Canvas**: Hardware-accelerated 2D canvas particle graph responding smoothly to mouse telemetry and window dimensions.
- **Flawless Multi-Device Responsiveness**: Tailored layouts for Desktop (`>=1024px`), Tablet (`768px-1023px`), and Mobile (`<=767px` down to `320px`) with zero horizontal overflow.
- **Comprehensive Profile Coverage**:
  - **Hero & Identity**: Name, role summary, location (Petukangan Utara, South Jakarta), direct CTAs, and interactive contact triggers.
  - **About & Education**: Academic trajectory at *Politeknik Negeri Jakarta* (Teknik Informatika) and *SMK Negeri 9 Kabupaten Tangerang* (Multimedia).
  - **Industrial Experience**: Detailed AI Internship at *PT Salam Pacific Indonesia Lines (SPIL)* featuring container damage detection computer vision pipeline.
  - **Applied Projects**: *VeggieVision* (YOLO-TFLite & ML Kit OCR for hydroponic management) and *Pest Busters Apps* (leaf crop pest classification for sustainable farming).
  - **Technical Skills Matrix**: Categorized competencies across ML/DL, Computer Vision & NLP, Model Deployment (Flask, Streamlit, TFLite), and Cloud/MLOps (GCP).
  - **Professional Certifications**: DeepLearning.AI TensorFlow Developer, Machine Learning Specialization, Bangkit Academy Machine Learning, and Associate Data Scientist (BNSP).
  - **Contact & Communication**: One-click copy with visual tooltip feedback, direct mailto, and direct WhatsApp launcher.

---

## 📁 Repository Structure

```
arjuna_portfolio/
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
├── index.html              # Main semantic HTML5 portfolio document
├── css/
│   └── style.css           # Modular dark-tech stylesheet with CSS variables & responsive rules
├── js/
│   └── main.js             # Interactive neural canvas, mobile drawer, scrollspy, copy actions
├── verify_deployment.py    # Automated Python deployment & content verification test suite
└── README.md               # Project documentation and deployment instructions
```

---

## 🚀 Local Development & Preview

Because this project is built on vanilla web standards with zero build dependencies, you can preview it immediately using any local web server:

### Using Python:
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Using Node.js (npx):
```bash
npx serve .
```

---

## 🌐 Public Deployment (GitHub Pages)

This repository is deployed to **GitHub Pages** from the root directory `/` of the `main` branch.

- **Repository**: [https://github.com/CarroVeloce/arjuna-portfolio](https://github.com/CarroVeloce/arjuna-portfolio)
- **Live URL**: [https://carroveloce.github.io/arjuna-portfolio/](https://carroveloce.github.io/arjuna-portfolio/)

---

## 🧪 Automated Verification Suite

Run the included verification test script to validate both local assets and live public deployment:

```bash
python verify_deployment.py
```

The script automatically tests:
1. HTTP 200 status code response on public URL.
2. Presence and integrity of all required profile strings.
3. Verification of all linked CSS, JS, and image assets.
4. Correct responsive viewport meta configuration.

---

## 👤 Profile Contact

- **Arjuna Dwi Damara Putra**
- **Location**: Petukangan Utara, South Jakarta, Indonesia
- **Email**: [damararjuna819@gmail.com](mailto:damararjuna819@gmail.com)
- **Phone**: [0851-5692-2833](tel:085156922833)
- **WhatsApp**: [+62 851-5692-2833](https://wa.me/6285156922833)
