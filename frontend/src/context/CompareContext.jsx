import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState(() => {
        const saved = localStorage.getItem('compareList');
        return saved ? JSON.parse(saved) : [];
    });
    
    const { showToast } = useToast();

    useEffect(() => {
        localStorage.setItem('compareList', JSON.stringify(compareList));
    }, [compareList]);

    const toggleCompare = (product) => {
        let isRemoving = false;
        let isLimitReached = false;
        
        setCompareList(prev => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                isRemoving = true;
                return prev.filter(item => item._id !== product._id);
            } else {
                if (prev.length >= 4) {
                    isLimitReached = true;
                    return prev;
                }
                return [...prev, product];
            }
        });

        // Execute side-effects outside the state updater
        // We use setTimeout to ensure it runs after the state update is queued
        setTimeout(() => {
            if (isRemoving) {
                showToast('Removed from Compare', 'info');
            } else if (isLimitReached) {
                showToast('You can only compare up to 4 items', 'error');
            } else {
                showToast('Added to Compare', 'success');
            }
        }, 0);
    };

    const clearCompare = () => {
        setCompareList([]);
        showToast('Compare list cleared', 'info');
    };

    return (
        <CompareContext.Provider value={{ compareList, toggleCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => useContext(CompareContext);
