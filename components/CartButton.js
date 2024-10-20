import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CartButton = ({ itemCount }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
      <Ionicons name="cart" size={24} color="#fff" />
      <Text style={styles.itemCount}>{itemCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 16,
    opacity: 0.8
  },
  itemCount: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 10,
    padding: 2,
  },
});

export default CartButton;