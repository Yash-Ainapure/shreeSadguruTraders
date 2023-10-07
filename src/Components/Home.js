import { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Transactions from './Transactions';
import Customers from './Customers';
import Suppliers from './Suppliers';
import { signOut, auth } from '../firebase';
import Rates from './Rates';
import Settings from './Settings';


function Home({ AuthMiddleware }) {
   const navigate = useNavigate();

   const [targetName, setTargetName] = useState("transactions");
   useEffect(() => {
      //security purpose
      // if (!AuthMiddleware) {
      //    navigate('/');
      // }
   })

   const handleClick = (e) => {
      setTargetName(e.target.name);
   }

   return (
      <div>
         <div className="bord sidebar">
            <div className="bord companytitle">
               <h4> SHREE SADGURU TRADERS</h4>
            </div>
            <div className="bord userinfo">
               <div className="profilepic">
                  {/* <img src="/static/image/id size.jpeg" alt="Profile Picture"> */}
               </div>
               <h4>HARSH PATIL</h4>
               <p>harsh2504patil@gmail.com</p>
            </div>
            <div className="bord nav">
               <a className="active" name='transactions' onClick={handleClick}><i className="fa-solid fa-code-fork"></i>Overview</a>
               <a name='rates' onClick={handleClick}><i className="fa-solid fa-coins"></i>Rates</a>
               <a name='suppliers' onClick={handleClick}><i className="fa-solid fa-wallet"></i>Suppliers</a>
               <a name='customers' onClick={handleClick}><i className="fa-solid fa-user"></i>Customers</a>
               <a name='settings' onClick={handleClick}><i className="fa-solid fa-gear"></i>Settings</a>

            </div>
            <div className="bord logout">
               <a name='logout' onClick={() => {
                  signOut(auth)
                     .then(() => {
                        navigate('/');
                     }).catch((error)=>{
                        console.log("error during signing out user");
                     })
               }}><i className="fa-solid fa-right-from-bracket"></i>Logout</a>
            </div>
         </div>
         <div>
            {
               targetName === "customers" ? <Customers></Customers> : targetName === "suppliers" ? <Suppliers></Suppliers> : targetName === "transactions" ? <Transactions></Transactions> : targetName === "rates" ? <Rates /> : targetName ==="settings"?<Settings/>:""
            }
         </div>
      </div >
   );
}
export default Home;