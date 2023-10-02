

const IconButton = (props:any) => {
  return (
    <div className='icon-button'>
        <button onClick={props.onClick}>
            {<props.icon/>}
            {props.children}
        </button>
    </div>
  )
}

export default IconButton