/**
 * AuraMarket Frontend Configuration
 * Central place for all environment-driven config.
 * Import from this file instead of reading import.meta.env directly in components.
 */

export const API_URL = import.meta.env.VITE_API_URL || '';

export const APP_NAME = 'AuraMarket';
export const CURRENCY_SYMBOL = '₹';
export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_CHARGE = 49;
export const TAX_RATE = 0.18; // 18% GST
export const MAX_COMPARE_ITEMS = 4;
export const CART_ALERT_MESSAGE = 'Please login to add items to cart';
export const WISHLIST_ALERT_MESSAGE = 'Please login to add items to wishlist';
