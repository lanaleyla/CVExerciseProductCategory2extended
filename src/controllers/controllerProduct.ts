import * as productService from "../service/productServices";
import { Request, Response, NextFunction } from 'express';
import { Product } from "../models/index";
import uuidv1 from 'uuid/v1';

//get all the categories list
export function getAllProducts(req: Request, res: Response, next: NextFunction) {
    productService.sleep(1000);
    productService.loadProductsList()
        .then((data) => {
            res.send(data);
            res.status(201);
        })
        .catch((err) => next(err));
}

//return specific product
export async function getProductByID(req: Request, res: Response, next: NextFunction) {
    productService.sleep(1000);
    const id = req.params.id;
    productService.getProductById(id)
        .then((data) => {
            res.send(data),
                res.status(201)
        })
        .catch((err) => next(err));
}

//add product to products list
export function addProduct(req: Request, res: Response) {
    productService.sleep(1000);
    const product: Product = req.body;
    product.id = uuidv1();      //assign id
    product.categoryId = req.params.categoryId; //assign new product
    product.name = req.params.name;
    product.itemsInStock = req.params.itemsInStock;
    productService.addProductToArray(product);
    res.status(201).send(product);
}

//update product 
export function updateproduct(req: Request, res: Response) {
    productService.sleep(1000);
    const product: Product = req.body;
    const id = req.params.id;
    productService.findIndexProducts(req, res);
    const { matchingIndex} = res.locals; //fix it according to what you updated
    product.id = id; //assign updated product
    product.name = req.params.name
    product.categoryId = req.params.categoryId;
    product.itemsInStock = req.params.itemsInStock;
    productService.updateProductInArray(matchingIndex, product);
    res.send(product);
}

//delete product by id
export function deleteProduct(req: Request, res: Response) {
    productService.sleep(1000);
    productService.findIndexProducts(req, res);
    const { matchingIndex} = res.locals; //fix it according to what you updated
    productService.deleteProduct(matchingIndex);
    res.sendStatus(204);
}

