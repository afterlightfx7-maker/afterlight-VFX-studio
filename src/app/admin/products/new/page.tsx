"use client";

import ProductForm from "@/components/admin/ProductForm";
import { addProduct } from "@/components/utils/adminData";

export default function NewProductPage() {
  return (
    <ProductForm 
      title="Add New Product" 
      onSubmit={addProduct} 
    />
  );
}
