import React from 'react'
import userDefaulltImage from '../../../public/assets/userDefaultImage.jpg'
import storeLogo from '../../../public/assets/storeLogo.png'
import moment from 'moment';


export const Product = ({productData}) => {
    console.log(productData);
    
  return (
    <div className='bg-darkForProduct px-5 py-2 rounded-md mx-20 md:mx-0 w-[100%] flex justify-center md:w-[45%] mb-2 lg:mb-0 lg:w-[19%] '>
        <div className=' gap-2 justify-between items-start'>
            <div className='flex gap-2 items-center'>
                <img src={userDefaulltImage} className='w-7 h-7 rounded-full'/>
                <span className='text-sm font-semibold'>{productData.store.storeName}</span>
            </div> 
            <div className='mt-2'>
                <img src={storeLogo} className='w-42 h-56 rounded-md'/>
            </div>
            <div className='mt-2 flex flex-col'>
            <span className='text-lg font-semibold '>{productData.productName}</span>
            <span className='text-2xl font-semibold  mt-1'>{productData.price} DH</span>
            <span className='text-sm font-semibold px-2 rounded-3xl mt-3 bg-blue-500 w-[61%]'>{productData.delivry}</span>
            <span className='text-sm text-gray-400 mt-2'>{productData.location}</span>
            <span className='text-sm text-gray-400 '>{moment(productData.created_at).fromNow()} </span>


            </div>
        </div>
       
    </div>
  )
}
