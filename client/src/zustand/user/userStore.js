import {
    fetchProfile,
    signIn,
    signUp,
    updateProfile,
  } from "@/services/user/user.service";
  import { create } from "zustand";
  
  const userStore = create((set, get) => ({
    signup: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  
    signin: {
      email: "",
      password: "",
      role: "",
    },
  
    profile: {
      firstName: "defaultName",
      lastName: "defaultLastName",
      age: "32",
      profilePic: {
        url: "",
        publicId: ""
      },
      phoneNumber: "",
    },
  
    response: {},
  
    setImage: (newImage) =>
      set((state) => ({
        profile: {
          ...state.profile,
          profilePic: newImage,
        },
      })),
  
    setField: (formType, field, value) =>
      set((state) => ({
        ...state,
        [formType]: {
          ...state[formType],
          [field]: value,
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
        const { signin } = userStore.getState();
        const response = await signIn({
          email: signin.email,
          password: signin.password,
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
            password: response.data.response.password
          },
          profile: {
            firstName: response.data.response.profile.firstName,
            lastName: response.data.response.profile.lastName,
            age: response.data.response.profile.age,
            profilePic: response.data.response.profile.profilePic,
            phoneNumber: response.data.response.profile.phoneNumber
          }
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
        if(get().profile.profilePic && get().profile.profilePic.file) {
          formData.append("profilePic", get().profile.profilePic.file);
        }
        formData.append("phoneNumber", get().profile.phoneNumber);
  
        const response = await updateProfile(id, formData);
        return response;
      } catch (error) {
        return error;
      }
    },
  
    clearAllProperties: (formType) =>
      set((state) => ({
        ...state,
        [formType]: {
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        },
      })),
  }));
  
  export default userStore;
  