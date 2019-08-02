import { Router } from 'express';
import { validateId } from "../middleware/validation";
import * as userCategoryController from '../controllers/controllerCategory';

const router = Router(); //our router

//Requests:get,post,put,delete

//return all categories  
router.get("/categories", userCategoryController.getAllCategories);

//return specific category
router.get("/categories/:id", validateId, userCategoryController.getCategoryByID);

//return products list of a specific category
router.get("/categories/:id/products", validateId, userCategoryController.getAllProductsOfCategory);

//add category to categories list
router.post('/categories/:name', userCategoryController.addcategory);

//update category by given id
router.put('/categories/:id/:name', validateId, userCategoryController.updatecategory);

//delete category by id
router.delete('/categories/:id', validateId, userCategoryController.deletecategory);

export { router as routerC };
