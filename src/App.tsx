import { ThemeProvider } from "./components/ThemeProvider"
import AuthHandler from "./components/AuthHandler"
import UserSetup from "./components/UserSetup"
import { useAppStore } from "./store/useAppStore"
import { useEffect } from "react"
import { supabase } from "./lib/supabase/client"
import DailyIntake from "./components/DailyIntake"



export default function App() {
	const { setAuthState, setSession } = useAppStore()

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setAuthState(session ? "authenticated" : 'unauthenticated')
			setSession(session)
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setAuthState(session ? "authenticated" : 'unauthenticated')
				setSession(session)
			}
		);
		return () => subscription.unsubscribe();
	}, [setAuthState]);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthHandler />
			<UserSetup />
			<DailyIntake/>
		</ThemeProvider>

	)
}
