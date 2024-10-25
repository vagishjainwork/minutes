import React, { useCallback, useContext, useMemo } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import CartContext from '../context/CartContext';
import StarshipCard from '../components/StarshipCard';
import CartButton from '../components/CartButton';
import axios from 'axios';

const fetchStarships = async ({ pageParam = `https://swapi.dev/api/starships/?page=1` }) => {
  const response = await axios.get(pageParam);
  return response.data;
};

const HomeScreen = () => {
  const { cart } = useContext(CartContext);

  const { data, isFetching, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['starships'],
    queryFn: fetchStarships,
    getNextPageParam: (lastPage) => lastPage.next
  });

  const cartCount = useMemo(() => cart?.reduce((acc, curr) => acc + curr?.quantity, 0) ?? 0, [cart]);

  const renderStarship = useCallback(({ item, index }) => (
    <StarshipCard
      key={`${item.url}${index}`}
      starshipData={item}
    />
  ), []);

  if (isFetching && !isFetchingNextPage) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages.flatMap(page => page.results)}
        renderItem={renderStarship}
        keyExtractor={(item, index) => `${item.url}${index}`}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" color="#007BFF" /> : null}
        ListFooterComponentStyle={styles.listFooterComponentStyle}
      />
      <CartButton itemCount={cartCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterComponentStyle: {
    marginBottom: 12
  }
});

export default HomeScreen;
