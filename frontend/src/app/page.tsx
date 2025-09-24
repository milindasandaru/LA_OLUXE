import { Route } from 'next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Page = () => {
  return (
    <div className=''>
      <ToastContainer />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to Adora.lk</h1>
        <p className="text-lg text-gray-600">Your premier e-commerce destination</p>
        <div className="mt-8">
          <p className="text-gray-500">Frontend application ready for development</p>
        </div>
      </main>
    </div>
  );
}
