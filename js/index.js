import { writeProductsData } from "../firebase.js";
import { readProductsData } from "../firebase.js";
import { addToCarritoItem } from "../firebase.js";


const modalContent = document.querySelector('#modalContent')
const buttonAddProduct = document.querySelector('#modalSend')


const addProduct = async() =>{
    const productTitle = document.querySelector('#inputTitle').value;
    const productDescription = document.querySelector('#inputDescription').value;
    const productPrice = document.querySelector('#inputPrice').value;

    await writeProductsData(productTitle, productDescription, productPrice)
    modalContent.reset()
    console.log('Producto Añadido')

}

buttonAddProduct.addEventListener('click', addProduct)


window.onload = async function(){
    await readProductsData()
    const buttonAddCarrito = document.querySelectorAll('.buttonAddCarrito')

    buttonAddCarrito.forEach(btn => {
        // Y LE DECIMOS QUE CADA VEZ QUE SE CLICKEE UNO DE LOS BOTONES PERTENECIENTES AL ARRAY SUCEDA ALGO
        btn.addEventListener('click',addToCarritoItem)
    })
    
}
