import React from "react";

export default function Spinner({ size = 24 }) {
  return (
    <div className="flex justify-center items-center py-4">
      <div
        className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}
