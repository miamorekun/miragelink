import {QueryClientProvider} from "./query-client-provider"
import {SessionProvider} from "./session-provider"
import {ThemeProvider} from "./theme-provider"
import {SnackbarProvider} from "./snackbar-provider"
import {MomentProvider} from "./moment-provider"
export const AppProvider = ({children}: {children: React.ReactNode}) => {
	return (
		<SessionProvider>
			<ThemeProvider>
				<QueryClientProvider>
					<MomentProvider>
						<SnackbarProvider />
						{children}
					</MomentProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</SessionProvider>
	)
}
