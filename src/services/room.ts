import api from "./api";

export interface Room {
    _id: string;
    name: string;
    createdAt: string;
}

export const createRoom = async (name: string): Promise<Room> => {
    const response = await api.post("/rooms", { name });
    return response.data;
};
