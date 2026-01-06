import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await register(name, email, password);
            navigate("/login");
        } catch (err) {
            setError("Erro ao criar conta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-slate-800 p-6 rounded-lg shadow-lg"
            >
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Criar conta
                </h1>

                {error && (
                    <div className="mb-4 text-sm text-red-400 text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm text-slate-300 mb-1">
                        Nome
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-slate-300 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-slate-300 mb-1">
                        Senha
                    </label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-semibold transition disabled:opacity-50"
                >
                    {loading ? "Criando..." : "Criar conta"}
                </button>
                <p className="mt-4 text-center text-sm text-slate-400">
                    Já tem conta?{" "}
                    <a
                        href="/login"
                        className="text-emerald-400 hover:underline"
                    >
                        Fazer login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
