import { useState } from 'react'
import { ejecutarOperacion } from '../funciones/operaciones'

export default function Calculator({ user, onLogout }) {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleOperation = (op) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  /**
   * Calcula el resultado de una operación usando las funciones importadas
   * @param {number} prev - Valor anterior
   * @param {number} current - Valor actual
   * @param {string} op - Operación a realizar
   * @returns {number} Resultado de la operación
   */
  const calculate = (prev, current, op) => {
    return ejecutarOperacion(prev, current, op)
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
      setWaitingForNewValue(false)
    }
  }

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">🧮 Calculadora</h1>
            <p className="text-blue-100 mt-1">Bienvenido, {user.username}!</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors shadow-lg"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Calculadora */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-6">
          {/* Display */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 mb-6">
            <div className="text-right text-white">
              <p className="text-sm opacity-70 mb-2 h-5">
                {previousValue !== null ? `${previousValue} ${operation}` : ''}
              </p>
              <p className="text-5xl font-bold break-words">{display}</p>
            </div>
          </div>

          {/* Botones */}
          <div className="grid grid-cols-4 gap-3">
            {/* Fila 1 */}
            <button
              onClick={handleClear}
              className="col-span-2 bg-red-500 text-white font-bold py-4 rounded-lg text-xl hover:bg-red-600 transition-colors shadow-md"
            >
              AC
            </button>
            <button
              onClick={handleDelete}
              className="bg-orange-500 text-white font-bold py-4 rounded-lg text-xl hover:bg-orange-600 transition-colors shadow-md"
            >
              ← Del
            </button>
            <button
              onClick={() => handleOperation('/')}
              className="bg-purple-600 text-white font-bold py-4 rounded-lg text-xl hover:bg-purple-700 transition-colors shadow-md"
            >
              ÷
            </button>

            {/* Fila 2 */}
            <button
              onClick={() => handleNumber(7)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              7
            </button>
            <button
              onClick={() => handleNumber(8)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              8
            </button>
            <button
              onClick={() => handleNumber(9)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              9
            </button>
            <button
              onClick={() => handleOperation('*')}
              className="bg-purple-600 text-white font-bold py-4 rounded-lg text-xl hover:bg-purple-700 transition-colors shadow-md"
            >
              ×
            </button>

            {/* Fila 3 */}
            <button
              onClick={() => handleNumber(4)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              4
            </button>
            <button
              onClick={() => handleNumber(5)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              5
            </button>
            <button
              onClick={() => handleNumber(6)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              6
            </button>
            <button
              onClick={() => handleOperation('-')}
              className="bg-purple-600 text-white font-bold py-4 rounded-lg text-xl hover:bg-purple-700 transition-colors shadow-md"
            >
              −
            </button>

            {/* Fila 4 */}
            <button
              onClick={() => handleNumber(1)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              1
            </button>
            <button
              onClick={() => handleNumber(2)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              2
            </button>
            <button
              onClick={() => handleNumber(3)}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              3
            </button>
            <button
              onClick={() => handleOperation('+')}
              className="bg-purple-600 text-white font-bold py-4 rounded-lg text-xl hover:bg-purple-700 transition-colors shadow-md"
            >
              +
            </button>

            {/* Fila 5 */}
            <button
              onClick={() => handleNumber(0)}
              className="col-span-2 bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="bg-gray-200 font-bold py-4 rounded-lg text-xl hover:bg-gray-300 transition-colors shadow-md"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="bg-green-500 text-white font-bold py-4 rounded-lg text-xl hover:bg-green-600 transition-colors shadow-md"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
