import type { KeyboardEvent } from "react";

interface ChatInputProps {
    value: string;
    setValue: (value: string) => void;
    onSend: () => void;
    socket: any;
    roomId: string;
}

const ChatInput = ({
    value,
    setValue,
    onSend,
    socket,
    roomId,
}: ChatInputProps) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            e.preventDefault();
            socket?.emit("stopTyping", { roomId });
            onSend();
        }
    };

    const handleChange = (value: string) => {
        setValue(value);
        socket?.emit("typing", { roomId });
    };

    return (
        <footer className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => socket?.emit("stopTyping", { roomId })}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                    onClick={() => {
                        socket?.emit("stopTyping", { roomId });
                        onSend();
                    }}
                    disabled={!value.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded font-semibold disabled:opacity-50"
                >
                    Enviar
                </button>
            </div>
        </footer>
    );
};

export default ChatInput;
