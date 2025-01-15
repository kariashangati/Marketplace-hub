import { AdminSideBar } from '../../layouts/AdminSideBar'
import { UserSideBar } from '../../layouts/UserSideBar'
import testImage from '../../../public/assets/storeLogo.png'
import userImage from '../../../public/assets/userDefaultImage.jpg'
import { ChatBubbleOvalLeftEllipsisIcon, ClipboardDocumentIcon, ClockIcon, HeartIcon, MapPinIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { Button } from '../../components/ui/Button'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductDetails } from '../../services/productServices'
import { ProductDataSkeleton } from '../../components/skeletons/ProductDataSkeleton'
import { Notification } from '../../components/ui/Notification'
import { PostComment } from '../../components/modals/PostComment'
import moment from 'moment'

export const ProductDetails = () => {

    const [loading,setLoading] = useState(true);
    const [productDetails,setProductDetails] = useState({});
    const [openPostComment,setOpenPostComment] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const [notification,setNotification] = useState({})

    const copyUrl = () =>{
        setNotification(null)
        const url = window.location.href;
        navigator.clipboard.writeText(url)
        .then(() =>{    
            setNotification({type:"success",message:"URL copied to keyboard"})
        })
        .catch(() =>{
            setNotification({type:"error",message:"Can't copy the URL"})
        })
    }

    const getProductData = async () =>{
        setLoading(true);
        try{
            const response = await getProductDetails(localStorage.getItem('token'),id);
            setLoading(false);
            if(response.data.product){
                setProductDetails(response.data.product)
            }else{
                navigate(-1)
            }
        }catch(error){
            navigate(-1);
        }
    }

    useEffect(() =>{
        getProductData();
    },[])
  return (
    <div>
      <div>
        {localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "super admin" ? (
          <AdminSideBar />
        ) : (
          <UserSideBar />
        )}
      </div>
      <div className="lg:ml-[21%] px-2 mt-4">
        {
            !loading ? <div className='bg-dark px-3 py-2'>
            <div className='w-[100%] flex md:flex-row flex-col justify-between'>
                <div className='md:w-[40%]'>
                    <img src={testImage} className='w-[100%] rounded-md'/>
                </div> 
                <div className='md:w-[58%]'>
                    <div className='flex justify-between items-center mt-2 md:mt-0'>
                        <div className='flex gap-2 items-center'>
                            <div>
                                <img src={productDetails.store.user.profile_picture} className='w-10 h-10 rounded-full' />
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-semibold hover:text-blue-500 cursor-pointer duration-200'><Link to={`/user/userData/${productDetails.store.user.id}`}>{productDetails.store.user.fullName}</Link></span>
                                <span className='text-sm font-semibold text-gray-600'>Posted on <span className='text-blue-500 cursor-pointer'><Link to={`/store/storeData/${productDetails.store.id}`}>{productDetails.store.storeName}</Link></span> store</span>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='bg-gray-900 rounded-md p-1 cursor-pointer hover:bg-gray-700 duration-200'>
                                <ClipboardDocumentIcon className='w-7 h-7' onClick={copyUrl}/>
                            </div>
                            <div className='bg-gray-900 rounded-md p-1 cursor-pointer hover:bg-gray-700 duration-200'>
                                <HeartIcon className='w-7 h-7'/>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div>
                            <h1 className='text-2xl font-semibold'>{productDetails.productName} <span className='text-gray-500 font-semibold text-sm'>{productDetails.category.categoryName}</span> </h1>
                            
                            <h3 className='text-lg font-semibold text-gray-300'><span className='text-4xl'>{productDetails.price}</span> DH</h3>
                            <div className='mt-2'>
                                <span className='text-sm text-gray-300'>
                                    {productDetails.description}
                                </span>
                            </div>
                            <div className='mt-3 flex flex-col gap-1 text-gray-300'>
                                <div className='flex gap-2 items-center'>
                                    <HeartIcon className='w-5 h-5' strokeWidth={'2'}/>
                                    <span className='font-semibold'>{productDetails.likes} Liked this product</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5' strokeWidth={'2'}/>
                                    <span className='font-semibold'>22 Commented on this product</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <MapPinIcon className='w-5 h-5' strokeWidth={'2'}/>
                                    <span className='font-semibold'>{productDetails.location}</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <RocketLaunchIcon className='w-5 h-5' strokeWidth={'2'}/>
                                    <span className='font-semibold'>{productDetails.delivry}</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <ClockIcon className='w-5 h-5' strokeWidth={'2'}/>
                                    <span className='font-semibold'>Posted {moment(productDetails.created_at).fromNow()}</span>
                                </div>
                            </div>
                            <div className='mt-2 flex flex-col gap-2'>
                                <Button text={'Is that item available?'} />
                                <Button text={'Comment on this product'} bg={'bg-blue-500'} onClick={() => setOpenPostComment(true)}/>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Reviews</h2>    
                <div className='flex flex-col mt-3'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <img src={userImage} className='rounded-full w-8 h-8'/>
                            <span className='font-semibold'>Soufian boukir</span>
                            <span className='text-gray-600 font-semibold text-sm'>a month ago</span>
                        </div>
                        <div className='pl-10'>
                            <span className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ut sint dolore voluptate accusantium facilis ipsa quasi obcaecati eveniet maxime sit officiis, enim quidem quis nihil perferendis quibusdam deleniti eius.</span>
                        </div>
                    </div>
                </div>
            </div>  
        </div>:null
        }
        {
            loading && <ProductDataSkeleton /> 
        }
        {
            notification && <Notification type={notification.type} message={notification.message} />
        }
        {
            openPostComment && <PostComment setOpenPostComment={setOpenPostComment} />
        }
      </div>
    </div>
  )
}
