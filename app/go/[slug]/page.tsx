// import { supabase } from '@/lib/supabase'
// import { notFound } from 'next/navigation'
// import CreepyRedirect from './CreepyRedirect'

// export default async function GoPage({ params }: { params: { slug: string } }) {
//   const { slug } = params

//   const { data, error } = await supabase
//     .from('links')
//     .select('original_url')
//     .eq('slug', slug)
//     .single()

//   if (!data || error) notFound()

//   return <CreepyRedirect url={data.original_url} />
// }





// import { supabase } from '@/lib/supabase'
// import { notFound } from 'next/navigation'
// import CreepyRedirect from './CreepyRedirect'

// type Props = {
//   params: {
//     slug: string
//   }
// }

// export default async function GoPage({ params }: Props) {
//   const { slug } = params

//   // Fetch the original URL from Supabase
//   const { data, error } = await supabase
//     .from('links')
//     .select('original_url')
//     .eq('slug', slug)
//     .single()

//   // If error or no data, show 404
//   if (error || !data || !data.original_url) {
//     notFound()
//   }

//   // ✅ Pass the original URL to the client component
//   return <CreepyRedirect url={data.original_url} />
// }





// import { redirect, notFound } from 'next/navigation'
// import { supabase } from '@/lib/supabase'

// type Props = {
//   params: Promise<{ slug: string }>
// }

// export default async function GoPage({ params }: Props) {
//   const { slug } = await params // ✅ REQUIRED in Next 15

//   const { data, error } = await supabase
//     .from('links')
//     .select('original_url')
//     .eq('slug', slug)
//     .single()

//   if (error || !data?.original_url) {
//     notFound()
//   }

//   redirect(data.original_url) // ✅ SERVER REDIRECT (instant, reliable)

// }

import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CreepyRedirect from './CreepyRedirect'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function GoPage({ params }: Props) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('slug', slug)
    .single()

  if (error || !data?.original_url) {
    notFound()
  }

  // ✅ Pass URL to client for delayed redirect
  return <CreepyRedirect url={data.original_url} />
}
