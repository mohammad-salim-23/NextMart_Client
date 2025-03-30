import ManageBrand from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/Brand";

const BrandPage = async()=>{
    const {data} = await  getAllBrands();
    return (
        <div>
        <ManageBrand Brand = {data}/>
        </div>
    )
}
export default BrandPage;