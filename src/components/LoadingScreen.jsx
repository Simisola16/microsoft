import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="global-loader-overlay">
      <div className="loader-content">
        <div className="loader-text">loading, please wait...</div>
        <div className="ms-spinner-ring"></div>
      </div>
    </div>
  );
}
