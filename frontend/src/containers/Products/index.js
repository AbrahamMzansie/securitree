import React, { useState } from "react";
import Layout from "../../components/Layout";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/productActions";
import ShowSpinner from "../../components/UI/Spinner";
import Input from "../../components/UI/Input";
import {imageURL} from "../../../src/urlConfig"

import "./style.css";

const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [Price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const [productPicture, setProductPicture] = useState([]);
  const [show, setShow] = useState(false);
  const [showProductDetailModal, setProductDetailModal] = useState(false);

  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.product);

  const handleModalClose = () => {
    setShow(false);
  };

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("quantity", quantity);
    form.append("price", Price);
    form.append("category", categoryName);

    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => {
    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setCategoryName("");
    setProductPicture("");
    setShow(true);
  };

  const category = useSelector((state) => state.category);
  const catergoryImageHandler = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id}>
          {category.name}
          {category && category.children && category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : (
            []
          )}
        </li>
      );
    }
    return categoryList;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category && category.children && category.children.length > 0) {
          createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductDetailModalClose = () => {
    setProductDetailModal(false);
  };
  const handleProductDetailModalShow = (product) => {
    setProductDetailModal(true);
    setProductDetail(product);
  };

  const renderPorducts = (productList) => {
    return (
      <Table style={{ fontSize: "13px" }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>

            <th>Product Picture</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {productList &&
            productList.map((product) => (
              <tr
                onClick={() => handleProductDetailModalShow(product)}
                key={product._id}
              >
                <td>1</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>

                <td>Table cell</td>
                <td>{product.category && product.category.name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type={"text"}
            placeholder="Product Name"
          />
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type={"number"}
            placeholder="Quantity"
          />
          <Input
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            type={"number"}
            placeholder="Price"
          />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control"
          >
            <option>select category</option>
            {category &&
              category.categories &&
              createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
          </select>
          {productPicture.length > 0
            ? productPicture.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}
          <Input
            onChange={(e) => catergoryImageHandler(e)}
            type="file"
            name="Product Image"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderShowProductDetails = () => {
    return (
      <Modal
        size="lg"
        show={showProductDetailModal}
        onHide={() => handleProductDetailModalClose()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <label className="key">Name</label>
              <p className="value">{productDetail.name}</p>
            </Col>
            <Col md={6}>
              <label className="key">Price</label>
              <p className="value">{productDetail.price}</p>
            </Col>
            <Col md={6}>
              <label className="key">Quantity</label>
              <p className="value">{productDetail.quantity}</p>
            </Col>

            <Col md={6}>
              <label className="key">Category</label>
              <p className="value">
                {productDetail.category && productDetail.category.name}
              </p>
            </Col>
            <Col md={12}>
              <label className="key">Description</label>
              <p className="value">{productDetail.description}</p>
            </Col>
          </Row>
          <Row>
            <Col className="product-pictures">
              <label className = "key">Product Pictures</label>
             
                {productDetail.productPictures &&
                  productDetail.productPictures.map((item) => (
                    <div key={item._id} className="product-pictures-container">
                      <img
                        alt="product_image"
                        src={`${imageURL}${item.img}`}
                        
                      />
                    </div>
                  ))}
            
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h5>Manage Products</h5>
              <Button
                style={{ marginTop: "10px", marginBottom: "20px" }}
                variant="primary"
                onClick={handleShow}
              >
                Add Product
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {productsData &&
              productsData.products &&
              renderPorducts(productsData.products)}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderShowProductDetails()}
    </Layout>
  );
};

export default Products;
