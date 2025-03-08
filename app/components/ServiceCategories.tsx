// File: components/ServiceCategories.js
export default function ServiceCategories() {
  const categories = [
    { name: "Cleaning", icon: "🧹", color: "bg-indigo-100 " },
    { name: "Laundry", icon: "🧺", color: "bg-yellow-100" },
    { name: "Moving", icon: "🚚", color: "bg-cyan-100" },
    { name: "Gardening", icon: "🌱", color: "bg-green-100" },
    { name: "Repairs", icon: "🔧", color: "bg-red-100" },
  ];

  return (
    <div className="lg:bg-white lg:rounded-lg lg:p-6 lg:shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-indigo-600 lg:text-2xl">
        Services
      </h2>

      {/* Mobile view as scrollable row showing 3 at once */}
      <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex w-full" style={{ minWidth: "min-content" }}>
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col text-grey-800 items-center hover:opacity-80 transition-opacity cursor-pointer mr-6 w-20"
            >
              <div
                className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mb-2`}
              >
                <span>{category.icon}</span>
              </div>
              <span className="text-sm text-center whitespace-nowrap">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view as a grid */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col text-black sm:text-black items-center hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div
              className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center text-3xl mb-2`}
            >
              <span>{category.icon}</span>
            </div>
            <span className="text-base">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
