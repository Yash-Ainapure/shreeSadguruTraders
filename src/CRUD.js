import { getDatabase, ref, onValue, set, push, child, orderByChild, query, equalTo, get ,update} from 'firebase/database';

const database = getDatabase();

//read data operation for Customers data
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
      console.log("no values to display: CRUD");
   }
});


//read data operation for Supplier data
let supplierDb = [];
const supplierCart = ref(database, 'suppliers/');
onValue(supplierCart, (snapshot) => {
   supplierDb = Object.values(snapshot.val());
   if (!!supplierDb) {
      //console.log(supplierDb);
   } else {
      console.log('Data not found');
   }
});




// write data operation for create Customers
const createCustomer = (newData) => {
   const key = push(child(ref(database), 'customers')).key;
   console.log(key);
   console.log(newData);
   set(ref(database, 'customers/' + key), newData).then(() => {
      console.log("customer created");
   }).catch((error) => {
      console.log(error);
   });
}




//Delete data by its value for customer
const deleteCustomer = async (nameToDelete) => {
   if (nameToDelete === null || nameToDelete === undefined) {
      return console.log("select options OR no values to delete");
   }
   const customersRef = ref(database, 'customers');
   // Query to find the customer with the specified name
   const queryByName = query(customersRef, orderByChild('name'), equalTo(nameToDelete));
   try {
      // Get the snapshot of customers matching the query
      const snapshot = await get(queryByName);
      // Loop through the results to get the key(s) and delete the data
      snapshot.forEach((childSnapshot) => {
         const keyToDelete = childSnapshot.key;
         // Delete the customer data
         set(ref(database, 'customers/' + keyToDelete), null).then(() => {
            // Success
            console.log("success deleting the data");
         })
            .catch((error) => {
               console.log("getting an error as ", error);
            });
      });
   } catch (error) {
      console.error('Error querying customers:', error);
   }
}




//update customer
const updateCustomer = async (preValue, updateValue) => {
   const updateRef = ref(database, 'customers');
   const queryByName = query(updateRef, orderByChild('name'), equalTo(preValue));
   try {
      const snapshot = await get(queryByName);
      snapshot.forEach((childSnapshot) => {
         const keyToUpdate = childSnapshot.key;
         console.log(keyToUpdate);
         const updates={};
         updates['customers/'+keyToUpdate+"/name"]=updateValue;
         update(ref(database),updates);
         console.log("customer updated successfully");
      });
   } catch (error) {
      console.log("error catched in ctach block  :  ", error);
   }
}



// write data operation for create Customers
const createSupplier = (newData) => {

   const key = push(child(ref(database), 'suppliers')).key;
   console.log(key);
   console.log(newData);
   set(ref(database, 'suppliers/' + key), newData).then(() => {
      console.log("supplier created");
   }).catch((error) => {
      console.log(error);
   });

}



//Delete data by its value for supplier
const deleteSupplier = async (nameToDelete) => {
   if (nameToDelete === null || nameToDelete === undefined) {
      return console.log("select options OR no values to delete");
   }
   const customersRef = ref(database, 'suppliers');
   // Query to find the customer with the specified name
   const queryByName = query(customersRef, orderByChild('name'), equalTo(nameToDelete));
   try {
      // Get the snapshot of customers matching the query
      const snapshot = await get(queryByName);
      // Loop through the results to get the key(s) and delete the data
      snapshot.forEach((childSnapshot) => {
         const keyToDelete = childSnapshot.key;
         // Delete the customer data
         set(ref(database, 'suppliers/' + keyToDelete), null).then(() => {
            // Success
            console.log("success deleting the one supplier");
         })
            .catch((error) => {
               console.log("getting an error as ", error);
            });
      });
   } catch (error) {
      console.error('Error querying customers:', error);
   }
}




//update customer
const updateSupplier = async (preValue, updateValue) => {
   const updateRef = ref(database, 'suppliers');
   const queryByName = query(updateRef, orderByChild('name'), equalTo(preValue));
   try {
      const snapshot = await get(queryByName);
      snapshot.forEach((childSnapshot) => {
         const keyToUpdate = childSnapshot.key;
         console.log(keyToUpdate);
         const updates={};
         updates['suppliers/'+keyToUpdate+"/name"]=updateValue;
         update(ref(database),updates);
         console.log("supplier updated successfully");
      });
   } catch (error) {
      console.log("error catched in catch block  :  ", error);
   }
}



export { supplierDb, createCustomer, deleteCustomer, datadb, updateCustomer,createSupplier ,deleteSupplier,updateSupplier};