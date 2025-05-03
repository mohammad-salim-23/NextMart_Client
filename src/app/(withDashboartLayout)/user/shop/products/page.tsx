/* eslint-disable @typescript-eslint/no-unused-vars */
import ManageProducts from "@/components/modules/shop/product";
import { getAllProducts } from "@/services/Product";


const AllProductCategoryPage = async ({
    searchParams,
} : {
    searchParams : Promise <{page: string}>
})=>{
    const {page} = await searchParams;
    const {data , meta} = await getAllProducts(page, "2");
    console.log("all products",data);
    return (
        <div>
            <ManageProducts products={data} meta={meta}></ManageProducts>
          
        </div>
    )
}
export default AllProductCategoryPage;