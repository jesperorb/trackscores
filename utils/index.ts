
export type Newable<T, K> = { new (values: K): T; }

export const querySnapshotToRecords = <
  T extends object,
  K extends object
>(snapshot: firebase.firestore.QuerySnapshot, Record: Newable<T, K>): T[] => {
  return snapshot.docs.map((doc) => {
    const data = <Partial<K>>doc?.data();
    return new Record(<K>{ id: doc.id, ...data });
  });
}