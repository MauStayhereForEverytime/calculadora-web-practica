/**
 * Realiza la división de dos números
 * @param {number} a - Dividendo
 * @param {number} b - Divisor
 * @returns {number} Resultado de la división o 0 si el divisor es cero
 */
export const division = (a, b) => {
  if (b === 0) {
    console.warn('Advertencia: No se puede dividir entre cero')
    return 0
  }
  return a / b
}
