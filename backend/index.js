import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWKMGFt8eVKoHDPJg4wa8OkoXfZZFSg9c",
  authDomain: "studentapp-c2e47.firebaseapp.com",
  projectId: "studentapp-c2e47",
  storageBucket: "studentapp-c2e47.appspot.com",
  messagingSenderId: "600917673861",
  appId: "1:600917673861:web:2f9cff6d03d20a9d6be6ec"
};
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

// Get a list of cities from your database
async function getStudents(db) {
  const studentsCollection = collection(db, 'Students');
  const studentsSnapshot = await getDocs(studentsCollection);
  const studentList = studentsSnapshot.docs.map(doc => doc.data());
  return studentList;
}
const students = await getStudents(db);
console.log(students);
//---------------------------EXPRESSJS-----------------

//const express = require('express')
//Modulos?
import express from 'express'
const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('EPN FIS!')
})

app.listen(port, () => {
  console.log(`WebAPI listening on port ${port}`)
})

// read all student
app.get("/api/read", (req, res) => {
    (async () => {
      try {
        let response = [];
        const querySnapshot = await getDocs(collection(db, "Students"));

        querySnapshot.forEach((doc) => {
          const selectedItem = {
            id: doc.id,
            student: doc.data(),
          };
          response.push(selectedItem);
        });
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

//read one student
app.get("/api/read/:item_id", (req, res) => {
    (async () => {
      try {
        let response = [];
        const q = query(
          collection(db, "Students"),
          where("ID", "==", parseInt(req.params.item_id))
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const selectedItem = {
            id: doc.id,
            student: doc.data(),
          };
          response.push(selectedItem);
        });
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // create student
app.post("/api/create", (req, res) => {
    (async () => {
      try {
        console.log(req.body.student);

        const docRef = await addDoc(collection(db, "Students"), req.body.student);
        return res.status(200).send(`Document written with ID:  ${docRef.id}`);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // update
app.put("/api/update/:item_id", (req, res) => {
    (async () => {
      try {
        console.log(req.params.item_id);
        const studentDocumentId = doc(db, "students", req.params.item_id);
        await updateDoc(studentDocumentId, req.body.student);
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // delete
app.delete("/api/delete/:item_id", (req, res) => {
    (async () => {
      try {
        //const studentDocumentId = doc(db, "students", req.params.item_id);
        //console.log(req.params.item_id, studentDocumentId);
        await deleteDoc(doc(db, "students", req.params.item_id));
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });