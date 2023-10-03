import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './WVerificator.css'

import { PiMagnifyingGlass } from 'react-icons/pi';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const WVerificator = () => {

    const [walletAddress, setWalletAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        const walletRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/g;
        if (walletRegex.test(value) || value === '') {
            setMessage('');
        } else {
            setMessage('Incorrect wallet format');
        }
        setWalletAddress(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (walletAddress === '') {
            setMessage('Please enter wallet address');
            return;
        }

        database.ref('wallets').orderByValue().equalTo(walletAddress).once('value', (snapshot) => {
            if (snapshot.exists()) {
                setMessage('You are inside the list');
            } else {
                setMessage('You are not on the list');
            }
        });

        setWalletAddress('');
    };

    let messageClass = 'MessageNoRegister';
    if (message === 'You are not on the list') {
        messageClass = 'MessageRegister';
    } else if (message === 'Incorrect wallet format') {
        messageClass = 'MessageIncorrect';
    } else if (message === 'You are inside the list') {
        messageClass = 'MessageRegister';
    }

    return (
        <div>

            <div className='WCollector'>
                <h3>Verify if you are on the list</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={walletAddress}
                        onChange={handleInputChange}
                        placeholder="Enter wallet address"
                        minLength={32}
                        maxLength={44}
                    />
                    <button type="submit"><PiMagnifyingGlass style={{ verticalAlign: 'middle' }} size='1.5rem' /></button>
                </form>
                {message && <p className={messageClass}>{message}</p>}
            </div>

        </div>
    );
};

export default WVerificator