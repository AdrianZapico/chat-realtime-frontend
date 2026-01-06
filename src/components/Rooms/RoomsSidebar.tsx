import { useNavigate, useParams } from "react-router-dom";

const ROOMS = ["geral", "frontend", "backend"];

const RoomsSidebar = () => {
    const navigate = useNavigate();
    const { roomId } = useParams<{ roomId: string }>();

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">
                Salas
            </h2>

            <ul className="space-y-2">
                {ROOMS.map((room) => {
                    const isActive = room === roomId;

                    return (
                        <li key={room}>
                            <button
                                onClick={() => navigate(`/chat/${room}`)}
                                className={`w-full text-left px-3 py-2 rounded text-sm transition
                                    ${isActive
                                        ? "bg-emerald-600 text-white"
                                        : "text-slate-300 hover:bg-slate-700"
                                    }`}
                            >
                                # {room}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default RoomsSidebar;
