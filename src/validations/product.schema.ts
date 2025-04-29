import { z } from "zod";

// Define the product category schema

// Define the main product schema
export const CreateNewProductBody = z.object({
	product_name: z.string(),
	product_thumb: z.string(),
	product_images: z.array(z.string()),
	product_price: z.number(),
	product_description: z.string().optional(),
	product_quantity: z.number(),
	product_stock: z.number().optional(),
	product_category: z.string(),
	product_brand: z.string(),
	product_attributes: z.object({}),
	product_auth: z.string().optional(),
});

export type CreateNewProductType = z.TypeOf<typeof CreateNewProductBody>;
