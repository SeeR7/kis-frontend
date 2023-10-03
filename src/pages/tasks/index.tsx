import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'shared'


const TasksPage: React.FC = () => {
  return (
    <Card header='Состояние технологических процессов'>
      <Link to='/tasks/project'>Проекты</Link>
      <Link to='/tasks/agregat'>Детализация по проектам</Link>
      <Link to='/tasks/agregat/dse'>Карточка ДСЕ</Link>
    </Card>
  )
}

export default TasksPage