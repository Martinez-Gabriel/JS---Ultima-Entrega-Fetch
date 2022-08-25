//PREGUNTO AL USUARIO SI ES MAYOR DE EDAD

Swal.fire({
  title: 'Usted es Mayor a 18 años?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'SI!',
  denyButtonText: `NO!`,
  icon: 'question',
}).then((result) => {

// SI ES MAYOR DE EDAD EJECUTO ESTO:
  
  if (result.isConfirmed) {
    Swal.fire('Usted puede acceder al Sitio!', '', 'success')
    document.getElementById("containerTitulo").innerHTML += `
    <div id="containerTitulo" class="container mb-3">
      <h1 id="tituloPrincipal">Tienda! PROYECT-HARDWARE</h1>
      <h2>Seleccione el tipo de producto que desea comprar!</h2>
      <div id="filtroProductos" class="row px-2 gap-3 pt-3"></div>
      <div id="productosFiltrados" class="row px-2 gap-3 pt-3"></div>
    </div>
    
    <div id = "containerCarrito">
      <h3>Su Carrito!!!</h3>
      <table id="tablaCarrito" class="table">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </table>
    </div>
    
    <div id="totalCarrito" class="alert alert-primary" role="alert"></div>
    <button id="finCompra" type="submit" class="btn btn-primary">Finalizar Compra</button>
    `;

//CLASE CARRITO

class Carrito {
  constructor() {
    this.productosEnElCarrito = []
    this.total = 0
  }
  agregarAlCarrito (producto) {
    this.productosEnElCarrito.push(producto)
    this.calcularPrecioTotalMasIva()
  }
  mostrarCarrito () {
    return this.productosEnElCarrito
  }
  calcularPrecioTotalMasIva () {
    this.total = this.productosEnElCarrito.reduce((acc, val) => acc + val.precio * 1.21, 0)
    return this.total
  }
}

//CLASE PRODUCTOS

class Productos {
  constructor() {
    this.productos = []
  }
  cargarProducto (producto) {
    // validar si el producto ya existe
    this.productos.push(producto)
  }

  mostrarProductos () {
    return this.productos
  }
}

class Producto {
  constructor(id, nombre, marca, tipo, precio, cantidad) {
    this.id = id
    this.nombre = nombre
    this.marca = marca
    this.tipo = tipo
    this.precio = precio
    this.cantidad = 1
  }
}

const carrito = new Carrito()

const productos = new Productos()
let catProd = [];
//RECORRO MIS PRODUCTOS
const getProductos = async () => {
  const response = await fetch ('./js/productos.json');
  const dataProductos = await response.json ();
  console.log(dataProductos)
  catProd = dataProductos;
  catProd.forEach((producto) => {
  const nuevoProducto = new Producto(
    producto.id,
    producto.nombre,
    producto.marca,
    producto.tipo,
    producto.precio,
    producto.cantidad
  )

  productos.cargarProducto(nuevoProducto)
})
}
getProductos ()

//CARGO LOS FILTROS Y CARGO LAS CARDS
let catArray = [];
const cargarFiltros = () => {
  const contenedorFiltros = document.getElementById('filtroProductos')

  const getCategorias = async () => {
  const response = await fetch ('./js/categorias.json');
  const dataCategorias = await response.json();
  catArray = dataCategorias;
  catArray.forEach((categoria) => {
    const filtro = document.createElement('div')
    filtro.classList.add('card')
    filtro.classList.add('col')
    filtro.style.maxWidth = '300px'
    filtro.id = categoria.id

    filtro.innerHTML = `
    <img
      src=${categoria.imagen}
      class="card-img-top"
      alt="imagen de procesadores"
    />
    <div class="card-body">
      <h4 style={text-transform:'capitalize'}>${categoria.nombre}</h4>
      <button id="botonCategoria${categoria.nombre}" type="button" class="btn btn-primary">Seleccionar</button>
    </div>
    `

    contenedorFiltros.append(filtro)
    const agregarEventoABoton = document.getElementById(`botonCategoria${categoria.nombre}`)
    agregarEventoABoton.addEventListener('click', () => {
      mostrarProductosFiltrados(categoria.nombre)
    })
  }) 
}
getCategorias ();

}
//VALIDO QUE LA SELECCION DE PRODUCTO NO SE REPITA

const mostrarProductosFiltrados = (nombre) => {
  if (document.getElementById('productosFiltrados').firstChild) {
    const borrarDiv = document.getElementById('productosFiltrados')
    borrarDiv.innerHTML = ``
  }

//FILTRO LOS PRODUCTOS

  const filtrarProductos = catProd.filter((producto) => producto.tipo === nombre)
  const contenedorProductos = document.getElementById('productosFiltrados')

  for (const producto of filtrarProductos) {
    const contenedorCard = document.createElement('div')
    contenedorCard.classList.add('card')
    contenedorCard.classList.add('col')
    contenedorCard.style.maxWidth = '300px'
    contenedorCard.innerHTML = `

      <div class="">
        <div class="col">
          <img src=${producto.imagen} class="img-fluid rounded-start" alt="">
        </div>
        <div>
          <div class="card-body">
            <h5 class="card-title"> ${producto.nombre} </h5>
            <p class="card-text">Breve descripcion del producto a comprar</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <h3> ${producto.precio} </h3>
            <button id='boton${producto.id}' type="submit" class="btn btn-primary">Agregar al Carrito</button>
          </div>
        </div>
      </div>

    `
    contenedorProductos.append(contenedorCard)

//AGREGAR PRODUCTOS AL CARRITO + SWEET ALERT

    document.getElementById(`boton${producto.id}`).addEventListener('click', function () {
      agregarCarrito(producto);
      Swal.fire({
        title: 'Felicitaciones!',
        text: 'Se Agrego el producto al carrito correctamente',
        confirmButtonText: 'Ok',
        icon: 'success',
      }); 
    })
  }
}

function agregarCarrito (productoComprado) {
  carrito.agregarAlCarrito(productoComprado)

  document.getElementById('tablaCarrito').innerHTML += `
    <tr>
      <th>${productoComprado.id}</th>
      <th>${productoComprado.nombre}</th>
      <th>${productoComprado.precio}</th>
    </tr>
  `
  sumaCarrito()

  //GUARDO LAS COMPRAR EN EL LOCAL STORAGE

  const productosEnCarritoLocal = localStorage.getItem('carritoDeCompras')
  let productosEnCarritoLocalParseado = [];
  if (productosEnCarritoLocal) {
    productosEnCarritoLocalParseado = JSON.parse(productosEnCarritoLocal);
  }
  localStorage.setItem('carritoDeCompras', JSON.stringify(carrito))
}

cargarFiltros();

//SUMO LOS PRECIOS DENTRO DEL CARRITO

let sumaPrecioCarrito = document.getElementById('totalCarrito')

function sumaCarrito () {
  let total = carrito.mostrarCarrito().reduce((acc, producto) => acc + producto.precio, 0)
  sumaPrecioCarrito.innerHTML = `
  <div id="totalCarrito" class="alert alert-primary" role="alert">
  El total dentro del carrito incluyendo SIN IVA es de : $${total}
  </div>
  `
}

//MUESTRO LA INFORMACION DEL LOCAL STORAGE

const cargarProductosDelLocalStorage = () => {
  const carritoString = localStorage.getItem('carritoDeCompras');
  if (carritoString) {
    const carritoParseado = JSON.parse(carritoString);
    const tabla = document.getElementById('tablaCarrito');
    carritoParseado.productosEnElCarrito.forEach((producto) => {
      carrito.agregarAlCarrito(producto)
      tabla.innerHTML += `
    <tr>
      <th>${producto.id}</th>
      <th>${producto.nombre}</th>
      <th>${producto.precio}</th>
    </tr>
  `;
    });

    const total = document.getElementById ('totalCarrito');
    const totalString = carritoParseado.total

      total.innerHTML += `
      <div id="totalCarrito" class="alert alert-primary" role="alert">
          El total dentro del carrito incluyendo IVA (21%) es de : $${totalString}
      </div>
      `;
  }
}
  cargarProductosDelLocalStorage() 

  const finalizarCompra = document.getElementById(`finCompra`).addEventListener('click', function () {
  finalizarCompra.innerHTML += `
  <div>
    <h4>Como desea abonar?</h4>
    <button id="compraEfectivo" type="submit" class="btn btn-primary">Efectivo</button>
    <button id="compraCredito" type="submit" class="btn btn-primary">Credito</button>
  </div>

`
  })
















//SI ES MENOR DE EDAD, EJECUTO ESTO:
  } else if (result.isDenied) {
    Swal.fire('Usted es menor de Edad y no puede comprar en el Sitio!', '', 'warning')
    document.getElementById('containerTitulo').innerHTML += `
    <div id="containerTitulo" class="container mb-3">
      <h1>USTED NO PUEDE ACCEDER AL CONTENIDO DEL SITIO</h1>
      <h2>Es menor de edad!!!</h2>
      <div id="filtroProductos" class="row px-2 gap-3 pt-3"></div>
      <div id="productosFiltrados" class="row px-2 gap-3 pt-3"></div>
    </div>`
  }
})
