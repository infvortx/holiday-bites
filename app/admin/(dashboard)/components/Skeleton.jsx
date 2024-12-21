export default function Skeleton() {
  return (
    <div className="menu mt-4 animate-pulse">
      <div className="flex items-center">
        <div className="w-16 h-16 mr-4 bg-gray-200 rounded-md"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="btn btn-secondary ml-auto h-8 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
