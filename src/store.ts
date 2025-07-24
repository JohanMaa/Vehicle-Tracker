import { create } from 'zustand';
import { toast } from 'sonner';

interface Vehicle {
  id: number;
  name: string;
  status: string;
  speed: number;
  updated_at: string;
}

interface VehicleDetail {
  id: number; // Changed from vehicleId to id to match db.json
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: VehicleDetail | null;
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  fetchVehicleDetail: (id: number) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3001/vehicles');
      if (!response.ok) throw new Error('Failed to fetch vehicles');
      const data = await response.json();
      set({ vehicles: data, loading: false });
    } catch (error) {
      const message = 'Failed to fetch vehicles';
      set({ error: message, loading: false });
      toast.error(message);
    }
  },
  fetchVehicleDetail: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:3001/vehicleDetails/${id}`);
      if (!response.ok) throw new Error('Failed to fetch vehicle details');
      const data = await response.json();
      if (!data.id) throw new Error('Vehicle not found');
      set({ selectedVehicle: data, loading: false });
    } catch (error) {
      const message = 'Failed to fetch vehicle details';
      set({ error: message, loading: false });
      toast.error(message);
    }
  },
}));