import { Product, initialProducts } from "@/data/products";
import { Project, initialProjects } from "@/data/projects";
import { ModelAsset, initialModels } from "@/data/models";

// Fallback keys in case database is offline
const STORAGE_KEY = "afterlight_products";
const PROJECTS_KEY = "afterlight_projects";
const MODELS_KEY = "afterlight_models";

// PRODUCTS
export const getStoredProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    return data.length > 0 ? data : initialProducts;
  } catch (e) {
    console.warn("Using LocalStorage fallback for products:", e);
    if (typeof window === "undefined") return initialProducts;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(stored);
  }
};

export const deleteProduct = async (id: string): Promise<Product[]> => {
  try {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("API failed");
    return getStoredProducts();
  } catch (e) {
    console.warn("Fallback delete product:", e);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const products: Product[] = JSON.parse(stored);
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product[]> => {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error("API failed");
    return getStoredProducts();
  } catch (e) {
    console.warn("Fallback add product:", e);
    const stored = localStorage.getItem(STORAGE_KEY);
    const products: Product[] = stored ? JSON.parse(stored) : initialProducts;
    const newProduct: Product = { ...product, id: "p_" + Date.now() };
    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};

export const updateProduct = async (product: Product): Promise<Product[]> => {
  try {
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error("API failed");
    return getStoredProducts();
  } catch (e) {
    console.warn("Fallback update product:", e);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const products: Product[] = JSON.parse(stored);
    const updated = products.map(p => p.id === product.id ? product : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};

// PROJECTS
export const getStoredProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    return data.length > 0 ? data : initialProjects;
  } catch (e) {
    console.warn("Using LocalStorage fallback for projects:", e);
    if (typeof window === "undefined") return initialProjects;
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (!stored) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
      return initialProjects;
    }
    return JSON.parse(stored);
  }
};

export const deleteProject = async (id: string): Promise<Project[]> => {
  try {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("API failed");
    return getStoredProjects();
  } catch (e) {
    console.warn("Fallback delete project:", e);
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (!stored) return [];
    const projects: Project[] = JSON.parse(stored);
    const updated = projects.filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    return updated;
  }
};

export const addProject = async (project: Omit<Project, "id">): Promise<Project[]> => {
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error("API failed");
    return getStoredProjects();
  } catch (e) {
    console.warn("Fallback add project:", e);
    const stored = localStorage.getItem(PROJECTS_KEY);
    const projects: Project[] = stored ? JSON.parse(stored) : initialProjects;
    const newProject: Project = { ...project, id: "proj_" + Date.now() };
    const updated = [newProject, ...projects];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    return updated;
  }
};

export const updateProject = async (project: Project): Promise<Project[]> => {
  try {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error("API failed");
    return getStoredProjects();
  } catch (e) {
    console.warn("Fallback update project:", e);
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (!stored) return [];
    const projects: Project[] = JSON.parse(stored);
    const updated = projects.map(p => p.id === project.id ? project : p);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    return updated;
  }
};

// MODELS
export const getStoredModels = async (): Promise<ModelAsset[]> => {
  try {
    const res = await fetch("/api/models");
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    return data.length > 0 ? data : initialModels;
  } catch (e) {
    console.warn("Using LocalStorage fallback for models:", e);
    if (typeof window === "undefined") return initialModels;
    const stored = localStorage.getItem(MODELS_KEY);
    if (!stored) {
      localStorage.setItem(MODELS_KEY, JSON.stringify(initialModels));
      return initialModels;
    }
    return JSON.parse(stored);
  }
};

export const deleteModel = async (id: string): Promise<ModelAsset[]> => {
  try {
    const res = await fetch(`/api/models/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("API failed");
    return getStoredModels();
  } catch (e) {
    console.warn("Fallback delete model:", e);
    const stored = localStorage.getItem(MODELS_KEY);
    if (!stored) return [];
    const models: ModelAsset[] = JSON.parse(stored);
    const updated = models.filter(m => m.id !== id);
    localStorage.setItem(MODELS_KEY, JSON.stringify(updated));
    return updated;
  }
};

export const addModel = async (model: Omit<ModelAsset, "id">): Promise<ModelAsset[]> => {
  try {
    const res = await fetch("/api/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model)
    });
    if (!res.ok) throw new Error("API failed");
    return getStoredModels();
  } catch (e) {
    console.warn("Fallback add model:", e);
    const stored = localStorage.getItem(MODELS_KEY);
    const models: ModelAsset[] = stored ? JSON.parse(stored) : initialModels;
    const newModel: ModelAsset = { ...model, id: "model_" + Date.now() };
    const updated = [newModel, ...models];
    localStorage.setItem(MODELS_KEY, JSON.stringify(updated));
    return updated;
  }
};

export const updateModel = async (model: ModelAsset): Promise<ModelAsset[]> => {
  try {
    const res = await fetch(`/api/models/${model.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model)
    });
    if (!res.ok) throw new Error("API failed");
    return getStoredModels();
  } catch (e) {
    console.warn("Fallback update model:", e);
    const stored = localStorage.getItem(MODELS_KEY);
    if (!stored) return [];
    const models: ModelAsset[] = JSON.parse(stored);
    const updated = models.map(m => m.id === model.id ? model : m);
    localStorage.setItem(MODELS_KEY, JSON.stringify(updated));
    return updated;
  }
};
