import React, { useState } from 'react';
import SeatLayout from '../components/SeatLayout';
import '../styles/BookingPage.css';

// 仮の映画情報（後でバックエンドから取得するように変更します）
const movieInfo = {
  title: 'アバター：ウェイ・オブ・ウォーター',
  date: '2024年4月1日',
  time: '14:00',
  theater: 'シアター1',
  price: 1800,
};

const BookingPage: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');

  const handleSeatSelect = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで予約情報をバックエンドに送信する処理を追加予定
    console.log('予約情報:', {
      movieInfo,
      selectedSeats,
      customerName,
      email,
      totalPrice: selectedSeats.length * movieInfo.price,
    });
  };

  return (
    <div className="booking-page">
      <header className="booking-header">
        <h1>{movieInfo.title}</h1>
        <div className="movie-info">
          <p>日時: {movieInfo.date} {movieInfo.time}</p>
          <p>シアター: {movieInfo.theater}</p>
        </div>
      </header>

      <main className="booking-main">
        <SeatLayout onSeatSelect={handleSeatSelect} />

        {selectedSeats.length > 0 && (
          <div className="booking-form-container">
            <form onSubmit={handleSubmit} className="booking-form">
              <h2>予約情報入力</h2>
              
              <div className="form-group">
                <label htmlFor="name">お名前</label>
                <input
                  type="text"
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">メールアドレス</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="booking-summary">
                <h3>予約内容</h3>
                <p>選択座席: {selectedSeats.join(', ')}</p>
                <p>座席数: {selectedSeats.length}席</p>
                <p className="total-price">
                  合計金額: ¥{(selectedSeats.length * movieInfo.price).toLocaleString()}
                </p>
              </div>

              <button type="submit" className="submit-button">
                予約を確定する
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingPage; 