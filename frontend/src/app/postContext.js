"use client";

import { createContext, useContext, useState } from "react";

const PostContext = createContext();

function PostProvider({ children }) {
  return (
    <PostContext.Provider
      value={{
        transactions: [],
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContest was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
