import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { UserRole } from '../App';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'manager@gmail.com') {
      onLogin('manager');
    } else if (email === 'employee@gmail.com') {
      onLogin('employee');
    }
  };

  return (
        <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-white items-center justify-center p-12">
        <div>
          <h1 className="text-[80px] leading-[0.9] mb-4 font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
            OpLink
          </h1>
          <p className="text-[32px] text-gray-800 tracking-[0.2em] font-light">MANAGEMENT</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-[48px] leading-[0.9] mb-2 font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              OpLink
            </h1>
            <p className="text-[20px] text-gray-300 tracking-[0.2em] font-light">MANAGEMENT</p>
          </div>

          {/* Login Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-semibold mb-2">LOGIN</h2>
              <p className="text-gray-400 text-sm">Secure Access to OpLink</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Login
              </button>

              <p className="text-center text-gray-400 text-sm mt-6">
                Don't have an account?{' '}
                <button type="button" className="text-white hover:text-purple-400 transition-colors font-medium">
                  Register
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
