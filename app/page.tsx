// 'use client';

// import { useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { generateCreepySlug } from '@/lib/creepySlug';
// import { getUser } from '@/lib/auth';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const [originalUrl, setOriginalUrl] = useState('');
//   const [creepyLink, setCreepyLink] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [customText, setCustomText] = useState('');
// const router = useRouter();

//  const createCreepyLink = async () => {
//   if (!originalUrl) return alert('Please enter a URL');

//   setLoading(true);

//   const user = await getUser();
//   if (!user) {
//     setLoading(false);
//     router.push('/auth');
//     return;
//   }
//     let slug = '';
//     let inserted = false;
//     let attempts = 0;

//     while (!inserted && attempts < 5) {
//       attempts++;

//       slug = customText
//         ? `${customText.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 1000)}`
//         : generateCreepySlug();

//       const { error } = await supabase
//         .from('links')
//         .insert([
//           {
//             slug,
//             original_url: originalUrl,
//             user_id: user.id,
//           },
//         ]);

//       if (!error) {
//         setCreepyLink(`${window.location.origin}/go/${slug}`);
//         inserted = true;
//         break;
//       }

//       if (error.code === '23505') continue;

//       alert('Error creating link.');
//       console.error(error);
//       setLoading(false);
//       return;
//     }

//     if (!inserted) {
//       alert('Could not generate unique creepy link.');
//     }

//     setLoading(false);
//   };

//   return (
    
//     <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
//   <h1 className="text-5xl font-creepy text-blood tracking-widest">
//     CreepyLink
//   </h1>

//   <p className="text-ash italic">
//     Disguised links. Questionable intent.
//   </p>

//   <input
//     className="w-full max-w-md bg-black border border-blood text-ash px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blood"
//     placeholder="Paste a link that shouldn't be trusted..."
//     value={originalUrl}
//     onChange={(e) => setOriginalUrl(e.target.value)}
//   />

//   <input
//     className="w-full max-w-md bg-black border border-ash text-ash px-4 py-3 rounded-md"
//     placeholder="Optional: custom creepy phrase"
//     value={customText}
//     onChange={(e) => setCustomText(e.target.value)}
//   />

//   <button
//     onClick={createCreepyLink}
//     disabled={loading}
//     className="bg-blood text-white bg-gray-500 px-6 py-3 rounded-md font-bold hover:bg-red-700 transition disabled:opacity-50"
//   >
//     {loading ? 'Summoning…' : 'Generate Creepy Link'}
//   </button>

//   {creepyLink && (
//     <div className="bg-black border border-blood p-4 rounded-md w-full max-w-md">
//       <p className="text-blood mb-2">Your cursed link:</p>
//       <input
//         readOnly
//         value={creepyLink}
//         className="w-full bg-void text-ash px-3 py-2 rounded"
//       />
//       <button
//         onClick={() => navigator.clipboard.writeText(creepyLink)}
//         className="mt-3 w-full bg-ash text-white py-2 rounded font-bold hover:bg-red-500 transition"
//       >
//         Copy & Regret
//       </button>
//     </div>
//   )}
// </div>

//   );
// }
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { generateCreepySlug } from '@/lib/creepySlug';
import { getUser } from '@/lib/auth';

export default function HomePage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [creepyLink, setCreepyLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [customText, setCustomText] = useState('');

  const createCreepyLink = async () => {
    if (!originalUrl) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);

    // ✅ OPTIONAL user (can be null)
    const user = await getUser();

    let slug = '';
    let inserted = false;
    let attempts = 0;

    while (!inserted && attempts < 5) {
      attempts++;

      // Custom or random creepy slug
      slug = customText
        ? `${customText
            .replace(/\s+/g, '-')
            .toLowerCase()}-${Math.floor(Math.random() * 1000)}`
        : generateCreepySlug();

      const { error } = await supabase.from('links').insert([
        {
          slug,
          original_url: originalUrl,
          user_id: user?.id ?? null, // ✅ KEY LINE
        },
      ]);

      if (!error) {
        setCreepyLink(`${window.location.origin}/go/${slug}`);
        inserted = true;
        break;
      }

      // Slug conflict → retry
      if (error.code === '23505') continue;

      // Any other error
      alert('Error creating link.');
      console.error(error);
      setLoading(false);
      return;
    }

    if (!inserted) {
      alert('Could not generate unique creepy link.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-5xl font-creepy text-blood tracking-widest">
        CreepyLink
      </h1>

      <p className="text-ash italic">
        Disguised links. Questionable intent.
      </p>

      <input
        className="w-full max-w-md bg-black border border-blood text-ash px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blood"
        placeholder="Paste a link that shouldn't be trusted..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <input
        className="w-full max-w-md bg-black border border-ash text-ash px-4 py-3 rounded-md"
        placeholder="Optional: custom creepy phrase"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
      />

      <button
        onClick={createCreepyLink}
        disabled={loading}
        className="bg-blood px-6 py-3 rounded-md font-bold hover:bg-red-700 transition disabled:opacity-50"
      >
        {loading ? 'Summoning…' : 'Generate Creepy Link'}
      </button>

      {creepyLink && (
        <div className="bg-black border border-blood p-4 rounded-md w-full max-w-md">
          <p className="text-blood mb-2">Your cursed link:</p>
          <input
            readOnly
            value={creepyLink}
            className="w-full bg-void text-ash px-3 py-2 rounded"
          />
          <button
            onClick={() => navigator.clipboard.writeText(creepyLink)}
            className="mt-3 w-full bg-ash py-2 rounded font-bold hover:bg-red-500 transition"
          >
            Copy & Regret
          </button>
        </div>
      )}
    </div>
  );
}
