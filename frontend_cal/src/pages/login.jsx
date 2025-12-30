import { useState } from 'react'


import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un correo válido');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        onLoginSuccess ? onLoginSuccess(data) : null;
        setError('');
        // Redirigir a la calculadora o dashboard
        navigate('/calculator');
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos fluidos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card con sombra profunda */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md border border-white/20">
          {/* Header con degradado azul celeste */}
          <div className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 px-8 py-16 text-center relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-3 right-6 text-6xl opacity-40">🧮</div>
            </div>
            <div className="relative z-10">
              <div className="text-6xl mb-4 drop-shadow-lg">🧮</div>
              <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">Calculadora</h1>
              <p className="text-blue-50 text-lg font-semibold drop-shadow-md">¡Bienvenido de vuelta!</p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="px-8 py-10">
            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-3 text-lg">
                📧 Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full px-5 py-4 border-2 border-sky-300 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all bg-sky-50/50 text-lg"
              />
            </div>

            {/* Contraseña */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-3 text-lg">
                🔐 Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 pr-14 border-2 border-sky-300 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all bg-sky-50/50 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-sky-500 text-xl transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-xl font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Botón Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold text-lg rounded-xl hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? '⏳ Iniciando sesión...' : '✨ Iniciar Sesión'}
            </button>

            {/* Recuperar contraseña */}
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sky-600 hover:text-sky-800 font-bold text-sm transition-colors hover:underline"
              >
                🔑 ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Registrarse */}
            <div className="mt-4 text-center border-t border-sky-200 pt-4">
              <p className="text-gray-700 text-sm">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  className="text-sky-600 hover:text-sky-800 font-bold transition-colors hover:underline"
                  onClick={() => navigate('/register')}
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white text-sm font-semibold drop-shadow-lg">© 2025 Mi Calculadora. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
