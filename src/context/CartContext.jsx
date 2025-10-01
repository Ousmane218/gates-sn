import React, { useReducer } from 'react';

export const CartContext = React.createContext();

const initialState = {
    items: [], // { product, quantity }
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product } = action;
            const existing = state.items.find(i => i.product.name.fr === product.name.fr);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.product.name.fr === product.name.fr ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { product, quantity: 1 }],
            };
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(i => i.product.name.fr !== action.nameFr),
            };
        }
        case 'UPDATE_QUANTITY': {
            return {
                ...state,
                items: state.items.map(i =>
                    i.product.name.fr === action.nameFr ? { ...i, quantity: action.quantity } : i
                ),
            };
        }
        case 'CLEAR_CART': {
            return initialState;
        }
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
} 