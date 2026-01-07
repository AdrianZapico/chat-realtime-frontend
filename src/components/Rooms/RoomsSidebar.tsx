import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import CreateRoomModal from "./CreateRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";
import EditRoomModal from "./EditRoomModal";

interface Room {
    _id: string;
    name: string;
}

export default function RoomsSidebar() {
    /* =========================
       State
    ========================== */
    const [rooms, setRooms] = useState<Room[]>([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
    const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);

    const navigate = useNavigate();
    const { roomId } = useParams();

    /* =========================
       Data
    ========================== */
    const loadRooms = useCallback(async () => {
        const res = await api.get("/rooms");
        setRooms(res.data);
    }, []);

    useEffect(() => {
        loadRooms();
    }, [loadRooms]);

    /* =========================
       Handlers — Rooms
    ========================== */
    const handleOpenRoom = (id: string) => {
        if (id === roomId) return;
        navigate(`/chat/${id}`);
    };

    const handleCreateRoom = async (name: string) => {
        const res = await api.post("/rooms", { name });

        setRooms((prev) => [res.data, ...prev]);
        setOpenCreateModal(false);

        navigate(`/chat/${res.data._id}`);
    };

    const handleEditRoom = async (id: string, name: string) => {
        const res = await api.put(`/rooms/${id}`, { name });

        setRooms((prev) =>
            prev.map((room) =>
                room._id === id ? res.data : room
            )
        );

        setRoomToEdit(null);
    };

    /* =========================
       Handlers — Delete
    ========================== */
    const handleDeleteClick = (
        room: Room,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();
        setRoomToDelete(room);
    };

    const handleConfirmDelete = async () => {
        if (!roomToDelete) return;

        await api.delete(`/rooms/${roomToDelete._id}`);

        setRooms((prev) =>
            prev.filter((room) => room._id !== roomToDelete._id)
        );

        if (roomToDelete._id === roomId) {
            navigate("/rooms");
        }

        setRoomToDelete(null);
    };

    /* =========================
       Render
    ========================== */
    return (
        <>
            <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-slate-700">
                    <button
                        onClick={() => setOpenCreateModal(true)}
                        className="w-full flex items-center justify-center gap-2
                        bg-emerald-600 hover:bg-emerald-700 py-2 rounded
                        text-sm font-semibold"
                    >
                        <FiPlus />
                        Criar sala
                    </button>
                </div>

                {/* Rooms */}
                <nav className="flex-1 overflow-y-auto">
                    {rooms.map((room) => {
                        const isActive = room._id === roomId;

                        return (
                            <div
                                key={room._id}
                                onClick={() => handleOpenRoom(room._id)}
                                className={`group flex items-center justify-between
                                px-4 py-3 cursor-pointer text-sm
                                ${isActive
                                        ? "bg-emerald-600 text-white"
                                        : "text-slate-300 hover:bg-slate-700"
                                    }`}
                            >
                                <span className="flex-1 truncate">
                                    #{room.name}
                                </span>

                                {/* Actions */}
                                <div className="hidden group-hover:flex gap-2">
                                    <FiEdit2
                                        size={14}
                                        className="cursor-pointer hover:text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setRoomToEdit(room);
                                        }}
                                    />

                                    <FiTrash2
                                        size={14}
                                        className="cursor-pointer hover:text-red-400"
                                        onClick={(e) =>
                                            handleDeleteClick(room, e)
                                        }
                                    />
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </aside>

            {/* Create */}
            <CreateRoomModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                onCreate={handleCreateRoom}
            />

            {/* Edit */}
            {roomToEdit && (
                <EditRoomModal
                    room={roomToEdit}
                    onClose={() => setRoomToEdit(null)}
                    onSave={handleEditRoom}
                />
            )}

            {/* Delete */}
            {roomToDelete && (
                <DeleteRoomModal
                    room={roomToDelete}
                    onClose={() => setRoomToDelete(null)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
}
