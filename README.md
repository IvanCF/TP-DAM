![header](imagenes/header.png)

## Proyecto DAM - IOT - UBA

## Autores del proyecto
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

![dashboard](imagenes/principal.png)

## Prerequisitos para el proyecto
* Node js
* Express js
* Npm
* Ionic
* Sqlite

## Imagenes Docker 
Se debe ejecutar las siguientes imagenes necesarias para el proyecto:
```
docker pull harmish/typescript
docker pull mysql:5.7
docker pull phpmyadmin/phpmyadmin
docker pull abassi/nodejs-server:10.0-dev
```

Para conocer más sobre la estructura interna, se puede revisar la Wiki [this link](https://github.com/ce-iot/daw-project-template/wiki).

## Instrucciones de uso
Para iniciar y levantar la aplicación se debe ejecutar:
```
docker-compose up
```
## Urls Importantes:

* Sever local para ver la aplicación: http://localhost:8000
* Server para gestión de Mysql usando PhpMyadmin: http://localhost:8001 

## Tecnologías Frontend:
* Typescript
* HTML5
* Materialize

## Tecnologías Backend:
* Node Js
* Express Js
* Mysql
## Base de datos:
Para la persistencia de datos se usa:

* Base de datos: smart_home
* Tabla: Devices

Estructura:

![basedatos](doc/basedatos.png)

## Operaciones
Imagen que muestra las operaciones implementadas, cada operación tiene efecto en la base de datos.

![operaciones](doc/operaciones.png)

Operación de agregar un nuevo dispositivo mediante una ventana modal.

![operaciones2](doc/operaciones2.png)

Despues de agregar o realizar alguna acción sobre las opciones del dashboard, la lista de dispositivos se actualizará con los nuevos cambios realizados.

## Licence

This project is published under GPLV3+ licence.

![footer](doc/footer.png)

