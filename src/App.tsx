  import { Outlet } from 'react-router-dom';
  import { Button } from "@/components/ui/button";
  import { useNavigate } from 'react-router-dom';

  const App: React.FC = () => {
    const navigate = useNavigate();
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Tracker Dashboard</h1>
            <Button onClick={() => navigate('/')}>Back to List</Button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    );
  };

  export default App;
