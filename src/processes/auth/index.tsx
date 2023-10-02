import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Routing from 'pages'
import { useLogoutUserMutation } from 'widgets/LoginForm/api/authAPI'
import { checkIsAuth, checkRole, logout } from 'widgets/LoginForm/api/features/authSlice'
import { useAppSelector, useAppDispatch } from 'shared/lib/store'
import Header from 'widgets/Header'
import Sidebar from 'widgets/Sidebar'
import { NavItemsPrivate } from './interface/nav-items/NavItemsPrivate'
import { NavItemsPublic } from './interface/nav-items/NavItemsPublic'


const AuthProcess:React.FC = () => {
  const role = useAppSelector(checkRole)
  const auth = useAppSelector(checkIsAuth);

  const navigate = useNavigate()
  
  const [logoutUser, { isSuccess }] = useLogoutUserMutation()
  const dispatch = useAppDispatch()
  let NavItems = [];
  (role === 'Developer' || role === 'Admin') ? NavItems = [...NavItemsPrivate] : NavItems = [...NavItemsPublic]
  const logoutHandler = async () => {
    dispatch(logout())
    await logoutUser("")
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/login")
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (auth) {
    return (
      <div className='app'>
        <Header />
        <div className='container'>
          <Sidebar elems={NavItems} logoutHandler={logoutHandler}/>
          <div className='content'>
            <Routing role={role} />
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <Routing role={role} />
    )
  }

}

export default AuthProcess