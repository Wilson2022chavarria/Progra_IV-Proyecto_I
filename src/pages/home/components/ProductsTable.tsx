import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import Product from "../../../types/product";
import { Button } from 'react-bootstrap';

type ProductsTableProps = {
  products: Product[];
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((p: Product) => (
            <tr key={p.id}>
              <td width='5%'>{p.id}</td>
              <td width='45%'>{p.title}</td>
              <td width='20%'>{p.category}</td>
              <td width='10%'>{p.price}</td>
              <td width='10%'><img alt={p.title} src={p.image} style={{ height: 30, width: 30 }} /></td>
              <td width='10%'>
                <Button onClick={() => navigate('detail/' + p.id)} variant="link">Details</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default ProductsTable;
