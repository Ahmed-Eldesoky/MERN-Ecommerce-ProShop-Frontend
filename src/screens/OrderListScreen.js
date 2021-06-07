import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listAllOrders } from "../actions/orderAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderListScreen = ({ history }) => {

  const dispatch = useDispatch();
  const { loading :loadingOrders, error:errorOrders, orders } = useSelector(
    (state) => state.orderListReducer
  );
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);


  return (
    <>
    <h1>All Orders</h1>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped hover bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTLA</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td
                    style={{ fontSize: "0.7rem" }}
                    className="font-weight-bold"
                  >
                    {order._id}
                  </td>
                  <td>{order.user.name}</td>
                  <td style={{ fontSize: "0.9rem" }}>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <strong style={{ color: "green" }}>{order.paidAt.substring(0, 10)}</strong>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
     
    </>
  )
}

export default OrderListScreen;
