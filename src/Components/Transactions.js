import React, { useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
//import {datadb} from '../CRUD';

let columns = [
   {
      Header: "Name",
      accessor: "name",
   },
   {
      Header: "Phone",
      accessor: "phone"
   }
];
let data = [
   {
      name: "yash ainapure",
      phone: 9850377880
   },
   {
      name: "raj",
      phone: 7028925507
   }
];

const Transactions = () => {

   const navigate = useNavigate();

   const handleUpdate=()=>{
      navigate('/edittransactions');
   }

   useEffect(()=>{
      //data=datadb;
   })

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
   },
      useSortBy
   );

   return (
      <div className='Transactions'>
         <h2>Transactions</h2>
         <div className='TransactionsTable'>
            <table {...getTableProps}>
               <thead>
                  {headerGroups.map((hg) => (
                     <tr {...hg.getHeaderGroupProps()}>
                        {
                           hg.headers.map(header => (
                              <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                                 {header.render("Header")}
                                 {header.isSorted && (
                                    <span>{header.isSortedDesc ? " ⬇️" : " ⬆️"}</span>
                                 )}
                              </th>
                           ))
                        }
                     </tr>
                  ))}
               </thead>
               <tbody {...getTableBodyProps()}>

                  {
                     rows.map(row => {
                        prepareRow(row)

                        return <tr {...row.getRowProps()}>
                           {
                              row.cells.map(cell => (
                                 <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                 </td>
                              ))
                           }
                        </tr>
                     })
                  }

               </tbody>
            </table>
         </div>
         <button onClick={handleUpdate}>Add/Delete/Edit Transactions</button>
      </div>
   )
}

export default Transactions