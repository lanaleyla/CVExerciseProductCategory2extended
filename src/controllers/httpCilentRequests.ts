import { createHttpClient } from '../utils/http-client';
import { getConfig } from '../utils/configuration';
import { initConfig } from "../utils/configuration";
import { Product } from '../models';
import { Category } from '../models';
import uuidv1 from 'uuid/v1';

initConfig();

export let productArray: Product[] = []; //list of products
export let categoriesArray: Category[] = [];

const client = createHttpClient(`http://localhost:${getConfig('PORT', 3000)}`);


export function loadCategories() {
    client.get('/static/categories.json')
        .then(response => {
            categoriesArray = response.Category;
            //assign uniqe id's to the products list 
            for (let i = 0; i < categoriesArray.length; i++) {
                categoriesArray[i].id = uuidv1();
                console.log(categoriesArray[i]);
            }
        })
        .catch(error => {
            console.log("error");
        })
}

export function loadProducts() {
    client.get('/static/products.json')
        .then(response => {
            sleep(1000);
            productArray = response.Product;
            //assign uniqe id's to the products list 
            for (let i = 0; i < productArray.length; i++) {
                productArray[i].id = uuidv1();
                if(i<3)
                {
                    productArray[i].categoryId = categoriesArray[0].id;

                }
                else{
                    productArray[i].categoryId = categoriesArray[1].id;
                }
                console.log(productArray[i]);
            }
        })
        .catch(error => {
            console.log("error");
        })
}

//sleep function 
export function sleep(ms: number) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}