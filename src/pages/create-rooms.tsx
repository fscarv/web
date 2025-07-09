import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsApiResponse = Array<{
    id: string;
    name: string;
    description: string;
    createdAt: string;
}>;

const CreateRooms = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/rooms');
            const result: GetRoomsApiResponse = await response.json();

            return result;
        },
    })

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            <div className="flex flex-col gap-1">
                {data?.map((room) => {
                    return (
                        <Link key={room.id} to={`/rooms/${room.id}`}>
                            <p>{room.name}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default CreateRooms;