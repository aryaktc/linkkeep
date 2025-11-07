import React from "react";

export default function SkeletonCard() {
  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded shadow animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-1"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="mt-3 flex gap-2">
        <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
