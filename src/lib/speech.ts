export function speak(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text.replace(/\//g, ', '))
  u.lang = 'en-US'
  u.rate = 0.85
  window.speechSynthesis.speak(u)
}
