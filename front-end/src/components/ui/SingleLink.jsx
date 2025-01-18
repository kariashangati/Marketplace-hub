export const SingleLink = ({link,svg,text,ShowCss}) => {
  const currentPath = window.location.pathname;

  return (
    <div className={`${link === currentPath ? 'bg-blue-700' : null} flex lg:gap-2 items-center cursor-pointer hover:bg-blue-700 duration-200 rounded-lg ${ShowCss && "px-2"} py-1 `}>
        <div>
            {svg}
        </div>
        <div>
            <span className="text-lg font-normal hidden  lg:block">{text}</span>
        </div>
    </div>
  )
}
