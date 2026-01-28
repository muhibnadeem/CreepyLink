const words = [
  'you-are-being-watched',
  'this-device-is-infected',
  'your-camera-is-on',
  'do-not-close-this-tab',
  'security-breach-detected',
  'we-know-what-you-did',
  'accessing-private-files'
];

export function generateCreepySlug() {
  // Add random number to avoid collisions
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${randomWord}-${randomNum}`;
}
