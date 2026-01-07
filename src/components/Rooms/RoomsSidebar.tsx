import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import CreateRoomModal from "./CreateRoomModal";

interface Room {
    _id: string;
    name: string;
}

export default function RoomsSidebar() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const { roomId } = useParams();

    const loadRooms = async () => {
        const res = await api.get("/rooms");
        setRooms(res.data);
    };

    useEffect(() => {
        loadRooms();
    }, []);

    const handleCreateRoom = async (name: string) => {
        const res = await api.post("/rooms", { name });
        setRooms((prev) => [res.data, ...prev]);
        navigate(`/chat/${res.data._id}`);
    };

    return (
        <>
            <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-slate-700">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 py-2 rounded text-sm font-semibold"
                    >
                        <FiPlus />
                        Criar sala
                    </button>
                </div>

                {/* Rooms */}
                <nav className="flex-1 overflow-y-auto">
                    {rooms.map((room) => (
                        <div
                            key={room._id}
                            className={`group flex items-center justify-between px-4 py-3 cursor-pointer text-sm
                            ${room._id === roomId
                                    ? "bg-emerald-600 text-white"
                                    : "text-slate-300 hover:bg-slate-700"
                                }`}
                        >
                            <span
                                onClick={() =>
                                    navigate(`/chat/${room._id}`)
                                }
                                className="flex-1 truncate"
                            >
                                #{room.name}
                            </span>

                            {/* Icons */}
                            <div className="hidden group-hover:flex gap-2 text-slate-200">
                                <FiEdit2
                                    className="hover:text-white"
                                    size={14}
                                />
                                <FiTrash2
                                    className="hover:text-red-400"
                                    size={14}
                                />
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>

            <CreateRoomModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onCreate={handleCreateRoom}
            />
        </>
    );
}
