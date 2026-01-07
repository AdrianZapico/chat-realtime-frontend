import { useState } from "react";

interface Room {
    _id: string;
    name: string;
}

interface Props {
    room: Room;
    onClose: () => void;
    onSave: (id: string, name: string) => Promise<void>;
}

export default function EditRoomModal({ room, onClose, onSave }: Props) {
    const [name, setName] = useState(room.name);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) return;

        setLoading(true);
        await onSave(room._id, name.trim());
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-lg w-96 space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Editar sala
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSave();
                        }
                    }}
                    autoFocus
                    className="w-full px-4 py-2 rounded bg-slate-700 text-white
                    focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-500"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700
                        disabled:opacity-50"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
