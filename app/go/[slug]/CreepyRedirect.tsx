// 'use client'

// import { useEffect, useState } from 'react'

// export default function CreepyRedirect({ url }: { url: string }) {
//   const messages = [
//     'Establishing connection…',
//     'Tracking your presence…',
//     'You shouldn’t have clicked this.',
//     'Almost there… 👁'
//   ]

//   const [message, setMessage] = useState(messages[0])

//   useEffect(() => {
//     let index = 0

//     const messageInterval = setInterval(() => {
//       index++
//       if (index < messages.length) {
//         setMessage(messages[index])
//       }
//     }, 900)

//     const redirectTimeout = setTimeout(() => {
//       window.location.href = url
//     }, messages.length * 900 + 500) // ensures all messages show

//     return () => {
//       clearInterval(messageInterval)
//       clearTimeout(redirectTimeout)
//     }
//   }, [url])

//   return (
//     <div style={styles.container}>
//       <div style={styles.box}>
//         <div style={styles.eye}>👁</div>
//         <p style={styles.text}>{message}</p>
//         <p style={styles.sub}>Do not refresh.</p>
//       </div>
//     </div>
//   )
// }

// const styles = {
//   container: {
//     height: '100vh',
//     background: 'black', // ✅ fixed
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#e11d48',
//     fontFamily: 'monospace'
//   },
//   box: {
//     textAlign: 'center' as const
//   },
//   eye: {
//     fontSize: '64px',
//     marginBottom: '20px',
//     animation: 'pulse 2s infinite'
//   },
//   text: {
//     fontSize: '30px'
//   },
//   sub: {
//     fontSize: '18px',
//     opacity: 0.6,
//     marginTop: '10px'
//   }
// }
// 'use client'

// import { useEffect, useState } from 'react'

// export default function CreepyRedirect({ url }: { url: string }) {
//   const messages = [
//     'Establishing connection…',
//     'Tracking your presence…',
//     'You shouldn’t have clicked this.',
//     'Almost there… 👁'
//   ]

//   const [message, setMessage] = useState(messages[0])

//   useEffect(() => {
//     let index = 0

//     const messageInterval = setInterval(() => {
//       index++
//       if (index < messages.length) {
//         setMessage(messages[index])
//       }
//     }, 900)

//     const redirectTimeout = setTimeout(() => {
//       if (url) {
//         window.location.href = url
//       } else {
//         console.error('No URL to redirect to!')
//       }
//     }, messages.length * 900 + 500)

//     return () => {
//       clearInterval(messageInterval)
//       clearTimeout(redirectTimeout)
//     }
//   }, [url])

//   return (
//     <div style={styles.container}>
//       <div style={styles.box}>
//         <div style={styles.eye}>👁</div>
//         <p style={styles.text}>{message}</p>
//         <p style={styles.sub}>Do not refresh.</p>
//       </div>
//     </div>
//   )
// }

// const styles = {
//   container: {
//     height: '100vh',
//     background: 'black',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#e11d48',
//     fontFamily: 'monospace'
//   },
//   box: {
//     textAlign: 'center' as const
//   },
//   eye: {
//     fontSize: '64px',
//     marginBottom: '20px',
//     animation: 'pulse 2s infinite'
//   },
//   text: {
//     fontSize: '30px'
//   },
//   sub: {
//     fontSize: '18px',
//     opacity: 0.6,
//     marginTop: '10px'
//   }
// }


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreepyRedirect({ url }: { url: string }) {
  const router = useRouter()

  const messages = [
    'Establishing connection…',
    'Tracking your presence…',
    'You shouldn’t have clicked this.',
    'Almost there… 👁'
  ]

  const [message, setMessage] = useState(messages[0])

  useEffect(() => {
    let index = 0

    const msgInterval = setInterval(() => {
      index++
      if (index < messages.length) {
        setMessage(messages[index])
      }
    }, 900)

    const redirectTimeout = setTimeout(() => {
      router.replace(url) // ✅ CORRECT WAY
    }, 3500)

    return () => {
      clearInterval(msgInterval)
      clearTimeout(redirectTimeout)
    }
  }, [router, url])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">👁</div>
        <p className="text-2xl">{message}</p>
        <p className="opacity-50 mt-2">Do not refresh.</p>
      </div>
    </div>
  )
}
