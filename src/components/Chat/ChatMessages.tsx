interface ChatMessage {
    _id: string;
    content: string;
    sender: {
        _id: string;
        name: string;
    };
}

interface ChatMessagesProps {
    messages: ChatMessage[];
    userId?: string;
}

export default function ChatMessages({ messages, userId }: ChatMessagesProps) {
    return (
        <>
            {messages.map((msg) => {
                const isMe = msg.sender._id === userId;

                return (
                    <div
                        key={msg._id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg overflow-hidden break-words whitespace-pre-wrap ${isMe
                                    ? "bg-slate-700 text-slate-100"
                                    : "bg-emerald-600 text-white"
                                }`}
                        >
                            {!isMe && (
                                <p className="text-xs opacity-80 mb-1">
                                    {msg.sender.name}
                                </p>
                            )}

                            <p className="text-sm">
                                {msg.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
