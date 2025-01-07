

export const Input = ({type,name,placholder,value,width,onChange,required=true,maxLength,border,text}) => {
  return (
    <input type={type}
    name={name}
    placeholder={placholder}
    value={value}
    onChange={onChange}
    required={required}
    maxLength={maxLength}
    className={`border ${border ? `border-${border}` : 'border-white'} ${text ? `text-${text}` : 'text-white'} px-3 py-1 text-md bg-inherit rounded-sm outline-none ${width ? `w-[${width}]` : "w-[100%]"}`} />
  )
}
