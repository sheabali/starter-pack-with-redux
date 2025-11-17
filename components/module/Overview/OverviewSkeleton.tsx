"use client";

const OverviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-between"
          >
            <div>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>

            <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1 min-w-0 h-[550px] bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="w-full lg:w-[30%] h-[550px] bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <div className="h-4 w-56 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
