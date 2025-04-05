import AttributePhone from "./AttributePhone";

export type ProductCategory = "phone" | "laptop" | "tablet";

export const AttributeProduct: Record<ProductCategory, JSX.Element> = {
	phone: <AttributePhone></AttributePhone>,
	laptop: <></>,
	tablet: <></>,
};

export function AttributesForm(props: { category: ProductCategory }) {
	const { category } = props;

	return AttributeProduct[category];
}
