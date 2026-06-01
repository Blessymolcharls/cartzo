import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiService.get('/auth/users');
        setUsers(res.data || []);
      } catch (err) {
        console.error('Fetch users error:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">{users.length} registered users</p>
      </div>

      <div className="bg-[#0f0f0f] border border-white/8 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center text-gray-500 text-sm py-12">Loading users...</div>
        ) : error ? (
          <div className="text-center text-red-400 text-sm py-12">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-600 text-sm py-12">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-xs font-bold flex-shrink-0">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400">{user.email}</td>
                    <td className="px-5 py-3.5">
                      {user.isAdmin ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/5 text-gray-400 border border-white/10">
                          Customer
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-gray-400">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
