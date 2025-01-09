import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/24/outline'
import storeLogo from '../../../public/assets/storeLogo.png'
import moment from 'moment'
export const Store = ({storeData}) => {
    
  return (
    <div className='bg-dark mx-auto my-3.5 px-3 py-2 rounded-md w-[100%] mb-2 lg:mb-0 lg:w-[48%]'>
        <div className='flex gap-2 justify-between items-start'>
            <div className='flex gap-2 items-center'>
                <div>
                    <img src={storeLogo} className='w-20 h-20 rounded-md'/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xl font-semibold'>{storeData.storeName}</span>
                    <span className='text-gray-600 font-semibold'>Created {moment(storeData.created_at).fromNow()}</span>
                </div>
            </div>
            <div className='flex gap-1'>
                <TrashIcon className='w-8 h-8 text-red-500 cursor-pointer hover:text-red-700 duration-200'/>
                <Cog6ToothIcon className='w-8 h-8 text-blue-500 cursor-pointer hover:text-blue-700 duration-200'/>
            </div>
        </div>
        <div className='mt-2'>
            <p className='text-gray-500 font-semibold text-sm'>{storeData.bio.substr(0,100)}...</p>
        </div>
    </div>
  )
}
