import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ban, CircleCheck, CircleX, Info, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Friend } from "@/app/auth/friends/_schema/friend";

interface ListProps {
    data: Friend[];
    action: 'none' | 'request' | 'block' | 'approval';
    withDetail: boolean;
}

export const List = ({ data, action, withDetail }: ListProps) => {
    const [pendingRequests, setPendingRequests] = useState<number[]>([]);
    const [blockedFriends, setBlockedFriends] = useState<Map<number, boolean>>(new Map());

    const handleRequestClick = (friendId: number) => {
        if (pendingRequests.includes(friendId)) {
            setPendingRequests((prev) => prev.filter(id => id !== friendId));
        } else {
            setPendingRequests((prev) => [...prev, friendId]);
        }
    };

    const toggleBlock = (friendId: number) => {
        setBlockedFriends(prev => new Map(prev).set(friendId, !prev.get(friendId)));
    };

    return (
        <>
            {data.length === 0 ? (
                <div className="flex justify-center text-xs font-semibold">
                    No result available
                </div>
            ) : (
                data.map((friend) => {
                    const isBlocked = blockedFriends.get(friend.id) || false;

                    return (
                        <div key={friend.id} className="w-full flex flex-col gap-2 items-center rounded-xl hover:bg-primary-light">
                            <div className="w-full flex flex-row justify-between items-center p-2 pe-4">
                                <div className="w-full flex flex-row gap-2 items-center justify-start">
                                    <Avatar className="size-12">
                                        <AvatarImage src={friend.imgUrl} alt={friend.name} />
                                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start justify-start">
                                        <div className="text-xs font-extrabold">{friend.name}</div>
                                        <div className="text-xs font-medium">{friend.email}</div>
                                    </div>
                                </div>
                                {withDetail && (
                                    <Dialog>
                                        <DialogTrigger>
                                            <Info
                                                size={20}
                                                className="text-primary-dark hover:cursor-pointer hover:scale-110 me-2"
                                            />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg bg-white">
                                            <div className="w-full flex flex-col gap-2 items-center justify-start">
                                                <Avatar className="size-16">
                                                    <AvatarImage src={friend.imgUrl} alt={friend.name} />
                                                    <AvatarFallback className="border border-white bg-sidebar-active text-white">{friend.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-sm font-extrabold">{friend.name}</div>
                                                    <div className="text-sm font-medium">{friend.email}</div>
                                                    <AlertDialog>
                                                    {!isBlocked ? (
                                                        <AlertDialogTrigger asChild>
                                                            <div
                                                                className={`flex flex-row items-center text-sm text-white gap-1 rounded-full hover:cursor-pointer hover:scale-110 px-2 py-1 mt-2 ${isBlocked ? 'bg-secondary-dark' : 'bg-error'}`}
                                                            >
                                                                <Ban size={16} />
                                                                <div className="text-sm font-medium">Block</div>
                                                            </div>
                                                        </AlertDialogTrigger>
                                                    ) : (
                                                        <div
                                                            className={`flex flex-row items-center text-sm text-white gap-1 rounded-full px-2 py-1 mt-2 bg-secondary-dark`}
                                                        >
                                                            <Ban size={16} />
                                                            <div className="text-sm font-medium">Blocked</div>
                                                        </div>
                                                    )}

                                                    {!isBlocked && (
                                                        <AlertDialogContent className="fixed">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Block <span>{friend.name}</span>?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This user will be automatically removed from your friend list.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogAction
                                                                    onClick={() => toggleBlock(friend.id)}
                                                                >
                                                                    Block
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    )}
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 border border-secondary-light rounded-lg">
                                                <div className="flex justify-start text-xs font-semibold px-3 mt-2">You're both friends with:</div>
                                                <div className="flex flex-col max-h-[50vh] overflow-y-auto px-2" style={{scrollbarGutter: 'stable'}}>
                                                    <List data={data} action="none" withDetail={false} />
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}

                                {/* Conditional action rendering */}
                                {action === 'request' && (
                                    pendingRequests.includes(friend.id) ? (
                                        <div
                                            className="rounded-lg bg-sidebar-active/20 text-sidebar-active py-1 px-2 text-center uppercase text-[8px] font-semibold tracking-wider cursor-pointer"
                                            onClick={() => handleRequestClick(friend.id)}
                                        >
                                            Pending
                                        </div>
                                    ) : (
                                        <UserRoundPlus
                                            size={20}
                                            className="text-primary-dark hover:cursor-pointer hover:scale-110"
                                            onClick={() => handleRequestClick(friend.id)}
                                        />
                                    )
                                )}

                                {action === 'approval' && (
                                    <div className="flex flex-row gap-2 items-center">
                                        <CircleCheck size={20} className="text-success hover:cursor-pointer hover:scale-110" />
                                        <CircleX size={20} className="text-error hover:cursor-pointer hover:scale-110" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};
