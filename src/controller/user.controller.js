const { request, response } = require("express");
const{pool} = require("../database")

function getStart(request, response)
{
    let respuesta = {error: false, codigo: 200, mensaje: 'Punto de inicio'};
    response.send(respuesta);
}

async function postRegister(request, response) {
    try {
        const { name, last_name, email, photo, password } = request.body;
        const sql = "INSERT INTO users (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [name, last_name, email, photo, password]);
        
        if (result.affectedRows > 0) {
            response.json({ error: false, message: "Usuario correctamente registrado", id: result.insertId });
        } else {
            response.json({ error: true, message: "Error al registrar usuario" });
        }
        
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}


async function postLogin (request, response)
{
    try {
        const { email, password } = request.body;
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?"
        const [result] = await pool.query(sql, [email, password]);

        if (result.length > 0){
            const user = {...result[0], password: undefined};
            response.json({error: false, user});
        } else {
            response.json({error: true, mensaje: "Datos incorrectos para inicio de sesión"})
        }

    } catch (error) {
        console.log(error);
    }
}

async function putUsuarios(request, response) {
    try {
        const userId = request.params.id_user; 
        const { name, last_name, email, photo, password } = request.body;

        const sql = `
            UPDATE users
            SET name = ?, last_name = ?, email = ?, photo = ?, password = ?
            WHERE id_user = ?
        `;
        
        const [result] = await pool.query(sql, [name, last_name, email, photo, password, userId]);

        if (result.affectedRows > 0) {
            response.json({ error: false, message: "Información del usuario actualizada correctamente" });
        } else {
            response.json({ error: true, message: "No se pudo actualizar la información del usuario" });
        }

    } catch (error) {
        console.log(error);
        response.status(500).json({ error: true, message: "Error interno del servidor" });
    }
}


module.exports = { getStart, postRegister, postLogin, putUsuarios };
