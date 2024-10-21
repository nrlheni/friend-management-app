import { createContext, useContext, useState, useEffect } from "react";
import { getFriendList } from "../../api";
import { useToast } from "@/hooks/use-toast";
import { useCookies } from "react-cookie";
import { Friend } from "../_schema/friend";

interface FriendsContextProps {
    friends: Friend[];
    refreshFriends: () => void;
}

const FriendsContext = createContext<FriendsContextProps | undefined>(undefined);

export const FriendsProvider = ({ children }: { children: React.ReactNode }) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [cookies] = useCookies(['userEmail']);
    const { toast } = useToast();

    const fetchFriends = async () => {
        try {
            const response = await getFriendList({ email: cookies.userEmail });
            setFriends(response.data.friends);
        } catch (err) {
            toast({ description: "Something went wrong." });
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <FriendsContext.Provider value={{ friends, refreshFriends: fetchFriends }}>
            {children}
        </FriendsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFriends = () => {
    const context = useContext(FriendsContext);
    if (!context) {
        throw new Error("useFriends must be used within a FriendsProvider");
    }
    return context;
};
