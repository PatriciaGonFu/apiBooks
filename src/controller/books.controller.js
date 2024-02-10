const {request, response} = require("express");
const { pool } = require("../database");

function getStart(request, response)
{
    let respuesta = {error: false, codigo: 200, mensaje: 'Punto de inicio'};
    response.send(respuesta);
}

async function getBookParams(request, response) 
{
    let userId = request.params.id_user;
    let bookId = request.params.id_book;
    try{
        const book = await pool.query('SELECT * FROM book WHERE id_book = ? AND id_user = ?', [bookId, userId]);
            if (book.length > 0) {
            response.send(book[0]);
            } else {
            response.send({error: true, codigo: 200, mensaje: 'El usuario no tiene ese libro' });
            }
        }
    catch (error) {
            console.error(error);
        }
}

async function getBooks(request, response) {
    const userId = request.params.id_user;
    try {
        const result = await pool.query('SELECT id_book, title, type, author, price, photo FROM book WHERE id_user = ?', [userId]);
        console.log(result);
        const books = result;

        if (books.length > 0) {
            response.json(books[0]);
        } else {
            response.json({ error: true, codigo: 200, mensaje: 'Usuario sin libros' }); // Enviar respuesta en formato JSON
        }
    } catch (error) {
        console.error(error);
    }
}


async function postBooks(request, response) {
    const userId = request.params.id_user;
    const newBook = request.body;
    try{
        await pool.query('INSERT INTO book SET ?', { ...newBook, id_user: userId });
        response.send({error: false, codigo: 200, mensaje: 'Libro añadido'});
    } catch (error){
        console.error('Error al añadir el libro:', error);
    }
}

async function putBooks(request, response) {
    const userId = request.params.id_user;
    const bookId = request.params.id_book;
    const updatedBook = request.body;
    try{
        await pool.query('UPDATE book SET ? WHERE id_book = ? AND id_user = ?', [updatedBook, bookId, userId]);
        response.send({error:false, codigo: 200, mensaje: 'Libro actualizado'});
    } catch (error){
        console.error('Error al actualizar el libro:', error)
    }
}


async function deleteBooks(request, response) {
    const userId = request.params.id_user;
    const bookId = request.params.id_book;
    try{
        await pool.query('DELETE FROM book WHERE id_book = ? AND id_user = ?', [bookId, userId]);
        response.send({error: false, codigo: 200, mensaje: 'Libro eliminado'});
    } catch(error){
        console.error('Error al eliminar el libro:', error)
    }
}



module.exports = {getStart, getBookParams, getBooks, postBooks, putBooks, deleteBooks}
