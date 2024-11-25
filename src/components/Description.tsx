import React, { useState } from 'react';

const Description = ({ description }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setEnlargedImage(imageSrc);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {description.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4 text-left">{item.title}</h2>
            <div
              className="text-gray-700 text-left prose max-w-none text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></div>
            {item.description_file && (
              <div className="mt-6">
                <img
                  src={item.description_file}
                  alt={`${item.title} illustration`}
                  className="max-w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleImageClick(item.description_file)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {enlargedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeEnlargedImage}
        >
          <div className="max-w-4xl w-full max-h-screen p-4">
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;

