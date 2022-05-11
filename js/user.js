import { writeUserData } from "../firebase.js"
import { readUsers } from "../firebase.js"
import { userValidate } from "../firebase.js"

const titulo = document.querySelector('#titleForm')
const formSignUp = document.querySelector('#formSignUp')
const formSignIn = document.querySelector('#formSignIn')
const registerButton = formSignUp.querySelector('#registerButton')
const loginButton = formSignIn.querySelector('#loginButton')

const url = window.location.search;

registerButton.addEventListener('click', async(e) => {
    
    const email = await document.querySelector('#registerEmail').value;
    const password = await document.querySelector('#registerPassword').value;
    const passwordConfirm = await document.querySelector('#registerPasswordConfirm').value;
    const name = await document.querySelector('#registerName').value;
    formSignUp.reset()


    if(password.trim() === passwordConfirm.trim()){
       await  writeUserData(email, name, password)
       console.log('usuario creado')
       return
    }
    console.log('error')
    
})


// ENCONTRAR ERROR
loginButton.addEventListener('click', async(e) => {
    userValidate()
})

const obtenerValores = async() => {
    const urlParams = new URLSearchParams(url)
    const mode = await urlParams.get('form')
    console.log(mode)
    formValues(mode)
}


const formValues = (mode) =>{
    if(mode === 'signup'){
        titulo.textContent = 'Sign Up'
        formSignUp.classList.remove('d-none')
        formSignIn.classList.add('d-none')
    }
}




obtenerValores()