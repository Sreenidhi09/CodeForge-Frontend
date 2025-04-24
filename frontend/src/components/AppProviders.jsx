import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { NavigationProvider } from './NavigationContext';
import { UIProvider } from './UIContext';
import { CodeProvider } from './CodeContext';

// A single component that wraps all providers
const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <UserProvider>
          <UIProvider>
            <CodeProvider>
              {children}
            </CodeProvider>
          </UIProvider>
        </UserProvider>
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default AppProviders;