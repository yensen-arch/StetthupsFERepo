import React, { useState } from "react";

function Capsule({ analysis, file }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-6">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-purple-800 text-center">
        Case Analysis
      </h2>

      {/* Analysis Content */}
      <div
        className="text-lg md:text-xl text-gray-700 leading-relaxed prose max-w-none text-left"
        dangerouslySetInnerHTML={{ __html: analysis }}
      />

      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <img
          src={file}
          alt="Case Analysis"
          className="w-full h-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={handleImageClick}
        />
      </div>

      {/* Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full max-h-screen overflow-y-auto bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing on image click
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 bg-purple-800 text-white text-3xl rounded-full p-2 hover:bg-purple-700 transition"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            {/* Full Image */}
            <img
              src={file}
              alt="Case Analysis Zoomed"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Capsule;
