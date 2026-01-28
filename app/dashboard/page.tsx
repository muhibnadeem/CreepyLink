'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getUser, signOut } from '@/lib/auth';

export default function DashboardPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const u = await getUser();
      if (!u) return;
      setUser(u);

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', u.id);

      if (error) return console.error(error);
      setLinks(data || []);
    };

    fetchLinks();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleSignOut}>Sign Out</button>

      <h2 style={{ marginTop: 20 }}>Your Creepy Links</h2>
      {links.length === 0 && <p>No links created yet.</p>}
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={`/go/${link.slug}`} target="_blank">{`/go/${link.slug}`}</a> - {link.original_url}
          </li>
        ))}
      </ul>
    </div>
  );
}
