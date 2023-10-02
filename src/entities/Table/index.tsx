import { useState } from "react";

import TableHead from "./ui/TableHead";
import TableBody from "./ui/TableBody";


const Table = ({ data, search, columns, defaultSort, handleUpdate, handleDelete, states, numerable=true }: any) => {
    if (!search) search = ""
    const [sort, setSort] = useState({ key: defaultSort, order: "asc" })
    
    return (
        <div className="table-wrapper">
            <table className="styled-table">
                <TableHead {...{ columns, defaultSort, setSort, sort, numerable}} />
                <TableBody {...{ columns, sort, search, handleUpdate, handleDelete, states, data, numerable }} />
            </table>
        </div>
    );
};

export default Table;