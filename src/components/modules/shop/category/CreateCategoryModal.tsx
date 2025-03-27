import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Form, SubmitHandler, useForm } from "react-hook-form";
  
  const CreateCategoryModal = ()=>{
      const form = useForm();
       const onSubmit : SubmitHandler<FieldValues> = async (data)=>{
            try{
            console.log(data);
            }catch(err : any){
              console.error(err);
            }
        }
   return(
    <Dialog>
   <DialogTrigger asChild>
        <Button >Create category</Button>
      </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create product category</DialogTitle>
      
      </DialogHeader>
           <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
      
              
         
                  
                </form>
              </Form>
    </DialogContent>
  </Dialog>
   )

  }
  export default CreateCategoryModal;