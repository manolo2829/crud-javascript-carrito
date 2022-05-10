

const titulo = document.querySelector('#titleForm')
const form = document.querySelector('#formContainer')
const url = window.location.search;

const obtenerValores = async() => {
    const urlParams = new URLSearchParams(url)
    const mode = await urlParams.get('form')
    console.log(mode)
    formValues(mode)
}


const formValues = (mode) =>{
    if(mode === 'signup'){
        
    }
}


obtenerValores()