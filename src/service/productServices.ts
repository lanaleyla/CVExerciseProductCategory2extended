import { Product } from "../models/index";
import { productArray } from "../controllers/httpCilentRequests";
import { Request, Response } from 'express';

//load array of categories
export function loadProductsList(): Promise<Product[]> {
    return Promise.resolve(productArray);
}

//check id of products and return the product if found else return undefined
export function getProductById(id: string): Promise<Product | undefined> {
    const matching = productArray.find(o => o.id === id); //id not found
    if (matching === undefined) {
        return Promise.reject(new Error("id not found"));
    }
    else return Promise.resolve(matching);
}

//add product to products array
export function addProductToArray(productP: Product) {
    productArray.push(productP);
}

//update product 
export function updateProductInArray(index: number, productP: Product) {
    productArray[index] = productP;
}

//delete product
export function deleteProduct(index: number) {
    productArray.splice(index, 1);
}

//sleep function 
export function sleep(ms: number) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

//find the index of the entered id
export function findIndexProducts(req: Request, res: Response) {
    const id = req.params.id;
    const matchingIndexP = productArray.findIndex(o => o.id === id);    //search in products list
    if (matchingIndexP < 0) {
        throw new Error("id not found");
    }
    else {
        res.locals.matchingIndex = matchingIndexP;
    }
}
