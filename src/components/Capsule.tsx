import React, { useState } from 'react';

function Capsule({ analysis, file }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800 mb-4 sm:mb-6">Case Analysis</h2>
      <div 
        className="text-base sm:text-lg md:text-xl text-gray-800 mb-6 sm:mb-8 text-left prose max-w-none"
        dangerouslySetInnerHTML={{ __html: analysis }} 
      />
      <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <img 
          src={file} 
          alt="Case Analysis" 
          className="w-full h-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={handleImageClick}
        />
      </div>
      {isImageOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="max-w-4xl w-full max-h-screen p-4">
            <img 
              src={file} 
              alt="Case Analysis" 
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Capsule;

