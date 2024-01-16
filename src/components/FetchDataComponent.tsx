import React, { useEffect, useState } from 'react';

const MyComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/hello')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => setMessage(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error.message));
    }, []);


    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default MyComponent;