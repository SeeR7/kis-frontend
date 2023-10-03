import { SearchBar } from 'shared/ui/search-bar';
import { Table } from 'entities/Table';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Card } from 'shared';
import { useGetSostavQuery } from 'shared/api/foreignAPI';




const SpecTable:React.FC = () => {
  const [search, setSearch] = useState("")
  interface IChild {
    dseCode: Text
    zagType: Text,
    depCons: Text,
    depProd: Text,
    material: Text
  }

  interface IItem {
    spec: {
      childId: number,
      child: IChild,
      parentId: number | null,
    },
    dse: {

    }
  }

  

  let { id } = useParams();
  const { data: sostav , isLoading, isError, error} = useGetSostavQuery({ id: id }, {pollingInterval: 5000})
  let sostavTree: any[] = []

  const buildTree = (items: IItem[], parentId: number | null, level: number) => {
    items.forEach((item: any) => {
      if (item.spec.parentId === parentId) {

        sostavTree.push({ ...item, level })
        level += 1;
        buildTree(sostav, item.spec.childId, level)
        level -= 1;
      }

    });
  }
  let agregatDse = ""
  let agregatName = ""

  if (sostav && id) {
    sostav.forEach((item: any) => {
      if (item.spec.childId.toString() === id) {
        agregatDse = item.spec.child.dseCode
        agregatName = item.spec.child.name
      }

    });
    buildTree(sostav, null, 0)
  }
  let counter = 0;

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
    { link: '/tasks/agregat/dse/', addLink: 'spec.childId' , label: "Деталь", accessor: "spec.child.dseCode", sortable: false},
    { label: "Наименование", accessor: "spec.child.name", sortable: false},
    { label: <>План<br/>запуска</>, accessor: "dse.planZapuska", sortable: false},
    { label: <>Цех<br />потребитель</>, accessor: "spec.child.depCons", sortable: false},
    { label: <>Цех<br />изготовитель</>, accessor: "spec.child.depProd", sortable: false},
    { label: <>Требуется<br/>к дате</>, accessor: "dse.planTrebDate", sortable: false, type: 'date'},
    { label: "Получено", accessor: "dse.quantityMechDep", sortable: false, type: '/', accFrom: 'dse.factMechDepDate'},
    { label: "Планируется", accessor: "local.quantityMechDep", sortable: false, type: '/', accFrom: 'local.planProdDepData'},
    { label: "Фактически", accessor: "local.quantityProdDep", sortable: false},
    { label: "Готовность", accessor: "tp.techLocal.length", sortable: false, type: '/', accFrom: 'tp.tech.length'},
    { label: "Материал", accessor: "spec.child.material", sortable: false},
  ]

  return (
    <div>
      <Card header={agregatDse + " " + agregatName}>
      <SearchBar search={search} searchTable={setSearch} />
        {sostavTree && <Table search={search} columns={columns} data={sostavTree.reverse()}/>}
      </Card>
    </div>
  )
}

export default SpecTable