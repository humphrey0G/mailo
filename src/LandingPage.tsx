import React from 'react';
import { Mail, Zap, Shield, Clock, ArrowRight, Star, Brain, Globe, MessageSquare } from 'lucide-react';

export function LandingPage() {
  const navigateToApp = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/app';
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64",
      quote: "Mailo's AI features have transformed how I handle my inbox. It's like having a personal email assistant."
    },
    {
      name: "James Wilson",
      role: "CEO of StartupX",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64",
      quote: "The auto-pilot mode is a game-changer. It handles routine emails perfectly, saving me hours each week."
    },
    {
      name: "Elena Rodriguez",
      role: "Senior Developer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64",
      quote: "The cross-platform sync is seamless. I can switch between my devices without missing a beat."
    }
  ];

  const screenshots = [
    {
      title: "AI-Powered Inbox",
      image: "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Smart categorization and priority inbox powered by AI"
    },
    {
      title: "Auto-Pilot Mode",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Let AI handle your routine emails and suggest responses"
    },
    {
      title: "Cross-Platform Sync",
      image: "https://images.pexels.com/photos/8566474/pexels-photo-8566474.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Seamless experience across all your devices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <nav className="flex items-center justify-between mb-16">
          <a href="/" className="flex items-center gap-2">
            <Mail className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-900">mailo</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#screenshots" className="text-gray-600 hover:text-gray-900">Screenshots</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <button 
              onClick={navigateToApp}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Your AI-Powered Email Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience the future of email management with AI-driven organization,
            smart responses, and cross-platform synchronization.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={navigateToApp}
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

      {/* Screenshots Section */}
      <section id="screenshots" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features at Your Fingertips
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={screenshot.image} 
                  alt={screenshot.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{screenshot.title}</h3>
                  <p className="text-gray-600">{screenshot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why choose Mailo?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered</h3>
              <p className="text-gray-600">
                Smart email categorization and automated responses
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure by Design</h3>
              <p className="text-gray-600">
                End-to-end encryption and advanced security
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cross-Platform</h3>
              <p className="text-gray-600">
                Seamless sync across all your devices
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Replies</h3>
              <p className="text-gray-600">
                AI-generated response suggestions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Loved by Professionals
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.quote}</p>
              </div>
            ))}
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
                  <span>Basic AI Features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Mobile App</span>
                </li>
              </ul>
              <button 
                onClick={navigateToApp}
                className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
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
                  <span>Advanced AI Features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Auto-Pilot Mode</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Priority Support</span>
                </li>
              </ul>
              <button 
                onClick={navigateToApp}
                className="w-full py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50"
              >
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
                  <span>Custom AI Training</span>
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
              <a 
                href="mailto:sales@mailo.com"
                className="block w-full py-2 text-center border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <Mail size={24} />
              <span className="text-xl font-bold">mailo</span>
            </a>
            <div className="flex items-center gap-6">
              <a href="/terms" className="hover:text-blue-400">Terms</a>
              <a href="/privacy" className="hover:text-blue-400">Privacy</a>
              <a href="mailto:support@mailo.com" className="hover:text-blue-400">Contact</a>
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