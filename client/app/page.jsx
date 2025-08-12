"use client";
import { useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { Messages, Inputs, SignUp } from "@/components";
import { MessageCircle, Sparkles, ChevronRight, Github, Star } from 'lucide-react';
import { io } from "socket.io-client";

const socket = io("https://yapster-5na0b.kinsta.app/");

export default function Home() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(session);
    }
  }, []);

  useEffect(() => {
    socket.on("new_message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });
    return () => socket.off("new_message");
  }, []);

  useEffect(() => {
    socket.on("new_user", (name) => {
      const msg = {
        type: "user",
        content: name,
        user: {
          id: 0,
          name: "",
        },
      };
      setMessages((prevState) => [...prevState, msg]);
    });
    return () => socket.off("new_user");
  }, []);

  // If user is logged in, show chat interface
  if (user) {
    return (
      <HeroUIProvider>
        <div className="relative min-h-screen max-h-screen">
          <Messages messages={messages} id={socket.id} />
          <Inputs socket={socket} name={user} setMessages={setMessages} />
        </div>
      </HeroUIProvider>
    );
  }

  // If showSignUp is true, show SignUp component
  if (showSignUp) {
    return (
      <HeroUIProvider>
        <SignUp setUser={setUser} socket={socket} />
      </HeroUIProvider>
    );
  }

  // Show landing page by default
  return (
    <HeroUIProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-md border-b border-slate-700' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Yapster
                </span>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowSignUp(true)}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setShowSignUp(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-40">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Now with Advanced AI Features</span>
              <ChevronRight className="w-4 h-4 text-blue-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The Future of
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Real-Time Chat
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience lightning-fast messaging with AI-powered features and seamless 
              real-time communication that adapts to your workflow and enhances team productivity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button 
                onClick={() => setShowSignUp(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Start Chatting →
              </button>
              <a 
                href="https://github.com/Animiiexe" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white font-medium transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Demo Preview */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 max-w-2xl mx-auto shadow-2xl">
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-700/50">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-150"></div>
                <span className="text-gray-400 text-sm ml-4">Yapster Chat</span>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg rounded-tl-none max-w-xs">
                    Hey! The AI suggestions are incredible! 🚀
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-slate-600 text-white px-4 py-2 rounded-lg rounded-tr-none max-w-xs">
                    The real-time typing indicators are so smooth!
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold">B</div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm">typing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Why Choose
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                  Yapster?
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Messaging</h3>
                <p className="text-gray-300">Instant delivery with zero-delay communication</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Features</h3>
                <p className="text-gray-300">Smart suggestions and intelligent responses</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
                <p className="text-gray-300">Beautiful interface with smooth animations</p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <button 
                onClick={() => setShowSignUp(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Join Yapster Now →
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Yapster
              </span>
            </div>
            <p className="text-gray-400">
              © 2025 Yapster. All rights reserved. Built for modern teams who demand excellence.
            </p>
          </div>
        </footer>
      </div>
    </HeroUIProvider>
  );
}