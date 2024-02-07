const { request, response } = require("express");
const{pool} = require("../database")

function getStart(request, response)
{
    let respuesta = {error: false, codigo: 200, mensaje: 'Punto de inicio'};
    response.send(respuesta);
}

async function postRegister (request, response)
{
    try {
        const { name, last_name, email, photo, password } = request.body;
        const sql = "INSERT INTO users (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [name, last_name, email, photo, password]);
        response.json({ error: false, id: result.insertId });
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
            response.json({error: true, mensaje: "Datos no correctos para inicio de sesión"})
        }

    } catch (error) {
        console.log(error);
    }
}




module.exports = {getStart, postRegister, postLogin};