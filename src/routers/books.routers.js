const { Router } = require("express");
const router = Router();
const booksCtrl = require("../controller/books.controller");

router.get("/books/:id_user/:id_book", booksCtrl.getBookParams);

router.get("/books/:id_user", booksCtrl.getBooks);

router.post("/books", booksCtrl.postBooks);

router.put("/books", booksCtrl.putBooks);

router.delete("/books/:id_book", booksCtrl.deleteBooks);

module.exports = router;
