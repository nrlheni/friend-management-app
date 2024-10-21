import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

interface UnauthLayoutProps {
    children: ReactNode;
}

const UnauthLayout = ({ children }: UnauthLayoutProps) => {

    return (
        <div className="flex min-h-screen w-full">
            <Toaster />
            <div className="md:w-1/3 sm:w-1/2 bg-white rounded-xl shadow my-8 mx-auto">
                {children}
            </div>
        </div>
    )
}

export default UnauthLayout;