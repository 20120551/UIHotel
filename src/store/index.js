import { provider, ProviderComposer } from './combine';
import { AuthProvider, InvoiceProvider, UserProvider } from './provider';

export default function Provider({ children }) {
    return (
        <ProviderComposer
            providers={[
                provider(AuthProvider),
                provider(UserProvider),
                provider(InvoiceProvider),
            ]}
        >
            {children}
        </ProviderComposer>
    )
}