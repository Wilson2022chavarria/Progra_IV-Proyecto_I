import * as React from 'react';
import { useForm, SubmitHandler  } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import Product from '../../../types/product';

type DeleteProductModalProps = {
  onHide: () => void;
  onSave: (p: Product) => void;
  product: Product | null;
  show: boolean;
};

type ProductFormInputs = {
  title: string
  description: string
  category: string
  image: string
  price: number
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ onSave, onHide, product, show }) => {
  const {register, handleSubmit} = useForm<ProductFormInputs>();

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    onSave({ ...product!, ...data });
  }

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{product?.id === 0 ? 'Create' : 'Edit'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                defaultValue={product?.title}
                placeholder="Title"
                type="text"
                {...register("title", { required: true })}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                defaultValue={product?.description}
                placeholder="Description"
                type="text"
                {...register("description", { required: true })}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                defaultValue={product?.category}
                placeholder="Category"
                type="text"
                {...register("category", { required: true })}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                defaultValue={product?.image}
                placeholder="Image"
                type="text"
                {...register("image", { required: true })}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                defaultValue={product?.price}
                placeholder="Price"
                type="text"
                {...register("price", { required: true })}
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteProductModal;
