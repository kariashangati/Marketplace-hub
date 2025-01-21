import { useState } from 'react'
import { Label } from '../../components/ui/Label'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Link, useLocation, useParams } from 'react-router-dom'
import { resetPassword } from '../../services/authServices'
import { Notification } from '../../components/ui/Notification'

export const ResetPassword = () => {

  const {token} = useParams();
  const location = useLocation();
  const emailSearch = new URLSearchParams(location.search);
  const email = emailSearch.get("email");

  const [formData,setFormData] = useState({
    token:token,
    email:email,
    password : '',
    password_confirmation :''
  })
  const [loading,setLoading] = useState(false);
  const [notification,setNotification] = useState({});

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prevState) =>({
      ...prevState,
      [name] : value
    }))
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setNotification(null);
    if(formData.password !== formData.password_confirmation){
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword(formData);
      setLoading(false);
      if(response.status === 200 && response.data.message){
        setNotification({type:"success",message:response.data.message});
      }
    } catch (error) {
      setLoading(false);
      if(error.response){
        setNotification({type:"error",message:error.response.data.message})
      }else{
        setNotification({type:"error",message:"Try again later"})
      }
    }
  }
  return (
    <div className="bg-white">
      <div className='bg-white w-[90%] md:w-[45%] mx-auto mt-32 px-6 py-8 shadow-2xl border rounded-md border-gray-300'>
        <h1 className='text-4xl '>Reset your password</h1>
        <h4 className=''>Complete this credentials to reset your password</h4>
        <Link to={'/login'} className='text-blue-500 underline'>Back to login</Link>
        <form onSubmit={handleSubmit}>
          <div className='mt-8'>
            <div>
              <Label text={'Password'} />
              <Input type={'password'} name={'password'} placholder={'●●●●●●●●'}  value={formData.password} onChange={handleChange}/>
            </div>
            <div className='mt-4'>
              <Label text={'Retype Password'} />
              <Input type={'password'} name={'password_confirmation'} placholder={'●●●●●●●●'} value={formData.password_confirmation} onChange={handleChange}/>
            </div>
            <div className='mt-10'>
              <Button type={'submit'} text={'Reset password'} loading={loading}/>
            </div>
            {
              notification && <Notification type={notification.type} message={notification.message} />
            }
          </div>
        </form>
      </div>
    </div>
  )
}
