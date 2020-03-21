export type FirebaseTimestamp = {
  nanoseconds: number;
  seconds: number;
  toDate: () => Date
}