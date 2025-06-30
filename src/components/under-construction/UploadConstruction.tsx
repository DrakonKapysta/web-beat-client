import React from "react";

export const UploadConstruction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-500 opacity-20 rounded-full animate-bounce"></div>
        <div
          className="absolute bottom-20 left-32 w-24 h-24 bg-indigo-500 opacity-20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-16 w-12 h-12 bg-purple-400 opacity-20 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Musical Notes */}
        <div className="absolute top-20 right-40 text-purple-300 opacity-30 animate-pulse">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div
          className="absolute bottom-32 left-20 text-pink-300 opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div
          className="absolute top-1/2 left-1/4 text-indigo-300 opacity-20 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Construction Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 animate-pulse">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M12,21.5C12.83,21.5 13.5,20.83 13.5,20C13.5,19.17 12.83,18.5 12,18.5C11.17,18.5 10.5,19.17 10.5,20C10.5,20.83 11.17,21.5 12,21.5Z" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            Under Construction
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
            Music Upload Feature
          </h2>

          {/* Description */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-6">
              🎵 We're working hard to bring you an amazing music upload
              experience!
              <br />
              Soon you'll be able to share your incredible tracks with the
              world.
            </p>

            {/* Features Coming Soon */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-purple-400 mb-3">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Easy Upload</h3>
                <p className="text-gray-400 text-sm">
                  Drag & drop your music files
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-pink-400 mb-3">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Audio Preview</h3>
                <p className="text-gray-400 text-sm">Listen before uploading</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-yellow-400 mb-3">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M19,19H5V5H16V8H19V19Z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Rich Metadata</h3>
                <p className="text-gray-400 text-sm">
                  Add titles, genres & more
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-white/10 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full animate-pulse"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-gray-300 mt-3 text-lg">
              Development Progress: 75%
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-gray-400">
            <p className="text-lg">
              Questions? Suggestions?
              <span className="text-purple-400 font-medium"> Let us know!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
