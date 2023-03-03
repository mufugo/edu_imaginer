"use client";
import React, { useState, useMemo, useContext, createContext } from "react";

const HomepageContext = createContext();

export const HomepageProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const generateImage = async () => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(res.statusText || res.status);
      const generatedImage = await res.json();
      setImage(generatedImage);
      setError(null);
    } catch (error) {
      setError(error);
    }
    setSubmitting(false);
  };
  const changePrompt = (newPrompt) => {
    setPrompt(newPrompt);
    window.scrollTo(0, 0);
  };
  const data = useMemo(
    () => ({
      prompt,
      setPrompt,
      generateImage,
      changePrompt,
      image,
      isSubmitting,
      error,
    }),
    [prompt, image, error, isSubmitting]
  );

  return (
    <HomepageContext.Provider value={data}>{children}</HomepageContext.Provider>
  );
};
export const useHomepage = () => {
  const context = useContext(HomepageContext);
  return context;
};
