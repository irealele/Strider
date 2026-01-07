import React, { useState } from 'react';
import { INVENTORY } from '../data/marketInventory';
import { Voucher, Category } from '../types';
import { playSound } from '../utils';
import './Marketplace.css';

interface Props {
  balance: number;
  onPurchase: (cost: number, itemTitle: string) => void;
}

export const Marketplace = ({ balance, onPurchase }: Props) => {
  const [activeCat, setActiveCat] = useState<Category | 'All'>('All');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successItem, setSuccessItem] = useState<Voucher | null>(null);

  const categories: (Category | 'All')[] = ['All', 'Fuel', 'Munchies', 'Smart Shopping', 'Drip', 'Entertainment'];

  // Helper: Get Icon
  const getBrandLogo = (brand: string) => {
    const domainMap: Record<string, string> = {
      '5 to go': '5togo.com', "McDonald's": 'mcdonalds.com', 'KFC': 'kfc.ro', 'Lidl': 'lidl.ro', 'Kaufland': 'kaufland.ro', 'Flip.ro': 'flip.ro', 'H&M/Bershka': 'hm.com', 'Sneaker Ind.': 'sneakerindustry.ro', 'Cinema City': 'cinemacity.ro', 'Spotify/YT': 'spotify.com', 'World Class': 'worldclass.ro', 'Ted’s Coffee': 'tedscoffeecompany.com', 'Hell/Red Bull': 'redbull.com', 'Glovo': 'glovoapp.com'
    };
    const domain = domainMap[brand] || 'google.com';
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const filteredItems = activeCat === 'All' ? INVENTORY : INVENTORY.filter(item => item.category === activeCat);

  const handleBuy = (item: Voucher) => {
    if (balance < item.cost) {
      alert("Not enough Stride Coins! Walk more.");
      return;
    }

    // 1. Start Animation
    playSound('click');
    setLoadingId(item.id);

    // 2. Simulate Network Delay
    setTimeout(() => {
      onPurchase(item.cost, item.title);
      setLoadingId(null);
      setSuccessItem(item); 
      playSound('success');
    }, 1500);
  };

  return (
    <div className="marketplace-container animate-in">
      {/* Category Scroll */}
      <div className="category-scroll">
        {categories.map(cat => (
          <button key={cat} className={activeCat === cat ? 'active' : ''} onClick={() => { playSound('click'); setActiveCat(cat); }}>
            {cat}
          </button>
        ))}
      </div>

      <div className="voucher-grid">
        {filteredItems.map(item => (
          <div key={item.id} className={`voucher-card ${balance < item.cost ? 'disabled' : ''}`}>
            <div className="card-top">
              <img src={getBrandLogo(item.brand)} alt={item.brand} className="brand-logo" />
              <span className="cost-badge">{item.cost} $SC</span>
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p className="brand-name">{item.brand}</p>
              <p className="desc">{item.description}</p>
            </div>

            <button 
              onClick={() => handleBuy(item)} 
              className={`buy-btn ${loadingId === item.id ? 'loading' : ''}`}
              disabled={loadingId === item.id || balance < item.cost}
            >
              {loadingId === item.id ? (
                <span className="spinner"></span>
              ) : (
                balance >= item.cost ? 'Redeem' : 'Locked 🔒'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {successItem && (
        <div className="modal-overlay animate-fade-in">
          <div className="success-card animate-slide-up">
            <div className="confetti-burst">🎉</div>
            <h2>Voucher Unlocked!</h2>
            <img src={getBrandLogo(successItem.brand)} className="success-logo" alt="logo"/>
            <h3>{successItem.title}</h3>
            <p>Your code has been saved to "My Vouchers".</p>
            <div className="ticket-cutout">
              <span className="code-reveal">STR-{Math.floor(Math.random()*10000)}</span>
            </div>
            <button className="close-btn" onClick={() => setSuccessItem(null)}>
              Awesome, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};