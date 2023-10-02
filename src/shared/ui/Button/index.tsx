import React from 'react';


const Button = (props: any) => {
  return (
    <button
      style={props.style}
      className='button'
      onClick={props.onClick}>
      <div style={{"display":"flex"}}>
      {props.icon && <div className='icon'>{<props.icon/>}</div>}
      <div className='text'>{props.children}</div>
      </div>
    </button>
  )
}

export default Button