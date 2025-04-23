-- Insertar varios clientes (las ids se asignan automáticamente):
INSERT INTO clientes (comensales, email, last_name, name, telefono)VALUES(2, 'juan.perez@example.com', 'Pérez', 'Juan', '555-1234');
-- Insertar varias mesas (las ids se asignan automáticamente):
INSERT INTO asignacion (capacidad, disponible)VALUES(4,  TRUE);
INSERT INTO horario (confirmada, fecha, hora, mesa_id, user_id)VALUES(TRUE, '2023-12-21', '19:30:00', 1, 1);  -- Confirmada, mesa 1, cliente 1

