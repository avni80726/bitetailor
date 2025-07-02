import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IceCream, PlusCircle, Utensils } from 'lucide-react';
import alloCurry from './images/allo-curry.jpeg';
import alloKorma from './images/allo-korma.jpeg';
import dumAllo from './images/sipcy-dumallo.jpeg';
import doupi from './images/doupi.jpeg';
import soup from './images/soup.jpeg';
import burger from './images/burger.jpeg';
import iceCream from './images/ice-cream.jpeg';
import cocktail from './images/cocktail.jpeg';

const foodItems = [
  { id: 1, name: 'Tandoori Aloo Masala', img: alloCurry },
  { id: 2, name: 'Masala Aloo Korma', img: alloKorma },
  { id: 3, name: 'Spicy Dum Aloo', img: dumAllo },
  { id: 4, name: 'Doupi', img: doupi },
  { id: 5, name: 'Soup', img: soup },
  { id: 6, name: 'Burger', img: burger },
  { id: 7, name: 'IceCream', img: iceCream },
  { id: 8, name: 'Cocktails', img: cocktail },
];

function RestaurantDashboard() {
  const navigate = useNavigate();

  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-500 to-pink-500 px-6 py-10 mt-20">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/resdetails')}
          className="flex items-center gap-2 bg-white shadow-md hover:bg-orange-100 transition px-6 py-3 rounded-full text-orange-600 font-semibold border border-orange-300"
        >
          <PlusCircle className="w-5 h-5" /> Add Restaurant
        </button>

        <h1 className="text-3xl font-bold text-orange-700">Restaurant Dashboard</h1>

        <button
          onClick={() => navigate('/rescategory')}
          className="flex items-center gap-2 bg-white shadow-md hover:bg-orange-100 transition px-6 py-3 rounded-full text-orange-600 font-semibold border border-orange-300"
        >
          <Utensils className="w-5 h-5" /> Add Food
        </button>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-orange-700">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Delicious and spicy</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default RestaurantDashboard;
