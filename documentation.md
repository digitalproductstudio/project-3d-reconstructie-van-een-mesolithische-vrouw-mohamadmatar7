# Mesolithic Woman Project Documentation

## Overview
This project is an interactive educational application focused on presenting information about Mesolithic women through various digital mediums. The application combines modern web technologies with historical content to create an engaging learning experience about life in the Mesolithic period.

## Project Structure
The application consists of several key sections:

### 1. Home Page (`HomePage.jsx`)
- Main landing page of the application
- Navigation to other sections
- Introduction to the project

### 2. AR Experience (`ARpage.jsx`)
- Augmented Reality visualization of a Mesolithic woman
- Uses AR.js and A-Frame for 3D model display
- Interactive marker-based AR experience
- 3D model with automatic rotation animation

### 3. 3D Model Viewer (`ModelPage.jsx`)
- Detailed 3D model examination interface
- Interactive model manipulation
- Detailed view of the Mesolithic woman reconstruction

### 4. Historical Facts (`FactsPage.jsx`)
- Collection of historical facts about Mesolithic women
- Educational content about the time period
- Research-based information

### 5. Way of Life (`WayOfLifePage.jsx`)
- Detailed information about daily life in Mesolithic times
- Cultural and social aspects
- Survival techniques and practices

### 6. Tools Section (`ToolsPage.jsx`)
- Information about Mesolithic tools and technology
- Historical context of tool usage
- Archaeological findings

## Technologies Used
- React.js for the frontend framework
- A-Frame (v1.4.2) for AR/VR experiences
- AR.js for augmented reality features
- Three.js for 3D model rendering
- Tailwind CSS for styling
- Modern JavaScript (ES6+)

## Features
- Interactive 3D model viewing
- Augmented Reality visualization
- Educational content presentation
- Responsive design for all devices
- User-friendly navigation
- Historical information display

## Requirements
### For General Use
- Modern web browser
- Internet connection

### For AR Features
- Device with a camera
- WebGL and WebRTC support
- Printed Hiro marker (for AR experience)

## Setup and Installation
1. Clone the repository
2. Install dependencies using npm:
   ```bash
   npm install
   ```
3. Ensure all 3D models are properly placed in the `/public/models/` directory
4. Start the development server:
   ```bash
   npm run dev
   ```
5. To build for production (creates a static site):
   ```bash
   npm run build
   ```

## Technical Architecture
The project follows a component-based architecture using React:
- `src/pages/` - Main page components
- `src/components/` - Reusable UI components
- `src/assets/` - Static assets
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions

## Model Properties
- Scale: 5x5x5
- Position: Centered on marker (0, 0, 0)

## Browser Compatibility
The application works on modern browsers supporting:
- WebGL
- WebRTC
- JavaScript modules
- Modern CSS features

## Troubleshooting
If experiencing issues:
1. Ensure your browser is up to date
2. Check for proper camera permissions
3. Verify WebGL support
4. Ensure all scripts are loading correctly
5. Check for any console errors
