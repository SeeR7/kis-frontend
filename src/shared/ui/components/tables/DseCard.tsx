import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { checkRole, checkFio, checkDep } from 'widgets/LoginForm/api/features/authSlice';
import { useUpdateLocalDseMutation, useUpdateLocalTechMutation, useGetDseCardQuery } from 'shared/api/foreignAPI';
import { useGetUsersQuery } from 'shared/api/userAPI';
import { useAppSelector } from 'shared/lib/store';
import { IEmployee } from 'shared/types/IEmployee';
import Card from 'shared/ui/Card';
import { ReactComponent as SaveIcon } from 'shared/assets/done.svg'
import { ReactComponent as EditIcon } from 'shared/assets/edit.svg'
import { ReactComponent as CancelIcon } from 'shared/assets/cancel.svg'
import IconButton from 'entities/IconButton';
import Table from 'entities/Table';

const DseCard: React.FC = () => {
    let { id } = useParams();
    const role = useAppSelector(checkRole)
    const fio = useAppSelector(checkFio)
    const dep = useAppSelector(checkDep)
    const [user, setUser] = useState(fio)
    const [{ depData, toggleDep }, setToggleDep] = useState({ depData: 0, toggleDep: true })
    const { data: userArray, isLoading: isLoadingUser } = useGetUsersQuery('')
    const [updateLocalDse] = useUpdateLocalDseMutation()
    const [updateLocalTech] = useUpdateLocalTechMutation()

    const { data: dse, isLoading: isLoadingDse } = useGetDseCardQuery({ id: id }, { pollingInterval: 5000 })
    //const { data: dse, isLoading: isLoadingDse } = useGetDseCardQuery({ id: id })

    const [completionPercentageInput, setCompletionPercentageInput] = useState(0)
    const [techDateInput, setTechDateInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')

    let counter = 0

    
    let techDate: string | null
    const handleUpdateTech = async (depRouteId: any, dseId: any) => {
        if (techDateInput === "") {
            techDate = null
        }
        else {
            techDate = techDateInput
        }

        let data = {
            id: depRouteId,
            dseId: dseId,
            depRouteId: depRouteId,
            techDate: techDate,
            TechCompletionPercentage: completionPercentageInput,
            name: user,
            description: descriptionInput
        }
        await updateLocalTech(data)
        setToggleDep({ depData: 0, toggleDep: true })

    }

    if (isLoadingDse || isLoadingUser) {
        return (
            <div>Загрузка...</div>
        )
    }

    
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

    const techColumns = [
        {layer: 1, rowSpan: 2, label: <>Цех<br/>изготовитель</>, accessor: 'techRusagr.depProd'},
        {layer: 1, rowSpan: 2, label: <>Цех<br/>потребитель</>, accessor: 'techRusagr.depCons'},
        {layer: 1, colSpan: 3, label: "Технологический процесс", accessor: "none"},
        {layer: 2, label: "ФИО", accessor: 'techLocal.name', type: 'text'},
        {layer: 2, label: "%", accessor: 'techLocal.techCompletionPercentage', type: 'number'},
        {layer: 2, label: "Дата", accessor: 'techLocal.techDate', type:'date'},
        {layer: 1, rowSpan: 2, label: "Комментарий", accessor: "techLocal.description"},
        {layer: 1, rowSpan: 2, label: 'Действие', accessor: 'only-edit'},
    ]

    

    const techStates = {
        id: 'techRusagr.id',
        'techRusagr.id':0,
        'techRusagr.name':'',
        

    }


    const updateTestTech = async (data:any) => {
        console.log(data)
    }

    return (
        <div>
            <Card header={dse && "Карточка ДСЕ: " + dse._1c.dseCode + " " + dse._1c.name}>
                <Table data={tableDse} columns={columns} states={states} handleUpdate={updateTest}/>
            </Card>
            {false && <Card header='Технология'>
                <Table states={techStates} columns={techColumns} data={[...dse.tech].reverse()} handleUpdate={updateTestTech}/>
            </Card>}
            
            <Card header='Технология'>
                <div className='table-wrapper'>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th rowSpan={2}>№</th>
                                <th rowSpan={2}>Цех<br />изготовитель</th>
                                <th rowSpan={2}>Цех<br />потребитель</th>
                                <th colSpan={3}>Технологический процесс</th>
                                <th rowSpan={2}>Комментарий</th>
                                <th rowSpan={2}>Действие</th>
                            </tr>
                            <tr>
                                <th>ФИО</th>
                                <th>%</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dse && dse.tech && dse.tech.map((item: any) => (
                                <tr key={item.techRusagr.id}>
                                    {toggleDep || (item.techRusagr.id !== depData) ?
                                        <>
                                            <td>{counter += 1}</td>
                                            <td>{item.techRusagr.depProd}</td>
                                            <td>{item.techRusagr.depCons}</td>
                                            <td>{item.techLocal && item.techLocal.name}</td>
                                            <td>{item.techLocal && item.techLocal.techCompletionPercentage}</td>
                                            <td>{item.techLocal && item.techLocal.techDate && new Date(item.techLocal.techDate).toLocaleDateString("ru")}</td>
                                            <td>{item.techLocal && item.techLocal.description}</td>
                                            <td>
                                                {(role === "Developer" || dep === '45' || dep === item.techRusagr.depProd) && <IconButton icon={EditIcon} onClick={() => {
                                                    setToggleDep({ depData: item.techRusagr.id, toggleDep: false });
                                                    setUser(fio);
                                                    setCompletionPercentageInput(0);
                                                    setTechDateInput('');
                                                    setDescriptionInput('');
                                                    item.techLocal && setUser(item.techLocal.name)
                                                    item.techLocal && setCompletionPercentageInput(item.techLocal.techCompletionPercentage)
                                                    item.techLocal && item.techLocal.techDate && setTechDateInput(item.techLocal.techDate.toString().substring(0, 10))
                                                    item.techLocal && setDescriptionInput(item.techLocal.description)
                                                }} />}
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td>{counter += 1}</td>
                                            <td>{item.techRusagr.depProd}</td>
                                            <td>{item.techRusagr.depCons}</td>
                                            <td>
                                                <select name='depUpd' id="typeUpd" onChange={(e) => setUser((e.target.value))}>
                                                    <option disabled selected>{item.techLocal && item.techLocal.name ? item.techLocal.name : user}</option>
                                                    <option value={fio ? fio : ""}>{fio}</option>
                                                    {userArray && userArray.map((user: IEmployee) => (
                                                        user.department.number.toString() === item.techRusagr.depProd
                                                        && (user.user.accessGroup === "Technolog" || (user.user.accessGroup === "Engineer" && user.department.number === 5))
                                                        && <option key={user.id} value={user.lastName + " " + user.firstName.charAt(0) + "." + user.middleName.charAt(0) + "."}>{user.lastName + " " + user.firstName.charAt(0) + "." + user.middleName.charAt(0) + "."}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td><input size={4} type="number" step={10} min={0} max={100} id='numberUpd' defaultValue={completionPercentageInput} onChange={(e) => setCompletionPercentageInput(parseInt(e.target.value))}></input></td>
                                            <td><input type="date" value={techDateInput.toString().substring(0, 10)} onChange={(e) => setTechDateInput(e.target.value.toString().substring(0, 10))}></input></td>
                                            <td><input size={10} type="text" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}></input></td>
                                            <td>
                                                <IconButton icon={SaveIcon} onClick={() => {
                                                    handleUpdateTech(item.techRusagr.id, item.techRusagr.dse.id);
                                                }} />
                                                <IconButton icon={CancelIcon} onClick={() => {
                                                    setToggleDep({ depData: 0, toggleDep: true });
                                                    setUser('');
                                                    setCompletionPercentageInput(0);
                                                    setTechDateInput('');
                                                    setDescriptionInput('');
                                                }} />
                                            </td>
                                        </>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default DseCard