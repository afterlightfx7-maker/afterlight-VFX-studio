"use client";

import ModelForm from "@/components/admin/ModelForm";
import { addModel } from "@/components/utils/adminData";

export default function NewModelPage() {
  return (
    <ModelForm 
      title="Add 3D Asset" 
      onSubmit={addModel} 
    />
  );
}
