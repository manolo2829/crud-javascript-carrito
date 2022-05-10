  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDP4xfCkYms8PUqltr9nC9-MEdt6kuJlQs",
    authDomain: "carrito-javascript.firebaseapp.com",
    projectId: "carrito-javascript",
    storageBucket: "carrito-javascript.appspot.com",
    messagingSenderId: "930881582909",
    appId: "1:930881582909:web:947247f62ba4b982fa7754"
};

import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"



  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const db = getFirestore(app);



export async function writeProductsData(productTitle, productDescription, productPrice) {
    try {
        const docRef = await addDoc(collection(db, "products"), {
          title: productTitle,
          description: productDescription,
          price: productPrice
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    console.log('Producto enviado')
}

export async function readProductsData(){
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const product = doc.data()
        const Content = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p>${product.price}</p>
                <a href="#" class="card-link w-100">Añadir a Carrito</a>
            </div>
        </div>
        `
        
    });
}


