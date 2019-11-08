import * as React from 'react';
import { SyntheticEvent, FormEvent } from 'react';
import {
  Level,
  LevelItem,
  InputGroup,
  TextInput,
  Button,
  ButtonVariant,
  Pagination,
  CardHeader,
  CardFooter,
  CardBody,
  Text,
  TextVariants
} from '@patternfly/react-core';
import {
  Table,
  ICell,
  IRow,
  TableHeader,
  TableBody,
  ISortBy,
  OnSort,
  SortByDirection,
  sortable,
  IAction,
  ISeparator
} from '@patternfly/react-table';

import { SearchIcon } from '@patternfly/react-icons';
import { IProductPipeline, getStatusText } from 'src/types/IProductPipeline';
import { Duration } from '../components/Duration';
import { PipelineProgress } from './PipelineProgress';
import { getStatusIcon } from '@app/utils/icons';
import { pipeline } from 'stream';
import { useParams } from 'react-router';

export interface ProductPipelinesTableProps {
  product?: string,
  pipelines: Array<IProductPipeline>;
}

interface State {
  page: number;
  perPage: number;
  pipelines: Array<IProductPipeline>;
  filter: string;
  sortBy?: ISortBy;
  columns: Array<ICell>;
}

export class ProductPipelinesTable extends React.Component<ProductPipelinesTableProps> {
  public state: State;

  constructor(props: ProductPipelinesTableProps) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
      pipelines: this.props.pipelines,
      filter: '',
      sortBy: {},
      columns: [
        {
          title: 'Name',
          transforms: [sortable]
        },
        { title: 'Last pipeline run' },
        { title: 'Last run status' },
        { title: 'Task status' },
        { title: 'Duration' }
      ]
    };
    this.onSort = this.onSort.bind(this);
  }

  getRows = (): Array<IRow | string[]> => {
    const startItem = (this.state.page - 1) * this.state.perPage;
    return this.state.pipelines.slice(startItem, startItem + this.state.perPage).map(pipeline => [
      <Text component={TextVariants.a} href={'/pipeline/' + this.props.product + '/' + pipeline.name}>
        {pipeline.name}
      </Text>,
      <Text component={TextVariants.a} href={'/pipeline/runs/' + pipeline.lastRun}>
        {pipeline.lastRun}
      </Text>,
      <div className="nowrap">
        {getStatusIcon(pipeline.status)}&nbsp;&nbsp;{getStatusText(pipeline.status)}
      </div>,
      <p>
        <PipelineProgress progress={pipeline.taskStatus} />
      </p>,
      <p>
        <Duration duration={pipeline.duration} />
      </p>
    ]);
  };

  onSetPage = (e: SyntheticEvent<HTMLButtonElement, Event>, newPage: number) => {
    this.setState({
      page: newPage
    });
  };

  onPerPageSelect = (e: React.MouseEvent | React.KeyboardEvent | MouseEvent, perPage: number) => {
    this.setState({
      perPage
    });
  };

  onFilterChange = (filter: string, e: FormEvent<HTMLInputElement>) => this.setState({ filter });

  onFilterSet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (this.state.filter.length >= 0)
      this.setState({
        pipelines: this.props.pipelines.filter(
          pipeline => pipeline.name.toLocaleLowerCase().indexOf(this.state.filter.toLocaleLowerCase()) !== -1
        )
      });
  };

  onSort: OnSort = (event, index, direction) => {
    const pipelines = this.props.pipelines;
    if (pipelines.length > 0) {
      const columns = Object.keys(this.props.pipelines[0]);
      const sortedProducts = pipelines.sort((a: IProductPipeline, b: IProductPipeline) =>
        a[columns[index]].localeCompare(b[columns[index]])
      );
      const newState = {
        sortBy: {
          index,
          direction
        },
        products: direction === SortByDirection.asc ? sortedProducts : sortedProducts.reverse()
      };
      console.log(newState);
      this.setState(newState);
    }
  };

  actions = [
    {
      title: 'Restart last run'
    },
    {
      title: 'Start'
    },
    {
      title: 'Delete pipeline'
    }
  ];

  public render() {
    return (
      <React.Fragment>
        <CardHeader>
          <Level>
            <LevelItem>
              <InputGroup>
                <TextInput name="filter" id="filter" type="search" aria-label="filter" onChange={this.onFilterChange} />
                <Button
                  variant={ButtonVariant.control}
                  aria-label="search button for the filter"
                  onClick={this.onFilterSet}
                >
                  <SearchIcon />
                </Button>
              </InputGroup>
            </LevelItem>
            <LevelItem></LevelItem>
            <LevelItem>
              <Pagination
                itemCount={this.state.pipelines.length}
                perPage={this.state.perPage}
                page={this.state.page}
                onSetPage={this.onSetPage}
                onPerPageSelect={this.onPerPageSelect}
                widgetId="pagination-options-menu-top"
              />
            </LevelItem>
          </Level>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Product pipelines table"
            sortBy={this.state.sortBy}
            onSort={this.onSort}
            cells={this.state.columns}
            rows={this.getRows()}
            actions={this.actions}
          >
            <TableHeader />
            <TableBody />
          </Table>
        </CardBody>
        <CardFooter>
          <Level>
            <LevelItem />
            <LevelItem />
            <LevelItem>
              <Pagination
                itemCount={this.state.pipelines.length}
                perPage={this.state.perPage}
                page={this.state.page}
                onSetPage={this.onSetPage}
                onPerPageSelect={this.onPerPageSelect}
                widgetId="pagination-options-menu-bottom"
              />
            </LevelItem>
          </Level>
        </CardFooter>
      </React.Fragment>
    );
  }
}
