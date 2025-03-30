/* eslint-disable @typescript-eslint/no-unused-vars */
import ManageProducts from "@/components/modules/shop/product";
import { getAllProducts } from "@/services/Product";


const AllProductCategoryPage = async ()=>{
    const {data , meta} = await getAllProducts();
    return (
        <div>
            <ManageProducts products={data}></ManageProducts>
        </div>
    )
}
export default AllProductCategoryPage;