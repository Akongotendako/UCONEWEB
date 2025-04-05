import {
    addProduct,
    deleteProduct,
    getProduct,
    getProductByCategory,
    getProducts,
    updateProduct,
  } from "@/services/product/product.service";
  import { create } from "zustand";
  
  const productStore = create((set, get) => ({
    productName: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    images: [],
    response: null,
    isLimitReach: false,
    products: [],
    sizes: [],
    category: "",
    originalImages: [],
  
    setSizes: (size) =>
      set((state) => {
        if (state.sizes.includes(size)) {
          return {
            sizes: state.sizes.filter((filterSize) => filterSize !== size),
          };
        }
  
        return {
          sizes: [...state.sizes, size],
        };
      }),
  
    setField: (field, value) =>
      set((state) => ({
        ...state,
        [field]: value,
      })),
  
    setImages: (newImages, index) => {
      const { images } = productStore.getState();
  
      if (index !== undefined) {
        const updatedImages = [...images];
        updatedImages[index] = newImages[0];
        set({ images: updatedImages });
      } else {
        set({ images: [...images, ...newImages] });
      }
    },
  
    handleProductSubmission: async () => {
      try {
        const {
          productName,
          description,
          price,
          stock,
          discount,
          images,
          sizes,
          category,
        } = productStore.getState();
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("discount", discount);
        formData.append("category", category);
        sizes.forEach((size) => {
          formData.append("sizes", size);
        });
  
        const filteredImages = images.filter((image) => image.file);
        filteredImages.forEach((file) => {
          formData.append("images", file.file);
        });
  
        const response = await addProduct(formData);
        return response;
      } catch (error) {
        return error;
      }
    },
  
    clearAllProperties: () => {
      set({
        productName: "",
        description: "",
        price: "",
        stock: "",
        discount: "",
        images: [],
        response: null,
        isLimitReach: false,
        sizes: [],
        category: "",
      });
    },
  
    getAllProducts: async () => {
      const response = await getProducts();
      set({ products: response.data.response });
    },
  
    getProduct: async (id) => {
      try {
        const response = await getProduct(id);
        set({
          productName: response.data.response.productName,
          description: response.data.response.description,
          price: response.data.response.price,
          stock: response.data.response.stock,
          discount: response.data.response.discount,
          images: response.data.response.images,
          sizes: response.data.response.sizes,
          category: response.data.response.category,
          originalImages: response.data.response.images
        });
        return response;
      } catch (error) {
        return error;
      }
    },
  
    handleProductUpdate: async (id) => {
      try {
        const {
          productName,
          description,
          price,
          stock,
          discount,
          category,
          sizes,
          images,
          originalImages
        } = productStore.getState();
  
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("discount", discount);
        formData.append("category", category);
        sizes.forEach((size) => {
          formData.append("sizes", size);
        });
  
        const updatedImages = images.filter((image) => image.file);
        const existingImages = images.filter((image) => !image.file);
  
        updatedImages.forEach((image) => {
          formData.append("images", image.file);
        });
  
        formData.append("existingImages", JSON.stringify(existingImages));
        formData.append("originalImages", JSON.stringify(originalImages))
  
        const response = await updateProduct(id, formData);
        return response;
      } catch (error) {
        return error;
      }
    },
  
    deleteProduct: async (id) => {
      try {
        const response = await deleteProduct(id);
  
        if (response.status === 200) {
          await get().getAllProducts();
        }
        return response;
      } catch (error) {
        return error;
      }
    },
  
    getProductByCategory: async (category) => {
      try {
        const response = await getProductByCategory(category);
        return response;
      } catch (error) {
        return error;
      }
    },
  }));
  
  export default productStore;
  