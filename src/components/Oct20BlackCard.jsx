import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './Oct20BlackCard.css';

const ZALO_PHONE = '0849632852';
const ZALO_LINK = `https://zalo.me/${ZALO_PHONE}`;
const STORAGE_KEY = 'kimngan_oct20_blind_pack_v1';

const BOOSTER_CARDS = [
    {
        id: 'bong-hoa',
        icon: '🌸',
        title: 'Một Bông Hoa Tươi Thắm',
        rarity: 'MAY MẮN · BÔNG HOA 20/10',
        rarityClass: 'rarity-flower',
        stars: '🌸🌸🌸🌸🌸',
        desc: 'Gửi tặng chị một bông hoa tươi thắm cùng lời chúc 20/10 luôn rạng rỡ, siêu siêu xinh đẹp và hạnh phúc ngập tràn! Chúc chị may mắn lần sau nha! 💖',
        expiry: 'Mãi mãi tươi vui',
        rate: '30%',
        isLuckyWish: true,
        getMessage: (name) =>
            `Tunton ơi! Chị là ${name}, vừa xé túi mù trúng [Một Bông Hoa Tươi Thắm 🌸] trên web 20/10 nè! Chúc em luôn vui vẻ và hạnh phúc nha! 💖✨`,
    },
    {
        id: 'gau-bong',
        icon: '🧸',
        title: '1 Chú Gấu Bông Bất Kỳ',
        rarity: 'SR · GẤU BÔNG DỄ THƯƠNG',
        rarityClass: 'rarity-bear',
        stars: '⭐⭐⭐⭐',
        desc: 'Nhận ngay 1 chú gấu bông siêu cấp đáng yêu bất kỳ từ Tunton (tự chọn mẫu hoặc Tunton bất ngờ gửi tặng). Đảm bảo xinh xắn, ôm cực thích!',
        expiry: 'Có giá trị ngay trong dịp 20/10',
        rate: '30%',
        getMessage: (name) =>
            `Alooo Tunton ơi! Chị là ${name}, vừa xé túi mù trúng [1 Chú Gấu Bông Bất Kỳ 🧸] trên web 20/10 nè! Chuẩn bị gửi quà gấu bông xinh xắn cho chị nha 🌸✨`,
    },
    {
        id: 'baby-three-400',
        icon: '🐰',
        title: 'Blind Box Baby Three 400%',
        rarity: 'SSR · SIÊU PHẨM BABY THREE 400%',
        rarityClass: 'rarity-baby-400',
        stars: '⭐⭐⭐⭐⭐',
        desc: 'Được đập hộp 1 bé Blind Box Baby Three size khủng 400% cực kỳ hot trend! Tunton tài trợ và trao tận tay cho chị Kim Ngân!',
        expiry: 'Có giá trị ngay trong dịp 20/10',
        rate: '30%',
        getMessage: (name) =>
            `Alooo Tunton ơi! Chị là ${name}, vừa xé túi mù trúng siêu phẩm [Blind Box Baby Three 400% 🐰] trên web 20/10 nè! Chuẩn bị đập hộp Baby Three 400% cho chị nha 💖🎉`,
    },
    {
        id: 'baby-three-600',
        icon: '👑',
        title: 'Jackpot Baby Three 600% Khổng Lồ',
        rarity: 'UR · JACKPOT BABY THREE 600% (10%)',
        rarityClass: 'rarity-baby-600',
        stars: '🌟🌟🌟🌟🌟🌟',
        desc: 'PHẦN THƯỞNG ĐỈNH CAO NHẤT (Chỉ 10% cơ hội nổ hũ)! Sở hữu ngay 1 bé Baby Three 600% phiên bản siêu to khổng lồ độc quyền từ Tunton!',
        expiry: 'Đặc quyền tối thượng 20/10',
        rate: '10%',
        getMessage: (name) =>
            `Trờiii ơiii Tunton ơi!! Chị là ${name}, vừa nổ hũ trúng phần thưởng độc đắc [Baby Three 600% 👑] tỉ lệ 10% trên web 20/10 nè!! Mau mau chuẩn bị quà khổng lồ này trao cho chị nhaaa 🚀💖✨`,
    },
];

