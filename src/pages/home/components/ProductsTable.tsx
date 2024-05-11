import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import Product from "../../../types/product";
import { Button, FormLabel, FormSelect, Pagination } from 'react-bootstrap';

type ProductsTableProps = {
  products: Product[];
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const navigate = useNavigate();
  //Paginación
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(5);
  const [productsResult, setProductsResult] = React.useState(products);
  
  
  const calculateButtonsPagination = ()=>{
    const items = [];
    const end = Math.ceil(products.length / skip);
    for (let number = 1; number <= end; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page} onClick={()=> setPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return (items);
  }
  //Cada que cambie skip,page ó products se ejcuta esta lógica
  React.useEffect(() => {
    const start = (page - 1) * skip;
    const end = start + skip
    setProductsResult(products.filter((x,i) => i >= start && i < end));
  }, [skip,page]);
  
  //Si cambia product se restablecen los valores
  React.useEffect(() => {
    setPage(1);
    const start = 0;
    const end = start + skip
    setProductsResult(products.filter((x,i) => i >= start && i < end));
  }, [products]);

  return (
    <>
      <div className='d-flex align-items-center'>
        <span>Resultados:</span>
        <FormSelect className='my-2 ms-2' style={{width: 100 }} onChange={(x)=> {setSkip(parseInt(x.target.value)); setPage(1)}}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </FormSelect>
      </div>
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
            productsResult.map((p: Product) => (
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
      
      <Pagination>
        {calculateButtonsPagination()}
      </Pagination>
    </>
  );
};

export default ProductsTable;
