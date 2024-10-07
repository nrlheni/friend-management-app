import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Navbar = () => {
    return (
        <div className="w-full h-20 bg-white px-12 py-5 shadow">
            <div className="flex flex-row items-center justify-between my-auto">
                <div className="text-primary-dark font-light tracking-wider">ConnectMate</div>
                <div className="flex flex-row gap-6 items-center justify-end">
                    <div className="text-sm font-light">Home</div>
                    <div className="text-sm font-light">Friends</div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}