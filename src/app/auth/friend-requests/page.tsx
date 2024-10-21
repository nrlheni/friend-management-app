import { useCookies } from "react-cookie";
import { Card } from "./_components/card";
import { FriendRequestsProvider } from "./_contexts/friend-request-context";

const Index = () => {
    const [cookies] = useCookies(['userId', 'userName', 'userEmail']);
    const userName = cookies.userName;

    return (
        <FriendRequestsProvider>
            <div className="flex flex-col gap-4">
                <h4 className="font-medium tracking-wide capitalize">Hello {userName.split(" ")[0]} 👋🏼,</h4>
                <Card />
            </div>
        </FriendRequestsProvider>
    )
}

export default Index;