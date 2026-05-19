"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getStoredProjects, updateProject } from "@/components/utils/adminData";
import { Project } from "@/data/projects";

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    getStoredProjects().then(projects => {
      const found = projects.find(p => p.id === id);
      if (found) {
        setProject(found);
      }
    });
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <ProjectForm 
      title="Edit Project" 
      initialData={project}
      onSubmit={updateProject} 
    />
  );
}
