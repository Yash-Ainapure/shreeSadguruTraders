import './Settings.css';
import React from 'react';

import { useTable, useSortBy } from 'react-table';


const data = [
   {
      id: 1,
      gender: 'Male',
      salary: 20000
   },
   {
      id: 2,
      gender: 'Female',
      salary: 30000
   },
   {
      id: 3,
      gender: 'Male',
      salary: 20000
   }
];

const columns = [
   {
      Header: "ID",
      accessor: "id",
   },
   {
      Header: "Gender",
      accessor: "gender",
   },
   {
      Header: "Salary",
      accessor: "salary",
   },
];

const Settings = () => {

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
   },
      useSortBy
   );


   return (
      <div className='Settings'>
         <div className='Settings-header'>Settings</div>

         <button>Suppliers</button>
         <button>Customers</button>
         <button>Rates</button>

         <div className='SettingsContainer'>
            <table {...getTableProps}>
               <thead>
                  {headerGroups.map((hg) => (
                     <tr {...hg.getHeaderGroupProps()}>
                        {
                           hg.headers.map(header => (
                              <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                                 {header.render("Header")}
                                 {header.isSorted && (
                                    <span>{header.isSortedDesc ? " ⬇️": " ⬆️"}</span>
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
      </div>
   )
}

export default Settings;