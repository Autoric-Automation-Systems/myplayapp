import MsgPage from "@/components/layout/msgPage";
import ProfileCard from "./ProfileCard";
import DeleteCard from "./DeleteCard";
import { CurrentUser } from "@/lib/utils";

export default async function ProfilePage() {
    const user = await CurrentUser();
    if (!user) return null;
    return (
        <div className="p-3 sm:p-6 max-w-2xl mx-auto space-y-6">
            <MsgPage />
            <ProfileCard />
            <DeleteCard user={user!} />
        </div>
    );
}