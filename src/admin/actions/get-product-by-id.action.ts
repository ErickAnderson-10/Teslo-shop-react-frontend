import { tesloApi } from "@/api/TesloApi";
import type { Product } from "@/interfaces/product.interface";

export const getProductByIdAction = async (id: string): Promise<Product> => {
  if (!id) throw new Error("Id is requid");

  if (id === "new") {
    return {
      id: "new",
      title: "",
      price: 0,
      description: "",
      slug: "",
      stock: 0,
      sizes: [],
      gender: "men",
      tags: [],
      images: [],
    } as unknown as Product;
  }

  const { data } = await tesloApi.get<Product>(`/products/${id}`); //Si hay una escepcion, lo podemos dejar así xq esa escepcion la vamos a atrapar directamente en tanstack. Aunque tambien se puede hacer mediante un try catch

  const images = data.images.map((image) => {
    if (image.includes("http")) return image;
    return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
  });

  return {
    ...data,
    images,
  };
};
