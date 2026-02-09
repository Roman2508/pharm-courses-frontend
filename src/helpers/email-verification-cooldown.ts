const KEY = "verificationCooldownUntil"

export const getCooldown = () => {
  const until = Number(localStorage.getItem(KEY) || 0)
  const diff = Math.ceil((until - Date.now()) / 1000)
  return diff > 0 ? diff : 0
}

export const startCooldown = (seconds: number = 60) => {
  localStorage.setItem(KEY, String(Date.now() + seconds * 1000))
}
