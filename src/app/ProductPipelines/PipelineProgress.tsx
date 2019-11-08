import { Progress, ProgressMeasureLocation } from '@patternfly/react-core';
import React from 'react';
import './PipelineProgress.css'

export interface PipelineProgressProps {
  progress: number;
}

export const PipelineProgress: React.FunctionComponent<PipelineProgressProps> = ({ progress }) => {
  if (progress === -1) {
    return <Progress value={100} className="progress-invalid"  measureLocation={ProgressMeasureLocation.none}></Progress>;
  } else {
    return <Progress value={progress} className="progress-ok"  measureLocation={ProgressMeasureLocation.none}></Progress>
  }
};
