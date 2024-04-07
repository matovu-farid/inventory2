import { computed } from '@preact/signals-react'
import { user } from './firebaseApp'

export const isSignedIn = computed(() => !!user.value?.uid)
