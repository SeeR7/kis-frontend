import Table from 'entities/Table'
import React from 'react'
import { useGetProjectAgregatsQuery } from 'shared/api/foreignAPI'
import Card from 'shared/ui/Card'



const AgregatTable= (props:any) => {
  const {data, isLoading, isError, error} = useGetProjectAgregatsQuery({id:props.id},{ pollingInterval: 5000 })


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

  const columns = [
    { layer: 1, link: '/tasks/agregat/', addLink: 'agregatId' ,rowSpan: 2, label: "Обозначение", accessor: "agregatName", sortable: true, type: "text" },
    { layer: 1, rowSpan: 2, label: "Наименование", accessor: "description", sortable: true, type: "number"},
    { layer: 1, colSpan: 3, label: "Количество установочной партии", accessor: null, sortable: false },
    { layer: 2, label: "Всего сдать", accessor: "kolvoUstPart", sortable: true },
    { layer: 2, label: "Для испытаний", accessor: "kolvoIzdIsp", sortable: true },
    { layer: 2, label: "Для отгрузки", accessor: "kolvoIzdOtg", sortable: true }
  ]

  return (
    <div>
    <Card header='Изделия по проекту'>
      <Table data={data} columns={columns}  defaultSort={"agregatName"} />
    </Card>
  </div>
  )

}

export default AgregatTable