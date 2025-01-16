import React from 'react'
import { UserSideBar } from '../../layouts/UserSideBar';
import projectLogo from "../../../public/assets/projectLogo.png";
import seeProduct from "../../../public/assets/seeProduct.jpg";
import mall from "../../../public/assets/mall.jpg";
import people from "../../../public/assets/people.jpg";
import product from "../../../public/assets/product.jpg";
import store from "../../../public/assets/store.jpg";
import { Button } from '../../components/ui/Button';
import { FaceFrownIcon } from '@heroicons/react/24/outline';



export const Home = () => {
  return (
    <div>
        <div className='bg-dark w-[100%] px-10 fixed z-10'>
          <img src={projectLogo} className="w-[15%] hidden lg:block mb-6"/>
        </div>
        <div className='w-[100%] flex justify-center items-center relative'>
          <img src={seeProduct} className='w-[100%] h-[100vh] rounded-sm px-2 py-1 blur-sm'  />
          <div className='absolute inset-0 flex items-center justify-center flex-col'>
            <h1 className='text-8xl font-semibold'>Shopy SAS Welcomes You</h1>
            <h2 className='text-3xl font-semibold mt-16'>Connecting Buyers and Sellers the Right Way</h2>
            <div className='mt-11 w-[100%] flex justify-center'><a href='/user/products'><Button text={'See Product'} type={'submit'} bg={'bg-white'} color={'black'} width={"100%"}/></a></div>    
          </div>
        </div>
        <div className='mt-40 w-[100%] relative '>
          <div className='w-[50%] bg-white px-36 py-40 ml-20'>
            <h2 className='text-black text-5xl font-semibold'>About</h2>
            <p className='text-black mt-11 text-2xl w-[70%]'>As a trusted marketplace connecting buyers and sellers, we attribute our success to the strong relationships we've built within our community. We believe every user deserves a seamless and reliable experience, whether they're shopping for essentials or selling their products to a wider audience. Our commitment to quality, transparency, and innovation sets us apart. Explore our platform to discover endless possibilities, and feel free to reach out with any questions. Shopy SAS is here to make connections that matter.</p>
          </div>
          <div className='absolute inset-0 flex justify-end right-48 top-10'>
            <img src={mall} className="w-[50%] hidden lg:block mb-6"/>
          </div>
        </div>
        <div className='mt-20 flex justify-center w-[100%]'>
          <h2 className='text-white text-5xl font-semibold'>Services</h2>
        </div>
        <div className='w-[90%] flex flex-row mt-16 justify-between mx-20'>
          <div className='w-[30%]'>
              <img src={product} className="w-[100%] hidden lg:block mb-6"/>
              <h2 className='text-white text-3xl font-semibold '>See Product</h2>
              <hr  className='mt-6 mb-6 h-1'/>
              <a href='/user/products'><Button text={"entrer"} bg={'bg-white'} color={'black'} width={'30%'} /></a>
            </div>
            <div className='w-[30%]'>
              <img src={store} className="w-[100%] hidden lg:block mb-6"/>
              <h2 className='text-white text-3xl font-semibold '>See Stores</h2>
              <hr  className='mt-6 mb-6 h-1'/>
              <a href='/user/profile'><Button text={"entrer"} bg={'bg-white'} color={'black'} width={'30%'}/></a>
            </div>
            <div className='w-[30%]'>
              <img src={people} className="w-[100%] hidden lg:block mb-6"/>
              <h2 className='text-white text-3xl font-semibold '>Searche user</h2>
              <hr  className='mt-6 mb-6 h-1'/>
              <a href='/user/search'><Button text={"entrer"} bg={'bg-white'} color={'black'} width={'30%'}/></a>
            </div>
        </div>
        <div className='bg-white mt-28 px-20 w-[100%] flex flex-row'>
          <div className='py-20 w-[40%]'>
            <h2 className='text-black text-5xl font-semibold'>Contact</h2>
            <h2 className='text-black text-xl font-normal mt-8'>Shopy SAS</h2>
            <h2 className='text-black text-xl font-normal mt-2'>809 AIN ZERKA</h2>
            <h2 className='text-black text-xl font-normal mt-2'>TIZNIT,MOROCCO</h2>
          </div>
          <div className='py-20 w-[40%]'>
            
            <h2 className='text-black text-xl font-normal mt-8'>TEL : +212-688-943313</h2>
            <h2 className='text-black text-xl font-normal mt-2'>ShopySAS@gmail.com</h2>
            
          </div>
            

        
        </div>
    </div>
  )
}
