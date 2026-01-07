import React from 'react';
import { ViewState } from '../types';
import { Home, ShoppingBag, User, MessageCircle, Wallet } from 'lucide-react';
import { playSound } from '../utils';
import './Navbar.css';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'market', label: 'Shop', icon: ShoppingBag },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'profile', label: 'Me', icon: User },
  ];

  return (
    <nav className="bottom-nav animate-slide-up">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              playSound('click');
              setView(item.id as ViewState);
            }}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <Icon className="nav-icon" />
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;