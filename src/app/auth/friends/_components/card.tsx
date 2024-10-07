import { List } from "@/app/auth/friends/_components/list";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Friend } from "../_schema/friend";
import { getFriendList, getUserList } from "../../api";
import { useToast } from "@/hooks/use-toast";
import { useCookies } from "react-cookie";

export const Card = () => {
    const [searchList, setSearchList] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [friends, setFriends] = useState<Friend[]>([]);
    const [filteredDataUser, setFilteredDataUser] = useState<Friend[]>([]);

    const [cookies] = useCookies(['userId', 'userName', 'userEmail']);
    const { toast } = useToast();

    const fetchFriends = async () => {
        try {
            const response = await getFriendList({ email: cookies.userEmail});
            setFriends(response.data.friends);
        } catch (err) {
            toast({
                description: "Something Wrong.",
            });
        }
    };

    useEffect(() => {

        fetchFriends();
    }, []);

    const filteredDataList = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchList.toLowerCase()) ||
        friend.email.toLowerCase().includes(searchList.toLowerCase())
    );

    const handleSearchUser = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            try {
                const response = await getUserList({email: searchUser});
                const filtered = response.data.filter((friend: Friend) =>
                    friend.email.toLowerCase().includes(searchUser.toLowerCase())
                );
                setFilteredDataUser(filtered);
            } catch (err) {
                toast({
                    description: "Failed to fetch user list.",
                });
            }
        }
    };

    const handleSearchUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value);
    };

    const handleSearchList = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchList(event.target.value);
    };

    return (
        <div className="w-full max-h-screen bg-white rounded-xl p-8 pe-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center mb-1">
                    <p className="font-bold tracking-wide">Friend List</p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="bg-sidebar-active text-white rounded-md text-xs py-2 px-4 cursor-pointer hover:opacity-80">Add</div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg bg-white">
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription>
                                    Find someone to request a friend.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="relative w-full">
                                <Input
                                    type="text"
                                    placeholder="Search by email"
                                    value={searchUser}
                                    className="pl-10"
                                    onChange={handleSearchUserChange}
                                    onKeyDown={handleSearchUser}
                                />

                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-dark" size={20} />
                            </div>
                            <div className="flex flex-col max-h-[40vh] overflow-y-auto p-2" style={{scrollbarGutter: 'stable'}}>
                                <List data={filteredDataUser} type="user" withDetail/>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="relative w-full">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchList}
                        className="pl-10"
                        onChange={handleSearchList}
                    />

                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-dark" size={20} />
                </div>
                <div className="flex flex-col max-h-[50vh] overflow-y-auto p-2" style={{scrollbarGutter: 'stable'}}>
                    <List data={filteredDataList} type="friend" withDetail />
                </div>
            </div>
        </div>
    )
}