import * as CategoryService from "../service/categoryServices";
import { Request, Response, NextFunction } from 'express';
import { Category, Product } from "../models/index";
import uuidv1 from 'uuid/v1';

//get all the categories list
export function getAllCategories(req: Request, res: Response, next: NextFunction) {
    CategoryService.sleep(1000);
    CategoryService.loadCategoriesList()
        .then((data) => {
            res.send(data);
            res.status(201);
        })
        .catch((err) => next(err));
}

//return specific category by given id
export async function getCategoryByID(req: Request, res: Response, next: NextFunction) {
    CategoryService.sleep(1000);
    const id = req.params.id;
    CategoryService.getCategoryById(id)
        .then((data) => {
            res.send(data),
                res.status(201)
        })
        .catch((err) => {
            next(err);
        });
}

//add category to categories list
export function addcategory(req: Request, res: Response) {
    CategoryService.sleep(1000);
    const category: Category = req.body;
    category.id = uuidv1();      //assign id
    category.name = req.params.name;
    CategoryService.addCategoryToArray(category);
    res.status(201).send(category);
}

//update category 
export function updatecategory(req: Request, res: Response) {
    CategoryService.sleep(1000);
    const category: Category = req.body;
    const id = req.params.id;
    CategoryService.findIndexCategories(req, res);
    const { matchingIndex } = res.locals; //fix it according to what you updated
    category.id = id; //assign updated category
    category.name = req.params.name
    CategoryService.updateCategoryInArray(matchingIndex, category);
    res.send(category);
}

//delete category by id
export function deletecategory(req: Request, res: Response) {
    CategoryService.sleep(1000);
    CategoryService.findIndexCategories(req, res);
    const { matchingIndex} = res.locals; //fix it according to what you updated
    CategoryService.deleteCategory(matchingIndex);
    res.sendStatus(204);
}

export function getAllProductsOfCategory(req: Request, res: Response, next: NextFunction) {
    CategoryService.sleep(1000);
    const id = req.params.id;
    let productsAr: Product[] = [];
    CategoryService.findIndexCategories(req, res);
    res.locals.matchingIndex
    productsAr = CategoryService.findAllProducts(id); //search for products
    if (productsAr.length < 1) {
        res.sendStatus(404);
        return;
    }
    else {
        res.status(201);
        res.send(productsAr);
    }
}