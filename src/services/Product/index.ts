"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createProduct = async(data : FormData)=>{
    try{
      
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
            method : "POST",
            headers : {
                Authorization : (await cookies()).get("accessToken")!.value ||"",
            },
            body : data,
        });
        revalidateTag("PRODUCT")
        return res.json();

    }catch(error : any){
        return Error(error);
    }
}
export const getAllProducts = async(page ?: string)=>{
    try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}`,
        {
            next : {
                tags: ["PRODUCT"]
            }
        }
    );

    return res.json();
    }catch(error : any){
        return Error(error);
    }
}
//get single product
export const getSingleProduct = async( productId : string)=>{
    try{
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,{
    next: {
        tags: ["PRODUCT"],
    }
   })
   const data = await res.json();
   return data;
    }catch(error: any){
        return Error(error);
    }
};
//update product
export const updateProduct = async(
    productData : FormData,
    productId : string,
)=>{
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,{
        method: "PATCH",
        body : productData,
        headers : {
            Authorization : (await cookies()).get("accessToken")!.value,
        },
      });
      revalidateTag("PRODUCT");
      return res.json();
    }catch(error : any){
      return Error(error);
    }
}