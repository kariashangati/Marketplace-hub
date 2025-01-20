import React, { useState } from 'react'
import { UserSideBar } from '../../layouts/UserSideBar';
import projectLogo from "../../../public/assets/projectLogo.png";
import product1 from "../../../public/assets/product1.jpg";
import product2 from "../../../public/assets/product2.jpg";
import product3 from "../../../public/assets/product3.jpg";
import bg from "../../../public/assets/bg.jpg";
import { Button } from '../../components/ui/Button';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';



export const Home = () => {
  const navigate = useNavigate()
  const [name , setName] = useState()
  const [email , setEmail] = useState()
  const [message , setMessage] = useState()
  console.log(email)
  const sendemail = ()=>{
    const subject = "Message";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  return (
   
    <div className="font-sans">
      <div className="bg-dark w-full px-10 fixed z-20 flex justify-between items-center shadow-md">
        <img src={projectLogo} alt="Logo" className="w-48 hidden lg:block mb-2"/>
        <ul className="hidden lg:flex space-x-6 text-white text-lg">
          <li><a href="#hero" className=" font-semibold cursor-pointer hover:text-blue-500">Home</a></li>
          <li><a href="#features" className=" font-semibold cursor-pointer hover:text-blue-500">Features</a></li>
          <li><a href="#products" className=" font-semibold cursor-pointer hover:text-blue-500">Products</a></li>
          <li><a href="#contact" className=" font-semibold cursor-pointer hover:text-blue-500">Contact</a></li>
        </ul>
      </div>


      <div id="hero" className="w-full h-screen relative">
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl lg:text-8xl font-bold">Shopy SAS Welcomes You</h1>
          <h2 className="text-2xl lg:text-3xl font-medium mt-6">Connecting Buyers and Sellers the Right Way</h2>
          <div className="mt-10">
            <Button type={'submet'} text={'See product'} bg={'bg-white'} color={'black'} onClick={()=>navigate('/user/products')}/>
          </div>
        </div>
      </div>
    
      <div id="features" className="py-20 px-10 bg-gray-100 text-center">
        <h2 className="text-4xl text-black font-bold mb-10 ">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold text-black mb-4">Feature 1</h3>
            <p className='text-black'>We carefully curate only the highest-quality products that are designed to meet your specific needs. Whether you're looking for the latest tech, home goods, or fashion, our marketplace offers a wide range of premium options to ensure you get the best value for your money.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold text-black mb-4">Feature 2</h3>
            <p className='text-black'>With secure and reliable transactions at the core of our marketplace, we guarantee that every purchase you make is safe. Our platform uses state-of-the-art encryption to protect your personal and financial data, giving you peace of mind with every order.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold text-black mb-4">Feature 3</h3>
            <p className='text-black'>Our dedicated customer support team is available 24/7 to ensure that you have a smooth and hassle-free shopping experience. Whether you have a question, need assistance with an order, or require product advice, we’re here to help at any time.
            </p>
          </div>
        </div>
      </div>


      <div id="products" className="py-20 px-10 bg-white text-center">
        <h2 className="text-4xl text-black font-bold mb-10">Best Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
      
          <div className="p-6 border rounded-md">
            <img 
              src={product1} 
              alt="Sunglasses" 
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
            <h3 className="text-2xl font-semibold text-black">Sunglasses</h3>
            <p className="mt-2 text-gray-600 text-xl font-semibold">$50</p>
            <p className="mt-4 text-gray-800">Stylish sunglasses designed to protect your eyes while keeping you looking fashionable. Perfect for any sunny day.</p>
          </div>

        
          <div className="p-6 border rounded-md">
            <img 
              src={product2} 
              alt="T-shirt" 
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
            <h3 className="text-2xl font-semibold text-black">T-shirt</h3>
            <p className="mt-2 text-gray-600 text-xl font-semibold">$75</p>
            <p className="mt-4 text-gray-800">A comfortable, high-quality cotton T-shirt that's perfect for casual wear. Available in a variety of sizes and colors to suit your style.</p>
          </div>

      
          <div className="p-6 border rounded-md">
            <img 
              src={product3}  
              alt="iPhone 16" 
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
            <h3 className="text-2xl font-semibold text-black">iPhone 16</h3>
            <p className="mt-2 text-gray-600 text-xl font-semibold">$1000</p>
            <p className="mt-4 text-gray-800">The latest iPhone 16, offering cutting-edge technology, sleek design, and top-of-the-line performance for all your daily needs and more.</p>
          </div>
        </div>
      </div>


      <div id="contact" className="py-20 px-10 bg-white text-center">
        <h2 className="text-4xl text-black font-bold mb-10">Get in Touch</h2>
        <form className="max-w-lg mx-auto">
          <input type="text" placeholder="Name" required onChange={(e)=>setName(e.target.value)} className="w-full p-3 border rounded-md mb-4 text-black"/>
          <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} className="w-full p-3 border rounded-md mb-4 text-black"/>
          <textarea placeholder="Message" required onChange={(e)=>setMessage(e.target.value)} className="w-full p-3 border rounded-md mb-4 text-black" rows="4"></textarea>
          <button type="submit" onClick={sendemail} className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800">Send Message</button>
        </form>
      </div>

      
      <footer className="bg-dark text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Shopy SAS. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="#terms-of-service" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
</div>


  )
}
