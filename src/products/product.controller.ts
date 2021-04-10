import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from './product.service'
@Controller('product')
export class ProductController {
    constructor(private readonly productservice: ProductService) { }

    @Post()
    addproduct(@Body('name') name: string,
        @Body('desc') desc: string,
        @Body('quantity') quantity: number,
        @Body('price') price: number) {
        let id = this.productservice.insertProduct(name, desc, quantity, price);
        return {
            msg: "Product Added Successfully!",
            prodId: id
        }
    }

    @Get()
    getAllProducts() {
        return {
            data: this.productservice.getProducts()
        }
    }

    @Get(':id')
    getProduct(@Param('id') product_id: string) {
        return {
            data: this.productservice.getProduct(product_id)
        }
    }
    @Patch(':id')
    updateProduct(@Param('id') id: string,
        @Body('name') name: string,
        @Body('desc') desc: string,
        @Body('price') price: number,
        @Body('quantity') quantity: number) {
        let updatedproduct = this.productservice.updateProduct({
            name, desc, price, quantity,
            prodID: id
        })
        return {
            msg: "Updated Successfully",
            data: updatedproduct
        }
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodID: string) {
            this.productservice.deleteProduct(prodID);
            return {
                msg:"Deleted Successfully!"
            }
    }

}