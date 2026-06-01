export interface Project {
  id: string;
  title: string;
  category: "3D" | "VFX" | "Motion";
  mediaSrc: string;
  mediaType: "image" | "video";
  size: "large" | "tall" | "small";
  bg?: string;
  galleryImages?: string[];
}

export const initialProjects: Project[] = [
  { 
    id: "proj1", 
    title: "Luxury Villa Exterior", 
    category: "3D", 
    size: "large", 
    bg: "#1a1a24", 
    mediaType: "image", 
    mediaSrc: "" 
  },
  { 
    id: "proj2", 
    title: "Neon City VFX Reel", 
    category: "VFX", 
    size: "tall", 
    bg: "#161224", 
    mediaType: "video", 
    mediaSrc: "" 
  },
  { 
    id: "proj3", 
    title: "Cinematic Motion Opener", 
    category: "Motion", 
    size: "small", 
    bg: "#0d1a24", 
    mediaType: "video", 
    mediaSrc: "" 
  },
  { 
    id: "proj4", 
    title: "High-End Car Render", 
    category: "3D", 
    size: "small", 
    bg: "#24121d", 
    mediaType: "image", 
    mediaSrc: "" 
  },
];
