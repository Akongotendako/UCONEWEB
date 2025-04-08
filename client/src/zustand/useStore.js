import {
  deleteProduct,
  getProduct,
  getProductByCategory,
  getProducts,
  updateProduct,
} from "@/services/product/product.service";
import {
  fetchProfile,
  signIn,
  signUp,
  updateProfile,
} from "@/services/user/user.service";
import { create } from "zustand";

const useStore = create((set, get) => ({
  product: {
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
  },
  signup: {
    email: "",
    password: "",
    role: "",
  },
  signin: {
    firstName: "defaultName",
    lastName: "defaultLastName",
    age: "32",
    profilePic: {
      url: "",
      publicId: "",
    },
    phoneNumber: "",
  },

  setSizes: (size) =>
    set((state) => {
      if (state.sizes.includes(size)) {
        return {
          product: {
            sizes: state.sizes.filter((filterSize) => filterSize !== size),
          },
        };
      }

      return {
        product: {
          ...state.product,
          sizes: [...state.product.sizes, size],
        },
      };
    }),

  setField: (formType, field, value) =>
    set((state) => ({
      ...state,
      [formType]: {
        ...state[formType],
        [field]: value,
      },
    })),

  setImages: (newImages, index) => {
    if (index === undefined) {
      const updatedImages = [...get().product.images];
      updatedImages[index] = newImages[0];
      set({
        product: {
          images: updatedImages,
        },
      });
    } else {
      set({ product: { images: [...get().product.images, ...newImages] } });
    }
  },

  addProduct: async () => {
    try {
      const formData = new FormData();
      formData.append("productName", get().product.productName);
      formData.append("description", get().product.description);
      formData.append("price", get().product.price);
      formData.append("stock", get().product.stock);
      formData.append("discount", get().product.discount);
      get().product.sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      const filteredImages = get().product.images.filter((image) => image.file);
      filteredImages.forEach((file) => {
        formData.append("images", file.file);
      });
    } catch (error) {
      return error;
    }
  },
  getProducts: async () => {
    try {
      const response = await getProducts();
      return response;
    } catch (error) {
      return error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await getProduct(id);
      set({
        product: {
          productName: response.data.response.productName,
          description: response.data.response.description,
          price: response.data.response.price,
          stock: response.data.response.stock,
          discount: response.data.response.discount,
          images: response.data.response.images,
          sizes: response.data.response.sizes,
          category: response.data.response.category,
          originalImages: response.data.response.images,
        },
      });
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

  updateProduct: async (id) => {
    try {
      const formData = new FormData();
      formData.append("productName", get().product.productName);
      formData.append("description", get().product.description);
      formData.append("price", get().product.price);
      formData.append("stock", get().product.stock);
      formData.append("discount", get().product.discount);
      formData.append("category", get().product.category);
      get().product.sizes.forEach((size) => {
        formData.append("sizes", size);
      });

      const updatedImages = get().product.images.filter((image) => image.file);
      const existingImages = get().product.images.filter(
        (image) => !image.file
      );

      updatedImages.forEach((image) => {
        formData.append("images", image.file);
      });

      formData.append("existingImages", JSON.stringify(existingImages));
      formData.append(
        "originalImages",
        JSON.stringify(get().product.originalImages)
      );

      const response = await updateProduct(id, formData);
      return response;
    } catch (error) {
      return error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await deleteProduct(id);
      return response;
    } catch (error) {
      return error;
    }
  },

  // user

  setProfileImage: (image) =>
    set((state) => ({
      ...state,
      profile: {
        ...state.profile,
        profilePic: image,
      },
    })),

  signUp: async () => {
    try {
      const response = await signUp({
        email: get().signup.email,
        password: get().signup.password,
        confirmPassword: get().signup.confirmPassword,
        role: get().signup.role,
        profile: get().profile,
      });
      return response;
    } catch (error) {
      return error;
    }
  },

  signIn: async () => {
    try {
      const response = await signIn({
        email: get().signin.email,
        password: get().signin.password,
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  fetchProfile: async (id) => {
    try {
      const response = await fetchProfile(id);
      console.log(response.data.response);
      set({
        signin: {
          email: response.data.response.email,
          password: response.data.response.password,
        },
        profile: {
          firstName: response.data.response.profile.firstName,
          lastName: response.data.response.profile.lastName,
          age: response.data.response.profile.age,
          profilePic: response.data.response.profile.profilePic,
          phoneNumber: response.data.response.profile.phoneNumber,
        },
      });
    } catch (error) {
      return error;
    }
  },

  updateProfile: async (id) => {
    try {
      console.log(get().profile.profilePic);
      const formData = new FormData();
      formData.append("email", get().signin.email);
      formData.append("password", get().signin.password);
      formData.append("firstName", get().profile.firstName);
      formData.append("lastName", get().profile.lastName);
      formData.append("age", get().profile.age);
      if (get().profile.profilePic && get().profile.profilePic.file) {
        formData.append("profilePic", get().profile.profilePic.file);
      }
      formData.append("phoneNumber", get().profile.phoneNumber);

      const response = await updateProfile(id, formData);
      return response;
    } catch (error) {
      return error;
    }
  },
  clearAllProperties: (formType) => {
    if (formType === "product") {
      set({
        product: {
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
        },
      });
    } else if (formType === "signin") {
      set({
        signin: {
          firstName: "defaultName",
          lastName: "defaultLastName",
          age: "32",
          profilePic: {
            url: "",
            publicId: "",
          },
          phoneNumber: "",
        },
      });
    } else {
      set({
        singup: {
          email: "",
          password: "",
          role: "",
        },
      });
    }
  },
}));

export default useStore;
