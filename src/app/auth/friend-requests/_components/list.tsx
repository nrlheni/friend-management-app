import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ban, CircleCheck, CircleX, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FriendRequest } from "../_schema/friend-request";
import { useToast } from "@/hooks/use-toast";
import { getMutualList, BlockFriend, AcceptRejectRequest } from "../../api";
import { useCookies } from "react-cookie";

interface ListProps {
    data: FriendRequest[];
    withDetail: boolean;
}

export const List = ({ data, withDetail }: ListProps) => {
    const [mutuals, setMutuals] = useState<FriendRequest[]>([]);

    const [cookies] = useCookies(['userId', 'userName', 'userEmail']);
    const { toast } = useToast();

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

    const handleBlock = async (friendName: string, friendEmail: string) => {
        try {
            await BlockFriend({ requester: cookies.userEmail, block: friendEmail });

            toast({
                description: `You're blocked ${friendName}`,
            });

        } catch (error) {
            toast({
                description: "Failed to block",
            });
        }
    };

    const fetchMutuals = async (friendEmail: string) => {
        try {
            const response = await getMutualList([cookies.userEmail, friendEmail]);
            setMutuals(response.data.friends);
        } catch (err) {
            throw new Error('failed to fetch mutuals');
        }
    };

    const handleAcceptReject = async (friendRequestID: number, status: "accepted" | "rejected") => {
        try {
            await AcceptRejectRequest({ friendRequestID, status });
            toast({
                description: `Request ${status}`,
            });
        } catch (error) {
            toast({
                description: `Failed to ${status} request`,
            });
        }
    };

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
                                            {getInitials(friend.requesterName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start justify-start">
                                        <div className="text-xs font-extrabold">{friend.requesterName}</div>
                                        <div className="text-xs font-medium">{friend.requesterEmail}</div>
                                    </div>
                                </div>
                                {withDetail && (
                                    <Dialog>
                                        <DialogTrigger>
                                            <Info size={20} onClick={() => fetchMutuals(friend.requesterEmail)} className="text-primary-dark hover:cursor-pointer hover:scale-110 me-2" />
                                        </DialogTrigger>
                                        <DialogHeader>
                                            <DialogTitle></DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <DialogContent className="sm:max-w-lg bg-white">
                                            <div className="w-full flex flex-col gap-2 items-center justify-start">
                                                <Avatar className="size-12">
                                                    <AvatarImage src="" alt="" />
                                                    <AvatarFallback className="text-white" style={{backgroundColor: bgColor}}>
                                                        {getInitials(friend.requesterName)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-sm font-extrabold">{friend.requesterName}</div>
                                                    <div className="text-sm font-medium">{friend.requesterEmail}</div>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <div className={`flex flex-row items-center text-sm text-white gap-1 rounded-full hover:cursor-pointer hover:scale-110 px-2 py-1 mt-2 bg-error`}>
                                                                <Ban size={16} />
                                                                <div className="text-sm font-medium">Block</div>
                                                            </div>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="fixed">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Block <span>{friend.requesterName}</span>?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This user will be automatically removed from your friend list.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogAction onClick={() => handleBlock(friend.requesterName, friend.requesterEmail)}>
                                                                    Block
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                            {mutuals.length > 0 && (
                                                <div className="flex flex-col gap-1 border border-secondary-light rounded-lg py-2">
                                                    <div className="flex justify-start text-xs font-semibold px-3 mt-2">You're both friends with:</div>
                                                    <div className="flex flex-col max-h-[50vh] overflow-y-auto px-2" style={{scrollbarGutter: 'stable'}}>
                                                        <List data={mutuals} withDetail={false} />
                                                    </div>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                )}

                                {friend.status === 'pending' && (
                                    <div className="flex flex-row gap-2 items-center">
                                        <CircleCheck
                                            size={20}
                                            className={`text-success hover:cursor-pointer hover:scale-110`}
                                            onClick={() => handleAcceptReject(friend.id, "accepted")}
                                        />
                                        <CircleX
                                            size={20}
                                            className={`text-error hover:cursor-pointer hover:scale-110`}
                                            onClick={() => handleAcceptReject(friend.id, "rejected")}
                                        />
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
