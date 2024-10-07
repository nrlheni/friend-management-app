import { useCookies } from "react-cookie";
import { Card } from "./_components/card";

const Index = () => {
    const [cookies] = useCookies(['userId', 'userName', 'userEmail']);
    const userName = cookies.userName;

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium tracking-wide capitalize">Hello {userName.split(" ")[0]} 👋🏼,</h4>
            <Card />
        </div>
    )
}

export default Index;