import { Navigate, useParams } from "react-router-dom";

type RoomsPageParams = {
    roomId: string;
}

const RoomsPage = () => {
    const params = useParams<RoomsPageParams>();
    if (!params.roomId) {
        return <Navigate replace to={"/"} />
    }

    return (
        <div>
            <h1>Rooms {JSON.stringify(params)}</h1>
        </div>
    );
}

export default RoomsPage;