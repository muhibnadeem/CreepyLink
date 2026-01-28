'use client'

import { useEffect, useState } from 'react'

export default function CreepyRedirect({ url }: { url: string }) {
  const messages = [
    'Establishing connection…',
    'Tracking your presence…',
    'You shouldn’t have clicked this.',
    'Almost there… 👁'
  ]

  const [message, setMessage] = useState(messages[0])

  useEffect(() => {
    let index = 0

    const messageInterval = setInterval(() => {
      index++
      if (index < messages.length) {
        setMessage(messages[index])
      }
    }, 900)

    const redirectTimeout = setTimeout(() => {
      window.location.href = url
    }, messages.length * 900 + 500) // ensures all messages show

    return () => {
      clearInterval(messageInterval)
      clearTimeout(redirectTimeout)
    }
  }, [url])

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.eye}>👁</div>
        <p style={styles.text}>{message}</p>
        <p style={styles.sub}>Do not refresh.</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    background: 'black', // ✅ fixed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#e11d48',
    fontFamily: 'monospace'
  },
  box: {
    textAlign: 'center' as const
  },
  eye: {
    fontSize: '64px',
    marginBottom: '20px',
    animation: 'pulse 2s infinite'
  },
  text: {
    fontSize: '30px'
  },
  sub: {
    fontSize: '18px',
    opacity: 0.6,
    marginTop: '10px'
  }
}
