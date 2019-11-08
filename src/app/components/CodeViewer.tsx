import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';

import './CodeViewer.css';

const spanizeString = code => (
  <React.Fragment>
    {code.split('\n').map((line, index) => (
      <span key={index}>{line}</span>
    ))}
  </React.Fragment>
);

export const CodeViewer = ({ code }) => (
  <div className={classNames('input-group', 'copy-to-clipboard-multiline')}>
    <pre>
      {spanizeString(code)}
      <div className="pre-rest" />
    </pre>
    <span>
      {/* <CopyToClipboard text={code}/> */}
    </span>
  </div>
);
