import { useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApi';
import { userLoggedOut } from '../features/auth/authSlice';

const AppShell = () => {
    const navigate = useNavigate();
    const [logout, { isLoading, isError, error }] = useLogoutMutation();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(userLoggedOut());
            navigate("/login");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white text-xl">
                        Event Reminder
                    </Link>                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default AppShell;
