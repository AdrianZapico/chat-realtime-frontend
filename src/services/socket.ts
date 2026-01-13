import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://chat-realtime-backend-8q71.onrender.com";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
    if (!socket) {
        const token = localStorage.getItem("token");

        socket = io(SOCKET_URL, {
            auth: { token },
            transports: ["websocket"],
        });
    }

    return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
