import AuthHandler from "@/components/AuthHandler";
import DailyIntake from "@/components/DailyIntake";
import UserSetup from "@/components/UserSetup";

export default function Home() {
    return <>
        <AuthHandler />
        <UserSetup />
        <DailyIntake />
    </>
}