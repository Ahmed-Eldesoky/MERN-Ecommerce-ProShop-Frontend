import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch } from "react-redux";
import { createProductReview, listProductDetails } from "../actions/productAction";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productsConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetailsReducer
  );

  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = useSelector((state) => state.productCreateReviewReducer);

  const { userInfo } = useSelector((state) => state.userLoginReducer);

  useEffect(() => {
    if(successCreateReview){
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({type : PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id,successCreateReview]);

  const addToCarthandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler= (e)=>{
      e.preventDefault()
      dispatch(createProductReview(match.params.id,{
        rating,
        comment
      }))
  }

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-left-0 border-right-0">
                  <h4>{product.name}</h4>
                </ListGroup.Item>

                <ListGroup.Item className="border-left-0 border-right-0">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item className="border-left-0 border-right-0">
                  Price: <strong>${product.price}</strong>
                </ListGroup.Item>

                <ListGroup.Item className="border-left-0 border-right-0">
                  {" "}
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Statues:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="px-2"
                          >
                            {[
                              ...Array(parseInt(product.countInStock)).keys(),
                            ].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn btn-block"
                      onClick={addToCarthandler}
                      type="button"
                      disabled={parseInt(product.countInStock) === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <hr></hr>
          <Row className='mt-4'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                    <p>{review.createdAt.substring(0, 10)}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {loadingCreateReview && <Loader/>}
                  {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating}
                      onChange={(e)=>setRating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' row='3' value={comment}
                      onChange={(e)=>setComment(e.target.value)}></Form.Control>

                      </Form.Group>
                      <Button type='submit' variant='primary'>Submit</Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign In</Link>to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
