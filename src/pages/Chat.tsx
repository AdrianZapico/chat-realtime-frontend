import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { connectSocket, disconnectSocket } from "../services/socket";

interface Message {
    id: string;
    content: string;
    sender: string;
    createdAt: string;
}

const Chat = () => {
    const { user, logout } = useAuth();
    const socket = useRef(connectSocket());

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");

    const roomId = "room1"; // por enquanto fixo

    useEffect(() => {
        socket.current.emit("joinRoom", roomId);

        socket.current.on("receiveMessage", (data: Message) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.current.off("receiveMessage");
            disconnectSocket();
        };
    }, []);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        socket.current.emit("sendMessage", {
            roomId,
            message,
        });

        setMessage("");
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white">
            <div className="flex flex-col flex-1">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
                    <div>
                        <h1 className="text-lg font-semibold">Chat em Tempo Real</h1>
                        <p className="text-sm text-slate-400">
                            Conectado como {user?.name}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        Sair
                    </button>
                </header>

                {/* Messages */}
                <main className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => {
                        const isMe = msg.sender === user?.id;

                        return (
                            <div
                                key={msg.id}
                                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xs px-4 py-2 rounded-lg ${isMe
                                            ? "bg-emerald-600 text-white"
                                            : "bg-slate-700 text-slate-100"
                                        }`}
                                >
                                    <p className="text-sm">{msg.content}</p>
                                    <span className="block mt-1 text-xs text-slate-300 text-right">
                                        {new Date(msg.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </main>

                {/* Input */}
                <footer className="p-4 bg-slate-800 border-t border-slate-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Digite sua mensagem..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />

                        <button
                            onClick={handleSendMessage}
                            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded font-semibold"
                        >
                            Enviar
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Chat;
