import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
            <div 
                className="w-full px-4 py-4 flex items-center text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300"
                onClick={handleHomeClick}
            >
                <p >HomeMonitor</p>
            </div>
        </nav>
    );
}

export default Navbar;