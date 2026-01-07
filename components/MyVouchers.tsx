import './SectionStyles.css';
import { SectionHeader } from './SectionHeader';

export const MyVouchers = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="page-container animate-slide-up">
      <SectionHeader title="My Vouchers" onBack={onBack} />

      <div className="voucher-list" style={{ paddingBottom: '80px' }}>
        
        {/* ACTIVE */}
        <div className="active-voucher-card">
          <div className="av-header">
            <span className="brand">5 to go</span>
            <span className="status">ACTIVE</span>
          </div>
          <h3>Upgrade la Grande</h3>
          <div className="qr-placeholder">[ QR CODE ]</div>
          <p className="code-text">CODE: STR-5299-X</p>
          <button className="use-btn">Mark as Used</button>
        </div>

        <h3 style={{marginTop:'30px', marginBottom:'10px', fontSize:'0.9rem', color:'#888'}}>PAST REDEMPTIONS</h3>

        {/* REDEEMED HISTORY */}
        <div className="active-voucher-card used">
          <div className="av-header">
            <span className="brand">McDonald's</span>
            <span className="status">REDEEMED</span>
          </div>
          <h3>McCombo Student</h3>
          <p className="used-date">Used on 11 Dec 2025</p>
        </div>

        <div className="active-voucher-card used">
          <div className="av-header">
            <span className="brand">Hell Energy</span>
            <span className="status">REDEEMED</span>
          </div>
          <h3>Free Energy Dose</h3>
          <p className="used-date">Used on 07 Dec 2025</p>
        </div>

        <div className="active-voucher-card used">
          <div className="av-header">
            <span className="brand">Cinema City</span>
            <span className="status">REDEEMED</span>
          </div>
          <h3>50% Off Tuesday</h3>
          <p className="used-date">Used on 04 Dec 2025</p>
        </div>

        <div className="active-voucher-card used">
          <div className="av-header">
            <span className="brand">Lidl</span>
            <span className="status">REDEEMED</span>
          </div>
          <h3>Piața Lidl -20%</h3>
          <p className="used-date">Used on 28 Nov 2025</p>
        </div>

      </div>
    </div>
  );
};