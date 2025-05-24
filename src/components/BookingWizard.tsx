import React, { useState } from 'react';
import '../styles/BookingWizard.css';

// 映画データ
const movies = [
  { 
    id: 1, 
    title: 'アベンジャーズ', 
    price: 1800,
    image: 'https://via.placeholder.com/300x450',
    description: 'マーベルヒーローたちが集結する大作アクション映画'
  },
  { 
    id: 2, 
    title: 'となりのトトロ', 
    price: 1500,
    image: 'https://via.placeholder.com/300x450',
    description: 'ジブリスタジオが贈る心温まるファンタジー作品'
  },
  { 
    id: 3, 
    title: 'スター・ウォーズ', 
    price: 1800,
    image: 'https://via.placeholder.com/300x450',
    description: 'SF映画の金字塔、壮大な宇宙叙事詩'
  }
];

// 上映時間
const showTimes = ['10:00', '13:00', '16:00', '19:00', '22:00'];

// 座席レイアウト設定
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const seatsPerRow = 12;

// 予約済み座席（デモ用）
const bookedSeats = ['A3', 'B5', 'C7', 'D2'];

// ステップコンポーネント：映画選択
const MovieSelection = ({ onSelect, selectedMovie }: { onSelect: (id: number) => void, selectedMovie: number | null }) => (
  <div className="step-content">
    <h2>映画を選択してください</h2>
    <div className="movie-grid">
      {movies.map(movie => (
        <div 
          key={movie.id} 
          className={`movie-card ${selectedMovie === movie.id ? 'selected' : ''}`}
          onClick={() => onSelect(movie.id)}
        >
          <img src={movie.image} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <p className="price">¥{movie.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  </div>
);

// ステップコンポーネント：時間選択
const TimeSelection = ({ onSelect, selectedTime }: { onSelect: (time: string) => void, selectedTime: string | null }) => (
  <div className="step-content">
    <h2>上映時間を選択してください</h2>
    <div className="time-grid">
      {showTimes.map(time => (
        <button
          key={time}
          className={`time-button ${selectedTime === time ? 'selected' : ''}`}
          onClick={() => onSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
  </div>
);

// ステップコンポーネント：座席選択
const SeatSelection = ({ 
  onSelect, 
  selectedSeats 
}: { 
  onSelect: (seatId: string) => void, 
  selectedSeats: string[] 
}) => {
  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    onSelect(seatId);
  };

  return (
    <div className="step-content">
      <h2>座席を選択してください</h2>
      
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
  );
};

// ステップコンポーネント：予約情報入力
const CustomerInfo = ({ 
  onSubmit,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  selectedMovie,
  selectedTime,
  selectedSeats,
}: { 
  onSubmit: (e: React.FormEvent) => void,
  customerName: string,
  setCustomerName: (name: string) => void,
  customerEmail: string,
  setCustomerEmail: (email: string) => void,
  selectedMovie: number | null,
  selectedTime: string | null,
  selectedSeats: string[],
}) => {
  const movie = movies.find(m => m.id === selectedMovie);
  const total = movie ? movie.price * selectedSeats.length : 0;

  return (
    <div className="step-content">
      <h2>予約情報を入力してください</h2>
      <form onSubmit={onSubmit} className="customer-form">
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
          <h3>予約内容確認</h3>
          <p>映画: {movie?.title}</p>
          <p>時間: {selectedTime}</p>
          <p>座席: {selectedSeats.join(', ')}</p>
          <p className="total-price">合計金額: ¥{total.toLocaleString()}</p>
        </div>

        <button type="submit" className="submit-button">
          予約を確定する
        </button>
      </form>
    </div>
  );
};

// ステップコンポーネント：予約完了
const CompletionStep = ({ 
  customerName,
  selectedMovie,
  selectedTime,
  selectedSeats,
}: { 
  customerName: string,
  selectedMovie: number | null,
  selectedTime: string | null,
  selectedSeats: string[],
}) => {
  const movie = movies.find(m => m.id === selectedMovie);
  const total = movie ? movie.price * selectedSeats.length : 0;

  return (
    <div className="step-content completion-step">
      <div className="completion-icon">✓</div>
      <h2>予約が完了しました！</h2>
      <div className="completion-details">
        <h3>予約内容</h3>
        <div className="detail-item">
          <span>映画:</span>
          <span>{movie?.title}</span>
        </div>
        <div className="detail-item">
          <span>時間:</span>
          <span>{selectedTime}</span>
        </div>
        <div className="detail-item">
          <span>座席:</span>
          <span>{selectedSeats.join(', ')}</span>
        </div>
        <div className="detail-item">
          <span>お名前:</span>
          <span>{customerName}</span>
        </div>
        <div className="detail-item total">
          <span>合計金額:</span>
          <span>¥{total.toLocaleString()}</span>
        </div>
      </div>
      <p className="completion-message">
        ご予約ありがとうございます。<br />
        予約内容の確認メールをお送りしましたので、ご確認ください。
      </p>
    </div>
  );
};

// メインのウィザードコンポーネント
const BookingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleMovieSelect = (movieId: number) => {
    setSelectedMovie(movieId);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      return [...prev, seatId];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(5); // 予約完了ステップへ進む
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedMovie !== null;
      case 2:
        return selectedTime !== null;
      case 3:
        return selectedSeats.length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <MovieSelection onSelect={handleMovieSelect} selectedMovie={selectedMovie} />;
      case 2:
        return <TimeSelection onSelect={handleTimeSelect} selectedTime={selectedTime} />;
      case 3:
        return <SeatSelection onSelect={handleSeatSelect} selectedSeats={selectedSeats} />;
      case 4:
        return (
          <CustomerInfo
            onSubmit={handleSubmit}
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            selectedMovie={selectedMovie}
            selectedTime={selectedTime}
            selectedSeats={selectedSeats}
          />
        );
      case 5:
        return (
          <CompletionStep
            customerName={customerName}
            selectedMovie={selectedMovie}
            selectedTime={selectedTime}
            selectedSeats={selectedSeats}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-wizard">
      <div className="wizard-progress">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>映画選択</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>時間選択</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>座席選択</div>
        <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>予約情報入力</div>
        <div className={`step ${currentStep >= 5 ? 'active' : ''}`}>予約完了</div>
      </div>

      {renderStep()}

      <div className="wizard-navigation">
        {currentStep > 1 && currentStep < 5 && (
          <button 
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="nav-button back"
          >
            戻る
          </button>
        )}
        {currentStep < 4 && (
          <button 
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="nav-button next"
            disabled={!canProceed()}
          >
            次へ
          </button>
        )}
        {currentStep === 5 && (
          <button 
            onClick={() => setCurrentStep(1)}
            className="nav-button next"
          >
            新しい予約を開始
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingWizard; 