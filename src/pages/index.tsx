import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import MonitorPage from './monitor'
import TasksPage from './tasks'
import MessengerPage from './messenger'
import AdminPage from './admin'
import LoginPage from './login'

import PrivateRotes from 'pages/routes/PrivateRotes'
import PublicRotes from 'pages/routes/PublicRotes'

import AgregatMenu from 'widgets/AgregatMenu'
import DseMenu from 'widgets/DseMenu'
import ProjectMenu from 'widgets/ProjectMenu'

import DepartmentTable from 'shared/ui/components/tables/DepartmentTable'
import DseCard from 'shared/ui/components/tables/DseCard'
import ProjectTable from 'shared/ui/components/tables/ProjectTable'
import SpecTable from 'shared/ui/components/tables/SpecTable'
import UserTable from 'shared/ui/components/tables/UserTable'


const Routing = ({...props}) => {
  return (
    <Routes>
        <Route element={<PrivateRotes />}>
          <Route path='/monitor' element={<MonitorPage />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path="/messenger" element={<MessengerPage/>} />
          <Route path='/tasks/project' element={<ProjectMenu />} />
          <Route path='/tasks/project/:id' element={<ProjectTable />} />
          <Route path='/tasks/agregat/' element={<AgregatMenu/>} />
          <Route path='/tasks/agregat/:id' element={<SpecTable/>} />
          <Route path='/tasks/agregat/dse/' element={<DseMenu/>} />
          <Route path='/tasks/agregat/dse/:id' element={<DseCard/>} />
          {(props.role === 'Developer' || props.role === 'Admin') ? <Route path='/admin' element={<AdminPage />} /> : <></>}
          {(props.role === 'Developer' || props.role === 'Admin') ? <Route path='/admin/user' element={<UserTable />} /> : <></>}
          {(props.role === 'Developer' || props.role === 'Admin') ? <Route path='/admin/department' element={<DepartmentTable />} /> : <></>}
          <Route path='*' element={<Navigate to={'/monitor'} />} />
        </Route>
        <Route element={<PublicRotes />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Navigate to={'/login'} />} />
        </Route>
    </Routes>
  )
}

export default Routing