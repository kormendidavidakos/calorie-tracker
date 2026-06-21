import { ThemeProvider } from "./components/ThemeProvider"
import AuthHandler from "./components/AuthHandler"
import ProfileSetup from "./components/ProfileSetup"



export default function App() {


	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthHandler />
			<ProfileSetup />
		</ThemeProvider>

	)
}
