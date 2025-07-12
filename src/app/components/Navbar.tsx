import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-gray-800 hover:text-mirror-blue transition duration-300">AI Demos</a>
        </Link>
        <div className="space-x-4">
          <Link href="/demo-agent"><a className="text-gray-600 hover:text-mirror-blue transition duration-300">Demo Agent</a></Link>
          <Link href="/conversational-ai"><a className="text-gray-600 hover:text-mirror-blue transition duration-300">Conversational AI</a></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;