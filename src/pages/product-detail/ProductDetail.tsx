import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Product from "../../types/product";

const ProductDetail: React.FC = () => {
  const [product, setProduct] = React.useState<Product>();
  const urlParams = useParams();

  React.useEffect(() => {
    const productsString = sessionStorage.getItem('products');
    if (productsString !== null) {
      const products: Product[] = JSON.parse(productsString);
      const foundProduct = products.find((product) => product.id?.toString() === urlParams.productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, []);

  if (product === undefined) return <Container>Product Not Found</Container>;

  return (
  <Container >
    <br />
    <h4>{product.title}</h4>
    <br />

    <Row>
      <Col md={8}>
        <Badge style={{width: 200}}>{product.category}</Badge>
        <br />
        <br />
        <p>{product.description}</p>
        Price: ${product.price}
      </Col>

      <Col md={4}>
        <img alt={product.title} src={product.image} style={{ width: '75%' }} />
      </Col>
    </Row>
  </Container>
);
}

export default ProductDetail;
