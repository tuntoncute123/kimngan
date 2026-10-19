import { useState, useMemo } from 'react';
import './Oct20Page.css';
import Oct20Letter from './Oct20Letter';
import Oct20Gift from './Oct20Gift';
import Oct20SlayAlert from './Oct20SlayAlert';
import Oct20BlackCard from './Oct20BlackCard';
import Oct20Magazine from './Oct20Magazine';

// Ảnh đại diện màn hình khóa của chị Kim Ngân
import lockscreenImage from '../../Kim Ngân ảnh/image.png';

const FallingPetals = ({ isPaused = false }) => {
    const items = useMemo(() => {
        const petals = ['🌸', '💜', '🌷', '💫', '🪻', '🌺', '🎀'];
        return Array.from({ length: 22 }).map((_, i) => ({
            id: i,
            emoji: petals[Math.floor(Math.random() * petals.length)],
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 6 + 6}s`,
            animationDelay: `${Math.random() * 6}s`,
            fontSize: `${Math.random() * 1.2 + 1}rem`,
            swayAmount: Math.random() > 0.5 ? 'sway-left' : 'sway-right',
        }));
    }, []);

    return (
        <div className={`oct20-petals-container ${isPaused ? 'paused' : ''}`}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`oct20-petal ${item.swayAmount}`}
                    style={{
                        left: item.left,
                        animationDuration: item.animationDuration,
                        animationDelay: item.animationDelay,
                        fontSize: item.fontSize,
                    }}
                >
                    {item.emoji}
                </div>
            ))}
        </div>
    );
};

const Oct20Page = ({ onBack }) => {
    const [pin, setPin] = useState('');
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [isError, setIsError] = useState(false);

    // Modals
    const [showSlayAlert, setShowSlayAlert] = useState(false);
    const [showBlackCard, setShowBlackCard] = useState(false);
    const [showMagazine, setShowMagazine] = useState(false);
    const [showLetterModal, setShowLetterModal] = useState(false);
    const [showGiftModal, setShowGiftModal] = useState(false);

    const handleKeyPress = (num) => {
        if (pin.length < 4) {
            setIsError(false);
            const newPin = pin + num;
            setPin(newPin);

            if (newPin.length === 4) {
                // Mã PIN chính xác: 2608 (Ngày sinh chị Lê Thị Kim Ngân)
                if (newPin === '2608') {
                    setTimeout(() => {
                        setAuthenticatedUser('Lê Thị Kim Ngân');
                        setShowSlayAlert(true);
                    }, 250);
                } else {
                    setTimeout(() => {
                        setIsError(true);
                        setTimeout(() => {
                            setPin('');
                            setIsError(false);
                        }, 500);
                    }, 300);
                }
            }
        }
    };

    const handleDelete = () => {
        if (pin.length > 0) {
            setPin(pin.slice(0, -1));
            setIsError(false);
        }
    };

    // ── View sau khi đăng nhập thành công ──
    const hasActiveModal = showSlayAlert || showBlackCard || showMagazine || showLetterModal || showGiftModal;

    if (authenticatedUser) {
        return (
            <div className={`oct20-container ${hasActiveModal ? 'modal-open' : ''}`}>
                <FallingPetals isPaused={hasActiveModal} />

                <button className="oct20-back-home-btn" onClick={() => setAuthenticatedUser(null)}>
                    🔒 Khóa màn hình
                </button>

                {/* Greeting banner */}
                <div className="oct20-greeting-banner">
                    <span className="oct20-greeting-emoji">🌸</span>
                    <span className="oct20-greeting-text">
                        Chúc <strong>{authenticatedUser}</strong> ngày 20/10 thật hạnh phúc & rạng rỡ!
                    </span>
                    <span className="oct20-greeting-emoji">💜</span>
                </div>

                {/* 4 Menu Features Combo */}
                <div className="oct20-menu-grid">
                    {/* 1. Thư Tay */}
                    <button className="oct20-menu-item" onClick={() => setShowLetterModal(true)}>
                        <div className="oct20-icon">💌</div>
                        <span className="oct20-label">Thư Tay Tri Kỷ</span>
                        <span className="oct20-sub">Tâm tình gửi chị yêu</span>
                    </button>

                    {/* 2. Tạp Chí VOGUE */}
                    <button className="oct20-menu-item" onClick={() => setShowMagazine(true)}>
                        <div className="oct20-icon">📸</div>
                        <span className="oct20-label">Tạp Chí VOGUE</span>
                        <span className="oct20-sub">Lookbook thời trang độc quyền</span>
                    </button>

                    {/* 3. Thẻ Đen Quyền Lực & Coupon Đòi Trà Sữa */}
                    <button className="oct20-menu-item highlight-card" onClick={() => setShowBlackCard(true)}>
                        <div className="oct20-icon">💳</div>
                        <span className="oct20-label">Black Card VIP</span>
                        <span className="oct20-sub">Coupon đòi trà sữa & đặc quyền</span>
                    </button>

                    {/* 4. Hồ Sơ Báo Động Slay */}
                    <button className="oct20-menu-item" onClick={() => setShowSlayAlert(true)}>
                        <div className="oct20-icon">🚨</div>
                        <span className="oct20-label">Hồ Sơ Slay VIP</span>
                        <span className="oct20-sub">Bản án visual phát sáng</span>
                    </button>

                    {/* 5. Hộp Quà 20/10 */}
                    <button className="oct20-menu-item full-width-card" onClick={() => setShowGiftModal(true)}>
                        <div className="oct20-icon">🎁</div>
                        <div className="oct20-card-text">
                            <span className="oct20-label">Hộp Quà 20/10</span>
                            <span className="oct20-sub">Chú gấu bông bất ngờ gửi tặng riêng chị Kim Ngân</span>
                        </div>
                    </button>
                </div>

                {/* Modal 1: Cảnh báo Slay */}
                {showSlayAlert && (
                    <Oct20SlayAlert
                        userName={authenticatedUser}
                        onClose={() => setShowSlayAlert(false)}
                        onAccept={() => {
                            setShowSlayAlert(false);
                            setShowBlackCard(true);
                        }}
                    />
                )}

                {/* Modal 2: Thẻ Đen VIP & Coupon đòi quà */}
                {showBlackCard && (
                    <Oct20BlackCard
                        userName={authenticatedUser}
                        onClose={() => setShowBlackCard(false)}
                    />
                )}

                {/* Modal 3: Tạp chí VOGUE */}
                {showMagazine && (
                    <Oct20Magazine
                        userName={authenticatedUser}
                        onClose={() => setShowMagazine(false)}
                    />
                )}

                {/* Modal 4: Thư tay */}
                {showLetterModal && (
                    <Oct20Letter
                        userName={authenticatedUser}
                        onClose={() => setShowLetterModal(false)}
                    />
                )}

                {/* Modal Quà tặng hoa */}
                {showGiftModal && (
                    <Oct20Gift
                        userName={authenticatedUser}
                        onClose={() => setShowGiftModal(false)}
                    />
                )}
            </div>
        );
    }

    // ── View nhập mật khẩu ──
    return (
        <div className="oct20-container">
            <FallingPetals isPaused={false} />

            <div className={`oct20-password-card ${isError ? 'shake' : ''}`}>
                {/* Ảnh bìa chị Kim Ngân */}
                <div className="oct20-image-side">
                    <img src={lockscreenImage} alt="20/10 Chị Lê Thị Kim Ngân" />
                </div>

                {/* Bàn phím nhập PIN */}
                <div className="oct20-pad-side">
                    <div className="oct20-flower-icon">🌸</div>

                    <p className="oct20-password-hint">Mật khẩu chính là sinh nhật của bạn (ngày & tháng)</p>

                    {/* Dots */}
                    <div className="oct20-dots">
                        {[0, 1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className={`oct20-dot ${index < pin.length ? 'filled' : ''} ${isError ? 'error' : ''}`}
                            />
                        ))}
                    </div>

                    {/* Keypad */}
                    <div className="oct20-keypad">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                className="oct20-key"
                                onClick={() => handleKeyPress(num.toString())}
                            >
                                {num}
                            </button>
                        ))}
                        <div className="oct20-key empty" />
                        <button className="oct20-key" onClick={() => handleKeyPress('0')}>
                            0
                        </button>
                        <button className="oct20-key action-key" onClick={handleDelete} aria-label="Xóa">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                <line x1="18" y1="9" x2="12" y2="15" />
                                <line x1="12" y1="9" x2="18" y2="15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Oct20Page;
