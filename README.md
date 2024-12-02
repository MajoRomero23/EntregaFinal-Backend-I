# Backend-I-EntregaFinal

Entrega final del curso de codehouse del curso de Backend I 

## Objetivos generales 
#### - Contar con Mongo como sistema de persistencia principal
#### - Definir todos los endpoints para trabajar con productos y carritos

## Objetivos específicos 
#### - Profesionalizar las consultas de productos con filtros, paginación y ordenamiento
#### - Profesionalizar la gestion de carritos para implementar conceptos vistos


## Instalación

Puedes copiar el código en el repositorio

```Instala las dependencias con: 
  npm install 
```

```Ejecuta la aplicació de manera local con: 
  npm start
```

# API de Productos

Este proyecto proporciona una API para gestionar productos.

## Método GET

El método **GET** devuelve un objeto con el siguiente formato:

```json
{
  "status": "success/error",
  "payload": "Resultado de los productos solicitados",
  "totalPages": "Total de páginas",
  "prevPage": "Página anterior",
  "nextPage": "Página siguiente",
  "page": "Página actual",
  "hasPrevPage": "Indicador para saber si la página previa existe",
  "hasNextPage": "Indicador para saber si la página siguiente existe.",
  "prevLink": "Link directo a la página previa (null si hasPrevPage=false)",
  "nextLink": "Link directo a la página siguiente (null si hasNextPage=false)"
}
```

## Explicación de los campos 
**Status**: Indica si la solicitud fue exitosa o fallida (success o error).

**payload**: 
Los productos solicitados como resultado de la consulta.

**totalPages**: El número total de páginas de productos disponibles.

**prevPage**: El número de la página anterior, si existe.

**nextPage**: 
El número de la página siguiente, si existe.

**page**: 
El número de la página actual.

**hasPrevPage**: 
Booleano que indica si hay una página previa.

**hasNextPage**: 
Booleano que indica si hay una página siguiente.

**prevLink**: 
Un enlace directo a la página anterior, si existe, o null si no.

**nextLink**: 
Un enlace directo a la página siguiente, si existe, o null si no.

# Endpoints de Carts

A continuación se detallan los endpoints que se deben agregar al router de **carts**:

### DELETE `api/carts/:cid/products/:pid`
Este endpoint elimina un producto específico del carrito.

**Descripción**:
- Elimina el producto con el `pid` (ID del producto) del carrito con el `cid` (ID del carrito).

### PUT `api/carts/:cid`
Este endpoint actualiza el carrito con un arreglo de productos.

**Descripción**:
- Recibe un arreglo de productos para actualizar el carrito, con el formato especificado en el modelo de productos.

### PUT `api/carts/:cid/products/:pid`
Este endpoint actualiza solo la cantidad de ejemplares de un producto específico en el carrito.

**Descripción**:
- Recibe la cantidad de ejemplares para el producto con el `pid` (ID del producto) en el carrito con el `cid` (ID del carrito).
- Solo se actualizará la cantidad de dicho producto.

### DELETE `api/carts/:cid`
Este endpoint elimina todos los productos del carrito.

**Descripción**:
- Elimina todos los productos del carrito con el `cid` (ID del carrito).

## Modelo de Carts

El modelo **Carts** debe tener la propiedad `products`, que será un arreglo de objetos. Cada objeto debe contener solo el ID del producto que hace referencia al modelo de **Products**. 

### Modificación en la Ruta `/:cid`

Se debe modificar la ruta `/api/carts/:cid` para que, al traer todos los productos del carrito, se realice un **populate** de los productos. Esto permitirá obtener los detalles completos de cada producto en el carrito, ya que solo se almacenará el ID del producto, pero al solicitar el carrito, los productos serán desplegados con sus datos completos.

## Authors

- [@MajoRomero23](https://github.com/MajoRomero23)

