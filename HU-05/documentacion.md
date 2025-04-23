# feat/HU-5: Backend con CRUD completo y documentación Postman

## 🎯 Historia de Usuario

**Como** desarrollador del sistema,  
**quiero** disponer de un backend con operaciones CRUD completas y documentado,  
**para** gestionar las reservas, clientes y mesas del restaurante de manera eficiente y probarlo desde Postman.

---

## ⚙️ Tecnologías Utilizadas

- Java 17
- Spring Boot 3
- Spring Data JPA
- Base de datos: MariaDB
- Herramienta de pruebas: Postman

---

## 📁 Entidades Implementadas

### `Cliente`
- `id`: Long
- `name`: String
- `lastName`: String
- `email`: String
- `telefono`: String
- `comensales`: Integer

### `Mesa` (`TableReservation`)
- `id`: Long
- `capacidad`: Integer
- `disponible`: boleean

### `Time`
- `id`: Long
- `confirmada`: Boolean
- `fecha`: LocalDate
- `hora`: LocalTime
- `mesa_id`: Mesa
- `cliente_id`: Cliente

---

## 🛠️ Funcionalidad del Backend

Se implementaron controladores REST para las entidades mencionadas. Cada uno incluye:

- `GET /entidad`: Listar todos
- `GET /entidad/{id}`: Obtener por ID
- `POST /entidad`: Crear nuevo
- `PUT /entidad/{id}`: Actualizar existente
- `DELETE /entidad/{id}`: Eliminar

### Ejemplo de uso en Postman:

#### ➕ Crear Cliente
```
{   
    "name": "Lucía",  
     "lastName": "García",  
      "email": "lucia@example.com,  
      "telefono": "3101234567",   
       "comensales": 4   
}
```
## 2. Obtener Reservas
### Método: GET
```
URL: {{BASE_URL}}/reservas
```
#### Recupera todas las reservas existentes.

## 3. Obtener Reserva por ID
### Método: GET
```
URL: {{BASE_URL}}/reservas/{id}
```
#### Recupera una reserva específica por su ID.

## 4. Actualizar Reserva
### Método: PUT
```
URL: {{BASE_URL}}/reservas/{id}
```

## Cuerpo (JSON):
```
{
  "fecha": "2025-04-24",
  "hora": "20:00:00",
  "cliente": {
    "name": "Ana Gómez",
    "telefono": "987654321",
    "email": "ana.gomez@example.com",
    "comensales": 6
  },
  "mesa": {
    "id": 3
  }
}
```
#### Actualiza la reserva existente especificada por el ID. Puedes cambiar la fecha, hora, cliente y mesa asignada.

## 5. Eliminar Reserva
### Método: DELETE
```
URL: {{BASE_URL}}/reservas/{id}
```
####  Elimina una reserva especificada por el ID.

## 6. Obtener Mesas 
### Método: GET
```
URL: {{BASE_URL}}/mesas
```
#### Recupera todas las mesas.

## 7. Crear Cliente
### Método: POST
```
URL: {{BASE_URL}}/clientes
```
####  Crea un nuevo cliente que se puede usar en una reserva.

## 8. Obtener Cliente por ID
### Método: GET
```
URL: {{BASE_URL}}/clientes/{id}
```
#### Obtiene los detalles de un cliente específico por su ID.

## Ejemplo de Respuesta en Postman
### Respuesta al Crear Reserva:
```
{
  "id": 1,
  "fecha": "2025-04-23",
  "hora": "19:30:00",
  "cliente": {
    "name": "Carlos Pérez",
    "telefono": "123456789",
    "email": "carlos.perez@example.com",
    "comensales": 4
  },
  "mesa": {
    "id": 2
  }
}
```

