# Comparación de Rendimiento entre PostgreSQL y MongoDB

Este proyecto tiene como objetivo comparar el rendimiento de PostgreSQL y MongoDB en operaciones masivas de datos. Se implementaron pruebas para evaluar la generación, modificación y eliminación de datos en ambas bases de datos utilizando Node.js.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Docker y Docker Compose en tu máquina. Esto es necesario para ejecutar las instancias de MongoDB y PostgreSQL en contenedores aislados.

## Configuración

Clona el repositorio en tu máquina local usando:

```bash
git clone https://github.com/hadominguez/prueba-rendimiento.git
cd prueba-rendimiento
```

## Uso

Para levantar los servicios y comenzar a realizar pruebas, utiliza el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

Esto construirá la imagen de la aplicación y levantará tres servicios definidos en el `docker-compose.yml`:

- `postgres`: Una instancia de PostgreSQL.
- `mongo`: Una instancia de MongoDB.
- `app`: La aplicación Node.js que ejecuta las pruebas.

### Configuración del Entorno

Asegúrate de configurar las variables de entorno necesarias para conectar correctamente con las bases de datos. Estas se definen en el archivo `docker-compose.yml` bajo el servicio `app`:

- `DB_HOST`: El host para PostgreSQL.
- `DB_PORT`: El puerto para PostgreSQL.
- `DB_USER`: El usuario para PostgreSQL.
- `DB_PASS`: La contraseña para PostgreSQL.
- `DB_NAME`: El nombre de la base de datos PostgreSQL.
- `MONGO_HOST`: El host para MongoDB.
- `MONGO_PORT`: El puerto para MongoDB.
- `MONGO_USER`: El usuario para MongoDB.
- `MONGO_PASS`: La contraseña para MongoDB.
- `MONGO_NAME`: El nombre de la base de datos MongoDB.

## Pruebas

Las pruebas se pueden iniciar automáticamente al levantar el servicio de la aplicación. Para ver los detalles de las pruebas y los resultados, puedes consultar los logs de Docker o acceder a los endpoints expuestos por la aplicación:

- `http://localhost:3000/api/mongo/masivo/generar/:cantidad`
- `http://localhost:3000/api/postgres/masivo/generar/:cantidad`
- Otros endpoints detallados en la documentación del proyecto.

## Contacto

Hernán Domínguez - dhariel2904@gmail.com

Proyecto de Materia: Diseño de Bases de Datos, Universidad Nacional de La Plata.