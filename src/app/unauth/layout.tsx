import { ReactNode } from "react";

interface UnauthLayoutProps {
    children: ReactNode;
}

const UnauthLayout = ({ children }: UnauthLayoutProps) => {

    return (
        <div className="flex min-h-screen w-full">
            <div className="w-1/3 bg-white rounded-xl shadow my-8 mx-auto">
                {children}
            </div>
        </div>
    )
}

export default UnauthLayout;