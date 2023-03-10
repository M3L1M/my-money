import React from "react";

const Button = ({onClick,title,className,nome}) => {
    return(
        <button onClick={onClick} title={title} className={className}>
            {nome}
        </button>
    )
} 

export default Button;