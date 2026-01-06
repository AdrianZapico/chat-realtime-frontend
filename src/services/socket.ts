import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
    const token = localStorage.getItem("token");

    if (!socket) {
        socket = io(SOCKET_URL, {
            auth: {
                token,
            },
            transports: ["websocket"], // evita problemas de polling
        });
    }

    return socket;
};

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
