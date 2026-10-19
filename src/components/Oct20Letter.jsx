import { useState, useEffect, useRef } from 'react';
import { Tooltip } from 'antd';
import { CloseOutlined, HeartFilled } from '@ant-design/icons';
import './Oct20Letter.css';

export const LETTER_PAGE_1 = `Chị Kim Ngân ơi,

Chúc chị một ngày 20/10 thật nhiều niềm vui, luôn rạng rỡ và ngập tràn hạnh phúc nha! 🌸💜

Chị là một người chị vô cùng xinh đẹp và quý mến của em, siêu siêu xinh đẹp luôn á! Không chỉ có visual phát sáng, chị còn là một người luôn mang lại nguồn năng lượng tích cực, ấm áp và vui tươi đến cho người khác. Cứ mỗi lần trò chuyện hay gặp chị là mọi muộn phiền, mệt mỏi dường như tan biến hết trơn.`;

export const LETTER_PAGE_2 = `Nhân ngày Phụ Nữ Việt Nam 20/10, em chúc chị yêu:
🌸 Luôn giữ được nụ cười tỏa nắng và nguồn năng lượng tích cực diệu kỳ này mãi mãi!
🌸 Nhan sắc ngày càng thăng hạng, rạng ngời và xinh đẹp bất chấp thời gian!
🌸 Công việc hanh thông thuận lợi, vạn sự như ý và thành công rực rỡ!
🌸 Luôn được yêu thương, trân trọng và hạnh phúc theo cách trọn vẹn nhất!

P/s: Chị mãi mãi là người chị xinh đẹp số 1 trong lòng em đấy! 💖✨`;

