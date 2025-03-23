//variables globales del admin
const d = document;
let nameUser = d.querySelector('#nombre-usuario');
let btnLogout = d.querySelector('#btnLogout');

d.addEventListener('DOMContentLoaded',()=>{
    getUser();
})

//funcion para poner el nombre el usuario
let getUser = ()=>{
    let user = JSON.parse(localStorage.getItem('userLogin'));
    nameUser.textContent = user.nombre;
};

//evento para el boton del logout
btnLogout.addEventListener('click',()=>{
    localStorage.removeItem('userLogin');
    location.href = '../login.html';
});