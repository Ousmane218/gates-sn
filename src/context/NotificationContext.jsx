import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const [modal, setModal] = useState(null);

    const showToast = useCallback((message, type = 'success', duration = 3000) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), duration);
    }, []);

    const confirm = useCallback(({ title, message, onConfirm, confirmText = 'Confirmer', cancelText = 'Annuler' }) => {
        setModal({ title, message, onConfirm, confirmText, cancelText });
    }, []);

    const closeModal = () => setModal(null);

    return (
        <NotificationContext.Provider value={{ showToast, confirm }}>
            {children}
            
            {/* Toast Rendering */}
            {toast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
                        toast.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' : 
                        toast.type === 'info' ? 'bg-blue-50 border-blue-100 text-blue-800' :
                        'bg-green-50 border-green-100 text-green-800'
                    }`}>
                        {toast.type === 'error' ? <AlertCircle size={20} /> : 
                         toast.type === 'info' ? <Info size={20} /> : 
                         <CheckCircle size={20} />}
                        <p className="text-sm font-bold tracking-tight">{toast.message}</p>
                        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70 transition">
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Rendering */}
            {modal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeModal} />
                    <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-black text-gray-900 mb-2">{modal.title}</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">{modal.message}</p>
                        <div className="flex gap-3 mt-8">
                            <button 
                                onClick={closeModal}
                                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition"
                            >
                                {modal.cancelText}
                            </button>
                            <button 
                                onClick={() => {
                                    modal.onConfirm();
                                    closeModal();
                                }}
                                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold bg-black text-white hover:bg-gray-800 transition shadow-lg shadow-black/10"
                            >
                                {modal.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    );
};
