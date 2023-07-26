import React, { useEffect, useState } from 'react';

const MyComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/hello')
            .then(response => response.text())
            .then(data => setMessage(data));
    }, []);

    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default MyComponent;