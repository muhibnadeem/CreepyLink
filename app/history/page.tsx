'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const router = useRouter();
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error) setLinks(data || []);
      setLoading(false);
    };

    loadHistory();
  }, [router]);

  if (loading) {
    return <p className="p-10 text-ash">Loading your cursed history…</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl text-blood mb-6">Your Creepy History 👁</h1>

      {links.length === 0 && (
        <p className="text-ash italic">No cursed links yet.</p>
      )}

      <div className="space-y-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="border border-blood p-4 rounded-md bg-black"
          >
            <p className="text-blood">
              {window.location.origin}/go/{link.slug}
            </p>
            <p className="text-ash text-sm">{link.original_url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
