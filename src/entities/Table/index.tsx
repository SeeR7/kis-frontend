import { useState } from "react";
import TableHead from "./ui/TableHead";
import TableBody from "./ui/TableBody";
import { useAppSelector } from "shared/lib/store";
import { checkRole, checkDep } from "shared/api/features/authSlice";


export const Table = ({ data, search, columns, defaultSort, handleUpdate, handleDelete, states, numerable=true }: any) => {
    if (!search) search = ""
    const [sort, setSort] = useState({ key: defaultSort, order: "asc" })
    const role = useAppSelector(checkRole)
    const dep = useAppSelector(checkDep)
    
    return (
        <div className="table-wrapper">
            <table className="styled-table">
                <TableHead {...{ columns, defaultSort, setSort, sort, numerable, role, dep}} />
                <TableBody {...{ columns, sort, search, handleUpdate, handleDelete, states, data, numerable, role, dep }} />
            </table>
        </div>
    );
};