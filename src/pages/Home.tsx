import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Home = () => {
    const [roomName, setRoomName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        if (!roomName.trim()) return;

        try {
            setLoading(true);

            const response = await api.post("/rooms", {
                name: roomName,
            });

            const roomId = response.data._id;

            navigate(`/chat/${roomId}`);
        } catch (error) {
            console.error("Erro ao criar sala", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md space-y-4">
                <h1 className="text-xl font-semibold text-center">
                    Criar nova sala
                </h1>

                <input
                    type="text"
                    placeholder="Nome da sala"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
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

export default Home;
