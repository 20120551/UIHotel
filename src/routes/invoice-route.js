import Invoice from "@pages/invoices/index/invoice";
import { Route, Routes } from "react-router-dom";

export default function InvoiceRoute() {
    return (
        <Routes>
            <Route index element={<Invoice />} />
        </Routes>
    )
}