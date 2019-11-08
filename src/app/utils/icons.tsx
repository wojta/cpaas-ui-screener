import React from 'react';
import { EStatus } from 'src/types/IProductPipeline';

export const getStatusIcon = status => {
  switch (status) {
    case EStatus.SUCCEDED:
      return <span className="fa fa-check-circle" aria-hidden="true" style={{ color: '#3f9c35' }} />;
    case EStatus.FAILED:
      return <span className="fa fa-times-circle" aria-hidden="true" style={{ color: '#c00' }} />;
    case EStatus.RUNNING:
      return (
        <span className="fa fa-spin" style={{ color: '#0088ce !important' }}>
          <span className="fa-refresh" aria-hidden="true"  />
        </span>
      );
    default:
      return null;
  }
};
