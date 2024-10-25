import React, { useContext, useMemo, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CartContext from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { MAX_CART_QUANTITY_PER_ITEM } from '../constants';

const StarshipCard = ({starshipData}) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { name, model, url, cost_in_credits } = starshipData;

  const cost = useMemo(() => cost_in_credits / 10000, [cost_in_credits]);
  const image = useMemo(() => `https://picsum.photos/id/${url.split('/').at(-2)}/200/300`, [url]);
  const cartItem = useMemo(() => cart.find((item) => item.url === url), [cart, url]);
  const count = useMemo(() => cartItem ? cartItem.quantity : 0, [cartItem]);
  const isInvalidCost = useMemo(() => Number.isNaN(cost), [cost]);
  const cartText = useMemo(() => isInvalidCost ? 'Unavailable' : 'Add to Cart', [isInvalidCost]);

  const handleIncrement = useCallback(() => {
    if (count < MAX_CART_QUANTITY_PER_ITEM) {
      addToCart({...starshipData, cost});
    }
  }, [count, addToCart, starshipData, cost]);

  const handleDecrement = useCallback(() => {
    if (count > 0) {
      removeFromCart(name);
    }
  }, [count, removeFromCart, name]);

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.title}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.manufacturer}>{model}</Text>
        </View>
        <Text style={styles.cost}>{isInvalidCost ? 0 : cost} AED</Text>
          {count > 0 ? (
            <View style={styles.cartControls}>
              {count > 0 && (
                <TouchableOpacity onPress={handleDecrement} style={styles.iconButton}>
                  <Ionicons name="remove-circle-outline" size={24} color="#FF6347" />
                </TouchableOpacity>
              )}
              <Text style={styles.quantity}>{count}</Text>
              {count < MAX_CART_QUANTITY_PER_ITEM && (
                <TouchableOpacity onPress={handleIncrement} style={styles.iconButton}>
                  <Ionicons name="add-circle-outline" size={24} color="#007BFF" />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity onPress={handleIncrement} disabled={isInvalidCost} style={[styles.addButton, isInvalidCost ? styles.disabledButton : {}]}>
              <Text style={styles.addText}>{cartText}</Text>
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 4,
    justifyContent: 'space-around',
  },
  title: {
    paddingVertical: 4,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  manufacturer: {
    fontSize: 14,
  },
  cost: {
    fontSize: 16,
    marginVertical: 4,
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#007BFF',
    width: 120,
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  iconButton: {
    padding: 4,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    width: 120,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default StarshipCard;