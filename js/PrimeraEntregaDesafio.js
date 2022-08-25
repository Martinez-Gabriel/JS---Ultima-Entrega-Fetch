const misProductos = [
  {
    id: 1,
    nombre: 'intel i5 9600k',
    marca: 'intel',
    tipo: 'procesador',
    precio: 35000
  },
  {
    id: 2,
    nombre: 'AMD Ryzen 3600X',
    marca: 'AMD',
    tipo: 'procesador',
    precio: 45000
  },
  {
    id: 3,
    nombre: 'Aorus ultra gaming 2.0',
    marca: 'Aorus',
    tipo: 'motherboard',
    precio: 45000
  },
  {
    id: 4,
    nombre: 'intel i7 9700k',
    marca: 'intel',
    tipo: 'procesador',
    precio: 45000
  },
  {
    id: 5,
    nombre: 'intel i9 9900k',
    marca: 'intel',
    tipo: 'procesador',
    precio: 55000
  },
  {
    id: 6,
    nombre: 'SSD Kingstone 250GB',
    marca: 'Kingstone',
    tipo: 'almacenamiento',
    precio: 20000
  },
  {
    id: 7,
    nombre: 'HDD 1TB',
    marca: 'Wester Digital',
    tipo: 'almacenamiento',
    precio: 10000
  },
  {
    id: 8,
    nombre: 'HDD 2TB',
    marca: 'Wester Digital',
    tipo: 'almacenamiento',
    precio: 17000
  },
  {
    id: 9,
    nombre: 'aorus b450 pro wifi',
    marca: 'Aorus',
    tipo: 'motherboard',
    precio: 55000
  },
  {
    id: 10,
    nombre: 'asus tuf gaming b450m plus 2',
    marca: 'Asus',
    tipo: 'motherboard',
    precio: 65000
  },
]

class Carrito {
  constructor() {
    this.productosEnElCarrito = []
    this.total = 0
  }
  agregarAlCarrito(producto) {
    this.productosEnElCarrito.push(producto)
    this.calcularPrecioTotalMasIva()
  }
  mostrarCarrito() {
    return this.productosEnElCarrito
  }
  calcularPrecioTotalMasIva() {
    this.total = this.productosEnElCarrito.reduce((acc, val) => acc + val.precio * 1.21, 0)
    return this.total
  }
}

class Productos {
  constructor() {
    this.productos = []
  }
  cargarProducto(producto) {
    // validar si el producto ya existe
    this.productos.push(producto)
  }

