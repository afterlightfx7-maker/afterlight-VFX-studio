"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getStoredProducts, updateProduct } from "@/components/utils/adminData";
import { Product } from "@/data/products";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const products = getStoredProducts();
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <ProductForm 
      title="Edit Product" 
      initialData={product}
      onSubmit={updateProduct} 
    />
  );
}
