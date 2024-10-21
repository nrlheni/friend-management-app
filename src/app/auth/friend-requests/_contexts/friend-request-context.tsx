import { createContext, useContext, useState, useEffect } from "react";
import { getFriendRequestList } from "../../api";
import { useToast } from "@/hooks/use-toast";
import { useCookies } from "react-cookie";
import { FriendRequest } from "../_schema/friend-request";

interface FriendRequestsContextProps {
    friendRequests: FriendRequest[];
    refreshFriendRequests: () => void;
}

const FriendRequestsContext = createContext<FriendRequestsContextProps | undefined>(undefined);

export const FriendRequestsProvider = ({ children }: { children: React.ReactNode }) => {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [cookies] = useCookies(['userEmail']);
    const { toast } = useToast();

    const fetchFriendRequests = async () => {
        try {
            const response = await getFriendRequestList({ email: cookies.userEmail });
            setFriendRequests(response.data.requests);
        } catch (err) {
            toast({ description: "Something went wrong." });
        }
    };

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    return (
        <FriendRequestsContext.Provider value={{ friendRequests, refreshFriendRequests: fetchFriendRequests }}>
            {children}
        </FriendRequestsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFriendRequests = () => {
    const context = useContext(FriendRequestsContext);
    if (!context) {
        throw new Error("useFriendRequests must be used within a FriendRequestsProvider");
    }
    return context;
};
