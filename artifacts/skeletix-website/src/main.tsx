import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import logoAsset from './assets/skeletix-logo.jpeg';

import './index.css';
import './brand-theme.css';

const clerkPubKey = publishableKeyFromHost(window.location.hostname, import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const queryClient = new QueryClient();

const clerkAppearance = {
  theme: shadcn,
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: new URL(logoAsset, window.location.origin).href,
  },
  variables: {
    colorPrimary: '#47e2ec',
    colorForeground: '#edf5f8',
    colorMutedForeground: '#aec1ce',
    colorDanger: '#e19a87',
    colorBackground: '#101f2c',
    colorInput: '#0a1722',
    colorInputForeground: '#edf5f8',
    colorNeutral: '#385361',
    fontFamily: 'system-ui, sans-serif',
    borderRadius: '6px',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#101f2c] rounded-xl w-full max-w-[440px] overflow-hidden border border-[#263d4b]',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-[#edf5f8]',
    headerSubtitle: 'text-[#aec1ce]',
    socialButtonsBlockButtonText: 'text-[#edf5f8]',
    formFieldLabel: 'text-[#d8e7ed]',
    footerActionLink: 'text-[#66dce4]',
    footerActionText: 'text-[#aec1ce]',
    dividerText: 'text-[#aec1ce]',
    identityPreviewEditButton: 'text-[#66dce4]',
    formFieldSuccessText: 'text-[#83d7c7]',
    alertText: 'text-[#ffd1c7]',
    logoBox: 'rounded-md overflow-hidden',
    logoImage: 'object-cover',
    socialButtonsBlockButton: 'border border-[#385361] bg-[#0d1c28]',
    formButtonPrimary: 'bg-[#47e2ec] text-[#07121d] hover:bg-[#83f3f8]',
    formFieldInput: 'bg-[#0a1722] text-[#edf5f8] border-[#385361]',
    footerAction: 'bg-transparent',
    dividerLine: 'bg-[#385361]',
    alert: 'bg-[#291d20] border-[#78514a]',
    otpCodeFieldInput: 'bg-[#0a1722] text-[#edf5f8]',
    formFieldRow: 'text-[#edf5f8]',
    main: 'text-[#edf5f8]',
  },
};

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const cache = useQueryClient();
  const previousUserId = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (previousUserId.current !== undefined && previousUserId.current !== userId) cache.clear();
      previousUserId.current = userId;
    });
    return unsubscribe;
  }, [addListener, cache]);
  return null;
}

function ClerkRouterProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const stripBase = (path: string) => basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
  return <ClerkProvider
    publishableKey={clerkPubKey}
    proxyUrl={clerkProxyUrl}
    appearance={clerkAppearance}
    signInUrl={`${basePath}/sign-in`}
    signUpUrl={`${basePath}/sign-up`}
    localization={{
      signIn: { start: { title: 'Welcome back', subtitle: 'Sign in to access your Skeletix account' } },
      signUp: { start: { title: 'Create your account', subtitle: 'Registration does not grant directory access' } },
    }}
    routerPush={(path) => navigate(stripBase(path))}
    routerReplace={(path) => navigate(stripBase(path), { replace: true })}
  >
    <QueryClientProvider client={queryClient}>
      <ClerkQueryClientCacheInvalidator />
      {children}
    </QueryClientProvider>
  </ClerkProvider>;
}

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <ClerkRouterProvider><App /></ClerkRouterProvider>
    </BrowserRouter>
  </ErrorBoundary>,
);
