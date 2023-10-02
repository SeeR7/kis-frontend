import Table from 'entities/Table'
import { useUpdateLocalDseMutation } from 'shared/api/foreignAPI';
import Card from 'shared/ui/Card'


const DseTable = ({dse}:any) => {
    const [updateLocalDse] = useUpdateLocalDseMutation()

    const columns = [
        { layer: 1, rowSpan: 2, label: "Деталь", accessor: "_1c.dseCode", type: "text" },
        { layer: 1, rowSpan: 2, label: <>Тип<br/>заготовки</>, accessor: "rusagr.zagType", type: "text" },
        { layer: 1, rowSpan: 2, label: <>План<br/>запуска</>, accessor: "_1c.planZapuska", type: "text" },
        { layer: 1, rowSpan: 2, label: <>Требуется<br/>к дате</>, accessor: "_1c.planTrebDate", type: "date" },
        { layer: 1, rowSpan: 2, label: "Выдано", accessor: "_1c.vydano", type: "text" },
        
        { layer: 1, colSpan: 4, label: 'Запуск в механическом цехе', accessor: "none1"},
        { layer: 1, colSpan: 2, label: 'Сдано механическим цехом', accessor: "none2"},

        { layer: 2, rowSpan: 1, label: "Дата", accessor: "local.planMechDepData", type: "date" },
        { layer: 2, rowSpan: 1, label: "Количество", accessor: "local.quantityMechDep", type: "number", size: 4 },
        { layer: 2, rowSpan: 1, label: "Фактически", accessor: "_1c.quantityMechDep", type: "text" },
        { layer: 2, rowSpan: 1, label: "%", accessor: "local.mechDepСompletionPercentage", type: "number", size: 4 },
       
        { layer: 2, rowSpan: 1, label: "Дата", accessor: "local.planProdDepData", type: "date" },
        { layer: 2, rowSpan: 1, label: "Фактически", accessor: "_1c.quantityProdDep", type: "text" },

        { layer: 1, rowSpan: 2, label: 'Материал', accessor: 'rusagr.material', type: 'text'},
        { layer: 1, rowSpan: 2, label: 'Действие', accessor: 'only-edit'},
    ];

    const tableDse = []
    tableDse.push(dse)

    const states = {
        'rusagr.id': 0,
        'local.planMechDepData': "",
        'local.quantityMechDep': 0,
        'local.mechDepСompletionPercentage': 0,
        'local.planProdDepData': ""
    }

    let planMechData: string | null
    let planProdData: string | null

    const updateTest = async (data:any) => {
        if (data['local.planMechDepData'] === "") {
            planMechData = null
        }
        else {
            planMechData = data['local.planMechDepData']
        }
        if (data['local.planProdDepData'] === "") {
            planProdData = null
        }
        else {
            planProdData = data['local.planProdDepData']
        }
        let payload = {
            id: data['rusagr.id'],
            dseId: data['rusagr.id'],
            planMechDepData: planMechData,
            quantityMechDep: data['local.quantityMechDep'],
            mechDepСompletionPercentage: data['local.mechDepСompletionPercentage'],
            planProdDepData: planProdData
        }
        await updateLocalDse(payload)
    }
    console.log(dse)
    return (
        <Card header={dse && "Карточка ДСЕ: " + dse._1c.dseCode + " " + dse._1c.name}>
            <Table data={tableDse} columns={columns} states={states} handleUpdate={updateTest} />
        </Card>
    )
}

export default DseTable