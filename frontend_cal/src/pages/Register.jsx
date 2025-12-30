import React, { useState } from 'react';

export default function Register() {
    const [form, setForm] = useState({ nombre: '', apellido: '', correo: '', contrasena: '' });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        try {
            const res = await fetch('http://localhost:8000/api/registro/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
                setForm({ nombre: '', apellido: '', correo: '', contrasena: '' });
            } else {
                setMensaje(data.error || 'Error en el registro');
            }
        } catch (err) {
            setMensaje('Error de conexión');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border rounded" required />
                <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" className="w-full p-2 border rounded" required />
                <input name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" type="email" className="w-full p-2 border rounded" required />
                <input name="contrasena" value={form.contrasena} onChange={handleChange} placeholder="Contraseña" type="password" className="w-full p-2 border rounded" required />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Registrarse</button>
            </form>
            {mensaje && <div className="mt-4 text-center text-red-600">{mensaje}</div>}
        </div>
    );
}
