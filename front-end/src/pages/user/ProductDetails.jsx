import { AdminSideBar } from '../../layouts/AdminSideBar'
import { UserSideBar } from '../../layouts/UserSideBar'
import { ChatBubbleOvalLeftEllipsisIcon, CheckBadgeIcon, ClipboardDocumentIcon, ClockIcon, HeartIcon, MapPinIcon, RocketLaunchIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '../../components/ui/Button'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductDetails } from '../../services/productServices'
import { ProductDataSkeleton } from '../../components/skeletons/ProductDataSkeleton'
import { Notification } from '../../components/ui/Notification'
import { PostComment } from '../../components/modals/PostComment'
import moment from 'moment'
import { deleteComment, getProductComments, postAComment } from '../../services/commentServices'
import { postNotification } from '../../services/notificationServices'
import { getProductLikes, likeAProduct } from '../../services/likeServices'
export const ProductDetails = () => {

    const [loading,setLoading] = useState(true);
    const [productDetails,setProductDetails] = useState({});
    const [openPostComment,setOpenPostComment] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const [notification,setNotification] = useState({})
    const [comment,setComment] = useState();
    const [commentLoading,setCommentLoading] = useState(false);
    const [productComments,setProductComments] = useState(false);
    const [likesCount,setLikesCount] = useState(0);


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

    const getProductLikesCount = async () =>{        
        const response = await getProductLikes(localStorage.getItem('token'),id)        
        if(response.data.likes){
            setLikesCount(response.data.likes)
        }
    }

    const likeProduct = async () =>{
        setNotification(null);
        const data = new FormData();
        data.append('productId',id);
        
        const response = await likeAProduct(localStorage.getItem('token'),data);
        
        const formData = new FormData();
        formData.append('productId',id);
        formData.append("notificationContent","Liked your product");
        formData.append("receiverId",productDetails.store.user.id);
        await postNotification(localStorage.getItem("token"),formData)

        if(response.data.success){
            setNotification({type:'success',message:response.data.message});
        }
        await getProductLikesCount();
    }

    const getComments = async () =>{
        const response = await getProductComments(localStorage.getItem('token'),id);
        
        if(response.data.comments){
            setProductComments(response.data.comments);
        }
    }


    const handleDeleteComment = async (commentId) =>{
        setNotification(null);
        try{
            const data = new FormData();
            data.append("productId",id);
            data.append("commentContent",comment);

            const response = await deleteComment(localStorage.getItem("token"),commentId);
            
            setOpenPostComment(false)
            setCommentLoading(false);
            
            if(response.status === 200){
                setNotification({type:"success",message:response.data.message})
                await getComments();
            }
        }catch(error){
            setCommentLoading(false);
            setOpenPostComment(false)
            if (error.response) {
                setNotification({
                type: "error",
                message: error.response.data.message,
                });
            } else {
                setNotification({ type: "error", message: "Try again later" });
            }
        }
    }

    const postComment = async (e) =>{
        e.preventDefault()
        setNotification(null);
        setCommentLoading(true);
        try{
            const data = new FormData();
            data.append("productId",id);
            data.append("commentContent",comment);

            const response = await postAComment(localStorage.getItem("token"),data);

            const formData = new FormData();
            formData.append("productId",id);
            formData.append("notificationContent","Commented on your product");
            formData.append("receiverId",productDetails.store.user.id);
            await postNotification(localStorage.getItem("token"),formData)
            setComment('');            
            setOpenPostComment(false)
            setCommentLoading(false);
            if(response.status === 200){
                setNotification({type:"success",message:response.data.message})
                await getComments();
            }
        }catch(error){
            setCommentLoading(false);
            setOpenPostComment(false)
            if (error.response) {
                setNotification({
                type: "error",
                message: error.response.data.message,
                });
            } else {
                setNotification({ type: "error", message: "Try again later" });
            }
        }
    }

    useEffect(() =>{
        getProductData();
        getComments();
        getProductLikesCount()
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
                    <img src={productDetails.product_image} className='w-[100%] rounded-md'/>
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
                                <HeartIcon className='w-7 h-7' onClick={likeProduct}/>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div>
                            <h1 className='text-2xl font-semibold'>{productDetails.productName} <span className='text-gray-500 font-semibold text-sm'>{productDetails.category.categoryName}</span> </h1>
                            <div className='flex gap-2 items-center'>
                                {
                                    productDetails.status === 'Accepted by Admin'?
                                    <div className='flex gap-1 items-center'>
                                        <CheckBadgeIcon className='w-5 h-5 text-green-600' strokeWidth={'2'} />
                                        <span className='text-sm text-green-600 font-semibold'>{productDetails.status}</span>
                                    </div>
                                    : <div className='flex gap-1 items-center'>
                                        <XCircleIcon className='w-5 h-5 text-red-500' strokeWidth={'2'}/>
                                        <span className='text-sm text-red-500 font-semibold'>{productDetails.status}</span>
                                    </div>
                                }
                            </div>
                            <h3 className='text-lg font-semibold text-gray-300'><span className='text-4xl'>{productDetails.price}</span> DH</h3>
                            <div className='mt-2'>
                                <span className='text-sm text-gray-300'>
                                    {productDetails.description}
                                </span>
                            </div>
                            <div className='mt-3 flex flex-col gap-1 text-gray-300'>
                                <div className='flex gap-2 items-center'>
                                    <HeartIcon className='w-5 h-5' strokeWidth={'2'}/>
                                    <span className='font-semibold'>{likesCount} Liked this product</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5' strokeWidth={'2'}/>
                                    <span className='font-semibold'>{productComments.length} Commented on this product</span>
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
                    {
                        productComments && productComments.length ?
                            productComments.map((comment) =>{
                                return <div className='mb-5'>
                                            <div className='flex justify-between items-center gap-2'>
                                                <div className='flex items-center gap-2'>
                                                    <img src={comment.commenterProfilePic} className='rounded-full w-8 h-8'/>
                                                    <span className='font-semibold cursor-pointer hover:text-sky-500 duration-200'>{comment.commenterUsername}</span>
                                                    <span className='text-gray-600 font-semibold text-sm'>{moment(comment.createdAt).fromNow()}</span>
                                                </div>


                                                <div>
                                                    <TrashIcon className='w-4 h-4 text-red-400 hover:text-red-500 cursor-pointer' onClick={() => handleDeleteComment(comment._id)} />
                                                </div>
                                            </div>
                                            <div className='pl-10'>
                                                <span className='text-sm'>{comment.commentContent}</span>
                                            </div>
                                        </div>
                            })
                        :<p className='font-semibold text-center'>No comments!, be the first one to comment On this product</p>
                    }
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
            openPostComment && <PostComment setOpenPostComment={setOpenPostComment} comment={comment} handleChange={(e) => setComment(e.target.value)} loading={commentLoading} handleSubmit={postComment}/>
        }
      </div>
    </div>
  )
}
