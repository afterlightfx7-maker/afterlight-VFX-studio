export interface ModelAsset {
  id: string;
  name: string;
  polys: string;
  textures: string;
  time: string;
  modelUrl: string; // Path or URL to .glb file
  color: string;
}

export const initialModels: ModelAsset[] = [
  {
    id: "m1",
    name: "CYBERPUNK ENGINE",
    polys: "1.2M",
    textures: "4K PBR",
    time: "12h",
    modelUrl: "", // Default/Sample model
    color: "var(--color-accent-blue)"
  },
  {
    id: "m2",
    name: "ABSTRACT MONOLITH",
    polys: "850K",
    textures: "8K Procedural",
    time: "8h",
    modelUrl: "", // Default/Sample model
    color: "var(--color-accent-violet)"
  }
];
