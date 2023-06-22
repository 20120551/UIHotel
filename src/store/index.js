import { provider, ProviderComposer } from './combine';
import { AuthProvider, UserProvider } from './provider';

export default function Provider({ children }) {
    return (
        <ProviderComposer
            providers={[
                provider(AuthProvider),
                provider(UserProvider),
            ]}
        >
            {children}
        </ProviderComposer>
    )
}