"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PetListing } from "@/types/pet";
import { MOCK_PET_LISTINGS } from "@/data/mockPets";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  badge: string;
  avatar: string;
  memberSince: string;
}

export const SAMPLE_DEMO_USER: DemoUser = {
  id: "user-demo-1",
  name: "Ahmet Karataylı",
  email: "demo@kopekevreni.com",
  phone: "0532 999 42 42",
  city: "Konya",
  district: "Karatay",
  badge: "Doğrulanmış Üye",
  avatar: "/images/breeds/poodle-toy.png",
  memberSince: "Şubat 2024",
};

interface AuthContextType {
  user: DemoUser | null;
  isLoaded: boolean;
  myListings: PetListing[];
  login: (email: string, password?: string) => boolean;
  loginAsDemo: () => void;
  logout: () => void;
  removeMyListing: (id: string) => void;
  addMyListing: (listing: PetListing) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoaded: false,
  myListings: [],
  login: () => false,
  loginAsDemo: () => {},
  logout: () => {},
  removeMyListing: () => {},
  addMyListing: () => {},
});

const STORAGE_USER_KEY = "kopek_evreni_demo_user_v1";
const STORAGE_LISTINGS_KEY = "kopek_evreni_my_listings_v1";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [myListings, setMyListings] = useState<PetListing[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedListings = localStorage.getItem(STORAGE_LISTINGS_KEY);
      if (savedListings) {
        setMyListings(JSON.parse(savedListings));
      } else {
        // Varsayılan olarak örnek kullanıcının 3 ilanı
        const initialDemoListings = MOCK_PET_LISTINGS.slice(0, 3);
        setMyListings(initialDemoListings);
      }
    } catch (e) {
      setMyListings(MOCK_PET_LISTINGS.slice(0, 3));
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const login = (email: string, password?: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return false;

    const loggedUser: DemoUser =
      cleanEmail === SAMPLE_DEMO_USER.email || cleanEmail === "ahmet@kopekevreni.com"
        ? SAMPLE_DEMO_USER
        : {
            ...SAMPLE_DEMO_USER,
            name: cleanEmail.split("@")[0].replace(".", " ").toUpperCase(),
            email: cleanEmail,
          };

    setUser(loggedUser);
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(loggedUser));
    } catch (e) {}
    return true;
  };

  const loginAsDemo = () => {
    setUser(SAMPLE_DEMO_USER);
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(SAMPLE_DEMO_USER));
    } catch (e) {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
    } catch (e) {}
  };

  const removeMyListing = (id: string) => {
    setMyListings((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_LISTINGS_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const addMyListing = (listing: PetListing) => {
    setMyListings((prev) => {
      const updated = [listing, ...prev];
      try {
        localStorage.setItem(STORAGE_LISTINGS_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        myListings,
        login,
        loginAsDemo,
        logout,
        removeMyListing,
        addMyListing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

