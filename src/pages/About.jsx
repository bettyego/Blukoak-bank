import React from 'react';
import { FaUsers, FaGlobe, FaAward, FaHandshake } from 'react-icons/fa';

const About = () => {
  const stats = [
    { number: '500K+', label: 'Happy Customers' },
    { number: '$2.5B+', label: 'Assets Under Management' },
    { number: '15+', label: 'Years of Excellence' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  const values = [
    {
      icon: FaUsers,
      title: 'Customer First',
      description: 'Every decision we make is centered around providing the best experience for our customers.'
    },
    {
      icon: FaGlobe,
      title: 'Innovation',
      description: 'We continuously evolve our technology to stay ahead of the curve in digital banking.'
    },
    {
      icon: FaAward,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service delivery and customer interactions.'
    },
    {
      icon: FaHandshake,
      title: 'Trust',
      description: 'Building lasting relationships through transparency, security, and reliable service.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About BlueOak Bank
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Founded on the principles of innovation, security, and customer-centricity, 
              BlueOak Bank is revolutionizing the way people think about banking.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  BlueOak Bank was born from a simple vision: to make banking accessible, 
                  secure, and enjoyable for everyone. Founded in 2009 by a team of financial 
                  experts and technology innovators, we set out to challenge the traditional 
                  banking model.
                </p>
                <p>
                  Over the years, we've grown from a small startup to a trusted financial 
                  institution serving over 500,000 customers worldwide. Our commitment to 
                  innovation has led us to develop cutting-edge digital banking solutions 
                  that put our customers first.
                </p>
                <p>
                  Today, BlueOak Bank continues to lead the industry in digital transformation, 
                  offering a comprehensive suite of financial services designed for the modern world.
                </p>
              </div>
            </div>
            <div className="hidden lg:block" data-aos="fade-left">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-blue-100 mb-6">
                  To empower individuals and businesses with innovative financial solutions 
                  that simplify their lives and help them achieve their goals.
                </p>
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <p className="text-blue-100">
                  To be the world's most trusted and innovative digital bank, setting 
                  new standards for customer experience and financial technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we serve our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the experienced professionals leading BlueOak Bank into the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Chief Executive Officer', experience: '15+ years in fintech' },
              { name: 'Michael Chen', role: 'Chief Technology Officer', experience: '12+ years in banking tech' },
              { name: 'Emily Rodriguez', role: 'Chief Financial Officer', experience: '18+ years in finance' }
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-sm"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
