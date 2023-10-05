import React, { useState } from 'react';
import { createCustomer, deleteCustomer, updateCustomer } from '../CRUD';
import { getDatabase, ref, onValue } from 'firebase/database';

const CustomersSetting = () => {

   const database = getDatabase();
   let datadb = [];
   const cartRef = ref(database, 'customers/');
   onValue(cartRef, (snapshot) => {
      try {
         datadb = Object.values(snapshot.val());
         if (!!datadb) {
            console.log(datadb);
            return datadb
         } else {
            console.log('Data not found');
         }
      } catch (error) {
         console.log("no values left: CUSTOMERSETTINGS");
      }
   });

   const [prevalue,setPrevalue]=useState();
   const [updateValue,setUpdateValue]=useState();
   const [newData, setNewData] = useState();
   const [selected, setSelected] = useState();
   const handleChange = (e) => {
      setNewData({
         ...newData,
         [e.target.name]: e.target.value
      });
   }
   const handleAdd = (e) => {
      e.preventDefault();
      if (newData === undefined) {
         console.log("please enter values here : handleAdd");
      }
      else if (newData.name === '' || newData.phone === undefined || newData.phone === '') {
         console.log("please fill all values : handleAdd")
      } else {
         createCustomer(newData);
      }
   }
   const handleDelete = async (e) => {
      e.preventDefault();
      deleteCustomer(selected);
   }
   const handleSelect = (e) => {
      setSelected(e.target.value);
      //set previous value for update parameter
      setPrevalue(e.target.value);

      //set to input value field
      let updateInput= document.querySelector('#updateField');
      updateInput.value=e.target.value;
   }
   const handleUpdate=(e)=>{
      e.preventDefault();
      console.log(prevalue,updateValue);
      updateCustomer(prevalue,updateValue);
   }
   const handleChangeUpdate=(e)=>{
      setUpdateValue(e.target.value);
   }

   return (
      <>
         <div>CustomersSetting</div>
         <form>
            <input onChange={handleChange} placeholder='Name' type='text' name='name' />
            <input onChange={handleChange} placeholder='Phone no.' type='phone' name='phone' />
            <button onClick={handleAdd}>Add Customer</button>
         </form>
         <form>
            <select onChange={handleSelect}>
               <option>none</option>
               {
                  datadb.map((db) => (
                     <option value={db.name} key={db.name}>{db.name}</option>
                  ))
               }
            </select>
            <button onClick={handleDelete}>delete Customer</button>
            <h2>To </h2>
            <input id='updateField' onChange={handleChangeUpdate} placeholder='Name' type='text' name='name' />
            <button onClick={handleUpdate}>update Customer</button>
         </form>

      </>

   )
}

export default CustomersSetting