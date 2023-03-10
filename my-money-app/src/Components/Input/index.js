import React from "react"

const Input = ({type,name,onChange,className,id,placeholder, value,disabled}) => {
    return (
        <input type={type} name={name} value={value} 
            onChange={onChange} className={className} disabled={disabled}
            id={id} placeholder={placeholder}/>
    )
}
 
export default Input;