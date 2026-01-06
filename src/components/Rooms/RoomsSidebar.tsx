import { useEffect, useState } from "react";
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
    const { roomId } = useParams();

    const loadRooms = async () => {
        const response = await api.get("/rooms");
        setRooms(response.data);
    };

    useEffect(() => {
        loadRooms();
    }, []);

    const handleCreateRoom = async () => {
        if (!newRoom.trim()) return;

        const response = await api.post("/rooms", {
            name: newRoom,
        });

        setNewRoom("");

        // 🔥 ATUALIZA A SIDEBAR
        setRooms((prev) => [...prev, response.data]);

        // 🔥 ENTRA NA SALA
        navigate(`/chat/${response.data._id}`);
    };

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-700">
                <input
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="Nova sala"
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white"
                />
                <button
                    onClick={handleCreateRoom}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 py-2 rounded"
                >
                    Criar sala
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
                {rooms.map((room) => (
                    <button
                        key={room._id}
                        onClick={() => navigate(`/chat/${room._id}`)}
                        className={`w-full text-left px-4 py-3 text-sm ${room._id === roomId
                                ? "bg-emerald-600 text-white"
                                : "text-slate-300 hover:bg-slate-700"
                            }`}
                    >
                        #{room.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default RoomsSidebar;
