import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, ChevronLeft, ChevronRight, Activity } from "lucide-react";

const slides = [
  {
    image: "/images/login_slide_1.jpg",
    title: "Analitik Real-Time",
    desc: "Pantau KPI operasional, tren penjualan, dan performa aset seluruh armada dalam satu dasbor terintegrasi.",
  },
  {
    image: "/images/login_slide_2.jpg",
    title: "Manajemen Backlog Cerdas",
    desc: "Kelola backlog produk dan tugas tim dengan tampilan kanban yang intuitif dan kolaboratif.",
  },
  {
    image: "/images/login_slide_3.jpg",
    title: "Portal Armada Terpadu",
    desc: "Monitor kesehatan armada, jadwalkan perawatan, dan lacak status unit secara efisien dari mana saja.",
  },
];

export function LoginScreen() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  const goToSlide = useCallback((index: number, direction: "left" | "right" = "left") => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideDirection(direction);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsSliding(false);
    }, 400);
  }, [isSliding]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length, "left");
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length, "right");
  }, [currentSlide, goToSlide]);

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/customer-internal");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* ========= LEFT: Slideshow Panel ========= */}
        <div className="login-left">
          {/* Decorative circles */}
          <div className="deco-circle deco-circle-tl" />
          <div className="deco-circle deco-circle-br" />
          <div className="deco-circle deco-circle-bl" />

          {/* Slide images */}
          <div className="slide-image-wrapper">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`slide-image ${
                  i === currentSlide
                    ? "slide-active"
                    : isSliding && slideDirection === "left"
                    ? "slide-exit-left"
                    : "slide-exit-right"
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ))}
          </div>

          {/* Overlay gradient */}
          <div className="slide-overlay" />

          {/* Content */}
          <div className="slide-content">
            <div className="slide-text-box">
              <h2 className="slide-title">{slides[currentSlide].title}</h2>
              <p className="slide-desc">{slides[currentSlide].desc}</p>
            </div>

            {/* Controls */}
            <div className="slide-controls">
              <button className="slide-btn" onClick={prevSlide} aria-label="Previous slide">
                <ChevronLeft size={18} />
              </button>
              <div className="slide-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`slide-dot ${i === currentSlide ? "slide-dot-active" : ""}`}
                    onClick={() => goToSlide(i, i > currentSlide ? "left" : "right")}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button className="slide-btn" onClick={nextSlide} aria-label="Next slide">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ========= RIGHT: Login Form ========= */}
        <div className="login-right">
          {/* Brand logo */}
          <div className="login-brand">
            <div className="login-brand-icon">
              <Activity size={18} />
            </div>
            <div className="login-brand-text">
              <span className="login-brand-company">PT Bina Pertiwi</span>
              <span className="login-brand-product">Product Backlog Management</span>
            </div>
          </div>

          {/* Welcome */}
          <div className="login-welcome">
            <h1 className="login-heading">Selamat datang!</h1>
            <p className="login-subheading">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleLogin} noValidate>
            {/* Email */}
            <div className="login-field">
              <label htmlFor="login-email" className="login-label">Alamat Email</label>
              <input
                id="login-email"
                type="email"
                className="login-input"
                placeholder="contoh: nama@binapertiwi.co.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="login-password" className="login-label">Kata Sandi</label>
              <div className="login-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="login-input login-input-pass"
                  placeholder="Masukkan kata sandi Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="login-options">
              <label className="login-remember" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="login-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="login-checkbox-custom" />
                <span className="login-remember-label">Ingat saya</span>
              </label>
              <a href="#" className="login-forgot">Lupa kata sandi?</a>
            </div>

            {/* Submit */}
            <button id="login-submit-btn" type="submit" className="login-btn">
              Masuk
            </button>

            {/* Sign up */}
            <p className="login-signup">
              Belum punya akun?{" "}
              <a href="#" className="login-signup-link">Daftar sekarang</a>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        /* ============================================
           LOGIN PAGE — SCOPED STYLES
        ============================================ */
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f0f8;
          padding: 1.5rem;
          font-family: var(--font-sans, Inter, sans-serif);
        }

        .login-container {
          display: flex;
          width: 100%;
          max-width: 960px;
          min-height: 600px;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(61, 26, 142, 0.25), 0 8px 24px rgba(0,0,0,0.12);
          background: #fff;
        }

        /* ===== LEFT PANEL ===== */
        .login-left {
          position: relative;
          flex: 1;
          min-height: 480px;
          overflow: hidden;
          background: linear-gradient(135deg, #3D1A8E 0%, #5C2D9E 50%, #2D1B69 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        /* Decorative circles */
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(180, 150, 255, 0.18);
          pointer-events: none;
        }
        .deco-circle-tl {
          width: 200px;
          height: 200px;
          top: -60px;
          left: -60px;
        }
        .deco-circle-br {
          width: 160px;
          height: 160px;
          bottom: 80px;
          right: -40px;
          background: rgba(180, 150, 255, 0.12);
        }
        .deco-circle-bl {
          width: 100px;
          height: 100px;
          bottom: -20px;
          left: 20px;
          background: rgba(180, 150, 255, 0.15);
        }

        /* Slide images */
        .slide-image-wrapper {
          position: absolute;
          inset: 0;
        }
        .slide-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .slide-active {
          opacity: 1;
        }
        .slide-exit-left {
          opacity: 0;
        }
        .slide-exit-right {
          opacity: 0;
        }

        /* Bottom overlay gradient */
        .slide-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 65%;
          background: linear-gradient(to top, rgba(45, 27, 105, 0.97) 0%, rgba(61, 26, 142, 0.85) 40%, transparent 100%);
          pointer-events: none;
        }

        /* Slide text */
        .slide-content {
          position: relative;
          z-index: 2;
          padding: 2rem 2rem 1.75rem;
          color: #fff;
        }
        .slide-text-box {
          margin-bottom: 1.5rem;
          text-align: center;
          min-height: 90px;
        }
        .slide-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          font-family: var(--font-display, Outfit, sans-serif);
        }
        .slide-desc {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.6;
          max-width: 340px;
          margin: 0 auto;
        }

        /* Slide controls */
        .slide-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        .slide-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          transition: all 0.2s;
          font-weight: bold;
          font-size: inherit;
        }
        .slide-btn:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.7);
          color: #fff;
        }
        .slide-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .slide-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          padding: 0;
          font-size: inherit;
          font-weight: inherit;
        }
        .slide-dot:active {
          scale: 1;
        }
        .slide-dot-active {
          background: #fff;
          width: 24px;
          border-radius: 4px;
        }

        /* ===== RIGHT PANEL ===== */
        .login-right {
          flex: 0 0 420px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 2.75rem;
          background: #ffffff;
          overflow-y: auto;
        }

        /* Brand */
        .login-brand {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 2rem;
        }
        .login-brand-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #1E3A8A;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10B981;
          flex-shrink: 0;
        }
        .login-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .login-brand-company {
          font-size: 0.625rem;
          font-weight: 700;
          color: rgba(30, 58, 138, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .login-brand-product {
          font-size: 0.6875rem;
          font-weight: 600;
          color: #1E3A8A;
        }

        /* Welcome */
        .login-welcome {
          margin-bottom: 1.5rem;
        }
        .login-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
          letter-spacing: -0.025em;
          font-family: var(--font-display, Outfit, sans-serif);
        }
        .login-subheading {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 400;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .login-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #374151;
          text-transform: none;
          letter-spacing: 0;
        }
        .login-input {
          width: 100%;
          height: 40px;
          border: 1.5px solid #d1d5db;
          border-radius: 10px;
          padding: 0 0.875rem;
          font-size: 0.875rem;
          color: #111827;
          background: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: var(--font-sans, Inter, sans-serif);
          box-sizing: border-box;
        }
        .login-input::placeholder {
          color: #9ca3af;
        }
        .login-input:focus {
          border-color: #3D1A8E;
          box-shadow: 0 0 0 3px rgba(61, 26, 142, 0.12);
        }

        /* Password wrapper */
        .login-input-wrapper {
          position: relative;
        }
        .login-input-pass {
          padding-right: 2.75rem;
        }
        .login-eye-btn {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          font-weight: normal;
          font-size: inherit;
        }
        .login-eye-btn:hover {
          color: #3D1A8E;
        }
        .login-eye-btn:active {
          scale: 1;
        }

        /* Options row */
        .login-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -0.25rem;
        }
        .login-remember {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 400;
          color: #374151;
          text-transform: none;
          letter-spacing: 0;
        }
        .login-checkbox {
          display: none;
        }
        .login-checkbox-custom {
          width: 15px;
          height: 15px;
          border: 1.5px solid #d1d5db;
          border-radius: 4px;
          background: #fff;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .login-checkbox:checked + .login-checkbox-custom {
          background: #3D1A8E;
          border-color: #3D1A8E;
        }
        .login-checkbox:checked + .login-checkbox-custom::after {
          content: '';
          width: 8px;
          height: 5px;
          border-bottom: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-45deg) translateY(-1px);
          display: block;
        }
        .login-remember-label {
          font-size: 0.75rem;
          color: #374151;
          font-weight: 400;
        }
        .login-forgot {
          font-size: 0.75rem;
          font-weight: 700;
          color: #3D1A8E;
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-forgot:hover {
          color: #5C2D9E;
          text-decoration: underline;
        }

        /* Login button */
        .login-btn {
          width: 100%;
          height: 40px;
          background: linear-gradient(135deg, #3D1A8E, #5C2D9E);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          margin-top: 0.15rem;
          box-shadow: 0 4px 15px rgba(61, 26, 142, 0.4);
          font-family: var(--font-sans, Inter, sans-serif);
        }
        .login-btn:hover {
          background: linear-gradient(135deg, #4A2080, #6B3EAE);
          box-shadow: 0 6px 20px rgba(61, 26, 142, 0.5);
          transform: translateY(-1px);
        }
        .login-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* Sign up */
        .login-signup {
          text-align: center;
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
        }
        .login-signup-link {
          color: #3D1A8E;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-signup-link:hover {
          color: #5C2D9E;
          text-decoration: underline;
        }

        /* Divider */
        .login-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #9ca3af;
          font-size: 0.75rem;
        }
        .login-divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }
        .login-divider-text {
          flex-shrink: 0;
          color: #9ca3af;
        }

        /* Google button */
        .login-google-btn {
          width: 100%;
          height: 40px;
          background: #fff;
          color: #374151;
          border: 1.5px solid #d1d5db;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.2s;
          font-family: var(--font-sans, Inter, sans-serif);
          letter-spacing: 0;
        }
        .login-google-btn:hover {
          border-color: #9ca3af;
          background: #f9fafb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .login-google-btn:active {
          transform: scale(0.98);
        }

        /* ============================================
           RESPONSIVE — TABLET (≤ 768px)
        ============================================ */
        @media (max-width: 768px) {
          .login-page {
            padding: 0;
            align-items: stretch;
          }
          .login-container {
            flex-direction: column;
            max-width: 100%;
            min-height: 100vh;
            border-radius: 0;
            box-shadow: none;
          }
          .login-left {
            flex: 0 0 280px;
            min-height: 280px;
          }
          .slide-title {
            font-size: 1.1rem;
          }
          .slide-desc {
            font-size: 0.78rem;
          }
          .slide-content {
            padding: 1.5rem 1.5rem 1.25rem;
          }
          .login-right {
            flex: 1;
            padding: 2rem 1.5rem 2.5rem;
          }
          .login-heading {
            font-size: 1.5rem;
          }
        }

        /* ============================================
           RESPONSIVE — MOBILE (≤ 480px)
        ============================================ */
        @media (max-width: 480px) {
          .login-left {
            flex: 0 0 240px;
            min-height: 240px;
          }
          .slide-text-box {
            min-height: 80px;
          }
          .slide-title {
            font-size: 1rem;
          }
          .slide-desc {
            font-size: 0.75rem;
          }
          .login-right {
            padding: 1.75rem 1.25rem 2rem;
          }
          .login-brand {
            margin-bottom: 1.5rem;
          }
          .login-heading {
            font-size: 1.4rem;
          }
          .login-form {
            gap: 0.9rem;
          }
        }

        /* Dark mode support */
        .dark .login-page {
          background: hsl(222, 47%, 9%);
        }
        .dark .login-container {
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        }
        .dark .login-right {
          background: hsl(222, 47%, 13%);
        }
        .dark .login-heading {
          color: hsl(210, 40%, 96%);
        }
        .dark .login-subheading {
          color: hsl(215, 20%, 65%);
        }
        .dark .login-label {
          color: hsl(210, 40%, 85%);
        }
        .dark .login-input {
          background: hsl(222, 47%, 17%);
          border-color: hsl(217, 33%, 28%);
          color: hsl(210, 40%, 96%);
        }
        .dark .login-input:focus {
          border-color: #7C5CE0;
          box-shadow: 0 0 0 3px rgba(124, 92, 224, 0.2);
        }
        .dark .login-input::placeholder {
          color: hsl(215, 20%, 50%);
        }
        .dark .login-remember-label {
          color: hsl(215, 20%, 65%);
        }
        .dark .login-signup {
          color: hsl(215, 20%, 65%);
        }
        .dark .login-divider-line {
          background: hsl(217, 33%, 25%);
        }
        .dark .login-google-btn {
          background: hsl(222, 47%, 17%);
          border-color: hsl(217, 33%, 28%);
          color: hsl(210, 40%, 90%);
        }
        .dark .login-google-btn:hover {
          background: hsl(222, 47%, 20%);
          border-color: hsl(217, 33%, 40%);
        }
        .dark .login-brand-product {
          color: hsl(217, 91%, 75%);
        }
        .dark .login-brand-company {
          color: hsl(217, 91%, 60%);
        }
        .dark .login-brand-icon {
          background: hsl(222, 47%, 20%);
        }
        .dark .login-checkbox-custom {
          background: hsl(222, 47%, 17%);
          border-color: hsl(217, 33%, 35%);
        }
      `}</style>
    </div>
  );
}
