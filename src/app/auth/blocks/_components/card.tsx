import { List } from "@/app/auth/_components/list";

// import { Friend } from "@/app/friends/_schema/friend";
import Data from '@/assets/data.json'
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Card = () => {
    const [searchList, setSearchList] = useState("");

    const filteredDataList = Data.filter((friend) =>
        friend.name.toLowerCase().includes(searchList.toLowerCase()) ||
        friend.email.toLowerCase().includes(searchList.toLowerCase())
    );

    const handleSearchList = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchList(event.target.value);
    };

    return (
        <div className="w-full max-h-screen bg-white rounded-xl p-8 pe-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center mb-1">
                    <p className="font-bold tracking-wide">Blocks</p>
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