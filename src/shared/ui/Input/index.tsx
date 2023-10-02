import React from 'react'

const Input = ({...props}) => {
  return (
    <input 
    value={props.value}
    className="input" 
    type={props.type} 
    size={props.size}
    min={0}
    max={999999}
    placeholder={props.placeholder}
    onChange={props.onChange}/>
  )
}

export default Input