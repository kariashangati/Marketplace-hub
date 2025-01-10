export const StoreSkeleton = () => {
  return (
    <div
      role="status"
      className="bg-dark mx-auto my-3.5 px-3 py-2 rounded-md w-[100%] mb-2 lg:mb-0 lg:w-[48%]"
    >
      <div className="w-20 h-20 rounded-md flex items-center gap-2">
        <div>
          <svg
            className="animate-pulse w-20 h-20 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div>
          <div className="animate-pulse h-2 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
          <div className="animate-pulse h-2 bg-gray-400 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        </div>
      </div>
      <div className="w-full">
        <div className="animate-pulse h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="animate-pulse h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="animate-pulse h-2 bg-gray-400 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default StoreSkeleton;
