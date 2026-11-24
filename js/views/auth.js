// View: Authentication (User Login & Sign Up)
// Customized Easy Explorer - Modern Real-Time Authentication System

import { state } from '../state.js';

export function renderAuth(mode = "login") {
  const isLogin = mode === "login";

  return `
    <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div class="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-white/80 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Brand Header -->
        <div class="text-center mb-6">
          <div class="w-14 h-14 rounded-2xl bg-slate-900 text-teal-300 mx-auto flex items-center justify-center mb-4 shadow-xl border border-cyan-400/40">
            <span class="material-symbols-outlined text-3xl">explore</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900">
            ${isLogin ? 'Sign In to Explorer' : 'Create Explorer Account'}
          </h1>
          <p class="text-xs text-slate-500 mt-1">
            ${isLogin ? 'Enter your credentials or choose a quick 1-click demo account' : 'Join the Customized Easy Explorer travel community'}
          </p>
        </div>

        <!-- Mode Toggle Tabs (Sign In / Register) -->
        <div class="flex items-center p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200">
          <button onclick="window.appRouter('login')" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}">
            Sign In
          </button>
          <button onclick="window.appRouter('signup')" class="flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}">
            Create Account
          </button>
        </div>

        <!-- 1-Click Quick Demo Sign In Box -->
        <div class="mb-6 p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl">
          <p class="text-[11px] font-bold text-teal-950 mb-2 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-teal-600">bolt</span>
            <span>Quick 1-Click Demo Accounts:</span>
          </p>
          <div class="grid grid-cols-2 gap-2">
            <button type="button" onclick="window.quickDemoLogin('user')" class="py-2 px-2.5 rounded-xl bg-white border border-teal-300 text-teal-900 hover:bg-teal-100 text-[11px] font-bold transition-all text-left flex items-center gap-1.5 shadow-xs">
              <span class="material-symbols-outlined text-sm text-teal-600">person</span>
              <span class="truncate">Explorer Elite</span>
            </button>
            <button type="button" onclick="window.quickDemoLogin('admin')" class="py-2 px-2.5 rounded-xl bg-purple-50 border border-purple-300 text-purple-900 hover:bg-purple-100 text-[11px] font-bold transition-all text-left flex items-center gap-1.5 shadow-xs">
              <span class="material-symbols-outlined text-sm text-purple-600">admin_panel_settings</span>
              <span class="truncate">Fleet Admin</span>
            </button>
          </div>
        </div>

        <!-- Interactive Form Elements -->
        <form onsubmit="event.preventDefault(); window.handleAuthSubmit('${mode}')" class="space-y-4">
          
          ${!isLogin ? `
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
              <input type="text" id="auth-name" required value="Explorer Elite" placeholder="Your Full Name" class="w-full bg-white/90 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20" />
            </div>
          ` : ''}

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
            <input type="email" id="auth-email" required value="djshiva257@gmail.com" placeholder="name@example.com" class="w-full bg-white/90 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
            <input type="password" id="auth-password" required value="••••••••••••" placeholder="Enter password" class="w-full bg-white/90 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-400/20" />
          </div>

          ${isLogin ? `
            <div class="flex items-center justify-between text-xs pt-1">
              <label class="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" checked class="rounded border-slate-300 text-teal-600 focus:ring-teal-400" />
                <span>Remember this device</span>
              </label>
              <a href="javascript:void(0)" onclick="alert('Password reset link sent to registered email.')" class="text-teal-700 font-bold hover:underline">Forgot password?</a>
            </div>
          ` : `
            <div class="text-xs text-slate-500 pt-1">
              By creating an account, you agree to Customized Easy Explorer Terms of Service & Privacy Policy.
            </div>
          `}

          <button type="submit" class="w-full mt-2 bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-slate-800 shadow-xl transition-all flex items-center justify-center gap-2">
            <span>${isLogin ? 'Sign In & Access Services' : 'Complete Registration'}</span>
            <span class="material-symbols-outlined text-sm text-cyan-300">arrow_forward</span>
          </button>
        </form>

        <!-- Toggle Login / Signup Footer -->
        <div class="mt-6 pt-5 border-t border-slate-200 text-center text-xs text-slate-600">
          ${isLogin ? `
            <span>Don't have an explorer account? </span>
            <button onclick="window.appRouter('signup')" class="text-teal-700 font-bold hover:underline">
              Create an account
            </button>
          ` : `
            <span>Already have an account? </span>
            <button onclick="window.appRouter('login')" class="text-teal-700 font-bold hover:underline">
              Sign In
            </button>
          `}
        </div>

      </div>
    </div>
  `;
}
