import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ban, Info } from "lucide-react";
import { useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Friend } from "../_schema/friend";

interface ListProps {
    data: Friend[];
    withDetail: boolean;
}

export const List = ({ data, withDetail }: ListProps) => {

    const getInitials = useMemo(() => (name: string) => {
        if (!name) return '';

        const nameParts = name.trim().split(' ');
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
        const secondInitial = nameParts.length > 1 ? nameParts[1]?.charAt(0).toUpperCase() : '';

        return `${firstInitial}${secondInitial}`;
    }, []);

    const getRandomColor = useMemo(() => () => {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#9B59B6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);


    return (
        <>
            {data.length === 0 ? (
                <div className="flex justify-center text-xs font-semibold">
                    No result available
                </div>
            ) : (
                data.map((friend) => {
                    const bgColor = getRandomColor();

                    return (
                        <div key={friend.id} className="w-full flex flex-col gap-2 items-center rounded-xl hover:bg-primary-light">
                            <div className="w-full flex flex-row justify-between items-center p-2 pe-4">
                                <div className="w-full flex flex-row gap-2 items-center justify-start">
                                    <Avatar className="size-12">
                                        <AvatarImage src="" alt="" />
                                        <AvatarFallback className="text-white" style={{backgroundColor: bgColor}}>
                                            {getInitials(friend.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start justify-start">
                                        <div className="text-xs font-extrabold">{friend.name}</div>
                                        <div className="text-xs font-medium">{friend.email}</div>
                                    </div>
                                </div>
                                {withDetail && (
                                    <Dialog>
                                        <DialogTrigger>
                                            <Info size={20} className="text-primary-dark hover:cursor-pointer hover:scale-110 me-2" />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg bg-white">
                                            <div className="w-full flex flex-col gap-2 items-center justify-start">
                                                <Avatar className="size-12">
                                                    <AvatarImage src="" alt="" />
                                                    <AvatarFallback className="text-white" style={{backgroundColor: bgColor}}>
                                                        {getInitials(friend.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-sm font-extrabold">{friend.name}</div>
                                                    <div className="text-sm font-medium">{friend.email}</div>
                                                    <div className={`flex flex-row items-center text-sm text-white gap-1 rounded-full px-2 py-1 mt-2 bg-secondary-dark`}>
                                                        <Ban size={16} />
                                                        <div className="text-sm font-medium">Blocked</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 border border-secondary-light rounded-lg">
                                                <div className="flex justify-start text-xs font-semibold px-3 mt-2">You're both friends with:</div>
                                                <div className="flex flex-col max-h-[50vh] overflow-y-auto px-2" style={{scrollbarGutter: 'stable'}}>
                                                    <List data={data} withDetail={false} />
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};
