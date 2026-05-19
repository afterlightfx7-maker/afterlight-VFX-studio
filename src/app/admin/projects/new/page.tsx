"use client";

import ProjectForm from "@/components/admin/ProjectForm";
import { addProject } from "@/components/utils/adminData";

export default function NewProjectPage() {
  return (
    <ProjectForm 
      title="Add New Project" 
      onSubmit={addProject} 
    />
  );
}
