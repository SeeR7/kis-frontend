import { useState } from 'react'
import { useUpdateLocalTechMutation } from 'shared/api/foreignAPI';
import { useAppSelector } from 'shared/lib/store';
import { IEmployee } from 'shared/types/IEmployee';
import { checkRole, checkFio, checkDep } from 'shared/api/features/authSlice';
import { ReactComponent as SaveIcon } from 'shared/assets/done.svg'
import { ReactComponent as EditIcon } from 'shared/assets/edit.svg'
import { ReactComponent as CancelIcon } from 'shared/assets/cancel.svg'
import { IconButton } from 'shared/ui/icon-button';
import { Table } from 'entities/Table';
import { Card } from 'shared';

const TechnologyTable = ({ dse, userArray }: any) => {

    const fio = useAppSelector(checkFio)
    const role = useAppSelector(checkRole)
    const dep = useAppSelector(checkDep)
    const [user, setUser] = useState(fio)
    const [{ depData, toggleDep }, setToggleDep] = useState({ depData: 0, toggleDep: true })

    const [updateLocalTech] = useUpdateLocalTechMutation()

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

    const techColumns = [
        { layer: 1, rowSpan: 2, label: <>Цех<br />изготовитель</>, accessor: 'techRusagr.depProd' },
        { layer: 1, rowSpan: 2, label: <>Цех<br />потребитель</>, accessor: 'techRusagr.depCons' },
        { layer: 1, colSpan: 3, label: "Технологический процесс", accessor: "none" },
        { layer: 2, label: "ФИО", accessor: 'techLocal.name', type: 'text' },
        { layer: 2, label: "%", accessor: 'techLocal.techCompletionPercentage', type: 'number' },
        { layer: 2, label: "Дата", accessor: 'techLocal.techDate', type: 'date' },
        { layer: 1, rowSpan: 2, label: "Комментарий", accessor: "techLocal.description" },
        { layer: 1, rowSpan: 2, label: 'Действие', accessor: 'only-edit' },
    ]

    const techStates = {
        id: 'techRusagr.id',
        'techRusagr.id': 0,
        'techRusagr.name': '',


    }


    const updateTestTech = async (data: any) => {
        console.log(data)
    }

    return (
        <div>

            {false && <Card header='Технология'>
                <Table states={techStates} columns={techColumns} data={[...dse.tech].reverse()} handleUpdate={updateTestTech} />
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
                                {<th rowSpan={2}>Действие</th>}
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

export default TechnologyTable