import { useState, useRef, useMemo } from 'react';
import './Oct20Gift.css';

const generateStars = () =>
    Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        width: Math.random() * 4 + 1.5,
        height: Math.random() * 4 + 1.5,
        delay: Math.random() * 4,
    }));

const generateConfetti = () =>
    Array.from({ length: 55 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2 + Math.random() * 2,
        color: ['#c084fc', '#a855f7', '#f0abfc', '#e879f9', '#d8b4fe', '#fde68a'][
            Math.floor(Math.random() * 6)
        ],
    }));

const Oct20Gift = ({ onClose, userName = 'Lê Thị Kim Ngân' }) => {
    const [isOpened, setIsOpened] = useState(false);
    const modalRef = useRef();
    const stars = useMemo(() => generateStars(), []);
    const confetti = useMemo(() => generateConfetti(), []);

    return (
        <div className="oct20gift-overlay" onClick={onClose}>
            <div
                className="oct20gift-content"
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Twinkling stars background */}
                <div className="oct20gift-stars">
                    {stars.map((star) => (
                        <div
                            key={`star-${star.id}`}
                            className="oct20gift-star"
                            style={{
                                top: `${star.top}%`,
                                left: `${star.left}%`,
                                width: `${star.width}px`,
                                height: `${star.height}px`,
                                animationDelay: `${star.delay}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="oct20gift-badge">
                    {isOpened ? '💜 Dành tặng chị yêu 💜' : '🌸 Nhấn vào để mở quà 🌸'}
                </div>

                <button className="oct20gift-close" onClick={onClose}>✕</button>

                {!isOpened ? (
                    /* ── Hộp quà chưa mở ── */
                    <div className="oct20gift-box-container" onClick={() => setIsOpened(true)}>
                        <div className="oct20gift-box-wrapper">
                            <div className="oct20gift-box">
                                {/* Nắp */}
                                <div className="oct20gift-lid">
                                    <div className="oct20gift-ribbon-h" />
                                </div>
                                {/* Thân */}
                                <div className="oct20gift-body">
                                    <div className="oct20gift-ribbon-v" />
                                </div>
                                {/* Nơ */}
                                <div className="oct20gift-bow">
                                    <div className="bow-left" />
                                    <div className="bow-right" />
                                    <div className="bow-center" />
                                </div>
                            </div>
                            <div className="oct20gift-shadow" />
                        </div>
                        <div className="oct20gift-click-hint">🌸 Click để mở quà 🌸</div>
                    </div>
                ) : (
                    /* ── Nội dung sau khi mở: GẤU BÔNG 8/3 ── */
                    <div className="oct20gift-opened">
                        {/* Confetti */}
                        <div className="oct20gift-confetti-wrap">
                            {confetti.map((item) => (
                                <div
                                    key={`c-${item.id}`}
                                    className="oct20gift-confetti"
                                    style={{
                                        left: `${item.left}%`,
                                        animationDelay: `${item.delay}s`,
                                        animationDuration: `${item.duration}s`,
                                        backgroundColor: item.color,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="oct20gift-display">
                            {/* Sparkles */}
                            <div className="oct20gift-sparkles">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={`sp-${i}`}
                                        className="oct20gift-sparkle"
                                        style={{
                                            left: `${8 + i * 8}%`,
                                            top: `${15 + (i % 3) * 25}%`,
                                            animationDelay: `${2 + i * 0.18}s`,
                                        }}
                                    >
                                        🌸
                                    </div>
                                ))}
                            </div>

                            {/* Gấu bông đáng yêu từ chức năng 8/3 */}
                            <div className="teddy-bear">
                                <svg viewBox="0 0 300 400" className="teddy-svg">
                                    <defs>
                                        <radialGradient id="bearGrad" cx="30%" cy="30%">
                                            <stop offset="0%" stopColor="#d2691e" />
                                            <stop offset="100%" stopColor="#8b4513" />
                                        </radialGradient>
                                        <radialGradient id="bearLightGrad" cx="30%" cy="30%">
                                            <stop offset="0%" stopColor="#f4a460" />
                                            <stop offset="100%" stopColor="#cd853f" />
                                        </radialGradient>
                                    </defs>

                                    {/* Thân */}
                                    <ellipse cx="150" cy="280" rx="70" ry="85" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '0.4s' }} />

                                    {/* Chân trái */}
                                    <ellipse cx="120" cy="350" rx="30" ry="40" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '0.5s' }} />
                                    <ellipse cx="120" cy="370" rx="28" ry="15" fill="url(#bearLightGrad)" className="bear-part" style={{ animationDelay: '0.55s' }} />

                                    {/* Chân phải */}
                                    <ellipse cx="180" cy="350" rx="30" ry="40" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '0.6s' }} />
                                    <ellipse cx="180" cy="370" rx="28" ry="15" fill="url(#bearLightGrad)" className="bear-part" style={{ animationDelay: '0.65s' }} />

                                    {/* Tay trái */}
                                    <ellipse cx="90" cy="270" rx="25" ry="55" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '0.7s' }} transform="rotate(-20 90 270)" />
                                    <circle cx="85" cy="310" r="18" fill="url(#bearLightGrad)" className="bear-part" style={{ animationDelay: '0.75s' }} />

                                    {/* Tay phải */}
                                    <ellipse cx="210" cy="270" rx="25" ry="55" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '0.8s' }} transform="rotate(20 210 270)" />
                                    <circle cx="215" cy="310" r="18" fill="url(#bearLightGrad)" className="bear-part" style={{ animationDelay: '0.85s' }} />

                                    {/* Đầu */}
                                    <circle cx="150" cy="180" r="60" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '0.9s' }} />
                                    <ellipse cx="150" cy="200" rx="40" ry="35" fill="url(#bearLightGrad)" className="bear-part" style={{ animationDelay: '0.95s' }} />

                                    {/* Tai trái */}
                                    <circle cx="110" cy="140" r="25" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '1.0s' }} />
                                    <circle cx="110" cy="140" r="15" fill="url(#bearLightGrad)" className="bear-part" style={{ animationDelay: '1.05s' }} />

                                    {/* Tai phải */}
                                    <circle cx="190" cy="140" r="25" fill="url(#bearGrad)" className="bear-part" style={{ animationDelay: '1.1s' }} />
                                    <circle cx="190" cy="140" r="15" fill="url(#bearLightGrad)" className="bear-part" style={{ animationDelay: '1.15s' }} />

                                    {/* Mắt trái */}
                                    <circle cx="135" cy="180" r="6" fill="#000" className="bear-part" style={{ animationDelay: '1.2s' }} />
                                    <circle cx="137" cy="178" r="2" fill="#fff" className="bear-part" style={{ animationDelay: '1.22s' }} />

                                    {/* Mắt phải */}
                                    <circle cx="165" cy="180" r="6" fill="#000" className="bear-part" style={{ animationDelay: '1.25s' }} />
                                    <circle cx="167" cy="178" r="2" fill="#fff" className="bear-part" style={{ animationDelay: '1.27s' }} />

                                    {/* Mũi */}
                                    <ellipse cx="150" cy="200" rx="8" ry="6" fill="#000" className="bear-part" style={{ animationDelay: '1.3s' }} />

                                    {/* Miệng */}
                                    <path d="M 150 200 Q 140 210 135 208" stroke="#000" strokeWidth="2" fill="none" className="bear-part" style={{ animationDelay: '1.35s' }} />
                                    <path d="M 150 200 Q 160 210 165 208" stroke="#000" strokeWidth="2" fill="none" className="bear-part" style={{ animationDelay: '1.35s' }} />

                                    {/* Nơ cổ */}
                                    <ellipse cx="150" cy="240" rx="15" ry="8" fill="#ff1493" className="bear-part" style={{ animationDelay: '1.4s' }} />
                                    <ellipse cx="130" cy="240" rx="20" ry="12" fill="#ff69b4" className="bear-part" style={{ animationDelay: '1.45s' }} transform="rotate(-30 130 240)" />
                                    <ellipse cx="170" cy="240" rx="20" ry="12" fill="#ff69b4" className="bear-part" style={{ animationDelay: '1.45s' }} transform="rotate(30 170 240)" />

                                    {/* Trái tim trên bụng */}
                                    <path d="M 150 270 C 150 265 145 260 140 260 C 135 260 132 263 132 268 C 132 275 150 288 150 288 C 150 288 168 275 168 268 C 168 263 165 260 160 260 C 155 260 150 265 150 270 Z" fill="#ff1493" className="bear-part" style={{ animationDelay: '1.5s' }} />
                                </svg>
                            </div>

                            {/* Message */}
                            <div className="oct20gift-message">
                                <span className="oct20gift-msg-emoji">🧸</span>
                                <span className="oct20gift-msg-text">Dành tặng {userName}</span>
                                <span className="oct20gift-msg-sub">Chú gấu bông ấm áp & luôn lan tỏa năng lượng tích cực! 🌸✨</span>
                                <span className="oct20gift-msg-emoji">💖</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Oct20Gift;
