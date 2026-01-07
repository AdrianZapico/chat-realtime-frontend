export default function TypingIndicator({ users }: { users: string[] }) {
    if (!users.length) return null;

    return (
        <div className="px-6 py-2 text-sm italic text-slate-400">
            {users.join(", ")} digitando...
        </div>
    );
}
