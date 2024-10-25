import React, { useContext, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CartContext from '../context/CartContext';
import StarshipCard from '../components/StarshipCard';
import { CART_TAX_RATE } from '../constants';

const CartScreen = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [selectedPayment, setSelectedPayment] = useState('Credit Card');

  const calculateTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const tax = subtotal * CART_TAX_RATE;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [cart]);

  const { subtotal, tax, total } = calculateTotals;

  const handlePlaceOrder = useCallback(() => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to the cart before placing an order.');
      return;
    }

    clearCart();
    Alert.alert('Order Placed', 'Thank you! Your order has been placed.');
  }, [cart, clearCart]);

  const renderStarship = useCallback(({ item, index }) => (
    <StarshipCard
      key={`${item.url}${index}`}
      starshipData={item}
    />
  ), []);

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <FlatList
        data={cart}
        renderItem={renderStarship}
        keyExtractor={(item, index) => `${item.url}${index}`}
        showsVerticalScrollIndicator={false}
      />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      )}
      <Text style={styles.sectionHeader}>Payment Method</Text>
        <View style={styles.paymentSection}>
          <TouchableOpacity
            style={selectedPayment === 'Credit Card' ? styles.selectedOption : styles.option}
            onPress={() => setSelectedPayment('Credit Card')}
          >
            <Text>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedPayment === 'Cash on Delivery' ? styles.selectedOption : styles.option}
            onPress={() => setSelectedPayment('Cash on Delivery')}
          >
            <Text>Cash on Delivery</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionHeader}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Subtotal:</Text>
          <Text>{subtotal.toFixed(2)} AED</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Tax (5%):</Text>
          <Text>{tax.toFixed(2)} AED</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Total:</Text>
          <Text>{total.toFixed(2)} AED</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyCartText: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 20,
  },
  paymentSection: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  option: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 4,
    borderRadius: 4,
  },
  selectedOption: {
    padding: 10,
    backgroundColor: '#007BFF',
    marginBottom: 4,
    borderRadius: 4,
  },
  summarySection: {
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  placeOrderButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;