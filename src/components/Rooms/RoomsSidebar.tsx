import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

interface Room {
    _id: string;
    name: string;
}

const RoomsSidebar = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [newRoom, setNewRoom] = useState("");

    const navigate = useNavigate();
    const { roomId } = useParams<{ roomId: string }>();

    // 🔹 Carregar salas
    const loadRooms = useCallback(async () => {
        try {
            const response = await api.get("/rooms");
            setRooms(response.data);
        } catch (error) {
            console.error("Erro ao carregar salas", error);
        }
    }, []);

    useEffect(() => {
        loadRooms();
    }, [loadRooms]);

    // 🔹 Criar sala
    const handleCreateRoom = async () => {
        if (!newRoom.trim()) return;

        try {
            const response = await api.post("/rooms", {
                name: newRoom,
            });

            const createdRoom = response.data;

            setNewRoom("");
            setRooms((prev) => [...prev, createdRoom]);
            navigate(`/chat/${createdRoom._id}`);
        } catch (error) {
            console.error("Erro ao criar sala", error);
        }
    };

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
            {/* Criar sala */}
            <div className="p-4 border-b border-slate-700">
                <input
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="Nova sala"
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                    onClick={handleCreateRoom}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 py-2 rounded font-semibold"
                >
                    Criar sala
                </button>
            </div>

            {/* Lista de salas */}
            <nav className="flex-1 overflow-y-auto">
                {rooms.map((room) => {
                    const isActive = room._id === roomId;

                    return (
                        <button
                            key={room._id}
                            onClick={() => navigate(`/chat/${room._id}`)}
                            className={`
                                w-full text-left px-4 py-3 text-sm transition
                                ${isActive
                                    ? "bg-emerald-600 text-white"
                                    : "text-slate-300 hover:bg-slate-700"}
                            `}
                        >
                            #{room.name}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default RoomsSidebar;
