import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export default function Diagnostics({ onBack }) {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  const collections = [
    'packages',
    'users',
    'settings',
    'notifications',
    'backups',
    'coupons',
    'purchase_records',
    'recovery_logs'
  ];

  useEffect(() => {
    async function runChecks() {
      const newResults = {};
      for (const colName of collections) {
        try {
          const q = query(collection(db, colName), limit(50));
          const snap = await getDocs(q);
          newResults[colName] = {
            status: 'SUCCESS',
            count: snap.size,
            exists: !snap.empty,
            docIds: snap.docs.map(d => d.id)
          };
        } catch (err) {
          newResults[colName] = {
            status: 'ERROR',
            code: err.code || 'unknown',
            message: err.message || String(err)
          };
        }
      }
      setResults(newResults);
      setLoading(false);
    }
    
    runChecks();
  }, []);

  return (
    <div style={{
      padding: '24px',
      fontFamily: 'system-ui, sans-serif',
      background: '#0f172a',
      color: '#f8fafc',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Firestore Diagnostics</h1>
      <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
        Checking connection and collection permissions...
      </p>

      {loading ? (
        <div style={{ color: '#38bdf8' }}>Running diagnostic queries...</div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {collections.map(col => {
            const res = results[col] || { status: 'UNKNOWN' };
            const isSuccess = res.status === 'SUCCESS';
            return (
              <div key={col} style={{
                padding: '16px',
                borderRadius: '8px',
                background: '#1e293b',
                border: `1px solid ${isSuccess ? '#10b981' : '#f43f5e'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#e2e8f0' }}>{col}</span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: isSuccess ? '#10b98120' : '#f43f5e20',
                    color: isSuccess ? '#34d399' : '#fb7185'
                  }}>
                    {res.status}
                  </span>
                </div>
                
                {isSuccess ? (
                  <div style={{ marginTop: '8px', fontSize: '14px', color: '#94a3b8' }}>
                    <div><strong>Documents loaded:</strong> {res.count}</div>
                    {res.count > 0 && (
                      <div style={{ marginTop: '4px', overflowX: 'auto' }}>
                        <strong>IDs:</strong> {res.docIds.join(', ')}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ marginTop: '8px', fontSize: '14px', color: '#fb7185' }}>
                    <div><strong>Code:</strong> {res.code}</div>
                    <div style={{ marginTop: '2px', fontSize: '12px' }}>{res.message}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {onBack && (
        <button
          onClick={onBack}
          style={{
            marginTop: '24px',
            padding: '10px 20px',
            background: '#38bdf8',
            color: '#0f172a',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Close Diagnostics & Return to App
        </button>
      )}
    </div>
  );
}
