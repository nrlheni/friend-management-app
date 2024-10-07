import { List } from "@/app/auth/_components/list";

// import { Friend } from "@/app/friends/_schema/friend";
import Data from '@/assets/data.json'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Card = () => {
    const [searchList, setSearchList] = useState("");
    const [searchUser, setSearchUser] = useState("");

    const filteredDataList = Data.filter((friend) =>
        friend.name.toLowerCase().includes(searchList.toLowerCase()) ||
        friend.email.toLowerCase().includes(searchList.toLowerCase())
    );
    const filteredDataUser = Data.filter((friend) =>
        friend.email.toLowerCase().includes(searchUser.toLowerCase())
    );

    const handleSearchList = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchList(event.target.value);
    };
    const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value);
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
                                    onChange={handleSearchUser}
                                />

                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-dark" size={20} />
                            </div>
                            <div className="flex flex-col max-h-[40vh] overflow-y-auto p-2" style={{scrollbarGutter: 'stable'}}>
                                <List data={filteredDataUser} action="request" withDetail={false}/>
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
                    <List data={filteredDataList} action="block" withDetail/>
                </div>
            </div>
        </div>
    )
}