// Polyfill / Fix for Node 22+ experimental webstorage bug on SSR
if (typeof globalThis !== 'undefined') {
  const globalObj = globalThis as unknown as { localStorage?: Partial<Storage> };
  const isLocalStorageBroken =
    typeof globalObj.localStorage === 'undefined' ||
    typeof globalObj.localStorage?.getItem !== 'function';

  if (isLocalStorageBroken) {
    try {
      const mockStorage: Storage = {
        length: 0,
        clear: () => {},
        getItem: () => null,
        key: () => null,
        removeItem: () => {},
        setItem: () => {},
      };

      Object.defineProperty(globalThis, 'localStorage', {
        value: mockStorage,
        writable: true,
        configurable: true,
      });
    } catch {
      // ignore if property cannot be redefined
    }
  }
}

