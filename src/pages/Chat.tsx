import { useState, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Componentes
import RoomsSidebar from "../components/Rooms/RoomsSidebar";
import ChatHeader from "../components/Chat/ChatHeader";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import TypingIndicator from "../components/Chat/TypingIndicator";

// Hooks
import { useChatMessages } from "../hooks/useChatMessages";
import { useChatSocket } from "../hooks/useChatSocket";

const Chat = () => {
    const { user, logout } = useAuth();
    const { roomId } = useParams<{ roomId: string }>();
    const [message, setMessage] = useState("");

    // 1. Validação de Rota
    if (!roomId) {
        return <Navigate to="/" replace />;
    }

    // 2. Estado das mensagens (Busca inicial da API)
    const { messages, setMessages } = useChatMessages(roomId);

    // 3. Socket (Conexão em tempo real)
    const { socket, typingUsers } = useChatSocket(
        roomId,
        user?._id,
        user?.name,
        (msg) => {
            // Callback quando recebe mensagem nova
            if (msg.roomId === roomId) {
                setMessages((prev) => [...prev, msg]);
            }
        }
    );

    // 4. Envio de Mensagem (Otimizado com useCallback)
    const handleSendMessage = useCallback(async () => {
        if (!message.trim() || !socket.current) return;

        try {
            socket.current.emit("sendMessage", {
                roomId,
                message,
                userId: user?._id, // Garante que o ID do usuário vai junto
                userName: user?.name
            });

            setMessage(""); // Limpa o input após enviar
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    }, [message, roomId, socket, user]);

    return (
        <div className="flex h-screen bg-slate-900 text-white">
            {/* Sidebar Lateral */}
            <RoomsSidebar />

            {/* Área Principal do Chat */}
            <section className="flex flex-col flex-1 min-w-0">
                <ChatHeader name={user?.name} logout={logout} />

                <main className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                    <ChatMessages
                        messages={messages}
                        userId={user?._id}
                    />
                </main>

                <div className="p-4 bg-slate-900">
                    <TypingIndicator users={typingUsers} />

                    {/* AQUI ESTAVA O ERRO DO NETLIFY: Faltava passar o roomId */}
                    <ChatInput
                        value={message}
                        setValue={setMessage}
                        onSend={handleSendMessage}
                        roomId={roomId}
                    />
                </div>
            </section>
        </div>
    );
};

export default Chat;