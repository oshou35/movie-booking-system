import React, { useState } from 'react';
import Seat from './Seat';
import '../styles/SeatLayout.css';

interface SeatLayoutProps {
  onSeatSelect: (selectedSeats: string[]) => void;
}

const SeatLayout: React.FC<SeatLayoutProps> = ({ onSeatSelect }) => {
  // 選択された座席を管理するstate
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // 仮の予約済み座席（後でバックエンドから取得するように変更します）
  const bookedSeats = ['A1', 'B3', 'C5'];

  // 座席の行と列の数を定義
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;

  // 座席が選択された時の処理
  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) => {
      const newSelection = prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId];
      
      onSeatSelect(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="seat-layout">
      {/* スクリーン */}
      <div className="screen">
        <div className="screen-text">スクリーン</div>
      </div>

      {/* 座席レイアウト */}
      <div className="seats-container">
        {rows.map((row, rowIndex) => (
          <div key={row} className="seat-row">
            <div className="row-label">{row}</div>
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
              const seatNumber = seatIndex + 1;
              const seatId = `${row}${seatNumber}`;
              
              return (
                <Seat
                  key={seatId}
                  id={seatId}
                  row={rowIndex + 1}
                  number={seatNumber}
                  isBooked={bookedSeats.includes(seatId)}
                  isSelected={selectedSeats.includes(seatId)}
                  onSelect={handleSeatSelect}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* 座席の状態の凡例 */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat-example"></div>
          <span>利用可能</span>
        </div>
        <div className="legend-item">
          <div className="seat-example selected"></div>
          <span>選択中</span>
        </div>
        <div className="legend-item">
          <div className="seat-example booked"></div>
          <span>予約済み</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout; 