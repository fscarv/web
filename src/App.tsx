import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateRooms from "./pages/create-rooms";
import { RoomPage } from "./pages/rooms";
import { RecordRoomAudioPage } from "./pages/record-room-audio";

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
                        path="/room/:roomId"
                        element={<RoomPage />}
                    />
                    <Route
                        path="/room/:roomId/audio"
                        element={<RecordRoomAudioPage />}
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}
