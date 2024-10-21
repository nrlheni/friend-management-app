import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ban, Info, UserRoundPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Friend } from "../_schema/friend";
import { useCookies } from "react-cookie";
import { useToast } from "@/hooks/use-toast";
import { CreateFriendRequest, getMutualList, BlockFriend } from "../../api";
import { useFriends } from "../_contexts/friend-context";

interface ListProps {
    data: Friend[];
    type: 'friend' | 'user'
    withDetail: boolean;
}

export const List = ({ data, type, withDetail }: ListProps) => {
    const { refreshFriends } = useFriends();
    const [pendingRequests, setPendingRequests] = useState<number[]>([]);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [openBlockAlertDialog, setOpenBlockAlertDialog] = useState(false);
    const [mutuals, setMutuals] = useState<Friend[]>([]);

    const [cookies] = useCookies(['userId', 'userName', 'userEmail']);
    const { toast } = useToast();

    const handleRequestClick = async (friendId: number, friendEmail: string) => {
        if (!pendingRequests.includes(friendId)) {
            try {
                await CreateFriendRequest({ requester: cookies.userEmail, to: friendEmail });

                setPendingRequests((prev) => [...prev, friendId]);

                toast({
                    description: "Friend request sent successfully.",
                });

            } catch (error) {
                toast({
                    description: "Failed to send friend request.",
                });
            }
        }
    };

    const handleBlock = async (friendName: string, friendEmail: string) => {
        setOpenBlockAlertDialog(false);
        try {
            await BlockFriend({ requester: cookies.userEmail, block: friendEmail });
            setOpenDetailDialog(false);
            toast({
                description: `You're blocked ${friendName}`,
            });

            refreshFriends();

        } catch (error) {
            toast({
                description: "Failed to block",
            });
        }
    };

    const fetchMutuals = async (friendEmail: string) => {
        setOpenDetailDialog(true);
        try {
            const response = await getMutualList([cookies.userEmail, friendEmail]);
            setMutuals(response.data.friends);
        } catch (err) {
            throw new Error('failed to fetch mutuals');
        }
    };

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
                                    <><Info size={20} onClick={() => fetchMutuals(friend.email)} className="text-primary-dark hover:cursor-pointer hover:scale-110 me-2" />
                                    <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
                                        <DialogTrigger>
                                        </DialogTrigger>
                                        <DialogHeader>
                                            <DialogTitle></DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <DialogContent className="sm:max-w-lg bg-white">
                                            <div className="w-full flex flex-col gap-2 items-center justify-start">
                                                <Avatar className="size-12">
                                                    <AvatarImage src="" alt="" />
                                                    <AvatarFallback className="text-white" style={{ backgroundColor: bgColor }}>
                                                        {getInitials(friend.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-sm font-extrabold">{friend.name}</div>
                                                    <div className="text-sm font-medium">{friend.email}</div>
                                                    <div onClick={() => setOpenBlockAlertDialog(true)} className={`flex flex-row items-center text-sm text-white gap-1 rounded-full hover:cursor-pointer hover:scale-110 px-2 py-1 mt-2 bg-error`}>
                                                        <Ban size={16} />
                                                        <div className="text-sm font-medium">Block</div>
                                                    </div>
                                                    <AlertDialog open={openBlockAlertDialog} onOpenChange={setOpenBlockAlertDialog}>
                                                        <AlertDialogTrigger asChild>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="fixed">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Block <span>{friend.name}</span>?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This user will be automatically removed from your friend list.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogAction onClick={() => handleBlock(friend.name, friend.email)}>
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
                                                    <div className="flex flex-col max-h-[50vh] overflow-y-auto px-2" style={{ scrollbarGutter: 'stable' }}>
                                                        <List data={mutuals} type="friend" withDetail={false} />
                                                    </div>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog></>
                                )}

                                {type === 'user' && (
                                    pendingRequests.includes(friend.id) ? (
                                        <div
                                            className="rounded-lg bg-sidebar-active/20 text-sidebar-active py-1 px-2 text-center uppercase text-[8px] font-semibold tracking-wider cursor-pointer"
                                        >
                                            Pending
                                        </div>
                                    ) : (
                                        <UserRoundPlus
                                            size={20}
                                            className="text-primary-dark hover:cursor-pointer hover:scale-110"
                                            onClick={() => handleRequestClick(friend.id, friend.email)}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};
