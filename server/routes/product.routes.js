const ProductController = require("../controllers/product.controller")
const { authenticate, isLoggedIn } = require("../config/jwt.config")

module.exports = (app) => {
  app.get("/api/allProducts", ProductController.getAll)
  app.get("/api/getThree", ProductController.getThree)
  app.get("/api/product/:id", ProductController.getOne)
  app.post("/api/addProduct", authenticate, ProductController.addOne)
  app.get("/api/product/user/:id", authenticate, ProductController.findUser)
  app.put("/api/edit/:id", authenticate, ProductController.updateOne)
  app.delete("/api/delete/:id", ProductController.deleteOne)
}
