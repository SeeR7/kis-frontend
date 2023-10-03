import { Table } from "entities/Table"
import { Card } from "shared"



const AboutTable = (props: any) => {

  const tableData = []
  tableData.push(props.data)

  const columns = [
    { label: 'Срок сдачи', accessor: 'srokDate', type: 'date' },
    { label: 'Потребитель', accessor: 'consumer', type: 'text' },
    { label: 'Назначение', accessor: 'destination', type: 'text' },
    { label: 'Статус', accessor: 'none', type: 'text', value: 'Действующий' },
  ]

  return (
    <Card header={props.data && props.data.projectType + " №" + props.data.projectNumber}>
      <Table data={tableData} columns={columns} numerable={false} />
    </Card>
  )
}

export default AboutTable