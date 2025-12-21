import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DashboardRouter = () => {
    const { user, role: contextRole } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                // Prefer contextRole if already available
                if (contextRole) {
                    setUserRole(contextRole);
                    setLoading(false);
                    return;
                }

                if (!user?.email) {
                    setUserRole('buyer');
                    setLoading(false);
                    return;
                }
                const res = await axiosSecure.get(`/user/${user.email}`);
                if (res.data?.role) {
                    setUserRole(res.data.role);
                } else {
                    setUserRole('buyer');
                }
            } catch (error) {
                console.error('Failed to fetch user role', error);
                setUserRole('buyer');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [axiosSecure, user?.email, contextRole]);

    // Sync role from context whenever it becomes available
    useEffect(() => {
        if (contextRole) {
            setUserRole(contextRole);
            setLoading(false);
        }
    }, [contextRole]);

    useEffect(() => {
        if (!loading && userRole) {
            // Route to appropriate dashboard
            if (userRole === 'admin') {
                navigate('/dashboard/admin', { replace: true });
            } else if (userRole === 'manager') {
                navigate('/dashboard/manager', { replace: true });
            } else {
                navigate('/dashboard/user', { replace: true });
            }
        }
    }, [loading, userRole, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading dashboard...</p>
        </div>
    );
};

export default DashboardRouter;
