import { useEffect, useState } from "react";

import { List } from "@/app/auth/friend-requests/_components/list";
import { FriendRequest } from "@/app/auth/friend-requests/_schema/friend-request";
import { getFriendRequestList } from "@/app/auth/api";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCookies } from "react-cookie";
import { useToast } from "@/hooks/use-toast";

export const Card = () => {
    const [searchList, setSearchList] = useState("");
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

    const [cookies] = useCookies(['userId', 'userName', 'userEmail']);
    const { toast } = useToast();

    const fetchFriendRequests = async () => {
        try {
            const response = await getFriendRequestList({ email: cookies.userEmail});
            setFriendRequests(response.data.requests);
        } catch (err) {
            toast({
                description: "Something Wrong.",
            });
        }
    };
    useEffect(() => {

        fetchFriendRequests();
    }, []);

    const filteredDataList = friendRequests?.filter((friend) =>
        (friend?.requesterName?.toLowerCase() || "").includes(searchList.toLowerCase()) ||
        (friend?.requesterEmail?.toLowerCase() || "").includes(searchList.toLowerCase())
    );

    const handleSearchList = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchList(event.target.value);
    };
    return (
        <div className="w-full max-h-screen bg-white rounded-xl p-8 pe-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center mb-1">
                    <p className="font-bold tracking-wide">Friend Requests</p>
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
                    <List data={filteredDataList} withDetail />
                </div>
            </div>
        </div>
    )
}