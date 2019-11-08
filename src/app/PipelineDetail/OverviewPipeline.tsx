import React from 'react';
import { IPipelineDetail } from 'src/types/IPipelineDetail';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import moment from 'moment';
import './OverviewPipeline.css';
import { MiniLabel } from '@app/components/MiniLabel';

export const OverviewPipeline = ({ detail: innerDetail }) => {
  const detail: IPipelineDetail = innerDetail;
  return (
    <TextContent className="innerCard lowerSize bottomPadding">
      <Text component={TextVariants.h4}>Pipeline overview</Text>

      <Text component={TextVariants.h6}>Name</Text>
      <p>{detail.name}</p>
      <Text component={TextVariants.h6}>Namespace</Text>
      <p>{detail.namespace}</p>
      <Text component={TextVariants.h6}>Labels</Text>
      <p>
        {detail.labels.map(label => (
          <MiniLabel text={label} />
        ))}
      </p>
      <Text component={TextVariants.h6}>Created at</Text>
      <p>{moment.unix(detail.timestamp).format('MMM Do, h:mm a')}</p>
    </TextContent>
  );
};
