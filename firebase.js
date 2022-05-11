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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js"



  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const db = getFirestore(app);

const auth = getAuth()



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
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        console.log('creando usuario')
        const userId = auth.currentUser.uid;
        console.log('id del usuario: ' + userId)
        createUserDatabase(userId, email, password, username)
        console.log('usuario agregado a la base de datos')
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

async function createUserDatabase(userId, email, password, username){
    set(ref(database, 'users/' + userId), {
        username: username,
        email: email,
        password: password
    });
    console.log('agregando al usuario a la base de datos')  
}

export async function addToCarritoItem(e){
    const button = e.target;
    const id = button.dataset.id;
    console.log(id)
}
