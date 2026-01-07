import { useEffect, useRef, useState } from "react";
import { getSocket } from "../services/socket";

export const useChatSocket = (
    roomId: string,
    userId?: string,
    userName?: string,
    onMessage?: (msg: any) => void
) => {
    const socket = useRef(getSocket());
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

    useEffect(() => {
        if (!socket.current || !roomId) return;

        socket.current.emit("joinRoom", roomId);

        socket.current.on("receiveMessage", onMessage!);

        socket.current.on("userTyping", ({ userId: id, name }) => {
            if (id !== userId) {
                setTypingUsers((prev) =>
                    prev.includes(name) ? prev : [...prev, name]
                );
            }
        });

        socket.current.on("userStopTyping", ({ userId: _id }) => {
            setTypingUsers((prev) => prev.filter((n) => n !== userName));
        });

        return () => {
            socket.current?.emit("leaveRoom", roomId);
            socket.current?.off("receiveMessage", onMessage!);
            socket.current?.off("userTyping");
            socket.current?.off("userStopTyping");
        };
    }, [roomId]);

    return { socket, typingUsers };
};
