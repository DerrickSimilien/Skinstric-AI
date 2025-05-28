import React, { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Load from localStorage on first load
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : {
      name: "",
      location: "",
      nationality: "",
      capturedImage: ""
    };
  });

  // Save to localStorage anytime userData changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
