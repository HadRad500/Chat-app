import React, { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
    const firebaseConfig = {
        apiKey: "AIzaSyDyO6fv3sHwoe8LdE6aLyGmZ7AZb4ml7vs",
        authDomain: "chatapp-c569a.firebaseapp.com",
        projectId: "chatapp-c569a",
        storageBucket: "chatapp-c569a.appspot.com",
        messagingSenderId: "928633504290",
        appId: "1:928633504290:web:3af65e27840cba527e007b",
        measurementId: "G-DEDCWESGXP"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);

    return (
        <DatabaseContext.Provider value={{ db, storage }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
};