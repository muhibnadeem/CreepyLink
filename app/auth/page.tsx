'use client';

import { useEffect, useState } from 'react';
import { signIn, signUp } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);

  // 🔁 Redirect if already logged in OR after login/signup
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.push('/');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert('Enter email & password');
      return;
    }

    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        alert('Login failed: ' + error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        alert('Signup failed: ' + error.message);
        setLoading(false);
        return;
      }
    }

    setEmail('');
    setPassword('');
    setLoading(false);
    // 🚫 No manual redirect here — auth listener handles it
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md border border-blood bg-void p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl text-blood font-creepy tracking-widest text-center mb-6">
          {mode === 'login' ? 'Enter the Void' : 'Join the Cult'}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-black border border-ash text-ash px-4 py-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blood"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black border border-ash text-ash px-4 py-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blood"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blood py-3 rounded-md font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading
            ? 'Summoning…'
            : mode === 'login'
            ? 'Sign In'
            : 'Sign Up'}
        </button>

        <button
          onClick={() =>
            setMode(mode === 'login' ? 'signup' : 'login')
          }
          className="w-full mt-4 text-ash hover:text-blood transition text-sm"
        >
          {mode === 'login'
            ? 'No account? Create one'
            : 'Already cursed? Sign in'}
        </button>
      </div>
    </div>
  );
}
