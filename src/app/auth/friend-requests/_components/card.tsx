import { useState } from "react";

import { List } from "@/app/auth/friend-requests/_components/list";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useFriendRequests } from "../_contexts/friend-request-context";

export const Card = () => {
    const { friendRequests } = useFriendRequests();
    const [searchList, setSearchList] = useState("");

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