'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'KES';

interface CurrencyContextType {
    currency: CurrencyCode;
    exchangeRate: number;
    formatPrice: (priceInUSD: number | string) => string;
    isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mock exchange rates (Base USD)
const RATES = {
    USD: 1,
    GBP: 0.79,
    EUR: 0.92,
    KES: 130
};

const SYMBOLS = {
    USD: '$',
    GBP: '£',
    EUR: '€',
    KES: 'KSh '
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<CurrencyCode>('USD');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const detectLocation = async () => {
            try {
                // Fetch location from IPAPI
                // In a real app, this should probably happen server-side or via edge middleware
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                const country = data.country_code;

                // Map country to currency
                if (country === 'GB') setCurrency('GBP');
                else if (['DE', 'FR', 'IT', 'ES', 'NL'].includes(country)) setCurrency('EUR'); // Simplified EU check
                else if (country === 'KE') setCurrency('KES');
                else setCurrency('USD');

            } catch (error) {
                console.error('Failed to detect location:', error);
                setCurrency('USD'); // Default fallback
            } finally {
                setIsLoading(false);
            }
        };

        detectLocation();
    }, []);

    const formatPrice = (priceInUSD: number | string) => {
        const numericPrice = typeof priceInUSD === 'string' ? parseFloat(priceInUSD) : priceInUSD;
        if (isNaN(numericPrice)) return '';

        const converted = numericPrice * RATES[currency];
        const symbol = SYMBOLS[currency];

        return `${symbol}${converted.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, exchangeRate: RATES[currency], formatPrice, isLoading }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
