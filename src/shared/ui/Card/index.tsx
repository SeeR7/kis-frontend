

export const Card = (props: any) => {
  return (
    <div className='card'>
      <h2>{props.header}</h2>
      <div className='card-content'>
        {props.children}
      </div>
    </div>
  )
}