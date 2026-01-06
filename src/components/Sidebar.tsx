import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface Room {
    _id: string;
    name: string;
}

const Sidebar = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const navigate = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const response = await api.get("/rooms");
                setRooms(response.data);
            } catch (error) {
                console.error("Erro ao carregar salas", error);
            }
        };

        loadRooms();
    }, []);

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-700">
                <h2 className="text-lg font-semibold text-white">Salas</h2>
            </div>

            <nav className="flex-1 overflow-y-auto">
                {rooms.map((room) => {
                    const isActive = room._id === roomId;

                    return (
                        <button
                            key={room._id}
                            onClick={() => navigate(`/chat/${room._id}`)}
                            className={`w-full text-left px-4 py-3 text-sm transition
                                ${isActive
                                    ? "bg-emerald-600 text-white"
                                    : "text-slate-300 hover:bg-slate-700"
                                }`}
                        >
                            #{room.name}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
