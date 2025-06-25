import React, { memo } from "react";
import { Button } from "./ui/button";

export const EditorToolsPannel = memo(() => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm">BPM:</span>
            <input
              type="number"
              value="120"
              className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm">Key:</span>
            <select className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm">
              <option className="bg-gray-800" value="C">
                C Major
              </option>
              <option className="bg-gray-800" value="D">
                D Major
              </option>
              <option className="bg-gray-800" value="E">
                E Major
              </option>
              <option className="bg-gray-800" value="F">
                F Major
              </option>
              <option className="bg-gray-800" value="G">
                G Major
              </option>
              <option className="bg-gray-800" value="A">
                A Major
              </option>
              <option className="bg-gray-800" value="B">
                B Major
              </option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2V4z"
              />
            </svg>
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
});
