import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateRooms from "./pages/create-rooms";
import RoomsPage from "./pages/rooms";

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<CreateRooms />}
                    />
                    <Route
                        path="/rooms/:roomId"
                        element={<RoomsPage />}
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}
