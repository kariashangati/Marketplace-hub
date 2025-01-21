
export const SingleUserDataSkeleton = ({height}) => {
  return (
    <div className="mt-6 border-blue-300 shadow rounded-md max-w-[100%] w-full items-center">
      <div className="animate-pulse flex space-x-2">
        <div className={`rounded-xl bg-slate-400 h-${height} w-[100%]`}>

        </div>
      </div>
    </div>
  )
}
