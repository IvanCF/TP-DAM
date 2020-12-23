![header](imagenes/header.png)

## Proyecto DAM - IOT - UBA

Autor:
* Ivan Cruz Flores

Docente:

* Brian Ducca


Este proyecto esta formado por:
* Backend: Express Js.
* Frontend: Ionic.
* Base Datos: Sqlite.

Rutas de servicios:
* Backend: http://localhost:3001/
* Frontend: http://localhost:8100/

## Dashboard Principal
Vista principal de la aplicación:

![dashboard](imagenes/presentacion.png)

## Prerequisitos para el proyecto
* Node js
* Express js
* Npm
* Ionic
* Sqlite


## Instalacion de dependencias
Despues de clonar el repositorio se debe instalar las dependencias npm:

1.- Usando la terminal ubicarse dentro de la ruta del Backend.
```
cd TP-DAM/API/

npm install
```
2.- Usando la terminal ubicarse dentro de la ruta del Frontend
```
cd TP-DAM/front/myApp/

npm install

```

## Instrucciones de uso
1.- En la terminal del Backend
```diff

node index.js

- Para algun cambio en index.js, detener el servicio y volver a ejecutarlo in red
```

2.- En la terminal del Frontend
```diff
ionic serve

-Para levantar el frontend demora de 5min a 10 min in red
```
## Urls Importantes:

* Sever local para ver la aplicación: http://localhost:8000
* Server para gestión de Mysql usando PhpMyadmin: http://localhost:8001 


## Base de datos:
Para la persistencia de datos se usa:

* Base de datos: DAM (Archivo local)

Estructura:

![basedatos](imagenes/db.png)

## Operaciones API
* http://localhost:3001/dispositivos/ : retorna json con los dispositivos de la BD.
* http://localhost:3001/dispositivosCompletos/: devuelve mediciones de sensor.
* http://localhost:3001/inicializar/ : inicializar los valores por defecto cuando la BD esta vacio.
* http://localhost:3001/mediciones/:id : retorna los datos del registro codigo id.
* http://localhost:3001/addDispositivo/:nombre/:ubicacion/:electrovalvulaId : registra dispositivos.

## GUI de la App
Listado de sensores
![operaciones](imagenes/lista.png)

Detalle del sensor seleccionado.

![operaciones2](imagenes/detalle.png)

Despues de agregar o realizar alguna acción sobre las opciones del dashboard, la lista de dispositivos se actualizará con los nuevos cambios realizados.

## Licence

This project is published under GPLV3+ licence.


