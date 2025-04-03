//variables globales del formulario
const d = document;
let nameInput = d.querySelector('#productos-select');
let priceInput = d.querySelector('#precio-pro');
let stockInput = d.querySelector('#stock-pro');
let descripInput = d.querySelector('#des-pro');
let img = d.querySelector('#imagen-pro');
let btnCreate = d.querySelector('.btn-create');
let productUpdate;

//variables name user
let nameUser = d.querySelector('#nombre-usuario');
let btnLogout = d.querySelector('#btnLogout');

//evento al boton del formulario

btnCreate.addEventListener('click', ()=>{
    //alert(`Producto ${nameInput.value}`);
    // getDataProduct();
    // sendDataProduct();
    let dataProduct = getDataProduct();
    sendDataProduct(dataProduct);
});

//evento al navegador para comprobar si recargo la pagina
d.addEventListener('DOMContentLoaded', ()=>{
    productUpdate = JSON.parse(localStorage.getItem('productEdit'));
    if (productUpdate != null) {
        updateproduct();
    }
});

//funcion para validar el formulario
//obtener los datos de formulario

let getDataProduct = () =>{
    let product;
    if (nameInput.value && priceInput.value && stockInput.value && descripInput.value && img.src) {
        product ={
            nombre: nameInput.value,
            descripcion: descripInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: img.src
        }
        nameInput.value = '';
        priceInput.value = '';
        descripInput.value = '';
        stockInput.value = '';
        img.src = 'https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg';
        console.log(product);
    }else{
        alert('Todos los campos son obligatorios')
    }
    return product;
}

//funcion para recibir los datos y la peticion al servidor

let sendDataProduct = async (data)=>{
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data) 
        });

        if (respuesta.status === 406){
            alert("los datos enviados no son admitidos");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = '../listado-pro.html'
        }
    }catch (error){
        console.log(error);
    }
};

//funcion para editar el producto
let updateproduct = ()=>{
    nameInput.value = productUpdate.nombre;
    priceInput.value = productUpdate.precio;
    stockInput.value = productUpdate.stock;
    descripInput.value = productUpdate.descripcion;
    img.src = productUpdate.imagen;
    let product;
    //alternar el boton de crear y editar
    let btnEdit = d.querySelector('.btn-update');
    btnCreate.classList.toggle('d-none');
    btnEdit.classList.toggle('d-none');

    //agregar evento al boton editar
    btnEdit.addEventListener('click', ()=>{
        product ={
            id: productUpdate.id,
            nombre: nameInput.value,
            descripcion: descripInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: img.src
        }
        //borrar info de localstorage
        localStorage.removeItem('productEdit');
        //pasar los datos del producto a la funcion
        sendUpdateProduct(product);
    });
};

//funcion para realizar la peticion al servidor
let sendUpdateProduct = async (pro) =>{
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pro) 
        });

        if (respuesta.status === 406){
            alert("los datos enviados no son admitidos");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = '../listado-pro.html'
        }
    }catch (error){
        console.log(error);
    }
}

//Name user
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