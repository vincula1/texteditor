import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    console.log('PUT to the database');
  
    // Open a connection to the database
    const jateDb = await openDB('jate', 1);
  
    // Create a new transaction and specify the database and data privileges
    const tx = jateDb.transaction('jate', 'readwrite');
  
    // Open up the desired object store
    const store = tx.objectStore('jate');
  
    // Use put to store value
    const request = store.put({ id: 1, value: content });
  
    // Get confirmation of the request
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  };
  

  export const getDb = async () => {
    console.log('GET from the database');
  
    // Open a connection to the database
    const jateDb = await openDB('jate', 1);
  
    // Create a new transaction and specify the database and data privileges
    const tx = jateDb.transaction('jate', 'readonly');
  
    // Open up the desired object store
    const store = tx.objectStore('jate');
  
    // Get info with id I
    const request = store.get(1);
  
    // Get confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result?.value;
  };
  

initdb();