const Oct20BlackCard = ({ userName = 'Lê Thị Kim Ngân', onClose }) => {
    // Đọc trạng thái đã xé từ localStorage
    const [packState, setPackState] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return 'revealed';
        } catch (e) {}
        return 'sealed';
    });

    const [revealedCard, setRevealedCard] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                const found = BOOSTER_CARDS.find((c) => c.id === parsed.cardId);
                if (found) return found;
            }
        } catch (e) {}
        return null;
    });

    const [isClaimed, setIsClaimed] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleTearPack = () => {
        if (packState !== 'sealed' || revealedCard) return;

        setPackState('tearing');
        setIsClaimed(false);

        // Tỉ lệ theo đúng yêu cầu:
        // 0 - 30% (roll < 30): 30% nhận hoa
        // 30 - 60% (roll < 60): 30% gấu bông bất kì
        // 60 - 90% (roll < 90): 30% Baby Three 400%
        // 90 - 100% (roll >= 90): 10% Baby Three 600%
        const roll = Math.random() * 100;
        let randomCard;
        let confettiColors;
        let particleCount = 120;

        if (roll < 30) {
            randomCard = BOOSTER_CARDS.find((c) => c.id === 'bong-hoa');
            confettiColors = ['#f472b6', '#ec4899', '#fda4af', '#fef08a', '#ffffff'];
        } else if (roll < 60) {
            randomCard = BOOSTER_CARDS.find((c) => c.id === 'gau-bong');
            confettiColors = ['#fb923c', '#f97316', '#fdba74', '#fef08a', '#ffffff'];
        } else if (roll < 90) {
            randomCard = BOOSTER_CARDS.find((c) => c.id === 'baby-three-400');
            confettiColors = ['#c084fc', '#a855f7', '#38bdf8', '#818cf8', '#ffffff'];
        } else {
            randomCard = BOOSTER_CARDS.find((c) => c.id === 'baby-three-600');
            confettiColors = ['#facc15', '#eab308', '#f59e0b', '#ec4899', '#a855f7', '#ffffff'];
            particleCount = 200;
        }

        if (!randomCard) randomCard = BOOSTER_CARDS[0];

        setTimeout(() => {
            try {
                confetti({
                    particleCount,
                    spread: 90,
                    origin: { y: 0.6 },
                    colors: confettiColors,
                });
            } catch (e) {}
        }, 400);

        setTimeout(() => {
            setRevealedCard(randomCard);
            setPackState('revealed');

            // Lưu trạng thái đã xé vào localStorage
            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        cardId: randomCard.id,
                        openedAt: new Date().toISOString(),
                        userName: userName,
                    })
                );
            } catch (e) {
                console.warn('Lỗi ghi localStorage:', e);
            }
        }, 750);
    };

    // Nút reset thử nghiệm
    const handleResetForTesting = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        setPackState('sealed');
        setRevealedCard(null);
        setIsClaimed(false);
        showToast('Đã đặt lại túi mù! Bạn có thể xé lại.');
    };

    const handleClaimViaZalo = async () => {
        if (!revealedCard) return;
        const text = revealedCard.getMessage(userName);
        setIsClaimed(true);

        if (navigator?.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                showToast('Đã copy tin nhắn! Đang mở Zalo Tunton...');
            } catch {
                showToast('Đang chuyển hướng sang Zalo Tunton...');
            }
        } else {
            showToast('Đang chuyển hướng sang Zalo Tunton...');
        }

        setTimeout(() => {
            window.open(ZALO_LINK, '_blank');
        }, 400);
    };

    return (
        <div className="blackcard-overlay" onClick={onClose}>
            <div className="blackcard-modal" onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button className="blackcard-close" onClick={onClose} aria-label="Đóng">
                    ✕
                </button>

                {/* Toast Notification */}
                {toastMessage && <div className="blackcard-toast">{toastMessage}</div>}

                {/* Header */}
                <div className="blackcard-modal-header">
                    <span className="blackcard-top-tag">KIM NGAN ROYAL MEMBERSHIP · 20.10</span>
                    <h2 className="blackcard-modal-title">THẺ ĐEN ĐẶC QUYỀN 20/10</h2>
                    <p className="blackcard-modal-desc">
                        Tấm thẻ quyền lực tối thượng dành riêng cho <strong>{userName}</strong>
                    </p>
                </div>

                {/* The VIP Black Card */}
                <div className="vip-card-wrapper">
                    <div className="vip-card">
                        <div className="vip-card-shimmer" />

                        {/* Card top */}
                        <div className="vip-card-header">
                            <div className="vip-card-brand">
                                <span className="brand-crown">💎</span>
                                <span className="brand-name">KIM NGAN EXCLUSIVE</span>
                            </div>
                            <span className="vip-card-type">BLACK CARD VIP</span>
                        </div>

                        {/* EMV Chip & Contactless */}
                        <div className="vip-card-chip-row">
                            <div className="vip-card-chip">
                                <div className="chip-line" />
                            </div>
                            <div className="vip-card-contactless">
                                <span>)</span>
                                <span>)</span>
                                <span>)</span>
                            </div>
                        </div>

                        {/* Card Number */}
                        <div className="vip-card-number">
                            <span>2608</span>
                            <span>2026</span>
                            <span>9999</span>
                            <span>SLAY</span>
                        </div>

                        {/* Cardholder & Expiry */}
                        <div className="vip-card-footer">
                            <div className="cardholder-box">
                                <span className="card-label">CARDHOLDER / CHỦ THẺ</span>
                                <span className="card-holder-name">{userName.toUpperCase()}</span>
                            </div>
                            <div className="expiry-box">
                                <span className="card-label">VALID THRU</span>
                                <span className="card-expiry-val">FOREVER 💖</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KHU VỰC XÉ PACK THẺ MÙ RANDOM */}
                <div className="booster-section">
                    <div className="booster-header-row">
                        <span className="booster-title">
                            🃏 GÓI THẺ MÙ ĐẶC QUYỀN · BLIND PACK 20/10
                        </span>
                        <span className="booster-badge">
                            Tỉ lệ: 30% Hoa · 30% Gấu bông · 30% Baby Three 400% · 10% Baby Three 600%
                        </span>
                    </div>

                    <div className="booster-arena">
                        {/* 1. GÓI FOIL PACK CHƯA XÉ HOẶC ĐANG XÉ */}
                        {packState !== 'revealed' && (
                            <div
                                className={`foil-pack-container ${packState === 'tearing' ? 'is-tearing' : ''}`}
                                onClick={handleTearPack}
                                title="Bấm để xé gói thẻ mù!"
                            >
                                <div className="foil-pack">
                                    <div className="foil-pack-top">
                                        <div className="crimp-edge top" />
                                        <div className="tear-strip">
                                            <span className="tear-scissors">✂️</span>
                                            <span className="tear-line">------------------------------------</span>
                                            <span className="tear-label">PULL & TEAR · XÉ ĐÂY NÈ</span>
                                        </div>
                                    </div>

                                    <div className="pack-burst-light" />

                                    <div className="foil-pack-body">
                                        <div className="pack-hologram-shimmer" />

                                        <div className="pack-logo-area">
                                            <span className="pack-super-title">SPECIAL 20.10 EDITION</span>
                                            <h3 className="pack-main-title">BOOSTER PACK</h3>
                                            <div className="pack-art-icon">🎁</div>
                                            <span className="pack-sub-title">TÚI MÙ ĐẶC QUYỀN TUNTON</span>
                                        </div>

                                        <div className="pack-rarity-pill">
                                            <span>30% Hoa · 30% Gấu · 30% Baby Three 400% · 10% Baby Three 600%</span>
                                        </div>

                                        <div className="crimp-edge bottom" />
                                    </div>
                                </div>

                                <div className="pack-prompt-text">
                                    {packState === 'tearing' ? (
                                        <span className="tearing-text">⚡ ĐANG XÉ GÓI THẺ... ⚡</span>
                                    ) : (
                                        <span className="click-to-tear">
                                            👆 BẤM VÀO GÓI ĐỂ XÉ PACK NGAY
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 2. THẺ BÀI CARD SAU KHI XÉ XONG (REVEALED) */}
                        {packState === 'revealed' && revealedCard && (
                            <div className="revealed-card-container">
                                <div className={`secret-card ${revealedCard.rarityClass}`}>
                                    <div className="card-holo-foil" />

                                    <div className="card-header">
                                        <span className="card-rarity-badge">{revealedCard.rarity}</span>
                                        <span className="card-stars">{revealedCard.stars}</span>
                                    </div>

                                    <div className={`card-art-box ${revealedCard.id === 'bong-hoa' ? 'flower-art-box' : ''}`}>
                                        <div className={`card-art-circle ${revealedCard.id === 'bong-hoa' ? 'flower-circle' : ''}`}>
                                            <span className={`card-art-emoji ${revealedCard.id === 'bong-hoa' ? 'flower-bloom' : ''}`}>
                                                {revealedCard.icon}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-info">
                                        <h3 className="card-title">{revealedCard.title}</h3>
                                        <p className="card-desc">{revealedCard.desc}</p>
                                        <div className="card-meta">
                                            <span className="meta-user">CHỦ THẺ: <strong>{userName.toUpperCase()}</strong></span>
                                            <span className="meta-expiry">{revealedCard.expiry}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        <button
                                            className="btn-claim-zalo"
                                            onClick={handleClaimViaZalo}
                                        >
                                            <span className="zalo-btn-text">
                                                {isClaimed
                                                    ? 'Mở lại Zalo Tunton (0849632852)'
                                                    : revealedCard.id === 'bong-hoa'
                                                    ? 'KHOE BÔNG HOA QUA ZALO TUNTON'
                                                    : revealedCard.id === 'gau-bong'
                                                    ? 'ĐÒI GẤU BÔNG QUA ZALO TUNTON'
                                                    : revealedCard.id === 'baby-three-400'
                                                    ? 'ĐÒI BABY THREE 400% QUA ZALO'
                                                    : 'ĐÒI BABY THREE 600% QUA ZALO'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="card-claim-note">
                                    <p>
                                        🔒 <em>Kết quả đã được lưu trong máy. Bấm nút để copy lời nhắn & chuyển thẳng sang Zalo Tunton: <strong>0849632852</strong></em>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="blackcard-footer-note">
                    <p>
                        💡 <em>Mẹo: Thẻ cào túi mù này có giá trị bất cứ lúc nào, chị cứ đòi em bất cứ khi nào chị muốn nha!</em>
                    </p>
                    {packState === 'revealed' && (
                        <button
                            className="btn-reset-test"
                            onClick={handleResetForTesting}
                            style={{
                                marginTop: '0.6rem',
                                background: 'transparent',
                                border: '1px dashed rgba(192, 132, 252, 0.4)',
                                color: '#d8b4fe',
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                            }}
                        >
                            ↺ Xé lại (dành cho thử nghiệm)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Oct20BlackCard;
