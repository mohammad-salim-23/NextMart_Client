/* eslint-disable @typescript-eslint/no-unused-vars */
import ManageCategories from "@/components/modules/shop/category"
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = async()=>{
  const { data , meta} = await getAllCategories();
   console.log(data);
    return (
        <div>
      <ManageCategories categories = {data}>

      </ManageCategories>
        </div>
    )
}
export default ProductCategoryPage ;