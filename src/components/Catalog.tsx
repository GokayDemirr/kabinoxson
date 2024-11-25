import React from "react";

const Catalog: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full mt-12 bg-black">
      <div className="w-full h-full">
        <iframe
          allowFullScreen
          scrolling="no"
          className="w-full h-full border-0"
          src="https://heyzine.com/flip-book/e6a9cfe812.html"
        />
      </div>
    </div>
  );
};

export default Catalog;
