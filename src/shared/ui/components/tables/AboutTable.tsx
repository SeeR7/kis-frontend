import Table from 'entities/Table'
import React from 'react'
import { useGetProjectQuery } from 'shared/api/foreignAPI'
import Card from 'shared/ui/Card'


const AboutTable = (props: any) => {
  const { data } = useGetProjectQuery({ id: props.id })
  const tableData = []
  tableData.push(data)

  const columns = [
    {label: 'Срок сдачи', accessor: 'srokDate', type: 'date'},
    {label: 'Потребитель', accessor: 'consumer', type: 'text'},
    {label: 'Назначение', accessor: 'destination', type: 'text'},
    {label: 'Статус', accessor: 'none', type: 'text', value: 'Действующий'},
  ]

  return (

    <Card header={data && data.projectType + " №" + data.projectNumber}>
      <Table data={tableData} columns={columns} numerable={false}/>
    </Card>
  )
}

export default AboutTable