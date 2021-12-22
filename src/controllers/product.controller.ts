/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import Product from '@models/product.model';
import Brand from '@models/brand.model';
import Provider from '@models/provider.model';
import Tax from '@models/tax.model';

interface ITax {
    name: string;
    percentage: number;
}

interface IBrand {
    name: string;
}

interface IProvider {
    name: string;
    contact: string;
}

interface IProduct {
    sku: string;
    name: string;
    price: number;
    cost: number;
    stock: number;
    taxes: Array<ITax>;
    description: string;
    weight: number;
    brand: IBrand;
    boughtAt: Array<Date>;
    provider: IProvider;
}

const productController = {
    create: async (req: Request, res: Response) => {
        try {
            const prod: IProduct = req.body as any;
            const { taxes, brand, provider } = prod;

            const existingProduct = await Product.findOne({ sku: prod.sku });

            if (existingProduct)
                throw { status: 400, content: 'SKU already in use' };

            let brandSaved = await Brand.findOne({ name: brand.name });

            if (!brandSaved) {
                brandSaved = new Brand(brand);
                await brandSaved.save();
            }

            let providerSaved = await Provider.findOne({ contact: provider.contact });

            if (!providerSaved) {
                providerSaved = new Provider(provider);
                await providerSaved.save();
            }

            const taxesSaved = [];
            for(const t of taxes) {
                let savedTax = await Tax.findOne({ name: t.name });

                if (!savedTax) {
                    savedTax = new Tax(t);
                    await savedTax.save();
                }

                taxesSaved.push(savedTax);
            }

            const newProduct = new Product({
                ...prod,
                brand: brandSaved._id,
                provider: providerSaved._id,
                taxes: taxesSaved.map((t): any => t._id)
            })

            await newProduct.save();
            await newProduct.populate('taxes', '-_id -__v');
            await newProduct.populate('provider', '-_id -__v');
            await newProduct.populate('brand', '-_id -__v');

            return res.status(201).json({ content: newProduct });
        } catch(err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    }
}

export default productController;
