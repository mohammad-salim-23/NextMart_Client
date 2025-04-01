import UpdateProductForm from "@/components/modules/shop/product/UpdateProductForm";
import { getSingleProduct } from "@/services/Product";

const UpdateProductPage = async({
    params,
}: {
    params: Promise<{ productId : string}>;
})=>{
 
    const {productId} = await params;

    const {data : product} = await getSingleProduct(productId);

    return (
        <div>
            <UpdateProductForm product={product}/>
        </div>
    )
}
export default UpdateProductPage;