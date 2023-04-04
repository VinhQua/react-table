import { useState } from "react";
import { useAsyncDebounce } from "react-table";

export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
}){
    const count = preGlobalFilteredRows.length;
    const [value,setValue] =useState(globalFilter);
    const onChange = useAsyncDebounce(()=>{
        setGlobalFilter(value || undefined);
    },300)
    return (
        <div className="search-bar">
            <span>Search: </span>
            <input type="text" value={value || ""} onChange={(e)=> {
                setValue(e.target.value)
                onChange(e.target.value)
            }}
            placeholder={`${count} records...`}
             />
        </div>
    )
}