// src/hooks/useOutsideClick.js
import { useEffect } from 'react';

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 1. Verificamos si la referencia existe (el elemento está en pantalla)
      // 2. Verificamos si el clic fue FUERA del elemento ( !ref.current.contains )
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); // Ejecutamos la función que cierra el contenedor
      }
    };

    // Agregamos el evento al documento
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiamos el evento cuando el componente desaparece
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); // Se vuelve a ejecutar si la referencia o la función cambian
}