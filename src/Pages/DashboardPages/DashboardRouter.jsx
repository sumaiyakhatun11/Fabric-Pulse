import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DashboardRouter = () => {
    const { user, role: contextRole, refreshDbUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                setLoading(true);

                // Always pull fresh data to reflect latest role changes
                const profile = await refreshDbUser?.();

                if (profile?.role) {
                    setUserRole(profile.role);
                    return;
                }

                // Fallback to context role or API if profile missing
                if (contextRole) {
                    setUserRole(contextRole);
                    return;
                }

                if (!user?.email) {
                    setUserRole('buyer');
                    return;
                }

                const res = await axiosSecure.get(`/user/${user.email}`);
                setUserRole(res.data?.role || 'buyer');
            } catch (error) {
                console.error('Failed to fetch user role', error);
                setUserRole('buyer');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [axiosSecure, user?.email, contextRole, refreshDbUser]);

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
