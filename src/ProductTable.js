import logo from './logo.svg';
import './App.css';
import React from 'react'
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
export function ProductTable(props){
    const [products,setProducts]=useState([]);
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const fetchProduct = async()=>{
      const response = await axios.get("https://fakestoreapi.com/products")
      .catch((err)=> console.log(err));
      if (response){
        const products = response.data;
        console.log(products);
        setProducts(products);
      }
    }
    const productData = useMemo(()=>[...products],[products]);
    const productColumn =   useMemo(()=> products[0]? Object.keys(products[0]).filter(key=>key !== 'rating').map(key=> {
      return { Header:capitalizeFirstLetter(key), accessor:key}
    }) : [],[products])
  
    useEffect(()=>{
        fetchProduct();
     
      },[]) 
    const tableInstance = useTable({columns:productColumn,data:productData})
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance  
    return(
        <div className='container'>
            <table {...getTableProps()}>
     <thead>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
   </table>
        </div>
    )
}