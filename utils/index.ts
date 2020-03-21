export const querySnapshotToRecords = <T extends object>(snapshot: any): T[] => {
  return snapshot.docs.map((doc: any) => Object.assign({}, { id: doc.id, ...doc.data() }));
}