import React, { useState } from 'react'
import { useGetDepartmentsQuery } from 'shared/api/departmentAPI'
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, useCreateUserMutation, userAPI } from 'shared/api/userAPI'
import Card from 'shared/ui/Card'
import Table from 'entities/Table'
import SearchBar from 'entities/Table/SearchBar'
import Dialog from 'entities/Dialog'
import Button from 'shared/ui/Button'


const UserTable: React.FC = () => {
  const { data: sortedUser, isLoading, isError, error } = useGetUsersQuery({},{ pollingInterval: 5000 })
  const { data: sortedDep } = useGetDepartmentsQuery({},{ pollingInterval: 5000 })
  const [search, setSearch] = useState("")

  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return (
      <Card><p>Загрузка...</p></Card>
    )
  }

  if (isError) {
    return (
      <Card><p>Ошибка</p><br />{error}</Card>
    )
  }

  const options = [
    { value: true, label: 'Активный' },
    { value: false, label: 'Не активный' },
  ]
  const depOption = [{}]
  let counter = 0
  sortedDep && sortedDep.map((item: any) => {
    depOption[counter] = { value: item.id, label: item.number }
    counter++
  })

  const columns = [
    { label: "Фамилия", accessor: "lastName", sortable: true, type: "text" },
    { label: "Имя", accessor: "firstName", sortable: true, type: "text" },
    { label: "Отчество", accessor: "middleName", sortable: true, type: "text" },
    { label: "Цех", accessor: "department.id", sortable: true, selectData: depOption, size: 4 },
    { label: "Логин", accessor: "user.login", sortable: true, type: "text" },
    { label: "Пароль", accessor: "user.password", sortable: true, type: "text" },
    { label: "Доступ", accessor: "user.accessGroup", sortable: true, type: "text" },
    { label: <>Дата<br/>рождения</>, accessor: "birthDate", sortable: true, type: "date" },
    { label: <>Дата<br/>устройства</>, accessor: "joinDate", sortable: true, type: "date" },
    { label: "Статус", accessor: "isActive", sortable: true, selectData: options},
    { label: "Действие", accessor: "full-action", sortable: false },
  ];

  const states = {
    id:0,
    'user.id': 0,
    'user.login': "",
    'user.password': "",
    'user.accessGroup': "",
    'department.number':0,
    'department.id':0,
    departmentId: 0,
    userId:0,
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    photoUrl: null,
    joinDate: "",
    leftDate: null,
    isActive: true
  }

  const handleDelete = async (data: any) => {
    deleteUser({ id: data.id });
  }

  const handleUpdate = async (data:any) => {
    let boolValue = (data.isActive === 'true' || data.isActive === true)
    const payloadData = {
      id:data.id,
      department: null,
      user: {
        id: data['user.id'],
        login: data['user.login'],
        password: data['user.password'],
        accessGroup: data['user.accessGroup'],
        refreshToken: null,
        refreshTokenExpiryTime: null
      },
      departmentId: data['department.id'],
      userId: data.userId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      photoUrl: null,
      joinDate: data.joinDate,
      leftDate: null,
      isActive: boolValue
    }
    await updateUser(payloadData)
  }

  function getDepId(obj:any, value:number) {
    let returnValue = undefined
    obj.map((item:any) => {
      if (item.label == value){
        returnValue = item.value
      }
    })
    return returnValue
  }

  const addTest = async (data: any, setError: any, closeModal: any) => {
    if (data.firstName === "" || data === null || data.lastName === "") {
      setError(<div style={{marginTop:'20px'}}>ОШИБКА:<br/>Правильно заполните поля</div>)
      return 0;
    }
    else {
      setError("")
      closeModal(false)
      let boolValue = (data.isActive === 'true' || data.isActive === true)
      const payloadData = {
        id:0,
        department: null,
        user: {
          id: 0,
          login: data['user.login'],
          password: data['user.password'],
          accessGroup: data['user.accessGroup'],
          refreshToken: null,
          refreshTokenExpiryTime: null
        },
        departmentId: data['department.id'],
        userId: 0,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        photoUrl: null,
        joinDate: data.joinDate,
        leftDate: null,
        isActive: boolValue
      }
      await createUser(payloadData)
      return 1;
    }

  }
  return (
    <div>
      <Card header='Пользователи'>
        <Dialog label={"Добавить"} title={<>Добавить<br/>пользователя</>} handleAction={addTest} states={states} columns={columns} Child={Button} />
        <SearchBar search={search} searchTable={setSearch} />
        <Table search={search} data={sortedUser} columns={columns} states={states} handleUpdate={handleUpdate} handleDelete={handleDelete} defaultSort={"lastName"} />
      </Card>
    </div>
  )
}

export default UserTable