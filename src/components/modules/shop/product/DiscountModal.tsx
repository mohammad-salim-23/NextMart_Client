"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,

  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Dispatch, SetStateAction } from "react";

import {
  FieldValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";
import { toast } from "sonner";

type TModalProps = {
    selectedIds : string[];
    setSelectedIds : Dispatch<SetStateAction<string[] | []>>;
}
const DiscountModal = ( {selectedIds , setSelectedIds}: TModalProps) => {
  
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
   
    const modiiedData = {
        products : [...selectedIds],
        discountPercentage: parseFloat(data?.discountPercentage),
    };

    try{
      
    }catch(err : any){
        console.error(err);
    }

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  disabled={!selectedIds.length} size="sm">
            Add Flash Sale
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Flash Sale</DialogTitle>
        </DialogHeader>

      
        <FormProvider {...form}>
          <form className="flex items-center gap-2"
          onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                 
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""}
                    className="rounded-sm w-56" 
                    placeholder="Discount Percentage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

     

            <Button type="submit" className="w-1/2 rounded-sm">
              {isSubmitting ? "Adding...." : "Add"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default  DiscountModal ;
