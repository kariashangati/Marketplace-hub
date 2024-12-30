import React, { useState } from 'react'
import { Label } from '../../components/ui/Label'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'

export const ResetPassword = () => {

  const [formData,setFormData] = useState({
    password : '',
    r_password :''
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
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <div className="bg-black">
      <div className='bg-dark w-[90%] md:w-[45%] mx-auto mt-32 px-6 py-8'>
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
              <Input type={'password'} name={'r_password'} placholder={'●●●●●●●●'} value={formData.r_password} onChange={handleChange}/>
            </div>
            <div className='mt-10'>
              <Button type={'submit'} text={'Reset password'} loading={loading}/>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  )
}
