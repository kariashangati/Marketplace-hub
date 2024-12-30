import React, { useState } from 'react'
import { Notification } from '../../components/ui/Notification'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '../../components/ui/Label'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export const Login = () => {
  const [formData,setFormData] = useState({
    email : '' ,
    password : ''
  })
  const [loading,setLoading] = useState(false);
  const [notification,setNotification] = useState({});
  const navigate = useNavigate()

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prevState) =>({
      ...prevState,
      [name] : value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  }


  return (
    <div className='bg-black'>
      <div className='bg-dark w-[90%] md:w-[45%] mx-auto mt-32 px-6 py-8'>
        <h1 className='text-4xl mb-2'>Sign in</h1>
        <h4 className=''>D'ont have an account ?<Link to={'/register'} className='text-blue-500 underline'> Sign up</Link></h4>

        <form onSubmit={handleSubmit}>
          <div className='mt-8'>
            <div>
              <Label text={'Email'} />
              <Input type={'email'} name={'email'} placholder={'ex:john00.0@exemple.com'} value={formData.email} onChange={handleChange}/>
            </div>
            <div className='mt-4'>
              <Label text={'Password'} />
              <Input type={'password'} name={'password'} placholder={'●●●●●●●●'} value={formData.password} onChange={handleChange}/>
              <Link className='float-end text-blue-500 underline' to={'/forgotPassword'}>Forgot Password?</Link>
            </div>
            <div className='mt-14'>
              <Button type={'submit'} text={'Sign in'} loading={loading}/>
            </div>
            
          </div>
        </form>
      </div>
    </div>
    
  )
}
