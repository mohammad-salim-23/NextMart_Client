"use server"
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
export const registerUser = async( userData: FieldValues)=>{
    try{
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`,{
    method : "POST",
    headers: {
        "Content-Type" : "application/json",
    },
    body : JSON.stringify(userData),
   });
   const result = await res.json();

   if(result.success){
    (await cookies()).set("accessToken", result?.data?.accessToken)
   }
   return result;

    }catch(error : any){
        return Error(error);
    }
}
export const loginUser = async( userData: FieldValues)=>{
    try{
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,{
    method : "POST",
    headers: {
        "Content-Type" : "application/json",
    },
    body : JSON.stringify(userData),
   });
   const result = await res.json();

   if(result.success){
    (await cookies()).set("accessToken", result?.data?.accessToken)
   }
   return result;

    }catch(error : any){
        return Error(error);
    }
}