// src/pages/Booking/BusDetails.js
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BusSeatLayout from '../../components/BusSeatLayout';
import { fetchBusDetails } from "../../redux/reducers/bus/busesSlice";
const BusDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {isLoading, error,bus } = useSelector((state) => state.buses);
  useEffect(() => {
    dispatch(fetchBusDetails(id));
  }, [dispatch, id]);
  if (isLoading) return <p className="text-center py-8">Loading bus details...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  return (
    <div className="py-8">
      {bus && (
        <>
          <h2 className="text-2xl font-bold mb-4">{bus.busName}</h2>
          <BusSeatLayout busId={id} seats={bus.seats} />
        </>
      )}
    </div>
  );
};
export default BusDetails;