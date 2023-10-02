import Table from 'entities/Table'
import Card from 'shared/ui/Card'


const AgregatTable = (props: any) => {

  const columns = [
    { layer: 1, link: '/tasks/agregat/', addLink: 'agregatId', rowSpan: 2, label: "Обозначение", accessor: "agregatName", sortable: true, type: "text" },
    { layer: 1, rowSpan: 2, label: "Наименование", accessor: "description", sortable: true, type: "number" },
    { layer: 1, colSpan: 3, label: "Количество установочной партии", accessor: null, sortable: false },
    { layer: 2, label: "Всего сдать", accessor: "kolvoUstPart", sortable: true },
    { layer: 2, label: "Для испытаний", accessor: "kolvoIzdIsp", sortable: true },
    { layer: 2, label: "Для отгрузки", accessor: "kolvoIzdOtg", sortable: true }
  ]

  return (
      <Card header='Изделия по проекту'>
        <Table data={props.data} columns={columns} defaultSort={"agregatName"} />
      </Card>
  )

}

export default AgregatTable