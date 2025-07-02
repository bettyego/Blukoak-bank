import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaMobile, FaChartLine, FaCreditCard, FaUsers, FaLock } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: 'Secure Banking',
      description: 'Bank-level security with 256-bit encryption to protect your financial data.'
    },
    {
      icon: FaMobile,
      title: 'Mobile Banking',
      description: 'Access your accounts anytime, anywhere with our mobile-first platform.'
    },
    {
      icon: FaChartLine,
      title: 'Investment Tools',
      description: 'Grow your wealth with our comprehensive investment and savings options.'
    },
    {
      icon: FaCreditCard,
      title: 'Digital Cards',
      description: 'Instant virtual cards and contactless payments for modern convenience.'
    },
    {
      icon: FaUsers,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with all your banking needs.'
    },
    {
      icon: FaLock,
      title: 'Privacy First',
      description: 'Your financial privacy is our priority with advanced data protection.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Banking
                <span className="text-blue-300"> Reimagined</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Experience the future of banking with BlueOak. Secure, fast, and designed 
                for your modern lifestyle. Join thousands who trust us with their financial future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 text-center"
                >
                  Open Account
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-blue-300 hover:bg-blue-300 hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 text-center"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="hidden lg:block" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Account Balance</h3>
                    <p className="text-2xl font-bold">$12,450.00</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Recent Transaction</h3>
                    <p className="text-sm">Coffee Shop - $4.50</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Savings Goal</h3>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm mt-1">75% to vacation fund</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BlueOak?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with personalized service to deliver 
              an exceptional banking experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join BlueOak Bank today and experience banking that works for you. 
              Open your account in minutes.
            </p>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 inline-block"
            >
              Open Your Account Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
