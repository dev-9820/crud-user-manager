import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserForm from '../components/UserForm';
import Spinner from '../components/Spinner';

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleUserCreated = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleUserUpdated = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setSelectedUser(null); // Deselect after updating
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    const handleDeleteClick = async (userId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">


            <UserForm
                onUserCreated={handleUserCreated}
                onUserUpdated={handleUserUpdated}
                selectedUser={selectedUser}
            />
            <h1 className="text-2xl font-bold text-center mb-4 mt-4">User List</h1>
            <table className="min-w-full shadow-md rounded bg-white border mt-6">
                <thead>
                <tr className="bg-gray-300">
                    <th className="py-2 px-4 border-2">Name</th>
                    <th className="py-2 px-4 border-2">Email</th>
                    <th className="py-2 px-4 border-2">Phone</th>
                    <th className="py-2 px-4 border-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="py-2 text-center px-4 border">
                            <Link to={`/user/${user.id}`} className="text-blue-500 font-bold hover:underline underline-offset-2">
                                {user.name}
                            </Link>
                        </td>
                        <td className="py-2 text-center px-4 border">{user.email}</td>
                        <td className="py-2 text-center px-4 border">{user.phone}</td>
                        <td className="py-2 text-center px-4 border">
                            <button
                                className="text-blue-500 mr-2 hover:underline hover:underline-offset-2 hover:bg-blue-400 p-1 hover:text-white rounded transition-all"
                                onClick={() => handleEditClick(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500 hover:underline hover:underline-offset-2 hover:bg-red-400 p-1 hover:text-white rounded transition-all"
                                onClick={() => handleDeleteClick(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
