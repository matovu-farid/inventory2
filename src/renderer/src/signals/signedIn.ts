import { computed, signal } from '@preact/signals-react'
import { firebaseApp, user } from './firebaseApp'

export const isSignedIn = signal(() => firebaseApp.auth.currentUser !== null)
