import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { register } from "../api";
import { useToast } from "@/hooks/use-toast";

const Login = () => {

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Name is required.",
        }),
        email: z.string().min(1, {
            message: "Email is required",
        }),
        password: z.string().min(1, {
            message: "Password is required",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await register(values);

            toast({
                description: "Congrats! Now you are registered. Please Log in",
            })

            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
        } catch (error) {
            console.error(error);
            toast({
                title: "Something Wrong."
            })
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-12 items-start justify-between gap-6">
            <div className="w-full flex flex-col items-end">
                <h2 className="font-bold text-2xl">Sign Up</h2>
                <p className="font-medium text-sm">Create account to use ConnectMate.</p>
            </div>
            <div className="w-full justify-start">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="w-full" placeholder="enter your full name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" className="w-full" placeholder="example@mail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="w-full" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="bg-sidebar-active hover:bg-sidebar-active hover:opacity-80" type="submit">Register</Button>
                    </form>
                </Form>
            </div>

            <p className="font-medium text-sm mx-auto">Already have an account? <Link to="/login"><span className="text-sidebar-active hover:text-sidebar-active hover:opacity-90">Sign In</span></Link></p>
        </div>
    );
};

export default Login;
