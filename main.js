//variables
var stock = [];

//funciones
function validarProducto(producto) {
    if (producto.nombre.length > 0 && producto.cantidad > 0
        && producto.precio > 0 && producto.color.length > 0
        && producto.codigoProducto.length > 0) {

        //console.log(producto);

        if (txtId.value.length > 0) {
            actualizarProducto(txtId.value);
            setNotificacion('success', "Producto actualizado correctamente");
            resetearCampos();
        } else {
            agregarAlStock(producto)
            setNotificacion('success', "Producto ingresado correctamente");
            resetearCampos();
        }


    } else {
        setNotificacion('danger', "Debe ingresar todos los datos del producto!");
    }
}

function setNotificacion(type, msg) {
    var msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = msg;
    msgDiv.classList.add('alert');
    msgDiv.classList.add('alert-' + type);
    msgDiv.classList.add('text-center');
    msgDiv.classList.add('rounded-pill');
    setTimeout(function () {
        msgDiv.classList.remove('alert');
        msgDiv.classList.remove('alert-' + type);
        msgDiv.classList.remove('text-center');
        msgDiv.classList.remove('rounded-pill');
        msgDiv.innerHTML = "";
    }, 1500);
}



function crearProducto(cod, nombre, color, precio, cantidad) {
    producto = new Producto(cod, nombre, color, precio, cantidad);
    validarProducto(producto);

    return producto;
}


function mostrarStock() {
    if (stock.length > 0) {
        var productoDiv = document.getElementById("producto")
        productoDiv.innerHTML = ``;
        for (producto of stock) {
            productoDiv.innerHTML += `
            <div class="col-md-4 text-center">
                <div class="card m-2 rounded-md" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${producto.codigoProducto}</h6>
                        <input type="hidden" value=${producto.id} name="txtToken" id="txtToken">
                        <p class="card-text">color ${producto.color}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <p class="card-text">${producto.cantidad} unidades en stock.</p>
                        <div class="row text-center">
                            
                                <button class="btn btn-primary rounded-pill" onclick="setCampos(producto)">Editar <i class="fa-solid fa-pen"></i></button>
                                                 
                        </div>   
                                           
                    </div>
            </div>
          </div>
            `
        }
    } else {
        var productoDiv = document.getElementById("producto")
        productoDiv.innerHTML = `
            <div class="text-center">
                <div class="alert alert-dark rounded-pill">No hay productos en el stock</div>
            </div>
        `;

    }
}


function agregarAlStock(producto) {

    stock.push(producto)
    //console.log(stock); 
    mostrarStock();
}

function actualizarProducto(id) {

    var productoEncontrado = {};

    for (producto of stock) {
        if (producto.id == id) {
            productoEncontrado = producto
        }
    }
    productoEncontrado.codigoProducto = txtCod.value;
    productoEncontrado.nombre = txtNombre.value;
    productoEncontrado.color = txtColor.value;
    productoEncontrado.precio = txtPrecio.value;
    productoEncontrado.cantidad = txtCantidad.value;
    //console.log(productoEncontrado);
    ocultarBtnEliminar();
    mostrarStock();
}

function eliminarProducto(productoEntryID) {

    var newStock = stock.filter(producto => producto.id != productoEntryID);
    stock = newStock;
    setNotificacion('success', "Producto eliminado correctamente");
    resetearCampos();
    ocultarBtnEliminar();
    mostrarStock();

}

function setBtnEliminar() {
    var btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.innerHTML = `
    
        <button class="btn btn-danger rounded-circle px-3" onclick="eliminarProducto(txtId.value)"><i class="fa-solid fa-trash"></i></button>
     `
}
function ocultarBtnEliminar() {
    var btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.innerHTML = ``
}

function setCampos(producto) {
    txtId.value = producto.id;
    txtCod.value = producto.codigoProducto;
    txtNombre.value = producto.nombre;
    txtColor.value = producto.color;
    txtPrecio.value = producto.precio;
    txtCantidad.value = producto.cantidad;
    setBtnEliminar();
}


function resetearCampos() {
    txtId.value = "";
    txtCod.value = ''
    txtNombre.value = ''
    txtColor.value = ''
    txtPrecio.value = ''
    txtCantidad.value = ''

}

function mostrarCantidadProductos() {
    var cantidad = stock.length;
    var msgDiv = document.getElementById("msg")
    msgDiv.innerHTML = `
        <div class="text-center">
            <div class="alert alert-info rounded-pill"> Hay <b>${cantidad}</b> producto${cantidad == 1 ? '' : 's'} en stock.</div>
        </div>
    `;
    setTimeout(function () {
        msgDiv.classList.remove('alert');
        msgDiv.classList.remove('alert-dark');
        msgDiv.innerHTML = ``;
    }, 3500);
}

//cargar imagen

document.addEventListener("DOMContentLoaded", inicio, false);
function inicio() {
    var nuevaImagen = new Image();
    setNotificacion('success',"Se procede a la carga en memoria de la imagen");    
    nuevaImagen = cargarImagen("https://i.ibb.co/jZKvFGS/banner.png");
}
function cargarImagen(url) {
    var imagen = new Image();
    imagen.onload = imagenCargada;
    imagen.src = url;
    console.log(imagen);
    var imgLabel= document.getElementById("imagen");
    imgLabel.src= imagen.src;
    return imagen;
}
function imagenCargada() {
    setNotificacion('success',"La imagen se ha cargado correctamente");
}



