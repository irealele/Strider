import React from 'react';
import { UserProfile, ViewState } from '../types';
import { playSound } from '../utils';
import { UserAvatar } from './UserAvatar';
import './Profile.css';

interface Props {
  user: UserProfile;
  onNavigate: (view: ViewState) => void;
}

const ProfileView = ({ user, onNavigate }: Props) => {
  const handleNav = (view: ViewState) => {
    playSound('click');
    onNavigate(view);
  };

  return (
    <div className="page-container profile-page animate-in">
      <div className="profile-header">
        <div className="avatar-wrapper">
          <UserAvatar size={100} className="avatar-large" />
          <span className="level-badge">Lvl 12</span>
        </div>
        <h2>{user.username}</h2>
        <span className="clan-tag">🛡️ {user.clan || "No Clan"}</span>
        <p className="joined-date">Member since {user.joinDate}</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
           <span className="label">Total Steps</span>
           <span className="value">{user.totalSteps.toLocaleString()}</span>
        </div>
        <div className="stat-card">
           <span className="label">Duels Won</span>
           <span className="value win">{user.duelsWon}</span>
        </div>
      </div>

      {/* MENU LIST */}
      <div className="menu-list">
        
        {/* Leaderboard Button */}
        <button className="menu-item" onClick={() => handleNav('rank')}>
          <span className="icon">🏆</span>
          <div className="text">
            <span className="title">Global Rankings</span>
            <span className="subtitle">See where you stand</span>
          </div>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => handleNav('clan-hq')}>
          <span className="icon">🛡️</span>
          <div className="text">
            <span className="title">Clan HQ</span>
            <span className="subtitle">Manage team & goals</span>
          </div>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => handleNav('badges')}>
          <span className="icon">🏅</span>
          <div className="text">
            <span className="title">Achievements</span>
            <span className="subtitle">View Badges & Trophies</span>
          </div>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => handleNav('history')}>
          <span className="icon">📜</span>
          <div className="text">
            <span className="title">History</span>
            <span className="subtitle">Past walks & earnings</span>
          </div>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => handleNav('my-vouchers')}>
          <span className="icon">🎟️</span>
          <div className="text">
            <span className="title">My Vouchers</span>
            <span className="subtitle">Active codes</span>
          </div>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => handleNav('settings')}>
          <span className="icon">⚙️</span>
          <div className="text">
            <span className="title">Settings</span>
            <span className="subtitle">Notifications & Privacy</span>
          </div>
          <span className="arrow">›</span>
        </button>
      </div>

      <button className="logout-btn" onClick={() => playSound('click')}>Log Out</button>
    </div>
  );
};

export default ProfileView;