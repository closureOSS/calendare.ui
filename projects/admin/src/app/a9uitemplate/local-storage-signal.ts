import { signal, effect, WritableSignal } from '@angular/core';

export function localStorageSignal<T>(key: string, fallbackValue: T): WritableSignal<T> {
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;

  let initialValue = fallbackValue;
  if (storedValue !== null) {
    try {
      initialValue = JSON.parse(storedValue);
    } catch {
      initialValue = storedValue as unknown as T;
    }
  }
  const stateSignal = signal<T>(initialValue);

  if (typeof window !== 'undefined') {
    effect(() => {
      const value = stateSignal();
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return stateSignal;
}
