import { getProductById } from "@/lib/actions";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const singleProduct = await getProductById(id);

  return (
    <div>
      <h2>{singleProduct.title}</h2>
      <img src={singleProduct.image} alt={singleProduct.title} />
    </div>
  );
};

export default ProductDetails;
