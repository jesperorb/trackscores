import * as React from "react";
import { View, Text } from 'react-native';

import { Score } from "../models/score";

export const ScoreCard: React.FC<{ score: Score }> = ({ score }) => {
  return <View key={score.reportedByUid}>
            <Text>{score.winningsideScore} - {score.losingsideScore}</Text>
            <Text>{score.sessionStartTime.toLocaleDateString()} - {score.sessionEndTime.toLocaleDateString()}</Text>
            <Text>{score.losingUid} - {score.winningUid}</Text>
          </View>
}