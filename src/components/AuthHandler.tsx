import { useAppStore } from "@/store/useAppStore";
import { LoginForm } from "./Login/LoginForm";
import { SignUpForm } from "./Login/SignUpForm";
import { ForgotPasswordForm } from "./Login/ForgotPassword";
import { UpdatePasswordForm } from "./Login/UpdatePassword";
import { Dialog, DialogContent } from "./ui/dialog";

export default function AuthHandler() {
    const { authState } = useAppStore()

    function getElement() {
        switch (authState) {
            case "unauthenticated":
            case "login":
                return <LoginForm />
            case "signUp":
                return <SignUpForm />
            case "forgotPassword":
                return <ForgotPasswordForm />
            case "updatePassword":
                return <UpdatePasswordForm />
            case "authenticated":
            default:
                return <></>
        }
    }

    if (authState === 'authenticated')
        return <></>

    return <Dialog defaultOpen>
        <DialogContent showCloseButton={false}>
            {getElement()}
        </DialogContent>
    </Dialog>

}