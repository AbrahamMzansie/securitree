import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Input from "../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { linearCategories } from "../../helpers/linearCategories";
import { addPageProduct } from "../../actions/pageActions";

const Page = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [productPicture, setProductPicture] = useState([]);

  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const clearFields = () => {
    setTitle("");
    setType("");
    setDescription("");
    setCategoryId("");
    setCategories([]);
    setBanners([]);
    setProductPicture([]);
  };

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setShow(false);
      clearFields();
    }
  }, [page]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productImageHandler = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };
  const bannerImageHandler = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const onCategoryChange = (e) => {
    const _category = categories.find(
      (category) => category.name === e.target.value
    );
    console.log(categories);
    console.log(e.target.value);
    setCategoryId(_category.value);
    setType(_category.type);
  };

  const submitPagehandler = (e) => {
    const form = new FormData();
    form.append("title", title);
    form.append("type", type);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPicture) {
      form.append("productImages", pic);
    }
    for (let _pic of banners) {
      form.append("bannerImages", _pic);
    }
    dispatch(addPageProduct(form));
  };

  const renderCreatePageModal = () => {
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          create a page
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create A Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              style={{ marginBottom: "20px" }}
              className="form-control"
              value={categoryId.name}
              onChange={(e) => onCategoryChange(e)}
            >
              <option value="Select Category"></option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Input
              className="form-control-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type={"text"}
              placeholder="Title"
            />
            <Input
              className="form-control-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type={"text"}
              placeholder="Description"
            />
            {banners.length > 0
              ? banners.map((pic, index) => (
                  <Row key={index}>
                    <Col>{pic.name}</Col>
                  </Row>
                ))
              : null}
            <Input
              onChange={(e) => bannerImageHandler(e)}
              type="file"
              label="Banners"
              name="Banners"
              placeholder="Banner Picture"
              className="form-control"
            />
            {productPicture.length > 0
              ? productPicture.map((pic, index) => (
                  <Row key={index}>
                    <Col>{pic.name}</Col>
                  </Row>
                ))
              : null}
            <Input
              onChange={(e) => productImageHandler(e)}
              type="file"
              label="Product Image"
              name="Product Image"
              placeholder="Product Picture"
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => submitPagehandler(e)}>
              Create Page
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return <div>{renderCreatePageModal()}</div>;
};

export default Page;
