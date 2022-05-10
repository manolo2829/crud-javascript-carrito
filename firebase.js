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

import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"
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

const porductsContainer = document.querySelector('#porductsContainer')

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
                <a href="#" class="card-link w-100 buttonAddCarrito" data-id=${doc.id}>Añadir a Carrito</a>
            </div>
        </div>
        `
       porductsContainer.innerHTML += Content;
    });
}

export async function writeUserData(email, username, password){
    const db = getDatabase();
    await set(ref(db, 'users/' + username), {
      email,
      username,
      password
    });
    console.log('creando usuario')
}

export async function readUsers(){
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val())
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}

export async function addToCarritoItem(e){
    const button = e.target;
    const id = button.dataset.id;
    console.log(id)
}


