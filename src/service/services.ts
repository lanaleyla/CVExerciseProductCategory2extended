import { Product, Category } from "../models/index";
import { productArray, categoriesArray } from "../controllers/httpCilentRequests";
import { Request, Response } from 'express';

//load array of categories
export function loadCategoriesList(): Promise<Category[]> {
    return Promise.resolve(categoriesArray);
}

//load array of categories
export function loadProductsList(): Promise<Product[]> {
    return Promise.resolve(productArray);
}

//check id of products and return the product if found else return undefined
export function checkIdProduct(id: string): Promise<Product | undefined> {
    const matching = productArray.find(o => o.id === id); //id not found
    if (matching === undefined) {
        return Promise.reject(new Error("id not found"));
    }
    else return Promise.resolve(matching);
}

//check id of category and return the category if found else return undefined
export function checkIdCategory(id: string): Promise<Category | undefined> {
    const matching = categoriesArray.find(o => o.id === id); //id not found
    if (matching === undefined) {
        return Promise.reject(new Error("id not found"));
    }
    else return Promise.resolve(matching);
}

//add product to products array
export function addProductToArray(productP: Product) {
    productArray.push(productP);
}

//add category to categories array
export function addCategoryToArray(categoryC: Category) {
    categoriesArray.push(categoryC);
}

//update product 
export function updateProductInArray(index: number, productP: Product) {
    productArray[index] = productP;
}

//update category
export function updateCategoryInArray(index: number, categoryC: Category) {
    categoriesArray[index] = categoryC;
}

//delete product
export function deleteProduct(index: number) {
    productArray.splice(index, 1);
}

//delete category
export function deleteCategory(index: number) {
    categoriesArray.splice(index, 1);
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

//find the index of the entered id
export function findIndexCategories(req: Request, res: Response) {
    const id = req.params.id;
    const matchingIndexC = categoriesArray.findIndex(o => o.id === id); //search in categories list

    if (matchingIndexC < 0) {
        throw new Error("id not found");
    }
    else {
        res.locals.matchingIndex = matchingIndexC;
    }
}

//find products with the given category name, return products list in that category
export function findAllProducts(name: string): Product[] {
    const product: Product[] = [];
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i].categoryId === name) {
            product.push(productArray[i]);
        }
    }
    if (product === undefined) {
        throw new Error("id not found");
    }
    return product;
}

//get the category name 
export function getNameOfCategory(id: string): string {
    const matching = categoriesArray.find(o => o.id === id); //id not found
    if (!matching) {
        throw new Error("id not found");
    }
    else {
        return matching.name;
    }
}
