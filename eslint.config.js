module.exports = [
  {
    files: ['app/**/*.js'],  // Revisa todos los archivos JS dentro de /app
    languageOptions: {
      ecmaVersion: 2021,     // Soporta ES2021 (let, const, arrow functions, etc.)
      sourceType: 'module',  // Trata los scripts como módulos ES
    },
    rules: {
      semi: 'error',         // Lanza error si falta punto y coma
      quotes: ['error', 'double'], // Requiere comillas dobles
      'no-unused-vars': 'warn',    // Advierte si hay variables no usadas
    },
  },
];
