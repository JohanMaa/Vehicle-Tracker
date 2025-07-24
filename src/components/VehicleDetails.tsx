import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVehicleStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedVehicle, loading, error, fetchVehicleDetail } = useVehicleStore();

  useEffect(() => {
    if (id) {
      fetchVehicleDetail(Number(id));
    }
  }, [id, fetchVehicleDetail]);

  return (
    <div className="grid gap-4 lg:grid-cols-2 max-w-7xl mx-auto">
      <Card className="animate-in fade-in duration-700">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-bold text-blue-800">Vehicle Details</CardTitle>
          <Button
            variant="outline"
            className="border-blue-300 hover:bg-blue-500 hover:text-white"
            onClick={() => id && fetchVehicleDetail(Number(id))}
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center py-4 bg-red-50 rounded-lg">{error}</div>
          )}
          {selectedVehicle && !loading && !error && (
            <div className="space-y-3">
              <p className="text-sm"><strong>Vehicle ID:</strong> {selectedVehicle.id}</p>
              <p className="text-sm"><strong>Odometer:</strong> {selectedVehicle.odometer.toLocaleString()} km</p>
              <p className="text-sm"><strong>Fuel Level:</strong> {selectedVehicle.fuel_level}%</p>
              <p className="text-sm"><strong>Speed:</strong> {selectedVehicle.speed} km/h</p>
              <p className="text-sm"><strong>Timestamp:</strong> {new Date(selectedVehicle.timestamp).toLocaleString()}</p>
            </div>
          )}
          {!loading && !error && !selectedVehicle && (
            <div className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">No vehicle data available</div>
          )}
        </CardContent>
      </Card>
      {selectedVehicle && !loading && !error && (
        <Card className="h-[300px] lg:h-[400px] animate-in zoom-in duration-700">
          <MapContainer
            center={[selectedVehicle.latitude, selectedVehicle.longitude]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="rounded-b-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[selectedVehicle.latitude, selectedVehicle.longitude]}>
              <Popup>{selectedVehicle.id}</Popup>
            </Marker>
          </MapContainer>
        </Card>
      )}
    </div>
  );
};

export default VehicleDetail;