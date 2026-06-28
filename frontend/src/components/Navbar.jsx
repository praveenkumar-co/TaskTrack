import React from 'react';
import { CheckSquare, RefreshCw } from 'lucide-react';

const Navbar = ({ isSyncing }) => {
  return (
    <nav style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            background: 'var(--primary)',
            color: '#ffffff',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckSquare size={24} />
          </div>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2
            }}>Coll-Edge</h1>
            <span style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Task Workspace</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          color: 'var(--text-muted)'
        }}>
          <RefreshCw 
            size={14} 
            className={isSyncing ? 'spin' : ''} 
            style={{
              animation: isSyncing ? 'spin 1.5s linear infinite' : 'none',
              color: isSyncing ? 'var(--primary)' : 'var(--text-light)'
            }}
          />
          <span>{isSyncing ? 'Syncing...' : 'Synced'}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
