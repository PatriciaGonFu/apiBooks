const { Router } = require("express");
const router = Router();
const booksCtrl = require("../controller/books.controller");

router.get("/:id_user/books/:id_book", booksCtrl.getBookParams);

router.get("/:id_user/books", booksCtrl.getBooks);

router.post("/:id_user/books", booksCtrl.postBooks);

router.put("/:id_user/books/:id_book", booksCtrl.putBooks);

router.delete("/:id_user/books/:id_book", booksCtrl.deleteBooks);

module.exports = router;
