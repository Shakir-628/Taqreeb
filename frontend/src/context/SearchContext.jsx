import React, { createContext, useContext, useState, useCallback } from 'react';

const defaultSearch = {
  eventType: '',
  area: '',
  city: 'Karachi',
  date: '',
  guests: '',
  budget: '',
  category: '',
  q: '',
  sort: 'recommended',
};

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [filters, setFilters] = useState(defaultSearch);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateFilters = useCallback((updates) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultSearch);
  }, []);

  const hasActiveFilters = Object.entries(filters).some(
    ([key, val]) => key !== 'sort' && key !== 'city' && val !== ''
  );

  return (
    <SearchContext.Provider value={{ filters, updateFilter, updateFilters, clearFilters, hasActiveFilters }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
}
