"use client"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "../registerValidation";
import Link from "next/link";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";


const RegisterForm = ()=>{

    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
        console.log(data);
    }
    const form = useForm({
        resolver : zodResolver (registrationSchema)
    });
 const password = form.watch("password");
 const passwordConfirm = form.watch("passwordConfirm");

    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
        <div className="flex items-center space-x-4 ">
          <Logo />
          <div>
            <h1 className="text-xl font-semibold">Register</h1>
            <p className="font-extralight text-sm text-gray-600">
              Join us today and start your journey!
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ""} />
                  </FormControl>
                  {
                    passwordConfirm && password !== passwordConfirm ?
                   ( <FormMessage>Password does not match</FormMessage>)
                   : (
                    <FormMessage/>
                   )
                  }

                </FormItem>
              )}
            />
            <Button
                disabled = {Boolean(passwordConfirm && password !== passwordConfirm)}
                type = "submit"
                className="mt-5 w-full"
            >
               Register
            </Button>
  
            {/* <Button
              disabled={passwordConfirm && password !== passwordConfirm}
              type="submit"
              className="mt-5 w-full"
            >
              
            </Button> */}
          </form>
        </Form>
        <p className="text-sm text-gray-600 text-center my-3">
          Already have an account ?
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    )
}
export default RegisterForm;