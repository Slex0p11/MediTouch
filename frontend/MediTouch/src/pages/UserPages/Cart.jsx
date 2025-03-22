import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="p-4 border-b">
            <p>{item.medicine_name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: Rs. {item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
