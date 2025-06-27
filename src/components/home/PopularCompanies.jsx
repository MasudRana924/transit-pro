
const companies = [
  {
    name: 'Green Line',
    type: 'Bus',
    logo: 'https://i.ibb.co/nkZbPsT/greenline.png',
  },
  {
    name: 'Hanif Paribahan',
    type: 'Bus',
    logo: 'https://i.ibb.co/5B40MXc/hanif.png',
  },
  {
    name: 'Ena Transport',
    type: 'Bus',
    logo: 'https://i.ibb.co/QFQz4Gp/ena.png',
  },
  {
    name: 'Bangladesh Railway',
    type: 'Train',
    logo: 'https://i.ibb.co/KLv7ZVk/bangladesh-railway.png',
  },
  {
    name: 'Biman Bangladesh',
    type: 'Air',
    logo: 'https://i.ibb.co/8DVc8nL/biman.png',
  },
  {
    name: 'US-Bangla Airlines',
    type: 'Air',
    logo: 'https://i.ibb.co/NKKzXFh/us-bangla.png',
  },
  {
    name: 'BIWTC',
    type: 'Launch',
    logo: 'https://i.ibb.co/xfc5X0J/biwtc.png',
  },
  {
    name: 'Sundarban Launch',
    type: 'Launch',
    logo: 'https://i.ibb.co/MRVxwG9/sundarban.png',
  },
];

const PopularCompanies = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popular Companies</h2>
          <p className="mt-4 text-lg text-gray-600">
            We partner with trusted transport providers across Bangladesh
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-16 object-contain mb-4"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400">
                  {company.name[0]}
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900">{company.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{company.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;