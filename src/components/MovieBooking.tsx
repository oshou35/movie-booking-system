import React, { useState, useEffect } from 'react';
import '../styles/MovieBooking.css';

const MovieBooking = () => {
  // 状態管理
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [showTime, setShowTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // 映画データ
  const movies = [
    { id: 1, title: 'アベンジャーズ', price: 1800 },
    { id: 2, title: 'となりのトトロ', price: 1500 },
    { id: 3, title: 'スター・ウォーズ', price: 1800 }
  ];

  // 上映時間
  const showTimes = ['10:00', '13:00', '16:00', '19:00', '22:00'];

  // 座席レイアウト設定
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;

  // 初期の予約済み座席を設定
  useEffect(() => {
    setBookedSeats(['A3', 'B5', 'C7', 'D2']);
  }, []);

  // 座席クリック時の処理
  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(seat => seat !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  // 合計金額の計算
  const calculateTotal = () => {
    const movie = movies.find(m => m.id === parseInt(selectedMovie));
    return movie ? movie.price * selectedSeats.length : 0;
  };

  // 予約処理
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie || !showTime || !customerName || !customerEmail || selectedSeats.length === 0) {
      alert('全ての項目を入力し、座席を選択してください。');
      return;
    }

    // 予約情報の表示（実際のシステムではAPIに送信）
    alert(`
      予約が完了しました！
      映画: ${movies.find(m => m.id === parseInt(selectedMovie))?.title}
      時間: ${showTime}
      座席: ${selectedSeats.join(', ')}
      合計: ¥${calculateTotal().toLocaleString()}
    `);

    // フォームのリセット
    setSelectedSeats([]);
    setSelectedMovie('');
    setShowTime('');
    setCustomerName('');
    setCustomerEmail('');
  };

  return (
    <div className="movie-booking">
      <h1>映画座席予約システム</h1>
      
      <div className="booking-container">
        {/* 予約フォーム */}
        <div className="booking-form-section">
          <form onSubmit={handleBooking} className="booking-form">
            <div className="form-group">
              <label>映画選択</label>
              <select 
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
                required
              >
                <option value="">映画を選択してください</option>
                {movies.map(movie => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title} - ¥{movie.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>上映時間</label>
              <select
                value={showTime}
                onChange={(e) => setShowTime(e.target.value)}
                required
              >
                <option value="">時間を選択してください</option>
                {showTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>お名前</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="山田太郎"
                required
              />
            </div>

            <div className="form-group">
              <label>メールアドレス</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="booking-summary">
              <h3>予約内容</h3>
              <p>選択座席: {selectedSeats.length > 0 ? selectedSeats.join(', ') : '未選択'}</p>
              <p>合計金額: ¥{calculateTotal().toLocaleString()}</p>
            </div>

            <button type="submit" className="submit-button">
              予約を確定する
            </button>
          </form>
        </div>

        {/* 座席レイアウト */}
        <div className="seat-layout-section">
          <div className="screen">
            <div className="screen-text">スクリーン</div>
          </div>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="seat-example available"></div>
              <span>空席</span>
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

          <div className="seats-container">
            {rows.map(row => (
              <div key={row} className="seat-row">
                <div className="row-label">{row}</div>
                {Array.from({ length: seatsPerRow }, (_, index) => {
                  const seatNumber = index + 1;
                  const seatId = `${row}${seatNumber}`;
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={isBooked}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking; 