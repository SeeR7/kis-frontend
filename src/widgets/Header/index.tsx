import React from 'react'
import { useAppSelector } from 'shared/lib/store'

const Header:React.FC = () => {
  const user = useAppSelector((state) => state.authState)
  return (
    <header className='header'>
      <span style={{float:"left", marginLeft:"30px", fontWeight:"bold"}}>КИС</span>
      <span style={{float:"right", marginRight:"30px"}}>{user.fio}, {user.dep}</span>
    </header>
  )
}

export default Header