import { z } from "zod";

// Define the product category schema
const ProductCategorySchema = z.enum(["phone", "laptop", "tablet"]);

const CombinedAttributesSchema = z.object({
	brand: z.string().optional(),
	ram: z.string().optional(),
	screen: z.string().optional(),
	storage_capacity: z.string().optional(),
	ssd: z.string().optional(),
	cpu: z.string().optional(),
	pin: z.string().optional(),
	product_auth: z.string().optional(),
});

// Define the main product schema
export const CreateNewProductBody = z.object({
	product_name: z.string(),
	product_thumb: z.string(),
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
