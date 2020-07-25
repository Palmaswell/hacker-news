export interface InitDBStore {
  readonly name: string;
  readonly hasIdx?: boolean;
}

export async function createStore(
  req: IDBOpenDBRequest,
  initStores: InitDBStore[],
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    req.onerror = event =>
      reject(
        new Error(
          `IndexedDB creation failed ${
            (event.target as IDBOpenDBRequest)?.error
          }`,
        ),
      );

    req.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest)?.result;
      initStores.forEach(({ name, hasIdx }, idx) => {
        const store = db.createObjectStore(name, { autoIncrement: true });
        if (hasIdx) {
          store.createIndex('ids', 'ids', { unique: true });
        }
        store.transaction.oncomplete = () =>
          console.log(`IndexedDB ${store} object store has been created`);
        if (initStores.length === idx + 1) {
          resolve(db);
        }
      });
    };
  });
}

export function create(
  dbName: string,
): (initStores: InitDBStore[]) => Promise<IDBDatabase | IDBOpenDBRequest> {
  const req = indexedDB.open(dbName, 1);

  return async initStores => {
    try {
      const db = await createStore(req, initStores);
      return db;
    } catch (error) {
      console.warn(`IndexedDB store creation failed ${error}`);
      return req;
    }
  };
}
