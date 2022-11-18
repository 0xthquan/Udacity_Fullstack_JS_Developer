import { ProductsModel, Product } from '../../models/products';

const productModel = new ProductsModel();

describe('Product model', () => {
    const product: Product = {
        id: 1,
        name: 'Test Product',
        price: 500,
        category: 'Test category',
    };

    let createdProduct: Product;
    beforeAll(async () => {
        createdProduct = await productModel.create(product)
    })

    afterAll(async () => {
        await productModel.deleteProduct(createdProduct.id!);
    })

    it('should have create method', () => {
        expect(productModel.create).toBeDefined();
    });

    it('should have index method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have delete method', () => {
        expect(productModel.deleteProduct).toBeDefined();
    });

    it('should have update method', () => {
        expect(productModel.updateProduct).toBeDefined();
    });

    it('test create method', async () => {
        const isCreatedProd = JSON.stringify(createdProduct) === JSON.stringify(product)
        expect(isCreatedProd).toBeTrue
    });

    it('test index method', async () => {
        const productList = await productModel.index();
        expect(JSON.stringify(productList) === JSON.stringify([createdProduct])).toBeTrue;
    });

    it('test update method', async () => {
        const updatedProduct = await productModel.updateProduct(createdProduct.id!, {
            price: 300,
            name: "updated name",
            category: "updated category"
        })

        const isUpdatedProd = JSON.stringify(updatedProduct) === JSON.stringify({
            id: 1,
            price: 300,
            name: "updated name",
            category: "updated category"
        })
        expect(isUpdatedProd).toBeTrue
    });

    it('test delete method', async () => {
        await productModel.create(product)
        const deletedProd = await productModel.deleteProduct(2);
        const productList = await productModel.index();
        let isDeleted = true
        productList.forEach( product => {
            if (JSON.stringify(product) === JSON.stringify(deletedProd)) {
                isDeleted = false
            }
        })
        expect(isDeleted).toBeFalse
    });
});
