import type { DailyFood, Day, Goal, Profile } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

type ViewState = 'dashboard' | 'add-meal' | 'settings';
type AuthState = 'unauthenticated' | 'authenticated' | 'login' | 'signUp' | 'forgotPassword' | 'updatePassword' | 'loading'
type Page = 'home' | 'profile'

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

	days: Day[]
	setDays: (days: Day[]) => void

	dailyFoods: DailyFood[]
	setDailyFoods: (dailyFoods: DailyFood[]) => void

	renderedDay: DailyFood[]
	setRenderedDay: (renderedDay: DailyFood[]) => void

	page: Page
	setPage: (page: Page) => void
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
	setGoal: (goal ) => set({ goal }),

	days: [],
	setDays: (days) => set({days}),

	dailyFoods: [],
	setDailyFoods: (dailyFoods: DailyFood[]) => set({dailyFoods}),

	renderedDay: [],
	setRenderedDay: (renderedDay: DailyFood[]) => set({renderedDay}),

	page: 'home',
	setPage: (page) => set({page})
}));