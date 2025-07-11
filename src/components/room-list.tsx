import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";
import { UseRooms } from "@/http/use-rooms";

export function RoomList() {
  const { data } = UseRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido às salas que você criou recentemente.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {data?.map((room) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              key={room.id}
              to={`/room/${room.id}`}
            >
              <div className="flex-1 flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge
                    className="text-xs"
                    variant="secondary"
                  >
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                  <Badge
                    className="text-xs"
                    variant="secondary"
                  >
                    {room.questionsCount === 1 ? `${room.questionsCount} pergunta` : `${room.questionsCount} perguntas`}
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}