
export const DashboardStat = ({svg,text,state}) => {
  return (
    <div className="flex justify-between items-center text-white">
        <div className="flex gap-1 items-end">
            <span className="text-3xl font-semibold">{state}</span>
            <span className="text-lg font-semibold">{text}</span>
        </div>
        <div>
            {svg}
        </div>
    </div>
  )
}
