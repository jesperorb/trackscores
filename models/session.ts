/**
 * The idea is that you create a Session with a number of people
 * then link `Score`s to this session
 */
export type Session = {
  id: string;
  participants: string[],
  scores: string[]
  date: Date
}