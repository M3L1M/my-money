import React from "react";

const ButtonIcon = ({onClick,title,className,classNameIcon}) => {
    return(
        <button onClick={onClick} title={title} className={className}>
            <i className={classNameIcon}></i>
        </button>
    )
} 

export default ButtonIcon;