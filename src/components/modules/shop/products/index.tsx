import CreateProductModal from "./CreateProductModal";



const ManageProducts = ()=>{
    return (
        <div>
           <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Manage Products</h1>
          <CreateProductModal/>
           </div>
        </div>
    )
}
export default ManageProducts;