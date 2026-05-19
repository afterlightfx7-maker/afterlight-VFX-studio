import { Product, initialProducts } from "@/data/products";
import { Project, initialProjects } from "@/data/projects";
import { ModelAsset, initialModels } from "@/data/models";

const STORAGE_KEY = "afterlight_products";
const PROJECTS_KEY = "afterlight_projects";
const MODELS_KEY = "afterlight_models";

export const getStoredProducts = (): Product[] => {
  if (typeof window === "undefined") return initialProducts;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(stored);
};

export const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error("Storage Error:", e);
    alert("Storage Full! The images/videos you uploaded are too large for the browser's temporary memory. Please use smaller files or clear some space.");
  }
};

export const deleteProduct = (id: string) => {
  const products = getStoredProducts();
  const updated = products.filter(p => p.id !== id);
  saveProducts(updated);
  return updated;
};

export const addProduct = (product: Product) => {
  const products = getStoredProducts();
  const updated = [product, ...products];
  saveProducts(updated);
  return updated;
};

export const updateProduct = (product: Product) => {
  const products = getStoredProducts();
  const updated = products.map(p => p.id === product.id ? product : p);
  saveProducts(updated);
  return updated;
};

// PROJECTS
export const getStoredProjects = (): Project[] => {
  if (typeof window === "undefined") return initialProjects;
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
    return initialProjects;
  }
  return JSON.parse(stored);
};

export const saveProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Storage Error:", e);
    alert("Storage Full! The project files you uploaded are too large for the browser's temporary memory. Please use smaller files.");
  }
};

export const deleteProject = (id: string) => {
  const projects = getStoredProjects();
  const updated = projects.filter(p => p.id !== id);
  saveProjects(updated);
  return updated;
};

export const addProject = (project: Project) => {
  const projects = getStoredProjects();
  const updated = [project, ...projects];
  saveProjects(updated);
  return updated;
};

export const updateProject = (project: Project) => {
  const projects = getStoredProjects();
  const updated = projects.map(p => p.id === project.id ? project : p);
  saveProjects(updated);
  return updated;
};

// MODELS
export const getStoredModels = (): ModelAsset[] => {
  if (typeof window === "undefined") return initialModels;
  const stored = localStorage.getItem(MODELS_KEY);
  if (!stored) {
    localStorage.setItem(MODELS_KEY, JSON.stringify(initialModels));
    return initialModels;
  }
  return JSON.parse(stored);
};

export const saveModels = (models: ModelAsset[]) => {
  try {
    localStorage.setItem(MODELS_KEY, JSON.stringify(models));
  } catch (e) {
    console.error("Storage Error:", e);
    alert("Storage Full! 3D models are too large for browser memory. Please use cloud storage.");
  }
};

export const deleteModel = (id: string) => {
  const models = getStoredModels();
  const updated = models.filter(m => m.id !== id);
  saveModels(updated);
  return updated;
};

export const addModel = (model: ModelAsset) => {
  const models = getStoredModels();
  const updated = [model, ...models];
  saveModels(updated);
  return updated;
};

export const updateModel = (model: ModelAsset) => {
  const models = getStoredModels();
  const updated = models.map(m => m.id === model.id ? model : m);
  saveModels(updated);
  return updated;
};
