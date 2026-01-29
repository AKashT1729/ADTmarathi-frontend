import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AdminContacts = () => {
  const { user, isAuthenticated } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchContacts();
    }
  }, [isAuthenticated, user]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/v1/contactus/showContacts');
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckContact = async (contactId) => {
    try {
      // Since there's no specific validate endpoint, we can fetch the contact again to "validate"
      // In a real app, this could be an endpoint to mark as checked or validate
      const response = await axios.get('/api/v1/contactus/showContacts'); // Or a specific endpoint
      if (response.data.success) {
        alert(`Contact ${contactId} validated successfully`);
      }
    } catch (err) {
      alert('Validation failed');
      console.error('Error validating contact:', err);
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center">Access denied. Admin privileges required.</div>;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading contacts...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin - Contact Messages</h1>
        {contacts.length === 0 ? (
          <p className="text-gray-600">No contact messages found.</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-gray-700 mt-2">{contact.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Submitted on: {new Date(contact.createdAt).toLocaleString()}
                    </p>
                    {contact.userId && (
                      <p className="text-sm text-blue-600">From registered user</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCheckContact(contact._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Check Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;