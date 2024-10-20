import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TabNavigator from './navigation/TabNavigator';
import { CartProvider } from './context/CartContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <TabNavigator />
      </QueryClientProvider>
    </CartProvider>
  );
};

export default App;