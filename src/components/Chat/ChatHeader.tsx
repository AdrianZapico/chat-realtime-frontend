export default function ChatHeader({ name, logout }: any) {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
            <div>
                <h1 className="text-lg font-semibold">Chat em Tempo Real</h1>
                <p className="text-sm text-slate-400">Conectado como {name}</p>
            </div>

            <button
                onClick={logout}
                className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
                Sair
            </button>
        </header>
    );
}
