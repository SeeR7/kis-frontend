import { useState } from "react";

function getDefaultSorting(defaultTableData: any, columns: any, defaultSort: any) {
  const sorted = [...defaultTableData].sort((a, b) => {
    const filterColumn = columns.filter((column: any) => column.sortbyOrder);

    // Merge all array objects into single object and extract accessor and sortbyOrder keys
    let { accessor = defaultSort, sortbyOrder = "asc" } = Object.assign(
      {},
      ...filterColumn
    );
    ///
    let arr = []
    if (accessor.includes(".")) {
      arr = accessor.split(".")
      if (a[arr[0]][arr[1]] === null) return 1;
      if (b[arr[0]][arr[1]] === null) return -1;
      if (a[arr[0]][arr[1]] === null && b[arr[0]][arr[1]] === null) return 0;
    }
    ///
    if (a[accessor] === null) return 1;
    if (b[accessor] === null) return -1;
    if (a[accessor] === null && b[accessor] === null) return 0;

    const ascending = a[accessor]
      .toString()
      .localeCompare(b[accessor].toString(), "en", {
        numeric: true,
      });

    return sortbyOrder === "asc" ? ascending : -ascending;
  });
  return sorted;
}

export const useSortableTable = (data: any, columns: any, defaultSort: any) => {
  if (!defaultSort) {
    defaultSort = "id";
  }
  const [tableData, setTableData] = useState(getDefaultSorting(data, columns, defaultSort));

  const handleSorting = (sortField: any, sortOrder: any) => {
    console.log(sortField)
    if (sortField) {
      ///
      let arr: (string | number)[] = []
      if (sortField.includes(".")) {
        arr = sortField.split(".")
        
        const sorted = [...tableData].sort((a, b) => {
          if (a[arr[0]][arr[1]] === null) return 1;
          if (b[arr[0]][arr[1]] === null) return -1;
          if (a[arr[0]][arr[1]] === null && b[arr[0]][arr[1]] === null) return 0;
          return (
            a[arr[0]][arr[1]].toString().localeCompare(b[arr[0]][arr[1]].toString(), "en", {
              numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
          );
        });
        setTableData(sorted);
      
      }
      ///
      else {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);}
    }
  };

  return [tableData, handleSorting, setTableData];
};