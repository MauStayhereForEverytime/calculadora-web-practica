/**
 * Archivo central que exporta todas las operaciones matemáticas
 */
import { suma } from './suma'
import { resta } from './resta'
import { multiplicacion } from './multiplicacion'
import { division } from './division'

export { suma, resta, multiplicacion, division }

/**
 * Ejecuta una operación basada en el tipo especificado
 * @param {number} a - Primer operando
 * @param {number} b - Segundo operando
 * @param {string} operacion - Tipo de operación: '+', '-', '*', '/'
 * @returns {number} Resultado de la operación
 */
export const ejecutarOperacion = (a, b, operacion) => {
  switch (operacion) {
    case '+':
      return suma(a, b)
    case '-':
      return resta(a, b)
    case '*':
      return multiplicacion(a, b)
    case '/':
      return division(a, b)
    default:
      console.warn(`Operación desconocida: ${operacion}`)
      return b
  }
}
