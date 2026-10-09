# Apple MacBook Pro M4 Landing Page Clone

An interactive 3D product showcase inspired by Apple's MacBook Pro M4 experience. Built with React 19, Three.js, React Three Fiber, GSAP, and Tailwind CSS.

[![Live Demo](https://img.shields.io/badge/Live_Demo-macbook--archit.vercel.app-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://macbook-archit.vercel.app/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)

Explore the live site: [https://macbook-archit.vercel.app/](https://macbook-archit.vercel.app/)

---

## Tech Stack

Here are the core technologies and libraries used to build this project:

| Technology | Role | Badge |
| :--- | :--- | :--- |
| **React 19** | Core UI library and component architecture | ![React](https://img.shields.io/badge/React_19-%2320232A.svg?style=flat-square&logo=react&logoColor=%2361DAFB) |
| **Three.js** | 3D rendering engine and WebGL foundation | ![Three.js](https://img.shields.io/badge/Three.js-%23000000.svg?style=flat-square&logo=three.js&logoColor=white) |
| **React Three Fiber** | Declarative Three.js wrapper for React | ![R3F](https://img.shields.io/badge/React_Three_Fiber-%23000000.svg?style=flat-square&logo=three.js&logoColor=white) |
| **React Three Drei** | Useful 3D helpers, loaders, and controls | ![Drei](https://img.shields.io/badge/@react--three/drei-%23111111.svg?style=flat-square&logo=three.js&logoColor=white) |
| **GSAP & ScrollTrigger** | High-performance scroll timelines and scrubbed animations | ![GSAP](https://img.shields.io/badge/GSAP_3-%2388CE02.svg?style=flat-square&logo=greensock&logoColor=white) |
| **Tailwind CSS v4** | Utility-first styling with modern CSS features | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Zustand** | Lightweight state store for active colors, scale, and screen media | ![Zustand](https://img.shields.io/badge/Zustand-%23443E38.svg?style=flat-square&logo=react&logoColor=white) |
| **Vite** | Fast local development server and optimized bundler | ![Vite](https://img.shields.io/badge/Vite_6-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white) |
| **Vercel** | Edge deployment and continuous hosting | ![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=flat-square&logo=vercel&logoColor=white) |

---

## What the App Does

- **Interactive 3D Product Viewer**: Inspect 3D models of the 14-inch and 16-inch MacBook Pro models in real time.
- **Dynamic Color & Size Customization**: Toggle between Space Gray and Dark finishes, and switch between 14-inch and 16-inch sizes with smooth GSAP transitions.
- **Scroll-Linked 3D Rotation**: The 3D MacBook rotates in sync with user scrolling, dynamically swapping video textures on the screen to showcase feature highlights.
- **Rocket Chip Showcase**: Video mask zoom that scales up smoothly on scroll while pinning the section.
- **Performance Image Scatter**: A scrubbed desktop scroll timeline that explodes performance graphics into position around the M4 chip.
- **Responsive Layout**: Tailored 3D camera angles, model scales, and motion adjustments for tablets and mobile screens.

---

## My First Time Using Three.js: What I Learned & How I Solved It

This was my very first time building anything with Three.js and React Three Fiber. Taking a project from zero 3D experience to an interactive, Apple-style product viewer came with some real hurdles. Here is what went wrong, how I solved each issue, and what I took away from the experience.

### 1. The Washed Out Texture Bug (Color Space Fix)
When I first loaded the screen texture onto the laptop display mesh, the colors looked dull, milky, and completely washed out compared to the original image. 

**How I solved it:** I found out that Three.js defaults to linear color space for textures, while modern web images use sRGB. Setting `texture.colorSpace = SRGBColorSpace` right after loading the texture immediately restored the deep blacks and vibrant contrast of the MacBook screen.

### 2. Selective Mesh Coloring
When adding color swatches for Space Gray and Dark, calling a color update on the model initially turned everything black, including the keyboard keys, screen bezel, Apple logo, and ports.

**How I solved it:** I inspected the GLTF scene hierarchy and extracted the mesh node IDs that should never change color into a `noChangeParts` array. Then, during the scene traversal, I check each child mesh against that list. If the mesh is in the list, its material stays untouched; only the exterior aluminum chassis updates to the selected swatch color.

### 3. Smooth Switching Between 14" and 16" Models
Mounting and unmounting two separate 3D models felt clunky and created noticeable layout pop. 

**How I solved it:** Instead of unmounting, I kept both models loaded in the scene graph inside a custom `ModelSwitcher` component. When the user selects a size, GSAP moves the inactive laptop out of view along the X-axis while fading its mesh opacities to zero, simultaneously sliding the active model to the center and fading it in.

### 4. Hooking Three.js Into GSAP ScrollTrigger
Getting a 3D canvas to play nicely with page scroll was tricky. The 3D laptop needed to spin on its Y-axis as the page scrolled, while text boxes and screen videos updated at specific scroll intervals.

**How I solved it:** I connected a dedicated GSAP timeline to the `#f-canvas` element using `scrub: 1` and `pin: true`. I then animated `groupRef.current.rotation.y` from 0 to `Math.PI * 2`. Using timeline `.call()` steps, I updated the active video texture URL in the Zustand store as each section reached its trigger point.

### 5. Managing Mobile Performance & 3D Framing
A 3D canvas set up for a wide desktop monitor completely broke on phones. The laptop appeared clipped, and the heavy scrub timelines stuttered on touch screens.

**How I solved it:** I used `react-responsive` to detect screen widths under 1024px. On mobile, the model scale drops from `0.08` to `0.05`, camera offsets adjust, and heavy multi-image scrub timelines fall back to clean fade-and-rise text reveals.

---

## Project Structure

```text
macbook-page-clone/
├── public/                 # Static assets (3D GLTF models, video clips, textures)
│   ├── models/             # Optimized GLB 3D models (macbook-14, macbook-16)
│   ├── videos/             # Feature video clips for screen textures
│   └── screen.png          # Default high-res screen texture
├── src/
│   ├── components/
│   │   ├── models/         # React Three Fiber mesh components
│   │   ├── three/          # Studio lighting and model switcher components
│   │   ├── Features.jsx    # Scroll-driven 3D laptop with video playback
│   │   ├── Hero.jsx        # Landing hero banner with intro video
│   │   ├── Highlights.jsx  # Key upgrade benefits with staggered reveals
│   │   ├── Navbar.jsx      # Sticky top navigation bar
│   │   ├── Performance.jsx # Exploding performance image scrub timeline
│   │   ├── ProductViewer.jsx # Interactive 3D model color/size viewer
│   │   └── Showcase.jsx    # Rocket chip mask zoom scroll section
│   ├── constants/          # Static data, navigation links, and 3D mesh filters
│   ├── store/              # Zustand state store for active model customizations
│   ├── App.jsx             # Main layout combining all sections
│   ├── main.jsx            # React root mount
│   └── index.css           # Tailwind CSS imports and custom utility styles
├── package.json
└── vite.config.js
```

---

## Getting Started Locally

### Prerequisites
Make sure you have Node.js 18 or higher installed on your computer.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ArchitDash12/macbook-page-clone.git
   cd macbook-page-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Live Deployment

The project is deployed on Vercel:
**[https://macbook-archit.vercel.app/](https://macbook-archit.vercel.app/)**
