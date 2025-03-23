//variables globales
const d = document;
let tablePro = d.querySelector('#table-pro tbody');
let searchInput = d.querySelector('#search-input');
let nameUser = d.querySelector('#nombre-usuario');
let btnLogout = d.querySelector('#btnLogout');


// evento para probar el campo de buscar
searchInput.addEventListener('keyup', () => {
    console.log(searchInput.value);
});

//evento para el navegador
document.addEventListener('DOMContentLoaded', ()=>{
    getTableData();
});

//funcion para traer los datos de la base de datos a la tabla
let getTableData = async ()=>{
    let url = 'http://localhost/backend-apiCrud/productos';

    try{
        let respuesta = await fetch(url,{
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
        });

        if (respuesta.status === 204){
            console.log("No hay datos en la BD");
        }else{
            let tableData = await respuesta.json();
            console.log(tableData)
            //agregar los datos al localStorage
            localStorage.setItem('datosTable', JSON.stringify(tableData));

            //Agregar datos a la tabla
            tableData.forEach((d, i) => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td> ${i+1} </td>
                    <td> ${d.nombre} </td>
                    <td> ${d.descripcion} </td>
                    <td> ${d.precio} </td>
                    <td> ${d.stock} </td>
                    <td> <img src=" ${d.imagen} "width=100"> </td>
                    <td>
                        <button type="button" id="btn-edit" onclick="editDataTable(${i})" style="background: none; border: none;"><img src="img/boligrafo.png" alt="" width=50></button>
                        <button type="button" id="btn-delete" onclick="deleteDataTable(${i})" style="background: none; border: none;"><img src="img/borrar.png" alt="" width=50></button>
                    </td>
                `;
                tablePro.appendChild(row);
            });
        }
    }catch (error){
        console.log(error);
    }
};

//funcion para editar datos de la tabla

let editDataTable = ( pos )=>{
    let product = [];
    let productSave = JSON.parse(localStorage.getItem('datosTable'));
    if (productSave != null) {
        product = productSave;
    }
    let singleProduct = product[pos];
    //console.log(singleProduct);
    localStorage.setItem('productEdit', JSON.stringify(singleProduct));
    localStorage.removeItem('datosTabla');
    location.href = '../crear-pro.html '
}

// //funcion para eliminar datos de la tabla

let deleteDataTable = ( pos )=>{
    
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