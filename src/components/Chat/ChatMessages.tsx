export default function ChatMessages({ messages, userId }: any) {
    return (
        <>
            {messages.map((msg: any) => {
                const isMe = msg.sender._id === userId;

                return (
                    <div
                        key={msg._id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${isMe
                                    ? "bg-slate-700 text-slate-100"
                                    : "bg-emerald-600 text-white"
                                }`}
                        >
                            {!isMe && (
                                <p className="text-xs mb-1">{msg.sender.name}</p>
                            )}
                            <p>{msg.content}</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
