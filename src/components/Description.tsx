import React, { useState } from "react";

const Description = ({ description, setActiveButton }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = (imageSrc) => {
    setEnlargedImage(imageSrc);
    setIsZoomed(false);
  };

  const handleDescNext = () => {
    setActiveButton("Q&A"); // Switch to Q&A
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="max-w-4xl mx-auto mb-10 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {description.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-6 text-left">
              {item.title}
            </h2>
            <div
              className="text-gray-800 text-left prose prose-lg max-w-none leading-relaxed text-lg"
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
        <div className="pb-4 mx-auto relative sm:static">
          <button
            onClick={handleDescNext}
            className="absolute bottom-0 right-6 bg-purple-800 text-white px-8 py-2 rounded-lg text-lg hover:bg-purple-700 transition duration-300 sm:static sm:mt-6 sm:ml-auto sm:block"
            >
            Next
          </button>
        </div>
      </div>

      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeEnlargedImage}
        >
          <div
            className="relative w-full h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition"
              onClick={closeEnlargedImage}
            >
              &times;
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className={`max-w-[90%] max-h-[90%] object-contain cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? "scale-150" : ""
              }`}
              onClick={toggleZoom}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
