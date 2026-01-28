'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 32px',
      borderBottom: '1px solid #222'
    }}>
      <Link href="/">👁 CreepyLink</Link>

      <div style={{ display: 'flex', gap: 16 }}>
        {user && <Link href="/history">History</Link>}
        {!user && <Link href="/auth">Sign In</Link>}
        {user && (
          <button onClick={() => supabase.auth.signOut()}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
