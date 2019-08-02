import { Router } from 'express';
import { validateId, validateName } from "../middleware/validation";
import * as ProductController from "../controllers/controllerProduct";

const router = Router(); //our router

//Requests:get,post,put,delete

//return all products  
router.get('/products', ProductController.getAllProducts);

//return specific product
router.get('/products/:id', validateId, ProductController.getProductByID);

//add product to products list
router.post('/products/:name-:categoryId-:itemsInStock', validateName, ProductController.addProduct);

//update product
router.put('/products/:id/:name-:categoryId-:itemsInStock', validateName, validateId, ProductController.updateproduct);

//delete product
router.delete('/products/:id', validateId, ProductController.deleteProduct);

export { router };
