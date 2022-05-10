import { writeProductsData } from "../firebase.js";
import { readProductsData } from "../firebase.js";


const modalContent = document.querySelector('#modalContent')
const buttonAddProduct = document.querySelector('#modalSend')
const porductsContainer = document.querySelector('#porductsContainer')


const addProduct = async() =>{
    const productTitle = document.querySelector('#inputTitle').value;
    const productDescription = document.querySelector('#inputDescription').value;
    const productPrice = document.querySelector('#inputDescription').value;

    await writeProductsData(productTitle, productDescription, productPrice)
    modalContent.reset()
    console.log('Producto Añadido')

}

buttonAddProduct.addEventListener('click', addProduct)

window.onload = function(){
    readProductsData()
}
