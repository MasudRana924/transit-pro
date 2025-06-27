
import { Airplay, Bus, Calendar, Anchor, MapPin, Star, Train } from 'lucide-react';

const features = [
  {
    name: 'All Transportation Modes',
    description: 'Book bus, train, launch, and air tickets all in one platform.',
    icon: Bus,
  },
  {
    name: 'Nationwide Coverage',
    description: 'Travel to and from all 64 districts in Bangladesh.',
    icon: MapPin,
  },
  {
    name: 'Easy Booking',
    description: 'Simple and fast booking process with instant confirmation.',
    icon: Calendar,
  },
  {
    name: 'Trusted Service',
    description: 'Thousands of satisfied travelers rely on our service daily.',
    icon: Star,
  },
];

const transportIcons = [
  { icon: Bus, name: 'Bus' },
  { icon: Train, name: 'Train' },
  { icon: Anchor, name: 'Launch' },
  { icon: Airplay, name: 'Air' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Desh Yatra makes traveling across Bangladesh simple and convenient
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-bangladesh-green text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center space-x-8 md:space-x-16">
          {transportIcons.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-bangladesh-green/10 text-bangladesh-green">
                <item.icon className="h-8 w-8" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;