import React from 'react'
import { ReactComponent as SaveIcon } from 'shared/assets/done.svg'
import { ReactComponent as CancelIcon } from 'shared/assets/cancel.svg'
import IconButton from 'entities/IconButton'
import Input from 'shared/ui/Input'
import Select from 'shared/ui/Select'
import { getDeepValue } from '../lib/getDeepValue'

const EditCell = ({ numerable, data, columns, count, setToggle, setState, deepState, state, states, handleUpdate }: any) => {
    return (
        <tr key={data.id}>
            {numerable && <td key={"id"}>{count}</td>}
            {columns.map(({ accessor, selectData, type, size }: any) => {
                let tData = state[accessor]

                if (accessor.includes("none")) {
                    return (null)
                }

                if (accessor === "full-action" || accessor === "only-edit") {

                    return (
                        <td key={accessor}>
                            <IconButton icon={SaveIcon} onClick={() => {
                                handleUpdate(state)
                                setToggle({ item: 0, toggle: true });
                                setState({ ...states })
                            }} />
                            <IconButton icon={CancelIcon} onClick={() => {
                                setToggle({ item: 0, toggle: true });
                                setState({ ...states })
                            }} />
                        </td>
                    )
                }

                if (tData === undefined) {
                    tData = getDeepValue(data, accessor)
                    if (type === "date") {
                        tData = new Date(tData).toLocaleDateString("ru").substring(0, 10)
                        return (
                            <td key={accessor}>
                                {tData}
                            </td>
                        )
                    }
                    return <td key={accessor}>{tData}</td>
                }

                if (selectData) {
                    return (
                        <td key={accessor}>
                            <Select data={selectData} onChange={(e: any) => deepState(e.target.value, accessor)}>{tData}</Select>
                        </td>
                    )
                }
                else if (type === "date") {

                    return (

                        <td key={accessor}>
                            <Input size={size} type={type} value={tData.toString().substring(0, 10)} onChange={(e: any) => deepState(e.target.value, accessor)}></Input>
                        </td>
                    )
                }
                else {
                    return (
                        <td key={accessor}>
                            <Input size={size} type={type} value={tData} onChange={(e: any) => deepState(e.target.value, accessor)}></Input>
                        </td>
                    )
                }
            })}

        </tr>
    )
}

export default EditCell