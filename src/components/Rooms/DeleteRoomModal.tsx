interface Room {
    _id: string;
    name: string;
}

interface Props {
    room: Room;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteRoomModal({
    room,
    onClose,
    onConfirm,
}: Props) {
    if (!room) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-lg w-96 space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Excluir sala
                </h2>

                <p className="text-slate-300 text-sm">
                    Tem certeza que deseja excluir a sala{" "}
                    <strong className="text-white">#{room.name}</strong>?
                    <br />
                    Todas as mensagens serão apagadas permanentemente.
                </p>

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-500"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}
