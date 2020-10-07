import { SESSION_STORAGE_KEY } from "../session.config"

export class SessionService {
  loadSession() {
    const sessionString = localStorage.getItem(SESSION_STORAGE_KEY)
    return JSON.parse(sessionString)
  }
}
