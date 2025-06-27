
const Preloader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Transit Pro</h2>
      <p className="text-gray-500">Loading please wait...</p>
    </div>
  );
};

export default Preloader;