import React, { useState, useEffect } from 'react';
import { convertNumberToWords, convertNumberToSpanishWords } from './utils/numberToWords';

export default function App() {
  const [inputNumber, setInputNumber] = useState('');
  const [textResult, setTextResult] = useState('');
  const [language, setLanguage] = useState('spanish'); // Default to Spanish
  const [isCopied, setIsCopied] = useState(false);
  
  // Update the result whenever the input or language changes
  useEffect(() => {
    if (inputNumber === '') {
      setTextResult('');
      return;
    }
    
    // Validate input is a number
    const num = Number(inputNumber);
    if (isNaN(num)) {
      setTextResult('Por favor, ingrese un número válido');
      return;
    }
    
    // Convert to text based on selected language
    try {
      if (language === 'spanish') {
        setTextResult(convertNumberToSpanishWords(num));
      } else {
        setTextResult(convertNumberToWords(num));
      }
    } catch (error) {
      console.error('Error converting number:', error);
      setTextResult('Ocurrió un error al convertir el número');
    }
  }, [inputNumber, language]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputNumber(value);
  };
  
  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  
  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(textResult)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Error al copiar:', err);
      });
  };
  
  // Clear the input
  const handleClear = () => {
    setInputNumber('');
    setTextResult('');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col items-center">
      <header className="w-full max-w-2xl text-center mb-8 mt-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Conversor de Números a Letras</h1>
        <p className="text-gray-600">Ingrese un número para ver cómo se escribe con palabras</p>
      </header>
      
      <main className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="numberInput" className="block text-gray-700 mb-2 font-medium">
            Número
          </label>
          <input
            id="numberInput"
            type="text"
            value={inputNumber}
            onChange={handleInputChange}
            placeholder="Escriba un número"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border text-gray-800"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Idioma
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="spanish"
                checked={language === 'spanish'}
                onChange={handleLanguageChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Español</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="english"
                checked={language === 'english'}
                onChange={handleLanguageChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Inglés</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Resultado
          </label>
          <div className="w-full px-4 py-3 bg-gray-50 rounded-md min-h-16 border text-gray-800">
            {textResult || <span className="text-gray-400">El resultado aparecerá aquí</span>}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleCopy}
            disabled={!textResult}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer disabled:bg-indigo-300 disabled:cursor-not-allowed flex-1 relative"
          >
            {isCopied ? 'Copiado!' : 'Copiar'}
            {isCopied && (
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Copiado!
              </span>
            )}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer flex-1"
          >
            Limpiar
          </button>
        </div>
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm p-4">
        <p>
          <a 
            href="https://www.zapt.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:underline"
          >
            Hecho con ZAPT
          </a>
        </p>
      </footer>
    </div>
  );
}