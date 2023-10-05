import { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Transactions from './Transactions';
import Customers from './Customers';
import Suppliers from './Suppliers';


function Home({ AuthMiddleware }) {
   const navigate = useNavigate();

   const [targetName, setTargetName] = useState("");
   useEffect(() => {
      if (!AuthMiddleware) {
         navigate('/');
      }
   })

   const handleClick = (e) => {
      setTargetName(e.target.name);

      // if (targetName === 'customers') {
      //    navigate('/customers');
      // }
      // else if (targetName === 'suppliers') {
      //    navigate('/suppliers');         
      // }
      // else {

      // }
   }

   return (
      <div className='Main'>
         Login success
         <button onClick={handleClick} name='customers'>Customers</button>
         <button onClick={handleClick} name='suppliers'>Suppliers</button>
         <button onClick={handleClick} name='rates'>Rates</button>
         <button onClick={handleClick} name='transactions'>Transactions</button>
         {
            targetName === "customers" ? <Customers></Customers> : targetName === "suppliers" ?<Suppliers></Suppliers>:targetName==="transactions"?"":""
         }
         <Transactions></Transactions>
      </div>
   );
}
export default Home;