const Oct20Letter = ({ onClose, userName = 'Lê Thị Kim Ngân' }) => {
    const totalLength = LETTER_PAGE_1.length + LETTER_PAGE_2.length;
    const [displayedCount, setDisplayedCount] = useState(0);
    const modalRef = useRef(null);
    const scrollContainerRef = useRef(null);

    // Hiệu ứng máy đánh chữ chạy tuần tự qua Trang 1 rồi sang Trang 2
    useEffect(() => {
        const chunkSize = 2;
        const interval = setInterval(() => {
            setDisplayedCount((prev) => {
                const next = Math.min(prev + chunkSize, totalLength);
                if (next >= totalLength) {
                    clearInterval(interval);
                }
                return next;
            });
        }, 36);

        return () => clearInterval(interval);
    }, [totalLength]);

    const page2Ref = useRef(null);
    const hasScrolledToPage2 = useRef(false);

    // Khởi tạo vị trí cuộn ở đầu thư khi mở modal
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, []);

    // Tự động cuộn mượt xuống Trang 2 khi Trang 1 đã gõ xong trên thiết bị di động
    useEffect(() => {
        if (displayedCount >= LETTER_PAGE_1.length && !hasScrolledToPage2.current) {
            hasScrolledToPage2.current = true;
            if (page2Ref.current && window.innerWidth <= 768) {
                page2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        if (displayedCount === 0) {
            hasScrolledToPage2.current = false;
        }
    }, [displayedCount]);

    // Chạm vào thiệp để hiển thị toàn bộ chữ ngay lập tức
    const handleSkipTyping = () => {
        if (displayedCount < totalLength) {
            setDisplayedCount(totalLength);
        }
    };

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    // Phân tách chuỗi hiển thị cho 2 trang
    const textPage1 = LETTER_PAGE_1.slice(0, Math.min(displayedCount, LETTER_PAGE_1.length));
    const isTypingPage1 = displayedCount < LETTER_PAGE_1.length;

    const textPage2 = displayedCount > LETTER_PAGE_1.length
        ? LETTER_PAGE_2.slice(0, displayedCount - LETTER_PAGE_1.length)
        : '';
    const isTypingPage2 = displayedCount >= LETTER_PAGE_1.length && displayedCount < totalLength;
    const isCompleted = displayedCount >= totalLength;

    return (
        <div className="oct20-letter-overlay" onClick={handleBackdropClick}>
            <div
                className="oct20-letter-content"
                ref={modalRef}
                onClick={(e) => {
                    e.stopPropagation();
                    handleSkipTyping();
                }}
            >
                {/* Decorative floating petals */}
                <div className="oct20-letter-petal oct20-letter-petal--tl">🌸</div>
                <div className="oct20-letter-petal oct20-letter-petal--tr">💜</div>
                <div className="oct20-letter-petal oct20-letter-petal--bl">🌷</div>
                <div className="oct20-letter-petal oct20-letter-petal--br">🪻</div>

                {/* Close Button */}
                <Tooltip title="Đóng thư tay">
                    <button
                        className="oct20-letter-close"
                        onClick={onClose}
                        aria-label="Đóng thư tay"
                    >
                        <CloseOutlined />
                    </button>
                </Tooltip>

                {/* Khung thiệp mở 2 trang (Two-column Book) */}
                <div className="oct20-book-wrapper" ref={scrollContainerRef}>
                    {/* ══ TRANG 1 (BÊN TRÁI TRÊN PC) ══ */}
                    <div className="oct20-book-page oct20-page-left">
                        {/* Header trang 1 */}
                        <div className="oct20-letter-header">
                            <span className="oct20-letter-badge">🌸 20 · 10 · 2026 🌸</span>
                            <h2 className="oct20-letter-title">Thư Gửi Chị Kim Ngân</h2>
                        </div>

                        {/* Nội dung trang 1 */}
                        <div className="oct20-page-body">
                            <p className="oct20-letter-text">
                                {textPage1}
                                {isTypingPage1 && <span className="oct20-letter-cursor" />}
                            </p>
                        </div>

                        {/* Đánh dấu chân trang 1 */}
                        <div className="oct20-page-footer">
                            <span className="oct20-page-num">
                                <HeartFilled style={{ color: '#d8b4fe', marginRight: 4 }} />
                                Trang 1 / 2
                            </span>
                        </div>
                    </div>

                    {/* Gáy sách / Đường phân cách giữa 2 trang */}
                    <div className="oct20-book-spine">
                        <div className="spine-ribbon" />
                    </div>

                    {/* ══ TRANG 2 (BÊN PHẢI TRÊN PC) ══ */}
                    <div className="oct20-book-page oct20-page-right" ref={page2Ref}>
                        {/* Header trang 2 */}
                        <div className="oct20-letter-header page2-header">
                            <span className="oct20-letter-badge">💜 LỜI CHÚC TRI ÂN 💜</span>
                            <h2 className="oct20-letter-title">Gửi Chị Yêu Quý</h2>
                        </div>

                        {/* Nội dung trang 2 */}
                        <div className="oct20-page-body">
                            <p className="oct20-letter-text">
                                {textPage2}
                                {isTypingPage2 && <span className="oct20-letter-cursor" />}
                            </p>

                            {/* Chữ ký xuất hiện sau khi hoàn thành */}
                            <div className={`oct20-letter-signature ${isCompleted ? 'show' : ''}`}>
                                <span className="oct20-sig-text">Em mãi quý mến chị 💖</span>
                                <div className="oct20-sig-illustration">🫶🌸✨</div>
                            </div>
                        </div>

                        {/* Đánh dấu chân trang 2 */}
                        <div className="oct20-page-footer">
                            <span className="oct20-page-num">
                                <HeartFilled style={{ color: '#d8b4fe', marginRight: 4 }} />
                                Trang 2 / 2
                            </span>
                        </div>
                    </div>
                </div>

                {/* Ghi chú nhấp để hiển thị nhanh */}
                {!isCompleted && (
                    <div className="oct20-letter-hint">
                        ✨ Nhấn vào thư để hiện toàn bộ chữ ngay lập tức
                    </div>
                )}
            </div>
        </div>
    );
};

export default Oct20Letter;
