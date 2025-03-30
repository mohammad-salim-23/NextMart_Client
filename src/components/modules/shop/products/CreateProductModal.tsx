"use client";

import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/ImagePreviewer";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { createProduct } from "@/services/Product";
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

const fieldNames = [
  "name",
  "description",
  "price",
  "stock",
  "weight",
  "category",
  "brand",
  "availableColors",
  "processor",
  "ram",
  "storage",
  "display",
  "keyFeatures",
] as const;

interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  stock: string;
  weight: string;
  category: string;
  brand: string;
  availableColors: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  keyFeatures: string;
}

const CreateProductModal = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    defaultValues: fieldNames.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {} as Record<typeof fieldNames[number], string>),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      const formattedData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        weight: Number(data.weight),
        availableColors: data.availableColors.split(",").map((color) => color.trim()),
        keyFeatures: data.keyFeatures.split(",").map((feature) => feature.trim()),
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
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product.");
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fieldNames.map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                      <FormControl>
                        <Input
                          type={
                            ["price", "stock", "weight"].includes(fieldName) ? "number" : "text"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Image Previewer Section */}
            <div className="mt-6">
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

            <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
