import { useState, useEffect, useRef, useCallback } from 'react';
import './Oct20SlayAlert.css';

const Oct20SlayAlert = ({ userName = 'Lê Thị Kim Ngân', onClose, onAccept }) => {
    const [hasStamped, setHasStamped] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    const cardRef = useRef(null);
    const verdictRef = useRef(null);
    const hasTriggeredRef = useRef(false);
    const delayTimerRef = useRef(null);

    // Kích hoạt cộp dấu ấn 3D
    const triggerStamp = useCallback(() => {
        if (hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;
        setHasStamped(true);

        // Rung nhẹ khung bản án đúng khoảnh khắc con dấu 3D va chạm vào văn bản (340ms)
        setTimeout(() => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 280);
        }, 340);
    }, []);

    // Cho phép người dùng bấm vào để cộp dấu lại
    const handleRestamp = (e) => {
        if (e) e.stopPropagation();
        if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
        setHasStamped(false);
        setIsShaking(false);
        setTimeout(() => {
            hasTriggeredRef.current = false;
            triggerStamp();
        }, 120);
    };

    useEffect(() => {
        const isVerdictSubstantiallyVisible = () => {
            if (!verdictRef.current || !cardRef.current) return false;

            const vRect = verdictRef.current.getBoundingClientRect();
            const cRect = cardRef.current.getBoundingClientRect();
            const wHeight = window.innerHeight || document.documentElement.clientHeight;

            if (vRect.bottom < 50 || vRect.top > wHeight - 50) return false;

            const visibleTop = Math.max(vRect.top, cRect.top);
            const visibleBottom = Math.min(vRect.bottom, cRect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (vRect.height <= 0) return false;
            const visibleRatio = visibleHeight / vRect.height;

            const isFullyContained = vRect.top >= cRect.top - 10 && vRect.bottom <= cRect.bottom + 20;
            const isSubstantiallyInView = visibleRatio >= 0.65;
            const isDeeplyScrolled = (vRect.top < cRect.bottom - 100) && (visibleRatio >= 0.5);

            return isFullyContained || isSubstantiallyInView || isDeeplyScrolled;
        };

        const scheduleStampCheck = (delay) => {
            if (hasTriggeredRef.current) return;
            if (delayTimerRef.current) clearTimeout(delayTimerRef.current);

            delayTimerRef.current = setTimeout(() => {
                if (isVerdictSubstantiallyVisible()) {
                    triggerStamp();
                }
            }, delay);
        };

        let observer;
        if ('IntersectionObserver' in window && verdictRef.current && cardRef.current) {
            observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry && entry.isIntersecting && !hasTriggeredRef.current) {
                        if (isVerdictSubstantiallyVisible()) {
                            scheduleStampCheck(500);
                        }
                    }
                },
                {
                    root: cardRef.current,
                    threshold: [0.65, 0.85],
                }
            );
            observer.observe(verdictRef.current);
        }

        const cardEl = cardRef.current;
        const handleScroll = () => {
            if (hasTriggeredRef.current) return;
            if (isVerdictSubstantiallyVisible()) {
                scheduleStampCheck(500);
            } else {
                if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
            }
        };

        if (cardEl) {
            cardEl.addEventListener('scroll', handleScroll, { passive: true });
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        if (isVerdictSubstantiallyVisible()) {
            scheduleStampCheck(850);
        }

        return () => {
            if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
            if (observer) observer.disconnect();
            if (cardEl) cardEl.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [triggerStamp]);

    const handleAcceptClick = () => {
        if (onAccept) {
            onAccept();
        } else {
            onClose();
        }
    };

    const crime1 = 'Tội siêu siêu xinh đẹp: Visual phát sáng 24/7 không góc chết, nụ cười làm bừng sáng mọi không gian khiến ai nhìn cũng phải xiêu lòng.';
    const crime2 = 'Tội lan tỏa năng lượng tích cực: Cứ mỗi lần nói chuyện hay xuất hiện là truyền cảm hứng, sự ấm áp và yêu đời đến cho người khác.';
    const crime3 = 'Tội chiếm đoạt trọn vẹn tình cảm: Được em và mọi người hết mực quý mến, ngưỡng mộ và thương mến mà không thể kháng cự!';

    return (
        <div className="slay-alert-overlay" onClick={onClose}>
            <div className="slay-alert-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button className="slay-alert-close" onClick={onClose} aria-label="Đóng">
                    ✕
                </button>

                {/* Siren Header */}
                <div className="slay-alert-header">
                    <div className="slay-siren-box">
                        <span className="slay-siren-icon left">🚨</span>
                        <div className="slay-badge-blink">KHẨN CẤP · CẢNH BÁO VISUAL</div>
                        <span className="slay-siren-icon right">🚨</span>
                    </div>
                    <h2 className="slay-alert-title">PHÁT HIỆN ĐỐI TƯỢNG QUÁ SLAY!</h2>
                    <p className="slay-alert-subtitle">Hệ thống an ninh vừa ghi nhận vi phạm nhan sắc nghiêm trọng</p>
                </div>

                {/* Profile dossier */}
                <div className="slay-dossier">
                    <div className="slay-dossier-row">
                        <span className="slay-dossier-label">ĐỐI TƯỢNG:</span>
                        <span className="slay-dossier-value highlight">{userName} 🌸</span>
                    </div>
                    <div className="slay-dossier-row">
                        <span className="slay-dossier-label">HỒ SƠ SỐ:</span>
                        <span className="slay-dossier-value">#SLAY-KIMNGAN-2010</span>
                    </div>
                    <div className="slay-dossier-row">
                        <span className="slay-dossier-label">THỜI ĐIỂM:</span>
                        <span className="slay-dossier-value">20 Tháng 10 · Ngày Phụ Nữ Việt Nam</span>
                    </div>
                    <div className="slay-dossier-row">
                        <span className="slay-dossier-label">MỨC ĐỘ NGUY HIỂM:</span>
                        <span className="slay-dossier-value warning">★★★★★ (1000/10 Visual)</span>
                    </div>
                </div>

                {/* Crimes list */}
                <div className="slay-crimes-box">
                    <div className="slay-crimes-title">📋 CÁC TỘI DANH ĐƯỢC XÁC LẬP:</div>
                    <ul className="slay-crimes-list">
                        <li>
                            <span className="crime-bullet">1.</span>
                            <div>{crime1}</div>
                        </li>
                        <li>
                            <span className="crime-bullet">2.</span>
                            <div>{crime2}</div>
                        </li>
                        <li>
                            <span className="crime-bullet">3.</span>
                            <div>{crime3}</div>
                        </li>
                    </ul>
                </div>

                {/* The Verdict */}
                <div
                    className={`slay-verdict-box ${isShaking ? 'verdict-shaking' : ''}`}
                    ref={verdictRef}
                >
                    <div className="slay-verdict-header-row">
                        <span className="slay-verdict-badge-label">⚖️ BẢN ÁN CHUNG THẨM</span>
                        <span className="slay-verdict-date">20/10/2026</span>
                    </div>

                    <p className="slay-verdict-text">
                        Tòa án Nhan Sắc & Năng Lượng Tích Cực quyết định: <strong>{userName}</strong> bị tuyên án bắt buộc phải mãi mãi xinh đẹp rạng ngời, mỗi ngày cười thật nhiều và luôn hạnh phúc ngập tràn!
                    </p>

                    {/* Dấu ấn 3D Phán Quyết */}
                    <div
                        className={`slay-stamp-stage ${hasStamped ? 'stamped' : ''}`}
                        aria-label="Con dấu phán quyết"
                    >
                        <div className="slay-stamp-shockwave" />

                        <div className="slay-stamper-3d" aria-hidden="true">
                            <div className="stamper-handle" />
                            <div className="stamper-collar" />
                            <div className="stamper-body">
                                <span className="stamper-face-text">PHÁN QUYẾT</span>
                            </div>
                        </div>

                        <div
                            className="slay-ink-imprint"
                            onClick={handleRestamp}
                            title="Bấm vào con dấu để đóng dấu lại 🌸"
                        >
                            <div className="ink-inner-border">
                                <span className="ink-stamp-header">★ TÒA ÁN SLAY QUỐC TẾ ★</span>
                                <span className="ink-stamp-title">PHÁN QUYẾT</span>
                                <span className="ink-stamp-footer">CHẤP HÀNH TUYỆT ĐỐI · 20/10</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action CTA */}
                <div className="slay-alert-actions">
                    <button className="slay-accept-btn" onClick={handleAcceptClick}>
                        <span className="btn-sparkle">🌸</span>
                        Tôi chấp nhận bản án & Nhận Thẻ Đen VIP ➔
                        <span className="btn-sparkle">🌸</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Oct20SlayAlert;
