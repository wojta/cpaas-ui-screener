import * as React from 'react';
import {
  PageSection,
  Title,
  TextContent,
  TextVariants,
  Text,
  Card,
  CardHeader,
  CardBody,
  Breadcrumb,
  BreadcrumbItem
} from '@patternfly/react-core';
import { useParams } from 'react-router';
import { ProductPipelinesTable } from './ProductsPipelinesTable';
import { getPipelines } from 'src/mockData/pipelines';

export const ProductPipelines: React.FunctionComponent<any> = () => {
  const { id } = useParams();
  return (
    <PageSection className="clearPadding">
      <Card>
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbItem to="/products">Products</BreadcrumbItem>
            <BreadcrumbItem to="#" isActive>
              {id}
            </BreadcrumbItem>
          </Breadcrumb>
          <Title size="lg" className="textContentTopMargin">
            OpenStack pipelines for {id}
          </Title>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>
      <Card className="innerCard"><ProductPipelinesTable product={id} pipelines={getPipelines(id)}/></Card>
    </PageSection>
  );
};
