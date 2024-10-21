import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {

    return (
        <div className="flex min-h-screen w-full">
            <Toaster />
            <div className="w-full flex flex-row mx-auto">
                <div className="h-screen">
                    <Sidebar />
                </div>
                <div className="min-w-[800px] h-screen py-6 px-12 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;