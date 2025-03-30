import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setError("User not authenticated.");
                return;
            }

            const response = await axios.get("http://127.0.0.1:8000/api/cart/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartItems(response.data);
        } catch (err) {
            setError("Failed to load cart items.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = async (medicineId) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.post(
                "http://127.0.0.1:8000/api/cart/add/",
                { medicine_id: medicineId, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchCartItems(); // Refresh cart items
        } catch (err) {
            setError("Failed to add item to cart.");
        }
    };

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${cartItemId}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchCartItems(); // Refresh cart items
        } catch (err) {
            setError("Failed to remove item.");
        }
    };

    const handleIncreaseQuantity = async (medicineId) => {
        await handleAddToCart(medicineId);
    };

    const handleDecreaseQuantity = async (cartItemId, currentQuantity) => {
        if (currentQuantity > 1) {
            try {
                const token = localStorage.getItem("accessToken");
                await axios.post(
                    "http://127.0.0.1:8000/api/cart/update/",
                    { cart_item_id: cartItemId, quantity: currentQuantity - 1 },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                fetchCartItems(); // Refresh cart items
            } catch (err) {
                setError("Failed to update quantity.");
            }
        }
    };

    return (
        <div className="p-4">
            {error && <div className="text-red-500">{error}</div>}

            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {isLoading ? (
                <p className="text-gray-500">Loading cart...</p>
            ) : cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Medicine</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id} className="border">
                                <td className="border p-2">
                                    <img
                                        src={`http://127.0.0.1:8000${item.image}`}
                                        alt={item.medicine_name}
                                        className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td className="border p-2">{item.medicine_name}</td>
                                <td className="border p-2 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                        className="bg-gray-400 text-white px-2 py-1 rounded"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    {item.quantity}
                                    <button
                                        onClick={() => handleIncreaseQuantity(item.medicine_id)}
                                        className="bg-gray-400 text-white px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                </td>
                                <td className="border p-2">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Cart;
