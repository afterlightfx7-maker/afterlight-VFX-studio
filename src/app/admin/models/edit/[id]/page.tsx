"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ModelForm from "@/components/admin/ModelForm";
import { getStoredModels, updateModel } from "@/components/utils/adminData";
import { ModelAsset } from "@/data/models";

export default function EditModelPage() {
  const { id } = useParams();
  const [model, setModel] = useState<ModelAsset | null>(null);

  useEffect(() => {
    getStoredModels().then(models => {
      const found = models.find(m => m.id === id);
      if (found) {
        setModel(found);
      }
    });
  }, [id]);

  if (!model) return <div>Loading...</div>;

  return (
    <ModelForm 
      title="Edit 3D Asset" 
      initialData={model}
      onSubmit={updateModel} 
    />
  );
}
