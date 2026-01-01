import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [], // Load from storage if exists
    total: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, quantity } = action.payload
            const existingItem = state.items.find(item => item.id === product.id)

            let newItems
            if (existingItem) {
                // If item exists, just increase quantity
                newItems = state.items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            } else {
                // New item
                newItems = [...state.items, { ...product, quantity }]
            }

            return { ...state, items: newItems }
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            }

        case 'CLEAR_CART':
            return { ...state, items: [] }

        default:
            return state
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    // Every time cart changes, save to LocalStorage and Recalculate Total
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.items))

        const total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        // We can add state.total if we want, but usually calculating it on the fly is fine
    }, [state.items])

    const addToCart = (product, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
    }

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId })
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
    }

    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    // specific selector for total price
    const cartTotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{
            cart: state.items,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}