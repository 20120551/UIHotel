import { provider, ProviderComposer } from './combine';
import { AuthProvider, InvoiceProvider, RoomProvider, SearchProvider, ServiceProvider, UserProvider } from './provider';

export default function Provider({ children }) {
    return (
        <ProviderComposer
            providers={[
                provider(AuthProvider),
                provider(UserProvider),
                provider(InvoiceProvider),
                provider(ServiceProvider),
                provider(RoomProvider),
                provider(SearchProvider),
            ]}
        >
            {children}
        </ProviderComposer>
    )
}