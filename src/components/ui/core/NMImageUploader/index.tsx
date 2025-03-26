'use client'
import {  SetStateAction,} from "react"
import { Input } from "../../input";
import { cn } from "@/lib/utils";

type TImaageUploaderProps={
    label?: string;
    className?: string;
    setImageFiles: React.Dispatch<SetStateAction<[] | File[]>>;
    setImagePreview: React.Dispatch<SetStateAction<string[]>>;
}
const NMImageUploader = ({label="Upload Images",className,setImageFiles , setImagePreview} : TImaageUploaderProps)=>{

   
    const handleImageChange = (event : React.ChangeEvent<HTMLInputElement> )=>{
        //HTMLInputElement -> file upload korar jonno use kora hoy
        const file = event.target.files![0];
        setImageFiles((prev)=> [...prev, file]);

        if(file){
            const reader = new FileReader();//file read korbe, read kore , upload howar pore data uel link e convert kore dibe
            reader.readAsDataURL(file);
            reader.onloadend =() =>{
                setImagePreview((prev)=> [...prev, reader?.result as string]);
            };

           event.target.value = ""; 
        }
    };

    return (
        <div className={cn("flex flex-col items-center w-full gap-4", className)}> 
        {/* cn-> eita utlity function shadcn provide kore */}
            <Input
            onChange={handleImageChange}
            type = "file"
            multiple
            accept="image/*"
            className="hidden"
            id="image-uploader"
            />
            <label className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition" htmlFor = "image-uploader">
               {label}
                </label>

            
        </div>
    )
}
export default NMImageUploader;