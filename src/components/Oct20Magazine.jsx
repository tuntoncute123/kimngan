import { useState, useMemo, useCallback } from 'react';
import './Oct20Magazine.css';

// Tự động import toàn bộ 27 ảnh trong thư mục Kim Ngân ảnh
const photoModules = import.meta.glob('../../Kim Ngân ảnh/*.{jpg,jpeg,png,webp,JPG,PNG}', { eager: true });

const PHOTO_CAPTIONS = [
    'The Pure Aura · Nụ cười rạng rỡ làm bừng sáng mọi không gian',
    'Gentle Grace · Nét đẹp hiền hòa, quý mến của người chị yêu quý',
    'Positive Glow · Trạm phát năng lượng tích cực lan tỏa đến mọi người',
    'Golden Moments · Thần thái tự tin & visual phát sáng',
    'Sweet Radiance · Nét dịu dàng làm xao xuyến ánh nhìn',
    'Forever Charming · Nụ cười tỏa nắng tràn ngập niềm vui',
    'Iconic Beauty · Siêu siêu xinh đẹp trong từng khoảnh khắc',
    'Endless Charisma · Luôn mang lại cảm giác ấm áp và yêu đời',
    'Shine Bright · Tỏa sáng rực rỡ và lộng lẫy mỗi ngày',
    'Joyful Spirit · Tinh thần lạc quan truyền cảm hứng'
];

const Oct20Magazine = ({ userName = 'Lê Thị Kim Ngân', onClose }) => {
    const images = useMemo(() => {
        const list = Object.entries(photoModules).map(([path, mod], idx) => {
            return {
                id: idx + 1,
                url: mod.default,
                caption: PHOTO_CAPTIONS[idx % PHOTO_CAPTIONS.length],
            };
        });
        return list;
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isImgLoading, setIsImgLoading] = useState(false);

    const changePhotoIndex = useCallback((newIndex) => {
        setIsImgLoading(true);
        setCurrentIndex(newIndex);
    }, []);

    const handlePrev = () => {
        const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        changePhotoIndex(prevIndex);
    };

    const handleNext = () => {
        const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        changePhotoIndex(nextIndex);
    };

    const currentPhoto = images[currentIndex] || images[0] || null;

    const editorial = {
        issue: 'ISSUE NO. 20 · OCTOBER 2026',
        subtitle: 'THE POSITIVE RADIANCE',
        headline: 'Nhan sắc tỏa sáng & Nguồn năng lượng tích cực của Kim Ngân',
        quote: '"Một nụ cười rạng rỡ của người chị có thể sạc đầy 100% năng lượng yêu đời cho cả thế giới!"',
        tags: ['GENTLE', 'ENERGY', 'SLAY', 'ICONIC', 'SHINING', 'INSPIRING'],
    };

    return (
        <div className="magazine-overlay" onClick={onClose}>
            <div className="magazine-modal" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="magazine-close" onClick={onClose} aria-label="Đóng">
                    ✕
                </button>

                {/* Editorial Top Bar */}
                <div className="magazine-top-bar">
                    <span className="mag-bar-item">{editorial.issue}</span>
                    <span className="mag-bar-item highlight">VIETNAMESE WOMEN'S DAY SPECIAL</span>
                    <span className="mag-bar-item">OCTOBER 20TH</span>
                </div>

                {/* Magazine Masthead */}
                <div className="magazine-masthead">
                    <h1 className="magazine-logo">V O G U E</h1>
                    <div className="magazine-edition-tag">KIM NGAN SPECIAL HOMAGE</div>
                </div>

                {/* Editorial Body Grid */}
                <div className="magazine-body-grid">
                    {/* Left: Fashion Photo Frame with Carousel */}
                    <div className="magazine-photo-col">
                        <div className="magazine-frame">
                            <div className="magazine-frame-corner top-left" />
                            <div className="magazine-frame-corner top-right" />
                            <div className="magazine-frame-corner bottom-left" />
                            <div className="magazine-frame-corner bottom-right" />

                            {images.length > 0 && currentPhoto ? (
                                <>
                                    {/* Skeleton shimmer khi ảnh đang nạp */}
                                    {isImgLoading && (
                                        <div className="magazine-img-skeleton">
                                            <div className="mag-spinner-ring" />
                                        </div>
                                    )}

                                    <img
                                        key={currentPhoto.url}
                                        src={currentPhoto.url}
                                        alt={currentPhoto.caption}
                                        className={`magazine-current-img ${isImgLoading ? 'loading' : 'loaded'}`}
                                        onLoad={() => setIsImgLoading(false)}
                                    />

                                    {/* Watermark badge */}
                                    <div className="magazine-img-badge">
                                        <span>KIM NGAN LOOKBOOK</span>
                                        <span>{currentIndex + 1} / {images.length}</span>
                                    </div>

                                    {/* Carousel Controls */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                className="mag-nav-btn prev"
                                                onClick={handlePrev}
                                                aria-label="Ảnh trước"
                                            >
                                                ‹
                                            </button>
                                            <button
                                                className="mag-nav-btn next"
                                                onClick={handleNext}
                                                aria-label="Ảnh kế tiếp"
                                            >
                                                ›
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : null}
                        </div>

                        {/* Caption under photo */}
                        <div className="magazine-photo-caption">
                            {images.length > 0 && currentPhoto && (
                                <>
                                    <span className="caption-tag">LOOK #{String(currentIndex + 1).padStart(2, '0')}</span>
                                    <p className="caption-text">{currentPhoto.caption}</p>
                                </>
                            )}
                        </div>

                        {/* Thumbnail dots */}
                        {images.length > 1 && (
                            <div className="magazine-thumbnails-row">
                                {images.map((item, idx) => (
                                    <button
                                        key={item.id}
                                        className={`mag-thumb-dot ${idx === currentIndex ? 'active' : ''}`}
                                        onClick={() => changePhotoIndex(idx)}
                                        aria-label={`Xem ảnh ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Ghi chú ảnh gốc */}
                        <div className="magazine-raw-note">
                            <span className="mag-note-icon">✨</span>
                            <span className="mag-note-text">
                                Ảnh của chị em để ảnh gốc nên là load lên hơi chậm xíu nha
                            </span>
                        </div>
                    </div>

                    {/* Right: Cover Story & Editorial Content */}
                    <div className="magazine-story-col">
                        <div className="story-kicker">{editorial.subtitle}</div>
                        <h2 className="story-headline">{editorial.headline}</h2>

                        <div className="story-byline">
                            <span>STAR: <strong>{userName}</strong></span>
                            <span className="dot-sep">•</span>
                            <span>SPECIAL 20/10 EDITION</span>
                        </div>

                        <div className="story-divider" />

                        {/* Pull Quote */}
                        <blockquote className="story-pull-quote">
                            {editorial.quote}
                        </blockquote>

                        {/* Tags */}
                        <div className="story-tags-wrap">
                            {editorial.tags.map((tag, i) => (
                                <span key={i} className="story-tag">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Editorial Note */}
                        <div className="story-editorial-note">
                            <div className="note-icon">🌸</div>
                            <p className="note-text">
                                <strong>Lời từ Ban biên tập:</strong> Chúc {userName} một ngày 20/10 ngập tràn nụ cười, luôn tự tin, rạng rỡ và mãi là người chị tuyệt vời đem lại nguồn năng lượng tích cực đến cho mọi người!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Oct20Magazine;
