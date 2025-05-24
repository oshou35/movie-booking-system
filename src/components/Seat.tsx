import React from 'react';
import '../styles/Seat.css';

interface SeatProps {
  id: string;
  row: number;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const Seat: React.FC<SeatProps> = ({
  id,
  row,
  number,
  isBooked,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    if (!isBooked) {
      onSelect(id);
    }
  };

  return (
    <button
      className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      disabled={isBooked}
      aria-label={`座席 ${row}列${number}番`}
    >
      {number}
    </button>
  );
};

export default Seat; 