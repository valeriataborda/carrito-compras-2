//variables globales del formulario del login
const d = document;
userInput = d.querySelector("#usuarioForm");
passInput = d.querySelector("#contraForm");
btnLogin = d.querySelector(".btnLogin");

//evento al boton del formulario
btnLogin.addEventListener("click", ()=>{
    //alert('escribio : ' + userInput.value); 
    let dataForm = getData();
    sendData(dataForm);
});

//funcion para validar el formulario
//obtener datos del formulario
let getData = () => {
    let user;
    if (userInput.value && passInput.value) {
        user = {
            usuario: userInput.value,
            contrasena: passInput.value
        }
        userInput.value = "";
        passInput.value = "";       
    }else{
        alert("Usuario y Contraseña son requeridos");
    }
    console.log(user);
    return user;
};

//funcion para recibir los datos y la peticion al servidor

let sendData = async (data)=>{
    let url = "http://localhost/backend-apiCrud/login";
    try{
        let respuesta = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data) 
        });

        if (respuesta.status === 401){
            alert("Usuario o contraseña incorrectos");
        }else{
            let userLogin = await respuesta.json();
            alert(`Bienvenido ${userLogin.nombre}`);

            //guardar localstorage
            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            location.href = "../index.html";
        }
    }catch (error){
        console.log(error);
    }
};