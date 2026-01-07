export default function ChatInput({ value, setValue, onSend, socket, roomId }: any) {
    return (
        <footer className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
                <input
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        socket?.emit("typing", { roomId });
                    }}
                    onBlur={() => socket?.emit("stopTyping", { roomId })}
                    className="flex-1 px-4 py-2 rounded bg-slate-700 text-white"
                />
                <button
                    onClick={onSend}
                    className="bg-emerald-600 px-6 py-2 rounded"
                >
                    Enviar
                </button>
            </div>
        </footer>
    );
}
