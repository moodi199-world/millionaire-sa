export interface UserData {
  salary: number
  expenses: number
  savings: number
  investments: number
  rate: number
  monthlySaving: number
  netWorth: number
  totalMonths: number
  email?: string
  referralCode?: string
}

export function saveUserData(data: UserData) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('millionaire_data', JSON.stringify(data))
  }
}

export function getUserData(): UserData | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem('millionaire_data')
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export function saveEmail(email: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('millionaire_email', email)
  }
}

export function getEmail(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('millionaire_email') || ''
}

export function generateReferralCode(email: string): string {
  return btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8).toUpperCase()
}

export function getReferralFromURL(): string {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  return params.get('ref') || ''
}

export function saveReferral(code: string) {
  if (typeof window !== 'undefined' && code) {
    localStorage.setItem('millionaire_ref', code)
  }
}

export function getReferral(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('millionaire_ref') || ''
}

export function clearUserData() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('millionaire_data')
  }
}
