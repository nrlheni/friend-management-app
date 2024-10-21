import { useCookies } from "react-cookie";
import { Card } from "./_components/card";
import { FriendsProvider } from "./_contexts/friend-context";

const Index = () => {
    const [cookies] = useCookies(['userName']);
    const userName = cookies.userName;

    return (
        <FriendsProvider>
            <div className="flex flex-col gap-4">
                <h4 className="font-medium tracking-wide capitalize">Hello {userName.split(" ")[0]} 👋🏼,</h4>
                <Card />
            </div>
        </FriendsProvider>
    )
}

export default Index;