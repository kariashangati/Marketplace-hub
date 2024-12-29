import { useState } from "react"


export const Notification = ({text,kind}) => {
    const [open,setOpen] = useState(true);
    setTimeout(() =>{
        setOpen(false)
    },3000)
  return(
    <div>
        {
            kind === 'success' && open ?
                <div className="bg-green-200 z-10 rounded-3xl text-center py-1 border-2 border-green-900 px-3 animate-notificationAnimation absolute top-5 left-1/2 transform -translate-x-1/2">
                    ✔ <span className="text-md font-semibold text-green-700">{text}</span>
                </div>
            :null
        }
        {
            kind === 'error' && open?
                <div className="bg-red-200 z-10 rounded-3xl text-center py-1 border-2 border-red-900 px-3 animate-notificationAnimation absolute top-5 left-1/2 transform -translate-x-1/2">
                    ❌ <span className="text-md font-semibold text-red-700">{text}</span>
                </div>
            :null
        }
    </div>
  )
}
