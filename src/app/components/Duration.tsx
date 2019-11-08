import * as React from 'react';
import { Text,
  TextVariants } from '@patternfly/react-core';
import moment from 'moment';

interface DurationProps {
  duration: number;
}

export const Duration: React.FunctionComponent<DurationProps> = ({ duration }) => {
  return (<React.Fragment>{moment.duration(duration).humanize()}</React.Fragment>);
};
