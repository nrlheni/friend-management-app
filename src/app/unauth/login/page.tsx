import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "../api";

import { useCookies } from 'react-cookie';
import { useToast } from "@/hooks/use-toast";

const Login = () => {

    const formSchema = z.object({
        email: z.string().min(1, {
            message: "Email is required.",
        }),
        password: z.string().min(1, {
            message: "Password is required",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const [cookies, setCookie] = useCookies(['userId', 'userName', 'userEmail']);
    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await login(values);

            if (!cookies.userId) {
                setCookie('userId', response.data.id.toString(), {path: '/friend/list'});
                setCookie('userName', response.data.name, {path: '/friend/list'});
                setCookie('userEmail', response.data.email, {path: '/friend/list'});
            }

            toast({
                description: "Logged In Successfully",
            });

            setTimeout(() => {
                window.location.href = '/friend/list';
            }, 3000);

        } catch (error) {
            console.error(error);
            toast({
                description: "Something Wrong.",
            });
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-12 items-start justify-between gap-6">
            <div className="w-full flex flex-col items-end">
                <h2 className="font-bold text-2xl">Sign In</h2>
                <p className="font-medium text-sm">Login to use ConnectMate.</p>
            </div>
            <div className="w-full justify-start">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <Button className="bg-sidebar-active hover:bg-sidebar-active hover:opacity-80" type="submit">Login</Button>
                    </form>
                </Form>
            </div>

            <p className="font-medium text-sm mx-auto">Don't have an account? <Link to="/register"><span className="text-sidebar-active hover:text-sidebar-active hover:opacity-90">Sign Up</span></Link></p>
        </div>
    );
};

export default Login;
