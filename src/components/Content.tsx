import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="mx-auto sm:mx-16 md:mx-32 lg:mx-48 xl:mx-96 antialiased font-sans">
      {children}
    </div>
  );
};
