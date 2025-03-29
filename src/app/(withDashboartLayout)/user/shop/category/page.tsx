import ManageCategories from "@/components/modules/shop/category"
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = async()=>{
  const { data , meta} = await getAllCategories();
    return (
        <div>
      <ManageCategories categories = {data}>

      </ManageCategories>
        </div>
    )
}
export default ProductCategoryPage ;