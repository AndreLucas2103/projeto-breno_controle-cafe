import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado que armazena o valor atual
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao carregar ${key} do localStorage:`, error);
      // Remove item corrompido
      window.localStorage.removeItem(key);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função para casos como setValue(prevCount => prevCount + 1)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Salva no estado
      setStoredValue(valueToStore);

      // Salva no localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Hook específico para Map (já que Map não é serializável por JSON)
export function useLocalStorageMap<K, V>(
  key: string,
  initialValue: Map<K, V> = new Map()
) {
  const [storedValue, setStoredValue] = useLocalStorage<Array<[K, V]>>(
    key,
    Array.from(initialValue.entries())
  );

  // Cria um novo Map a partir dos dados armazenados
  const mapValue = new Map(storedValue);

  const setMapValue = (value: Map<K, V> | ((val: Map<K, V>) => Map<K, V>)) => {
    const valueToStore = value instanceof Function ? value(mapValue) : value;
    setStoredValue(Array.from(valueToStore.entries()));
  };

  return [mapValue, setMapValue] as const;
}
