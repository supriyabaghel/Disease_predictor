import React from "react";

const SkeletonLoader = () => {
  return (
    <article className="flex flex-wrap gap-6 w-screen justify-center p-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          role="status"
          className="space-y-4 animate-pulse flex flex-col items-center p-4 w-72 h-80 bg-white rounded-lg shadow"
        >
          {/* Profile image placeholder */}
          <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full">
            <svg
              className="w-12 h-12 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.8 515.8 0 560 0s80 35.8 80 80-35.8 80-80 80-80-35.8-80-80zM320 96c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96zm320 288c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64 0-53 43-96 96-96h448c53 0 96 43 96 96z"/>
            </svg>
          </div>

          {/* Name placeholder */}
          <div className="h-6 bg-gray-200 rounded-full w-40"></div>

          {/* Speciality placeholder */}
          <div className="h-4 bg-gray-200 rounded-full w-28"></div>

          {/* Buttons placeholder */}
          <div className="flex w-full justify-around mt-2">
            <div className="h-10 bg-gray-200 rounded-full w-24"></div>
            <div className="h-10 bg-gray-200 rounded-full w-24"></div>
          </div>

          {/* Experience line */}
          <div className="h-3 bg-gray-200 rounded-full w-32"></div>

          {/* Address block */}
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>

          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </article>
  );
};

export default SkeletonLoader;
