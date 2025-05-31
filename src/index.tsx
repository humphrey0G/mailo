import React from 'react';
import ReactDOM from 'react-dom/client';
import { Mail, Zap, Shield, Clock, ArrowRight } from 'lucide-react';
import './index.css';
import App from './App';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <Mail className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-900">mailo</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Email reimagined for the future
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience email like never before with AI-powered organization, 
            lightning-fast search, and seamless collaboration tools.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/app'} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 flex items-center gap-2"
            >
              Try Mailo Now
              <ArrowRight size={20} />
            </button>
            <button className="border-2 border-gray-200 px-6 py-3 rounded-lg text-lg text-gray-700 hover:border-gray-300">
              Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why choose Mailo?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Instant search and real-time updates make email management effortless
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure by Design</h3>
              <p className="text-gray-600">
                End-to-end encryption and advanced security features protect your data
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Time-Saving AI</h3>
              <p className="text-gray-600">
                Smart filters and automated organization save you hours every week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Simple, transparent pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Basic</h3>
              <p className="text-4xl font-bold mb-6">Free</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>5GB Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic Search</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Mobile App</span>
                </li>
              </ul>
              <button className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Get Started
              </button>
            </div>
            <div className="bg-blue-600 p-8 rounded-xl shadow-lg transform scale-105">
              <h3 className="text-xl font-semibold mb-4 text-white">Pro</h3>
              <p className="text-4xl font-bold mb-6 text-white">$9.99/mo</p>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>50GB Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Advanced Search</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>AI Features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Priority Support</span>
                </li>
              </ul>
              <button className="w-full py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">
                Try Pro Free
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-6">Custom</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Unlimited Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Custom Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>24/7 Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>SLA Guarantee</span>
                </li>
              </ul>
              <button className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={24} />
              <span className="text-xl font-bold">mailo</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-blue-400">Terms</a>
              <a href="#" className="hover:text-blue-400">Privacy</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2025 Mailo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {window.location.pathname === '/app' ? <App /> : <LandingPage />}
  </React.StrictMode>
);