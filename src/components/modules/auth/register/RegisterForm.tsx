"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";


const RegisterForm = ()=>{

    const onSubmit = (data)=>{
        console.log(data);
    }
    const form = useForm();
    return (
        <div className="max-w-md">
           <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
  <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel />
        <FormControl>
        <Input  {...field} value={field.value || ""}/>
        </FormControl>
       
        <FormMessage />
      </FormItem>
    )}
   
  />
   <Button type = "submit">Register</Button>
  </form>
</Form>

        </div>
    )
}
export default RegisterForm;