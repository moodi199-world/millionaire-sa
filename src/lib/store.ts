export interface UserData {
  salary: number
  expenses: number
  savings: number
  investments: number
  rate: number
  monthlySaving: number
  netWorth: number
  totalMonths: number
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
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearUserData() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('millionaire_data')
  }
}
