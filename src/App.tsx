import { ThemeProvider } from "./components/ThemeProvider"
import { useAppStore } from "./store/useAppStore"
import { useEffect } from "react"
import { supabase } from "./lib/supabase/client"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Profile from "./pages/Profile"



export default function App() {
	const { setAuthState, setSession, page } = useAppStore()

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

	function getCurrentPage(){
		switch (page) {
			case 'home':
				return <Home />
			case 'profile':
				return <Profile />
			default:
				return <div className="text-4xl text-center">MOUNT PAGE<br/>`{page}`<br/>IN App.tsx</div>
		}
	}

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="page-container flex flex-col h-screen! w-screen">
				{getCurrentPage()}
				<div className="grow">&nbsp;</div>
				<Navbar />
			</div>
		</ThemeProvider>

	)
}
