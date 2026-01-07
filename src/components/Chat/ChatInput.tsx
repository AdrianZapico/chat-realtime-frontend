import { useRef } from "react";

interface ChatInputProps {
    value: string;
    setValue: (v: string) => void;
    onSend: () => void;
    socket?: any;
    roomId: string;
}

export default function ChatInput({
    value,
    setValue,
    onSend,
    socket,
    roomId,
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // ENTER envia
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (!value.trim()) return;

            onSend();
            socket?.emit("stopTyping", { roomId });

            // reset altura
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);

        socket?.emit("typing", { roomId });

        // auto resize
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    };

    return (
        <footer className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2 items-end">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={() => socket?.emit("stopTyping", { roomId })}
                    rows={1}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 resize-none px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 max-h-40 overflow-y-auto"
                />

                <button
                    onClick={() => {
                        if (!value.trim()) return;
                        onSend();
                        socket?.emit("stopTyping", { roomId });
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded font-semibold"
                >
                    Enviar
                </button>
            </div>

            <p className="mt-1 text-xs text-slate-400">
                Enter para enviar • Shift + Enter para nova linha
            </p>
        </footer>
    );
}
