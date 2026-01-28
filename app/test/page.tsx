'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  useEffect(() => {
    supabase
      .from('links')
      .select('*')
      .then(res => console.log(res));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Supabase test (check console)</h1>
    </div>
  );
}
