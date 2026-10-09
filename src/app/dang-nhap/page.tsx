"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '@/lib/auth/auth-service';
import { useAuth } from '@/lib/auth/AuthContext';
import Image from 'next/image';
import { brandConfig } from '@/lib/config/brand';

export default function DangNhapPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, profile } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.signInWithGoogle();
      // On success, the AuthContext will update, we can redirect based on state later
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, show status
  if (user && profile) {
    return (
      <div className="bg-slate-50 min-h-[calc(100vh-88px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
            {user.photoURL ? (
               <img src={user.photoURL} alt="User avatar" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="text-[#1677FF] font-bold text-2xl">{profile.name?.charAt(0) || 'U'}</div>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Xin chào, {profile.name}</h2>
          
          {profile.status === 'approved' ? (
            <p className="text-slate-600 mb-6">Bạn đã đăng nhập vào hệ thống B2B Portal.</p>
          ) : profile.status === 'disabled' ? (
             <p className="text-red-600 mb-6 font-medium">Tài khoản của bạn đã bị vô hiệu hóa.</p>
          ) : (
            <p className="text-amber-600 mb-6 font-medium">Tài khoản đang chờ xác nhận.</p>
          )}

          <div className="space-y-3">
            {profile.status === 'approved' ? (
              <Link href="/admin-preview" className="block w-full bg-[#1677FF] hover:bg-[#0F5ED7] text-white font-bold py-3 rounded-lg transition-colors shadow-sm">
                Đến trang quản lý
              </Link>
            ) : (
              <Link href="/" className="block w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-lg transition-colors">
                Về trang chủ
              </Link>
            )}
            
            <button 
              onClick={() => authService.signOut()}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg transition-colors border border-slate-200"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-88px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-white p-8 text-center flex flex-col items-center border-b border-slate-100">
          <div className="relative w-[180px] h-[48px] mb-4">
            <Image 
              src={brandConfig.logoUrl} 
              alt={brandConfig.name}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Đăng nhập B2B Portal</h2>
          <p className="text-slate-500 mt-2 text-sm">Quản lý yêu cầu báo giá và tiến độ sản xuất</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tên đăng nhập / Email</label>
              <div className="relative">
                <input type="email" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1677FF] focus:border-[#1677FF]" placeholder="VD: partner@company.com" />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Mật khẩu</label>
                <a href="#" className="text-xs font-semibold text-[#1677FF] hover:text-[#0F5ED7]">Quên mật khẩu?</a>
              </div>
              <div className="relative">
                <input type="password" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1677FF] focus:border-[#1677FF]" placeholder="••••••••" />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <button type="button" className="w-full bg-[#1677FF] hover:bg-[#0F5ED7] text-white font-bold py-3.5 rounded-lg flex justify-center items-center gap-2 transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98]">
              Đăng nhập
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-500 font-medium">hoặc</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-[11px] rounded-[18px] flex justify-center items-center gap-3 transition-colors border border-slate-200 shadow-sm"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {loading ? 'Đang đăng nhập...' : 'Tiếp tục với Google'}
          </button>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Chưa có tài khoản đối tác?{' '}
              <Link href="/lien-he" className="font-bold text-[#1677FF] hover:text-[#0F5ED7]">
                Liên hệ đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
