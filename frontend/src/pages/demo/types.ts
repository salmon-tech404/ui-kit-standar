export type DemoPageId =
  | 'home'
  | 'login'
  | 'signup'
  | 'forgot_password'
  | 'reset_password'
  | 'dashboard'
  | 'settings'
  | 'billing'
  | 'profile'
  | 'features'
  | 'pricing'
  | 'about'
  | 'blog'
  | 'contact'
  | '404';

export interface DemoUser {
  name: string;
  email: string;
  avatar: string;
  role: string;
  organization: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
}

export interface DemoAppContextType {
  currentPage: DemoPageId;
  navigate: (page: DemoPageId) => void;
  isAuthenticated: boolean;
  user: DemoUser;
  login: () => void;
  logout: () => void;
}
