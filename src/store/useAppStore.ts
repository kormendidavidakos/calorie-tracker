import type { Goal, Profile } from '@/lib/supabase/types';
import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

type ViewState = 'dashboard' | 'add-meal' | 'settings';
type AuthState = 'unauthenticated' | 'authenticated' | 'login' | 'signUp' | 'forgotPassword' | 'updatePassword' | 'loading'


interface AppState {
	currentView: ViewState;
	setCurrentView: (view: ViewState) => void

	authState: AuthState
	setAuthState: (state: AuthState) => void

	session: Session | null
	setSession: (session: Session | null) => void

	profile: Profile | null
	setProfile: (profile: Profile | null) => void

	goal: Goal | null
	setGoal: (goal: Goal | null) => void
}

export const useAppStore = create<AppState>((set) => ({
	currentView: 'dashboard',
	setCurrentView: (currentView) => set({ currentView }),

	authState: "loading",
	setAuthState: (authState) => set({ authState }),

	session: null,
	setSession: (session) => set({session}),

	profile: null,
	setProfile: (profile) => set({ profile }),

	goal: null,
	setGoal: (goal ) => set({ goal })

}));