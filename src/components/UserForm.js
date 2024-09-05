import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ onUserCreated, onUserUpdated, selectedUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Pre-fill form fields when a user is selected for editing
    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setPhone(selectedUser.phone);
        } else {
            // Reset the form if no user is selected (to handle clearing after successful update)
            setName('');
            setEmail('');
            setPhone('');
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, phone };

        try {
            if (selectedUser) {
                // If a user is selectedupdate the user
                const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, userData);
                setSuccess('User updated successfully!');
                onUserUpdated(response.data); // Update the UI with the modified user
            } else {
                // if no user is selected create a new user
                const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
                setSuccess('User created successfully!');
                onUserCreated(response.data); // Update the UI with the new user
            }

            //clear the form inputs after successful submit
            setName('');
            setEmail('');
            setPhone('');
            setError('');
        } catch (err) {
            setError(selectedUser ? 'Failed to update user' : 'Failed to create user');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-4 shadow-lg rounded-xl ">
            <h2 className="text-xl font-bold mb-4">{selectedUser ? 'Edit User' : 'Create New User'}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full border rounded transition-all duration-500 hover:shadow-md p-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full hover:shadow-md transition-all duration-500 border rounded p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Phone</label>
                    <input
                        type="tel"
                        className="w-full border hover:shadow-md transition-all duration-500 rounded p-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-300 shadow-md text-black p-2 hover:bg-blue-950 hover:text-white transition-all duration-200 rounded">
                    {selectedUser ? 'Update User' : 'Create User'}
                </button>
            </form>
        </div>
    );
}

export default UserForm;
