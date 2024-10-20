import React, { useState, useMemo, useContext, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import axios from 'axios';
import StarshipCard from '../components/StarshipCard';
import CartContext from '../context/CartContext';
import CartButton from '../components/CartButton';

const fetchSearchResults = async (query) => {
  const response = await axios.get(`https://swapi.dev/api/starships/?search=${query}`);
  return response.data;
};

const SearchScreen = () => {
  const { cart } = useContext(CartContext);
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['searchResults', query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query,
  });

  const debouncedQuery = useMemo(() => debounce(setQuery, 400), []);

  const cartCount = useMemo(() => cart?.reduce((acc, curr) => acc + curr?.quantity, 0) ?? 0, [cart]);

  const renderStarship = useCallback(({ item, index }) => (
    <StarshipCard
      key={`${item.url}${index}`}
      image={`https://picsum.photos/id/${index}/200/300`}
      name={item.name}
      cost={item.cost_in_credits / 10000}
      model={item.model}
    />
  ), []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Starships"
        style={styles.searchInput}
        onChangeText={debouncedQuery}
        clearButtonMode='always'
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <FlatList
          data={data?.results || []}
          renderItem={renderStarship}
          keyExtractor={(item, index) => `${item.url}${index}`}
          showsVerticalScrollIndicator={false}
        />
      )}
      <CartButton itemCount={cartCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#007BFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;