import './Transactions.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, getDatabase } from 'firebase/database';

const Transactions = () => {

   const database = getDatabase();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState(true);

   const handleUpdate = () => {
      navigate('/edittransactions');
   }

   useEffect(() => {
      const fetchData = async () => {
         let datadb = [];
         const cartRef = await ref(database, 'customers/');
         onValue(cartRef, (snapshot) => {
            try {
               datadb = Object.values(snapshot.val());
               if (!!datadb) {
                  setData(datadb);
                  setIsLoading(false);
               } else {
                  console.log('Data not found');
                  setIsLoading(false);
               }
            } catch (error) {
               console.log("no values to display: TRANSACTIONS");
               setIsLoading(false);
            }
         });
      }
      fetchData();
   }, [database])

   if (isLoading) {
      return <p>Loading...</p>
   }
   return (
      <div className='Transactions'>
         <h2>Transactions</h2>
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>

               </tr>
            </thead>
            <tbody>
                  {data.map(item => (
                     <tr key={item.name}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                     </tr>
                  ))}
               
            </tbody>
         </table>

         <button onClick={handleUpdate}>Add/Delete/Edit Transactions</button>
      </div>
   )
}


export default Transactions