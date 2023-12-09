// External imports
import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/system';

// Internal imports
import { globalTheme } from './globalStyles';

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={globalTheme}>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;




