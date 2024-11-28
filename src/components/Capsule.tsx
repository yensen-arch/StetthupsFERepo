import React from "react";

function Capsule({ analysis, file, nextCase }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-6 relative">
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
      <div className="relative overflow-hidden transition-shadow duration-300">
        <img
          src={file}
          alt="Case Analysis"
          className="w-full h-auto cursor-pointer transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Next Case Button */}
      <button
        onClick={nextCase}
        className="absolute bottom-6 right-6 bg-purple-800 text-white px-4 py-2 rounded-lg text-lg hover:bg-purple-700 transition duration-300 sm:static sm:mt-6 sm:ml-auto sm:block"
      >
        Next Case
      </button>
    </div>
  );
}

export default Capsule;
