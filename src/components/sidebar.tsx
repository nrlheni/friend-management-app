import { Ban, ChevronRight, Handshake, UserPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { Link, useLocation } from "react-router-dom";

const routes = [
    // {
    //     icon: KeyRound,
    //     label: "Dashboard",
    //     path: "/",
    // },
    {
        icon: Users,
        label: "Friend List",
        path: "/friend/list",
    },
    {
        icon: UserPlus,
        label: "Friend Requests",
        path: "/friend/requests",
    },
    {
        icon: Ban,
        label: "Blocks",
        path: "/friend/blocks",
    },
];

export const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-60 min-h-screen bg-white p-6 shadow-sm flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex flex-col items-start gap-4">
                <div className="w-full flex flex-row items-center justify-start gap-2 mx-auto">
                    <Handshake />
                    <h2 className="font-semibold text-base text-start">ConnectMate</h2>
                </div>
                <div className="w-full flex flex-col gap-2 items-start justify-center mx-auto">
                    {routes.map(({ icon: Icon, label, path }, index) => (
                        <Link key={index} to={path} className="w-full">
                            <div className={`w-full flex flex-row items-center gap-4 rounded-md py-2.5 px-2
                                    ${location.pathname === path ? 'bg-sidebar-active' : ''}
                                    hover:bg-sidebar-active hover:cursor-pointer group`}
                            >
                                <div className="border-2 group-hover:border-primary-light group-focus:border-primary-light rounded-md p-1">
                                    <Icon size={12} className={`group-hover:text-primary-light group-focus:text-primary-light
                                        ${location.pathname === path ? 'border-primary-light text-primary-light' : 'border-secondary-dark text-secondary-dark'}`} />
                                </div>
                                <div className={`text-xs group-hover:text-primary-light group-focus:text-primary-light font-medium
                                    ${location.pathname === path ? 'text-primary-light' : 'text-secondary-dark'}`}>
                                    {label}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Section (Menubar) */}
            <div className="w-full mt-5">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="w-full">
                            <div className="w-full flex flex-row items-center justify-between rounded-md px-2 hover:cursor-pointer">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    <Avatar className="size-8">
                                        <AvatarImage src="https://github.com/johndoe.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="text-xs group-hover:text-primary-light font-medium">John Doe</div>
                                </div>
                                <ChevronRight size={16} className="text-secondary-dark ms-auto" />
                            </div>
                        </MenubarTrigger>
                        <MenubarContent className="size-10">
                            <Link to={"/login"} >
                                <MenubarItem className="w-full text-xs my-auto cursor-pointer hover:bg-primary-light">
                                    Log Out
                                </MenubarItem>
                            </Link>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
};
