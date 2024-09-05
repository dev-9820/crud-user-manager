// components/UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from "../components/Spinner";

function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user details');
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <Spinner/>
    if (error) return <div>{error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">User Details</h1>
            <div className="bg-white p-4 shadow-md hover:shadow-lg transition-all rounded">
                <p className="text-xl font-semibold mb-2">Name: {user.name}</p>
                <p className="text-md mb-2">Email: {user.email}</p>
                <p className="text-md mb-2">Phone: {user.phone}</p>
                <p className="text-md mb-2">Website: {user.website}</p>
                <Link to="/" className="text-blue-500 transition-all hover:underline hover:underline-offset-4 ">
                    Back to User List
                </Link>
            </div>
        </div>
    );
}

export default UserDetail;
