

export const Input = ({type,name,placholder,value,width,onChange,required=true,maxLength}) => {
  return (
    <input type={type}
    name={name}
    placeholder={placholder}
    value={value}
    onChange={onChange}
    required={required}
    maxLength={maxLength}
    className={`border border-white px-3 py-1 text-md ${width ? `w-[${width}]` : "w-[100%]"}`} />
  )
}
