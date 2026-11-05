import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const { warning, success } = useToast();
  const [compareList, setCompareList] = useState(() => {
    try {
      const stored = localStorage.getItem('eduminatti_compare');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('eduminatti_compare', JSON.stringify(compareList));
  }, [compareList]);

  const isInCompare = (schoolId) => {
    return compareList.some((s) => s._id === schoolId || s.slug === schoolId);
  };

  const addToCompare = (school) => {
    if (isInCompare(school._id || school.slug)) {
      warning(`${school.name} is already in your comparison list.`);
      return false;
    }

    if (compareList.length >= 3) {
      warning('You can compare a maximum of 3 schools at a time. Please remove one first.');
      return false;
    }

    setCompareList((prev) => [...prev, school]);
    success(`Added ${school.name} to comparison.`);
    return true;
  };

  const removeFromCompare = (schoolId) => {
    setCompareList((prev) => prev.filter((s) => s._id !== schoolId && s.slug !== schoolId));
  };

  const toggleCompare = (school) => {
    if (isInCompare(school._id || school.slug)) {
      removeFromCompare(school._id || school.slug);
    } else {
      addToCompare(school);
    }
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        clearCompare,
        isInCompare,
        count: compareList.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

