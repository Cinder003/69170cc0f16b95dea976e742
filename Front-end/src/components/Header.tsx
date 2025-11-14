import { FiUsers } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <FiUsers className="h-8 w-8" />
            <h1 className="text-2xl font-bold tracking-wider">
              Prospect Manager
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;