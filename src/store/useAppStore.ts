import type { Profile } from '@/lib/supabase/types';
import { create } from 'zustand';

type ViewState = 'dashboard' | 'add-meal' | 'settings';
type AuthState = 'unauthenticated' | 'authenticated' | 'login' | 'signUp' | 'forgotPassword' | 'updatePassword'


interface AppState {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;

  authState: AuthState,
  setAuthState: (state: AuthState) => void

  profile: Profile|null
  setProfile: (profile: Profile|null) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'dashboard',
  setCurrentView: (view) => set({ currentView: view }),

  authState: "unauthenticated",
  setAuthState: (state) => set({ authState: state }),

  profile: null,
  setProfile: (profile) => set({ profile: profile }),

}));