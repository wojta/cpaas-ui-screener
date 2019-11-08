import * as React from 'react';
import {
  PageSection,
  Title,
  TextContent,
  TextVariants,
  Text,
  Card,
  CardHeader,
  CardBody} from '@patternfly/react-core';
import './Products.css';
import { ProductsTable } from './ProductsTable';
import { products } from 'src/mockData/products';

export const Products: React.FunctionComponent<any> = () => {
  return (
    <PageSection className="clearPadding">
      <Card>
        <CardHeader>
          <Title size="lg">Products</Title>
        </CardHeader>
        <CardBody>
          <TextContent className="textContentTopMargin">
            <Text component={TextVariants.p}>
              Select product to view its pipelines or{' '}
              <Text component={TextVariants.a} href="#">
                create new product
              </Text>
              .
            </Text>
          </TextContent>
        </CardBody>
      </Card>
      <Card className="innerCard">
        <ProductsTable products={products}/>
      </Card>
    </PageSection>
  );
};
