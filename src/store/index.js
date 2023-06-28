import { provider, ProviderComposer } from "./combine";
import {
  AuthProvider,
  InvoiceProvider,
  RoomDetailProvider,
  RoomProvider,
  SearchProvider,
  ServiceProvider,
  UserProvider,
  StaffProvider,
} from "./provider";

export default function Provider({ children }) {
  return (
    <ProviderComposer
      providers={[
        provider(AuthProvider),
        provider(UserProvider),
        provider(StaffProvider),
        provider(InvoiceProvider),
        provider(ServiceProvider),
        provider(RoomProvider),
        provider(SearchProvider),
        provider(RoomDetailProvider),
      ]}
    >
      {children}
    </ProviderComposer>
  );
}
