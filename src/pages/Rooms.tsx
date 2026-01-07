import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Room {
    _id: string;
    name: string;
}

const Rooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const response = await api.get("/rooms");
                setRooms(response.data);
            } catch (error) {
                console.error("Erro ao carregar salas", error);
            } finally {
                setLoading(false);
            }
        };

        loadRooms();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
                Carregando salas...
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-900 text-white">
            {/* Sidebar já cuida da criação */}
            {/* <RoomsSidebar /> se quiser usar aqui futuramente */}

            <main className="flex-1 flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold mb-4">
                    Salas disponíveis
                </h1>

                {rooms.length === 0 ? (
                    <p className="text-slate-400">
                        Nenhuma sala criada ainda.
                        <br />
                        Crie uma nova sala na sidebar.
                    </p>
                ) : (
                    <div className="w-full max-w-sm space-y-2">
                        {rooms.map((room) => (
                            <button
                                key={room._id}
                                onClick={() => navigate(`/chat/${room._id}`)}
                                className="w-full text-left px-4 py-3 rounded bg-slate-800 hover:bg-slate-700 transition"
                            >
                                #{room.name}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Rooms;
