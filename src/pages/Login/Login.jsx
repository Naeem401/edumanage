
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const {signIn, signInWithGoogle} = useAuth();
    

    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);
            toast.success('Logged in successfully');
            navigate('/'); // Redirect to home or dashboard
        } catch (error) {
            toast.error('Failed to log in');
            console.error('Login error:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast.success('Logged in with Google');
            navigate('/'); // Redirect to home or dashboard
        } catch (error) {
            toast.error('Failed to log in with Google');
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Helmet>
                <title>Login - EduManage</title>
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-700">Or</span>
                    <button
                        onClick={handleGoogleSignIn}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Sign in with Google
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Don't have an account? Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
