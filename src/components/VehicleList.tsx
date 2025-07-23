import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const VehicleList: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, loading, error, fetchVehicles } = useVehicleStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // Filter dan sort kendaraan
  const filteredVehicles = vehicles
    .filter((vehicle) => statusFilter === 'all' || vehicle.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'speed') return b.speed - a.speed;
      return 0;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select onValueChange={setStatusFilter} defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'name' ? 'default' : 'outline'}
            onClick={() => setSortBy('name')}
          >
            Sort by Name
          </Button>
          <Button
            variant={sortBy === 'speed' ? 'default' : 'outline'}
            onClick={() => setSortBy('speed')}
          >
            Sort by Speed
          </Button>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center py-4">{error}</div>
      )}
      {!loading && !error && filteredVehicles.length === 0 && (
        <div className="text-gray-500 text-center py-4">No vehicles found</div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{vehicle.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Status: <span className={vehicle.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}>{vehicle.status}</span>
              </p>
              <p className="text-sm text-gray-600">Speed: {vehicle.speed} km/h</p>
              <p className="text-sm text-gray-600">Updated: {new Date(vehicle.updated_at).toLocaleString()}</p>
              <Button
                className="mt-4 w-full"
                onClick={() => navigate(`/vehicles/${vehicle.id}`)}
              >
                Detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;