import { useState } from 'react';
import './SectionStyles.css';
import { SectionHeader } from './SectionHeader';

export const Settings = ({ onBack }: { onBack: () => void }) => {
  const [notifs, setNotifs] = useState(true);
  const [location, setLocation] = useState(true);

  return (
    <div className="page-container animate-slide-up">
      <SectionHeader title="Settings" onBack={onBack} />

      <div className="settings-group">
        <h3>Preferences</h3>
        <div className="setting-row">
          <span>Push Notifications</span>
          <div className={`toggle ${notifs ? 'on' : 'off'}`} onClick={() => setNotifs(!notifs)}>
            <div className="knob"></div>
          </div>
        </div>
        <div className="setting-row">
          <span>Background Location</span>
          <div className={`toggle ${location ? 'on' : 'off'}`} onClick={() => setLocation(!location)}>
            <div className="knob"></div>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h3>Account</h3>
        <div className="setting-link">Edit Profile {'>'}</div>
        <div className="setting-link">Change Password {'>'}</div>
        <div className="setting-link danger">Delete Account</div>
      </div>

      <p className="version-text">Strider App v1.0.4 (Beta)</p>
    </div>
  );
};