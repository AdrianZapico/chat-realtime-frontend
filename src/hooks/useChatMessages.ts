import { useEffect, useState } from "react";
import api from "../services/api";

interface Message {
    _id: string;
    roomId: string;
    content: string;
    sender: {
        _id: string;
        name: string;
    };
    createdAt: string;
}

export const useChatMessages = (roomId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!roomId) return;

        const loadHistory = async () => {
            const res = await api.get(`/chat/messages/${roomId}`);
            setMessages(res.data);
        };

        loadHistory();
    }, [roomId]);

    return { messages, setMessages };
};
