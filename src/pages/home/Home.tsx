import React from "react";
import { useForm, SubmitHandler  } from 'react-hook-form';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import useProducts from "../../hooks/useProducts";
import Product from "../../types/product";
import ProductsTable from "./components/ProductsTable";

const Home: React.FC = () => {
  const {data, loading} = useProducts();
  const [listedProducts, setListedProducts] = React.useState<Product[]>([]);

  const {register, handleSubmit} = useForm<{searchTerm: string}>();

  const onSearch: SubmitHandler<{searchTerm: string}> = (formData) => {
    const filteredProducts = data.filter((product: Product) => {
      return (
        product.title.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(formData.searchTerm.toLowerCase())
      );
    });
    setListedProducts(filteredProducts);
  }

  React.useEffect(() => {
    if (data.length) {
      setListedProducts(data);
    }
  }, [data]);

  if (loading) return (<div>Loading...</div>);

  return (
  <Container >
    <br />
    <h4>Available Products</h4>
    <br />

    <Form noValidate onSubmit={handleSubmit(onSearch)}>
      <Row>
        <Col md={3}>
          <Form.Control
            placeholder="Search"
            type="search"
            {...register("searchTerm")}
          />
        </Col>
        <Col md={2}>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </Col>
      </Row>
    </Form>

    <br />

    <ProductsTable products={listedProducts} />
  </Container>
);
}

export default Home;
