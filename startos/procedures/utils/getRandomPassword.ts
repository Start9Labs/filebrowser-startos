export function getRandomPassword() {
  const possiblePasswordValues =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 16 }, (x, i) =>
    possiblePasswordValues.charAt(
      Math.random() * possiblePasswordValues.length,
    ),
  ).join('')
}
