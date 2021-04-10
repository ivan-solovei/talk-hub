import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.modal'
import { nanoid } from 'nanoid'

@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(name: string,
        desc: string,
        quantity: number,
        price: number) {
        const id = nanoid()
        let item = new Product(id, name, desc, quantity, price)
        this.products.push(item)
        return id
    }

    getProducts() {
        return [...this.products]
    }

    getProduct(productID: string) {
        let item = this.findProduct(productID)
        if (!item) {
            throw new NotFoundException("No such item exist!");
        }
        return { ...item }
    }

    updateProduct(item: {
        name: string,
        desc: string,
        prodID: string,
        price: number,
        quantity: number
    }) {

        let existing = this.findProduct(item.prodID)
        if (!existing) {
            throw new NotFoundException("No such product exist!");
        }

        Object.keys(existing).forEach(key => {
            if (item[key]) {
                existing[key] = item[key]
            }
        })

        return existing
    }

    deleteProduct(prodID: string) {
        let existing = this.findProduct(prodID)
        if (!existing) {
            throw new NotFoundException("No such product exist!");
        }
        this.products.splice(this.products.findIndex(el => el.id == prodID), 1)

        return null
    }

    //find the product with specific id in the product array
    private findProduct(id: string) {
        return this.products.find(el => el.id == id)
    }
}