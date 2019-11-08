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
  BreadcrumbItem,
  Tabs,
  Tab,
  TabContent
} from '@patternfly/react-core';
import './PipelineDetail.css';
import { pipelineDetail } from 'src/mockData/pipelineDetail';
import { useParams } from 'react-router';
import { ProductsTable } from '@app/Products/ProductsTable';
import { products } from 'src/mockData/products';
import { OverviewPipeline } from './OverviewPipeline';
import { YAMLEditor } from './YAMLEditor';

interface State {
  activeTabKey: number;
}

interface PipelineDetailProps {
  product: string;
  id: string;
}

class _PipelineDetail extends React.Component<PipelineDetailProps> {
  public state: State;
  contentRef1: React.RefObject<unknown>;
  contentRef2: React.RefObject<unknown>;
  contentRef3: React.RefObject<unknown>;

  constructor(props: PipelineDetailProps) {
    super(props);
    this.state = {
      activeTabKey: 0
    };
    this.contentRef1 = React.createRef();
    this.contentRef2 = React.createRef();
    this.contentRef3 = React.createRef();
  }

  handleTabClick = (event, tabIndex) => {
    this.setState({
      activeTabKey: tabIndex
    });
  };

  public render() {
    const { product, id } = this.props;
    return (
      <PageSection className="clearPadding">
        <Card>
          <CardHeader>
            <Breadcrumb>
              <BreadcrumbItem to="/product/">Products</BreadcrumbItem>
              <BreadcrumbItem to={'/product/' + product}>{product}</BreadcrumbItem>
              <BreadcrumbItem to="#" isActive>
                {id} details
              </BreadcrumbItem>
            </Breadcrumb>
            <Title size="lg" className="textContentTopMargin">
              {id} details
            </Title>
          </CardHeader>
          <CardBody className="removeBottomPadding">
            <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
              <Tab eventKey={0} title="Overview" tabContentId="refTab1Section" tabContentRef={this.contentRef1}></Tab>
              <Tab eventKey={1} title="YAML" tabContentId="refTab2Section" tabContentRef={this.contentRef2}></Tab>
              <Tab eventKey={2} title="Pipeline Runs" tabContentId="refTab3Section" tabContentRef={this.contentRef3}></Tab>
            </Tabs>
          </CardBody>
        </Card>
        <Card className="innerCard">
          <TabContent eventKey={0} id="refTab1Section" ref={this.contentRef1} aria-label="Tab item 1">
            <OverviewPipeline detail={pipelineDetail}/>
          </TabContent>
          <TabContent eventKey={1} id="refTab2Section" ref={this.contentRef2} aria-label="Tab item 2" hidden>
            <YAMLEditor detail={pipelineDetail}/>
          </TabContent>
          <TabContent eventKey={2} id="refTab3Section" ref={this.contentRef3} aria-label="Tab item 3" hidden>
            Tab 3 section
          </TabContent>
        </Card>
      </PageSection>
    );
  }
}

export const PipelineDetail = () => {
  const params: any = useParams();
  return <_PipelineDetail product={params.product} id={params.id}></_PipelineDetail>;
};
