


//Mi array de productos
const misProductos = [
  {
    id: 1,
    nombre: 'intel i5 9600k',
    marca: 'intel',
    tipo: 'procesador',
    precio: 35000,
    imagen: '../imagenesProcesadores/intel-core-i5-9600k.jpg'
  },
  {
    id: 2,
    nombre: 'AMD Ryzen 3600X',
    marca: 'AMD',
    tipo: 'procesador',
    precio: 47000,
    imagen: '../imagenesProcesadores/ryzen-3600x.jpg'
  },
  {
    id: 3,
    nombre: 'Aorus ultra gaming 2.0',
    marca: 'Aorus',
    tipo: 'motherboard',
    precio: 42000,
    imagen: '../imagenesProcesadores/aorus-ultra-gaming-2.0.png'
  },
  {
    id: 4,
    nombre: 'intel i7 9700k',
    marca: 'intel',
    tipo: 'procesador',
    precio: 45000,
    imagen: '../imagenesProcesadores/intel-core-i7-9700k.jpg'
  },
  {
    id: 5,
    nombre: 'intel i9 9900k',
    marca: 'intel',
    tipo: 'procesador',
    precio: 55000,
    imagen: '../imagenesProcesadores/intel-core-i9-9900k.jpg'
  },
  {
    id: 6,
    nombre: 'SSD Kingstone 250GB',
    marca: 'Kingstone',
    tipo: 'almacenamiento',
    precio: 20000,
    imagen: '../imagenesProcesadores/ssd-kingston.jpg'
  },
  {
    id: 7,
    nombre: 'HDD 1TB',
    marca: 'Wester Digital',
    tipo: 'almacenamiento',
    precio: 10000,
    imagen: '../imagenesProcesadores/wester-digital-1-tb.jpg'
  },
  {
    id: 8,
    nombre: 'HDD 2TB',
    marca: 'Wester Digital',
    tipo: 'almacenamiento',
    precio: 17000,
    imagen: '../imagenesProcesadores/wester-digital-2-tb.png'
  },
  {
    id: 9,
    nombre: 'aorus b450 pro wifi',
    marca: 'Aorus',
    tipo: 'motherboard',
    precio: 55000,
    imagen: '../imagenesProcesadores/b450-aorus-pro-wifi.jpg'
  },
  {
    id: 10,
    nombre: 'asus tuf gaming b450m plus 2',
    marca: 'Asus',
    tipo: 'motherboard',
    precio: 65000,
    imagen: '../imagenesProcesadores/asus-tuf-gaming-b450m-plus-ii.jpg'
  }
]

const categorias = [
  {
    id: 1,
    nombre: 'procesador',
    imagen: '../imagenesProcesadores/ryzen-3600x.jpg'
  },
  {
    id: 2,
    nombre: 'motherboard',
    imagen: '../imagenesProcesadores/asus-tuf-gaming-b450m-plus-ii.jpg'
  },
  {
    id: 3,
    nombre: 'almacenamiento',
    imagen: '../imagenesProcesadores/wester-digital-1-tb.jpg'
  }
]

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

misProductos.forEach((producto) => {
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


const cargarFiltros = () => {
  const contenedorFiltros = document.getElementById('filtroProductos')

  categorias.forEach((categoria) => {
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

//VALIDO QUE LA SELECCION DE PRODUCTO NO SE REPITA
const mostrarProductosFiltrados = (nombre) => {
  // limpiar el contenedor de productos filtrados...
  if (document.getElementById('productosFiltrados').firstChild) {
    const borrarDiv = document.getElementById('productosFiltrados')
    borrarDiv.innerHTML = ``
  }
  //FIN DE LA VALIDACION
  //FILTRO LOS PRODUCTOS
  const filtrarProductos = misProductos.filter((producto) => producto.tipo === nombre)
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

    document.getElementById(`boton${producto.id}`).addEventListener('click', function () {
      agregarCarrito(producto);
    })
  }
}

function agregarCarrito (productoComprado) {
  // debugger
  carrito.agregarAlCarrito(productoComprado)

  document.getElementById('tablaCarrito').innerHTML += `
    <tr>
      <th>${productoComprado.id}</th>
      <th>${productoComprado.nombre}</th>
      <th>${productoComprado.precio}</th>
    </tr>
  `
  

  //debugger
  //guardo las comprar del carrito en el localStorage
  const productosEnCarritoLocal = localStorage.getItem('carritoDeCompras')
  let productosEnCarritoLocalParseado = [];
  if (productosEnCarritoLocal) {
    productosEnCarritoLocalParseado = JSON.parse(productosEnCarritoLocal);
  }
  localStorage.setItem('carritoDeCompras', JSON.stringify(carrito))
  sumaCarrito()
}

cargarFiltros();

//Sumar los precios dentro del carrito

let sumaPrecioCarrito = document.getElementById('totalCarrito')

function sumaCarrito () {
  carrito.agregarAlCarrito;
  let total = carrito.mostrarCarrito().reduce((acc, producto) => acc + producto.precio , 0)
  sumaPrecioCarrito.innerHTML = `
  <div id="totalCarrito" class="alert alert-primary" role="alert">
      El total dentro del carrito es de : $${total}
  </div>
  `
  const totalCarrito = localStorage.getItem ('totalCarritoSumado')
  let totalCarritoParseado = [];
  if (totalCarrito) {
    totalCarritoParseado = JSON.parse(totalCarrito);
  }
  localStorage.setItem ('totalCarritoSumado', JSON.stringify(total))
  
}

//Muestro la informacion del LocalStorage

const cargarProductosDelLocalStorage = () => {
  const carritoString = localStorage.getItem('carritoDeCompras');
  if (carritoString) {
    const carritoParseado = JSON.parse(carritoString);
    const tabla = document.getElementById('tablaCarrito');
    carritoParseado.productosEnElCarrito.forEach((producto) => {
      tabla.innerHTML += `
    <tr>
      <th>${producto.id}</th>
      <th>${producto.nombre}</th>
      <th>${producto.precio}</th>
    </tr>
  `;
    });
  }
  
}
const totalCarritoString = localStorage.getItem ('totalCarritoSumado');
  if (totalCarritoString) {
    const totalCarritoParseado = JSON.parse(totalCarritoString);
    const alert = document.getElementById('totalCarrito');
      alert.innerHTML += `;
    <div id="totalCarrito" class="alert alert-primary" role="alert">
      El total dentro del carrito es de : $${totalCarritoParseado};
    </div>
  `
}
cargarProductosDelLocalStorage()
