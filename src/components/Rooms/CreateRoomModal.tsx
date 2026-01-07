import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string) => Promise<void>;
}

export default function CreateRoomModal({ open, onClose, onCreate }: Props) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleCreate = async () => {
        if (!name.trim()) return;

        setLoading(true);
        await onCreate(name);
        setLoading(false);
        setName("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-lg w-full max-w-sm space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Criar nova sala
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome da sala"
                    className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-500"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {loading ? "Criando..." : "Criar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
