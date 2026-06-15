# Project Context: Semantic Lifting System
This repository contains a web-based Gaussian Splat viewer platform built using SparkJS/Luma and Three.js. 

**Current Functionality:**
- Loading/rendering .sog Gaussian Splat scenes
- Scene navigation and camera controls
- Snapshot capture and Gemini-powered scene understanding
- Annotation rendering, HTML overlays, and frontend state management
- Backend APIs (Node.js/TypeScript, Socket.io, Redis)

**Target Vision:**
Evolve the current system into a production-grade Semantic Lifting platform where AI detections (YOLO segmentation + Gemini semantic descriptions) become persistent, stable 3D anchors attached to the environment. Detections must be highlighted directly on Gaussian Splats using GPU shaders, maintain persistent spatial memory (preventing duplicates), and support future collision systems.

**Important Technical Constraint:**
Do NOT assume traditional Three.js mesh workflows. Never invent renderer behavior. Validate all ideas against the actual SparkJS implementation in the codebase. Extend existing systems (SplatViewerComponent, snapshot pipelines, overlay UI) wherever possible.

---

# PHASE 0 — CODEBASE DISCOVERY & ANALYSIS
Before discussing implementation, perform a comprehensive review of the provided repository files. Study rendering lifecycles, annotation systems, AI integrations, state management, backend socket architectures, and spatial geometry handling. Trace actual code paths.

Generate a comprehensive response containing exactly the following 9 deliverables. 

### DELIVERABLE 1 — REPOSITORY MAP
Group files into categories (Rendering, Annotation, Backend, AI Integration, UI, State Management, Utilities). For each file, provide: File path, Purpose, Key classes, Key methods, and Dependencies.

### DELIVERABLE 2 — SYSTEM ARCHITECTURE REPORT
Detail the Application, Rendering, Annotation, Backend, and State Management architectures. Explain initialization, lifecycles, ownership boundaries, and shader/depth access opportunities. Use actual code references.

### DELIVERABLE 3 — DATA FLOW ANALYSIS
Create sequence diagrams (in plain text or mermaid) for the CURRENT implementation based on actual files and methods (e.g., User Click → Snapshot Capture → Backend Request → ...).

### DELIVERABLE 4 — INTEGRATION ANALYSIS
Identify exactly where future Semantic Lifting features should integrate into the existing code:
1. YOLO Integration
2. Socket.io Integration
3. Shader Injection
4. Trajectory Memory
5. Depth Sampling
For each, explain: Where it should live, Why, Risks, and Alternatives.

### DELIVERABLE 5 — ARCHITECTURAL CRITIQUE
Challenge my proposed Target Vision. Identify High-Risk areas, Medium-Risk areas, Low-Risk areas, Scalability concerns (backend), GPU concerns, and Memory concerns. Propose alternative designs if a better architecture exists.

### DELIVERABLE 6 — UNKNOWNS
Create an "Unknowns Requiring Clarification" section. List everything that cannot be determined from the repository. Do not invent answers.

### DELIVERABLE 7 — QUESTIONS
List clarification questions that directly affect implementation decisions. Explain why each question matters and which architectural decision depends on it.

### DELIVERABLE 8 — IMPLEMENTATION READINESS ASSESSMENT
Rate your understanding from 1–10 across these categories: Repository, Rendering, SparkJS, Annotation, Backend, Gemini Integration, Shader Integration, Depth Access, State Management. Anything below 8/10 requires you to explain what additional investigation is needed.

### DELIVERABLE 9 — REPOSITORY-SPECIFIC IMPLEMENTATION PLAN
Provide a phased implementation plan tailored to the actual repository (referencing real files, classes, and integration points). Do NOT provide generic architecture. 

---

# FUTURE IMPLEMENTATION TARGETS (For Context Only - DO NOT IMPLEMENT)
*Phase 1:* High-Performance Backend (FastAPI YOLO Service, Node.js Orchestrator with Socket.io/Redis).
*Phase 2:* Instant GPU Lifting (Three.js onBeforeCompile, custom shaders projecting to screen space to highlight splats).
*Phase 3:* Spatial Memory (Persistent anchors, Map-based lookup, duplicate suppression).
*Phase 4:* Geometric Precision (gl.readPixels depth sampling, median filtering).
*Phase 5:* Navigation & Interaction (Virtual bumper, museum-grade HTML overlay UI).

---

# APPROVAL GATE & FINAL INSTRUCTIONS
Your first response must contain ZERO implementation code. 
Deliver items 1 through 9. 
Then STOP. Wait for my review and explicit approval before proceeding further.