  mostrarProductos() {
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

debugger

alert('Bienvenidos a la tienda PROYECT-HARDWARE')

let menu = 0

while (menu != -1) {
  menu = +prompt(
    'Ingrese el producto que desea comprar: \n \n 1 - Procesadores \n 2 - Mothers \n 3 - Almacenamiento \n \n Escriba -1 para terminar'
  )
//Empieza la Opcion Numero: 1 -Procesadores
 
  if (menu === 1) {
    const productosPorProcesador = productos.mostrarProductos().filter((producto) => {
      return '\n', producto.tipo === 'procesador'
    })
    const listado = productosPorProcesador.map(
      (producto) => 'Número: ' + producto.id + ' - ' + 'Producto' + producto.nombre + '\n'
    )

    let buscarSeleccion

    while (!buscarSeleccion) {
      seleccion = +prompt('Seleccione el número de producto que desea comprar: \n' + listado)

      buscarSeleccion = productosPorProcesador.find((producto) => producto.id === seleccion)
      if (!buscarSeleccion) {
        alert('Ingrese un número correcto por favor')
      }
    }

    carrito.agregarAlCarrito(buscarSeleccion)
    alert(
      'Producto agregado exitosamente, su carrito es \n' + JSON.stringify(carrito.mostrarCarrito())
    )
    alert('Total hasta el momento: $' + carrito.calcularPrecioTotalMasIva())
  } 
  
  //Termina La Opcion Numero: 1 -Procesadores

  //Empieza la Opcion Numero: 2 -Motherboards
  else if(menu === 2) {
    const productosPorMotherboard = productos.mostrarProductos().filter((producto) => {
      return producto.tipo === 'motherboard'
    })
    const listado = productosPorMotherboard.map(
      (producto) => 'Número: ' + producto.id + ' - ' + 'Producto' + producto.nombre + '\n'
    )

    let buscarSeleccion

    while (!buscarSeleccion) {
      seleccion = +prompt('Seleccione el número de producto que desea comprar: \n' + listado)

      buscarSeleccion = productosPorMotherboard.find((producto) => producto.id === seleccion)
      if (!buscarSeleccion) {
        alert('Ingrese un número correcto por favor')
      }
    }

    carrito.agregarAlCarrito(buscarSeleccion)
    alert(
      'Producto agregado exitosamente, su carrito es \n' + JSON.stringify(carrito.mostrarCarrito())
    )
    alert('Total hasta el momento: $' + carrito.calcularPrecioTotalMasIva())
  }

  //Termina La Opcion Numero: 2 -Motherboards

  //Empieza la Opcion Numero: 3 -Almacenamiento
  else if(menu === 3) {
    const productosPorAlmacenamiento = productos.mostrarProductos().filter((producto) => {
      return producto.tipo === 'almacenamiento'
    })
    const listado = productosPorAlmacenamiento.map(
      (producto) => 'Número: ' + producto.id + ' - ' + 'Producto' + producto.nombre + '\n'
    )

    let buscarSeleccion

    while (!buscarSeleccion) {
      seleccion = +prompt('Seleccione el número de producto que desea comprar: \n' + listado)

      buscarSeleccion = productosPorAlmacenamiento.find((producto) => producto.id === seleccion)
      if (!buscarSeleccion) {
        alert('Ingrese un número correcto por favor')
      }
    }
    carrito.agregarAlCarrito(buscarSeleccion)
    alert(
      'Producto agregado exitosamente, su carrito es \n' + JSON.stringify(carrito.mostrarCarrito())
    )
    alert('Total hasta el momento: $' + carrito.calcularPrecioTotalMasIva())
  }
  
  //Termina La Opcion Numero: 3 -Almacenamiento
  //Sino Ingrese una opcion valida!!!

    else if (menu !=-1){
    alert('ATENCION!!!, Ingrese una opcion valida!')
  }
}

//Muestro el precio de los productos + IVA 21%
alert ('El total a pagar es de: $' + carrito.calcularPrecioTotalMasIva())

//Guardo valor total + IVA en una variable llamada total
let total = carrito.calcularPrecioTotalMasIva();


function calcularTresCuotas (total) {
  totalParseado = parseInt(total);
  totalParseado = totalParseado + (totalParseado * 30) / 100;
  alert('Precio + 30% de interes: '+ totalParseado);
  totalParseado = totalParseado / 3;
  alert('Son 3 Cuotas y el valor de cada una es de: $'+ totalParseado);
}

function calcularSeisCuotas (total) {
  totalParseado = parseInt(total);
  totalParseado = totalParseado + (totalParseado * 40) / 100;
  alert('Precio + 40% de interes: '+ totalParseado);
  totalParseado = totalParseado / 6;
  alert('Son 6 Cuotas y el valor de cada una es de: $'+ totalParseado);
}

function calcularDoceCuotas (total) {
  totalParseado = parseInt(total);
  totalParseado = totalParseado + (totalParseado * 60) / 100;
  alert('Precio + 60% de interes: '+ totalParseado);
  totalParseado = totalParseado / 12;
  alert('Son 12 Cuotas y el valor de cada una es de: $'+ totalParseado);
}
//Pregunto al usuario si desea abonar en Cuotas
respuesta = prompt ('Desea abonar en Cuotas? S/N');
if (respuesta != 'N') {
    respuesta = prompt ('Ingrese la cantidad de cuotas que desea: 3, 6 o 12')
    switch (respuesta) {
        case "3":
            calcularTresCuotas(total);
            break;
        case "6":
            calcularSeisCuotas(total);
            break;
        case "12":
            calcularDoceCuotas(total);
            break;
    }
}else {
    alert ('Precio total a pagar en efectivo es de: $'+ total);
}

alert ('Gracias por su compra en el simulador de Gabriel Martinez!');