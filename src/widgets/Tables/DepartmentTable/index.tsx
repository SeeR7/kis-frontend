import React, { useState } from 'react'
import { useGetDepartmentsQuery, useDeleteDepartmentMutation, useUpdateDepartmentMutation, useCreateDepartmentMutation } from 'shared/api/departmentAPI'
import {Dialog} from 'shared/ui/Dialog'
import {Card} from 'shared'
import {Table} from 'entities/Table'
import {SearchBar} from 'shared/ui/search-bar'
import {Button} from 'shared/'


const DepartmentTable: React.FC = () => {
  const { data: sortedDep, isLoading, isError, error } = useGetDepartmentsQuery({},{ pollingInterval: 5000 })
  const [search, setSearch] = useState("")
  
  const [deleteDepartment] = useDeleteDepartmentMutation()
  const [updateDepartment] = useUpdateDepartmentMutation()
  const [createDepartment] = useCreateDepartmentMutation()

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
    { value: 'Отдел', label: 'Отдел' },
    { value: 'Цех', label: 'Цех' },
    { value: 'Склад', label: 'Склад' },
  ]

  const columns = [
    { label: "Название", accessor: "name", sortable: true, type: "text" },
    { label: "Номер", accessor: "number", sortable: true, type: "number", size: 4 },
    { label: <>Тип<br/>подразделения</>, accessor: "type", sortable: true, selectData: options },
    { label: "Действие", accessor: "full-action", sortable: false },
  ];

  const states = {
    id: -1,
    name: "",
    number: 0,
    type: ""
  }

  const payload = {
    name: "",
    number: 0,
    type: "Отдел"
  }

  const updateTest = async (data: any) => {
    await updateDepartment(data)
  }

  const deleteTest = async (data: any) => {
    await deleteDepartment({ id: data.id })
  }

  const addTest = async (data: any, setError: any, closeModal: any) => {
    if (data.name === "" || data.number === null || data.type === "") {
      setError(<div style={{marginTop:'20px'}}>ОШИБКА:<br/>Правильно заполните поля</div>)
      return 0;
    }
    else {
      setError("")
      closeModal(false)
      await createDepartment(data)
      return 1;
    }

  }

  return (
    <div>
      <Card header='Подразделения'>
        <Dialog label={"Добавить"} title={<>Добавить<br/>подразделение</>} handleAction={addTest} states={payload} columns={columns} Child={Button} />
        <SearchBar search={search} searchTable={setSearch} />
        <Table search={search} data={sortedDep} columns={columns} states={states} handleUpdate={updateTest} handleDelete={deleteTest} defaultSort={"number"} />
      </Card>
    </div>
  )
}

export default DepartmentTable