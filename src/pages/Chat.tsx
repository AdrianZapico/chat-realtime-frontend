import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RoomsSidebar from "../components/Rooms/RoomsSidebar";
import ChatHeader from "../components/Chat/ChatHeader";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import TypingIndicator from "../components/Chat/TypingIndicator";
import { useChatMessages } from "../hooks/useChatMessages";
import { useChatSocket } from "../hooks/useChatSocket";

const Chat = () => {
    const { user, logout } = useAuth();
    const { roomId } = useParams<{ roomId: string }>();

    if (!roomId) {
        return <Navigate to="/" />;
    }

    // 🔹 Estado das mensagens (API)
    const { messages, setMessages } = useChatMessages(roomId);

    // 🔹 Socket (tempo real)
    const { socket, typingUsers } = useChatSocket(
        roomId,
        user?._id,
        user?.name,
        (msg) => {
            if (msg.roomId === roomId) {
                setMessages((prev) => [...prev, msg]);
            }
        }
    );

    // 🔹 Input
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        // console.log("ENVIANDO:", { roomId, message });
        if (!message.trim() || !socket.current) return;

        socket.current.emit("sendMessage", {
            roomId,
            message,
        });

        setMessage("");
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white">
            {/* Sidebar */}
            <RoomsSidebar />

            {/* Chat */}
            <div className="flex flex-col flex-1">
                <ChatHeader name={user?.name} logout={logout} />

                <main className="flex-1 overflow-y-auto p-6 space-y-4">
                    <ChatMessages
                        messages={messages}
                        userId={user?._id}
                    />
                </main>

                <TypingIndicator users={typingUsers} />

                <ChatInput
                    value={message}
                    setValue={setMessage}
                    onSend={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
