import React from 'react'


const TableHead = ({ columns, defaultSort, setSort, sort,numerable }: any) => {
    if (!defaultSort) {
        defaultSort = "";
    }

    const handleSortingChange = (accessor: any) => {
        const sortOrder = (accessor === sort.key && sort.order === "asc") ? "desc" : "asc";
        setSort({ key: accessor, order: sortOrder })
    };

    return (
        <thead>
            <tr>
                {numerable && <th key={"#"} rowSpan={2}>№</th>}
                {columns.map(({ label, accessor, sortable, colSpan, rowSpan, layer }: any) => {
                    if (layer === 1 || !layer) {
                        const cl = sortable
                        ? sort.key === accessor && sort.order === "asc"
                            ? "up"
                            : sort.key === accessor && sort.order === "desc"
                                ? "down"
                                : "default"
                        : "";
                    return (
                        sortable
                            ?
                                <th
                                    key={accessor}
                                    onClick={() => handleSortingChange(accessor)}
                                    className={cl}
                                    colSpan={colSpan}
                                    rowSpan={rowSpan}
                                >
                                    {label}
                                </th>
                            :
                                <th
                                    key={accessor}
                                    className={cl}
                                    colSpan={colSpan}
                                    rowSpan={rowSpan}
                                >
                                    {label}
                                </th>
                    )
                    }
                })}
            </tr>
            <tr>
            {columns.map(({ label, accessor, sortable, colSpan, rowSpan, layer }:any) => {
                if (layer === 2){
                        const cl = sortable
                        ? sort.key === accessor && sort.order === "asc"
                            ? "up"
                            : sort.key === accessor && sort.order === "desc"
                                ? "down"
                                : "default"
                        : "";
                    return (
                        sortable
                            ?
                                <th
                                    key={accessor}
                                    onClick={() => handleSortingChange(accessor)}
                                    className={cl}
                                    colSpan={colSpan}
                                    rowSpan={rowSpan}
                                >
                                    {label}
                                </th>
                            :
                                <th
                                    key={accessor}
                                    className={cl}
                                    colSpan={colSpan}
                                    rowSpan={rowSpan}
                                >
                                    {label}
                                </th>
                    
                    )
                    }
            })}
            </tr>
        </thead>
    );
};

export default TableHead