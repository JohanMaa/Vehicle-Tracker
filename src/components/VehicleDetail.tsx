
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVehicleStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Impor CSS Leaflet

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedVehicle, loading, error, fetchVehicleDetail } = useVehicleStore();

  useEffect(() => {
    if (id) {
      fetchVehicleDetail(Number(id));
    }
  }, [id, fetchVehicleDetail]);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Vehicle Details</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-4">{error}</div>
        )}
        {selectedVehicle && !loading && !error && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p><strong>Vehicle ID:</strong> {selectedVehicle.vehicleId}</p>
              <p><strong>Odometer:</strong> {selectedVehicle.odometer.toLocaleString()} km</p>
              <p><strong>Fuel Level:</strong> {selectedVehicle.fuel_level}%</p>
              <p><strong>Speed:</strong> {selectedVehicle.speed} km/h</p>
              <p><strong>Timestamp:</strong> {new Date(selectedVehicle.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <MapContainer
                center={[selectedVehicle.latitude, selectedVehicle.longitude]}
                zoom={13}
                className="h-[400px] w-full rounded-md"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[selectedVehicle.latitude, selectedVehicle.longitude]}>
                  <Popup>
                    Vehicle {selectedVehicle.vehicleId} at ({selectedVehicle.latitude}, {selectedVehicle.longitude})
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
        {!loading && !error && !selectedVehicle && (
          <div className="text-gray-500 text-center py-4">No vehicle data available</div>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleDetail;