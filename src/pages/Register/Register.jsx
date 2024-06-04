import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useAuth();

    const onSubmit = async (data) => {
        try {
            await createUser(data.email, data.password);

            await updateUserProfile(data.name, data.photoURL);

            toast.success('Registered successfully');
            navigate('/'); // Redirect to home or dashboard
        } catch (error) {
            toast.error('Failed to register');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Helmet>
                <title>Register - EduManage</title>
                <meta name="description" content="Register to EduManage to access your classes and dashboard." />
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
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
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Photo URL</label>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.photoURL ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('photoURL', { required: 'Photo URL is required' })}
                        />
                        {errors.photoURL && <span className="text-red-500 text-sm">{errors.photoURL.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
