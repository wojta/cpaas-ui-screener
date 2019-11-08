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
  sortable
} from '@patternfly/react-table';

import { SearchIcon } from '@patternfly/react-icons';
import { IProduct } from 'src/types/IProduct';

export interface ProductsTableProps {
  products: Array<IProduct>;
}

interface State {
  page: number;
  perPage: number;
  products: Array<IProduct>;
  filter: string;
  sortBy?: ISortBy;
  columns: Array<ICell>;
}

export class ProductsTable extends React.Component<ProductsTableProps> {
  public state: State;

  constructor(props: ProductsTableProps) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
      products: this.props.products,
      filter: '',
      sortBy: {},
      columns: [
        {
          title: 'Name',
          transforms: [sortable]
        },
        { title: 'Owner', transforms: [sortable] }
      ]
    };
  }

  getRows = (): Array<IRow | string[]> => {
    const startItem = (this.state.page - 1) * this.state.perPage;
    return this.state.products.slice(startItem, startItem + this.state.perPage).map(product => [
      <Text component={TextVariants.a} href={'/product/' + product.name}>
        {product.name}
      </Text>,
      product.owner
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
        products: this.props.products.filter(
          product => product.name.toLocaleLowerCase().indexOf(this.state.filter.toLocaleLowerCase()) !== -1
        )
      });
  };

  onSort: OnSort = (event, index, direction) => {
    const products = this.props.products;
    if (products.length > 0) {
      const columns = Object.keys(this.props.products[0]);
      const sortedProducts = products.sort((a: IProduct, b: IProduct) =>
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

  public render() {
    console.log(this.state);
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
                itemCount={this.state.products.length}
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
            aria-label="Products table"
            sortBy={this.state.sortBy}
            onSort={this.onSort}
            cells={this.state.columns}
            rows={this.getRows()}
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
                itemCount={this.state.products.length}
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
