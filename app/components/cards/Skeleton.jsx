export default function Skeleton() {
  return (
    <div className="card card-compact bg-secondary shadow-xl animate-pulse">
      <figure className="w-full h-48 bg-gray-300"></figure>
      <div className="card-body">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="card-actions flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
          </div>
          <div className="btn btn-primary bg-gray-300 border-none text-transparent">
            View Recipe
          </div>
        </div>
      </div>
    </div>
  );
}
