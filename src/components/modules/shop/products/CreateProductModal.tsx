"use client";
import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/ImagePreviewer";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/services/Product";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";
import { toast } from "sonner";

const CreateProductModal = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      weight: "",
      category: "",
      brand: "",
      availableColors: "",
      processor: "",
      ram: "",
      storage: "",
      display: "",
      keyFeatures: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formattedData = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        weight: Number(data.weight),
        category: data.category,
        brand: data.brand,
        availableColors: data.availableColors.split(",").map((color: any) => color.trim()),
        keyFeatures: data.keyFeatures.split(",").map((feature: any) => feature.trim()),
        specification: {
          processor: data.processor,
          ram: data.ram,
          storage: data.storage,
          display: data.display,
        },
      };
     
      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedData));
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await createProduct(formData);
      console.log(res.message);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "description", "price", "stock", "weight", "category", "brand", "availableColors", "processor", "ram", "storage", "display", "keyFeatures"].map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as keyof FieldValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                      <FormControl>
                        <Input type={fieldName === "price" || fieldName === "stock" || fieldName === "weight" ? "number" : "text"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="">
              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              ) : (
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Images"
                />
              )}
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;