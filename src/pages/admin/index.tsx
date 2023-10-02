import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'shared/ui/Card'

const AdminPage: React.FC = () => {
  return (
    <div>
      <Card header='Техническая поддержка'>
        <Link to='/admin/user'>Пользователи</Link><br />
      </Card>
      <Card header='Локальные данные'>
        <Link to='/admin/department'>Подразделения</Link>
      </Card>
    </div>
  )
}

export default AdminPage