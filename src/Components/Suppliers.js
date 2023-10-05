import React, { useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { supplierDb } from '../CRUD';
import { useNavigate } from 'react-router-dom';


let columns = [
   {
      Header: "Address",
      accessor: "address",
   },
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
      address: "gss",
      name: "yash ainapure",
      phone: 9850377880
   },
   {
      address: "sgs",
      name: "raj",
      phone: 7028925507
   }
];
const Suppliers = () => {

   const navigate = useNavigate();
   const handleAdd = () => {
      navigate('/editsuppliers');
   }

   useEffect(() => {

      data = supplierDb;
   })

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
   },
      useSortBy
   );

   return (
      <div className='Transactions'>
         <h2>Suppliers</h2>
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
         <div className='supplier-operations'>
            <button onClick={handleAdd}>Add/Delete/Edit Supplier</button>
         </div>
      </div>
   )

}

export default Suppliers