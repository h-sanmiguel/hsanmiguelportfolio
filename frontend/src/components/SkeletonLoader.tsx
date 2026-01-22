export const SkeletonLoader = ({ width = 'w-full', height = 'h-4' }) => (
  <div className={`${width} ${height} bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse`}></div>
)

export const SectionSkeleton = () => (
  <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-6 space-y-4 animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-5/6"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-4/5"></div>
    </div>
  </div>
)

export const ProfileSkeleton = () => (
  <div className="flex flex-row gap-6 mb-12 items-start animate-pulse">
    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gray-300 dark:bg-gray-700 rounded-xl flex-shrink-0"></div>
    <div className="flex-1 space-y-4 w-full">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/5"></div>
      <div className="flex gap-2 mt-4">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-32"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-32"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-32"></div>
      </div>
    </div>
  </div>
)

export const TechStackSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/4"></div>
    <div className="flex gap-2 flex-wrap">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-20"></div>
      ))}
    </div>
  </div>
)
