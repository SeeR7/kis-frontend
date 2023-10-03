import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from 'shared/api/authAPI';
import { setUser } from 'shared/api/features/authSlice';
import { useAppDispatch } from 'shared/lib/store';
import { ReactComponent as LoginIcon } from 'shared/assets/login.svg'
import { Card, Input, Button } from 'shared';

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch();
  const [loginUser, { data, isSuccess, status, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const auth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await loginUser({ login, password })
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data))
      setLogin('')
      setPassword('')
      navigate("/monitor")
    }
  }, [navigate, dispatch, data, isSuccess, status])

  const styles = {

  }
  console.log(error)

  return (
    <div className='login_page'>
      <div>
      <Card header='Вход КИС'>
          <Input
            placeholder="Логин"
            requred
            onChange={(e: any) => setLogin(e.target.value)} />
          <Input
            placeholder="Пароль"
            type="Password"
            required
            onChange={(e: any) => setPassword(e.target.value)} />
          <Button style={styles} icon={LoginIcon} onClick={(e: any) => { auth(e) }}>Войти</Button>
        </Card>
      </div>

      <div style={{position:"absolute", marginTop:"350px"}}>
        {(status === 'rejected') && <Card header='Ошибка'>Неправильный логин или пароль</Card>}
      </div>


    </div>
  )
}

export default LoginForm