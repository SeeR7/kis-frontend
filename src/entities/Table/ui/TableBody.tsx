import { useState } from "react";
import { getDeepValue } from "../lib/getDeepValue";
import { replacer } from "../lib/replacer";
import ViewCell from "./ViewCell";
import EditCell from "./EditCell";
import { setDeepValue } from "../lib/setDeepValue";
import { useAppSelector } from "shared/lib/store";
import { checkRole, checkDep } from "shared/api/features/authSlice";


const TableBody = ({ numerable,search, columns, states, handleUpdate, handleDelete, data: tableData, sort, role, dep }: any) => {
    const [{ item, toggle }, setToggle] = useState({ item: 0, toggle: true })
    const [state, setState] = useState(states)

    let count = 0

    const sorting = (a: any, b: any) => {
        if (getDeepValue(a, sort.key) === null) return 1
        if (getDeepValue(b, sort.key) === null) return -1
        if (getDeepValue(a, sort.key) === null && getDeepValue(b, sort.key) === null) return 0;
        return (
            getDeepValue(a, sort.key).toString().localeCompare(getDeepValue(b, sort.key).toString(), "en", {
                numeric: true,
            }) * (sort.order === "asc" ? 1 : -1)
        )
    }

    const deepState = (value: any, path: string) => {
        const nextState = setDeepValue(state, value, path)
        setState(nextState)
    }

    const  setFullValue = (state: any, obj: any) => {
        const nextState = {...state}
        for (let key in nextState) {
            
            nextState[key] = getDeepValue(obj, key)
        }
        return nextState
    }

    const fullState = (obj:any) => {
        const nextState = setFullValue(state, obj)
        setState(nextState)
    }



    return (
        <tbody>
            {[...tableData].filter((item: any) => {
                return search.toLowerCase() === '' ? item
                    : JSON.stringify(Object.values(item), replacer).toLowerCase().includes(search.toLowerCase())
            }
            ).sort(sorting).map((data: any) => {
                count++;
                let key = data.id          

                return (
                    
                    toggle || (key !== item)
                        ?
                        <ViewCell key={key} {...{ numerable, data, columns, count, setToggle, fullState, handleDelete, role, dep }} />
                        :
                        <EditCell key={key} {...{ numerable, data, columns, count, setToggle, deepState, state, setState, states, handleUpdate, role, dep }} />
                );
            })}
        </tbody>
    );
};

export default TableBody


