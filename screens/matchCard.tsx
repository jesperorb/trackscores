import * as React from "react";
import { View, Text } from 'react-native';
import { Match } from "../models/match";

export const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  return <View key={match.sessionStartTime?.toLocaleDateString()}>
            <Text>{match.score1.score} - {match.score2.score}</Text>
            <Text>{match.sessionStartTime.toLocaleDateString()} - {match.sessionEndTime?.toLocaleDateString()}</Text>
            <Text>{match.score1.userId} - {match.score2.userId}</Text>
          </View>
}