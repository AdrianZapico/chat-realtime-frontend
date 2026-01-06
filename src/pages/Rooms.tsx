import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../services/room";

const Rooms = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        if (!name.trim()) return;

        try {
            setLoading(true);
            const room = await createRoom(name);
            navigate(`/chat/${room._id}`);
        } catch (error) {
            console.error("Erro ao criar sala", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
            <div className="bg-slate-800 p-6 rounded-lg w-full max-w-sm space-y-4">
                <h1 className="text-xl font-semibold text-center">
                    Criar nova sala
                </h1>

                <input
                    type="text"
                    placeholder="Nome da sala"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                    onClick={handleCreateRoom}
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded font-semibold disabled:opacity-50"
                >
                    {loading ? "Criando..." : "Criar sala"}
                </button>
            </div>
        </div>
    );
};

export default Rooms;
