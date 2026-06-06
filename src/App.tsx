import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotyfProvider } from './components/NotyfProvider';
import { router } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotyfProvider>
        <RouterProvider router={router} />
      </NotyfProvider>
    </QueryClientProvider>
  );
}
