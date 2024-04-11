# API de Gestión de usuario de Banco

Este es un proyecto que implementa un sistema de gestión de usuarios utilizando Node.js, Express y Sequelize para la base de datos.

## Descripción
El objetivo de este proyecto es proporcionar una API para gestionar usuarios. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos de usuarios. Cada usuario tiene un nombre, un monto asociado, un plazo y un estado.

## Requisitos previos
Asegúrate de tener instalado Node.js y npm en tu máquina antes de comenzar con el proyecto.

## Instalación
Clona este repositorio en tu máquina local:

```markdown
git clone https://github.com/CAntonioGQ/API-TS-Seq-Nodemon
```

Instala las dependencias del proyecto:

```markdown
npm install
```

Configura tu base de datos MySQL en el archivo `db/connection.ts`.

Ejecuta el servidor:

```markdown
npm run start
```

## Uso
Puedes acceder a la API a través de las siguientes rutas:

- GET /api/usuarios: Obtiene todos los usuarios.
- GET /api/usuarios/:id: Obtiene un usuario por su ID.
- POST /api/usuarios: Crea un nuevo usuario.
- PUT /api/usuarios/:id: Actualiza un usuario existente.
- DELETE /api/usuarios/:id: Elimina un usuario por su ID.

## Estructura del Proyecto
- `controllers/usuarios.controller.ts`: Contiene las funciones de controlador para gestionar los usuarios.
- `db/connection.ts`: Configuración de la conexión a la base de datos utilizando Sequelize.
- `models/usuario.ts`: Definición del modelo de Usuario utilizando Sequelize.
- `routes/usuarios.routes.ts`: Definición de las rutas de la API utilizando Express.
- `server.ts`: Configuración del servidor Express.

## Contribución
Las contribuciones son bienvenidas. Si tienes alguna sugerencia o encuentras algún error, no dudes en abrir un issue o enviar un pull request.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
