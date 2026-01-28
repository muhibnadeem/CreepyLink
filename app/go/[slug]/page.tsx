// import { redirect } from 'next/navigation';
// import { supabase } from '@/lib/supabase';

// type PageProps = {
//   params: Promise<{ slug: string }>;
// };

// export default async function RedirectPage({ params }: PageProps) {
//   const { slug } = await params; 

//   const { data } = await supabase
//     .from('links')
//     .select('original_url')
//     .eq('slug', slug)
//     .single();

//   if (!data) {
//     return <h1>404 – Creepy link not found</h1>;
//   }

//   redirect(data.original_url);
// }
// import { supabase } from '@/lib/supabase'
// import { redirect, notFound } from 'next/navigation'

// type Props = {
//   params: {
//     slug: string
//   }
// }

// export default async function GoPage({ params }: Props) {
//   const { slug } = params

//   const { data, error } = await supabase
//     .from('links')
//     .select('original_url')
//     .eq('slug', slug)
//     .single()

//   if (error || !data) {
//     notFound()
//   }

//   redirect(data.original_url)
// }

import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import CreepyRedirect from './CreepyRedirect'

type Props = {
  params: {
    slug: string
  }
}

export default async function GoPage({ params }: Props) {
  const { slug } = params

  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    notFound()
  }

  return <CreepyRedirect url={data.original_url} />
}
