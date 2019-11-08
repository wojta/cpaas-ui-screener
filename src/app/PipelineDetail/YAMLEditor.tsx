import React from 'react';
import { IPipelineDetail } from 'src/types/IPipelineDetail';
import { Text, TextContent, TextVariants, Split, SplitItem } from '@patternfly/react-core';
import { CodeViewer } from '@app/components/CodeViewer';

interface State {
  code: string;
}

interface Props {
  detail: IPipelineDetail;
}

export class YAMLEditor extends React.Component<Props> {
  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      code: props.detail.yaml[0].content
    };
  }

  editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  };

  public render() {
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <TextContent className="innerCard">
        <Text component={TextVariants.h4}>Related YAML files</Text>
        <Split gutter="md">
          <SplitItem style={{width:"15em"}}><Text component={TextVariants.h4} href="#">release.yml</Text></SplitItem>
          <SplitItem isFilled><CodeViewer code={this.state.code} /></SplitItem>
        </Split>
      </TextContent>
    );
  }
}
