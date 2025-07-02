import { useEffect, useState } from 'react';
import axios from 'axios';

import pizza from './images/pizza.jpeg';
import burger1 from './images/burger1.jpeg';
import northindian from './images/northindian.jpeg';
import paratha from './images/paratha.jpeg';
import biryani from './images/biryani2.jpeg';
import pasta from './images/pasta.jpeg';
import rolls from './images/rolls.jpeg';


const foodItems = [
  { name: "Pizzas", img: pizza },
  { name: "Burgers", img: burger1 },
  { name: "North Indian", img: northindian },
  { name: "Paratha", img: paratha },
  { name: "Biryani", img: biryani },
  { name: "Pasta", img: pasta },
  { name: "Rolls", img: rolls },
];


type Restaurant = {
  name: string;
  offer: string;
  image: string;  
  rating: string;
  time: string;
};

function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8055/items/Restaurant_category')
      .then((res) => {
        setRestaurants(res.data.data);
      })
      .catch((err) => {
        console.error('Error fetching restaurants:', err);
      });
  }, []);

  return (
    <div className="px-6 py-8 bg-white mt-18">
      {/* Food Categories */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">What's on your mind?</h2>
      <div className="flex flex-wrap justify-start gap-6 mb-12">
        {foodItems.map((item, index) => (
          <div key={index} className="w-44 text-center cursor-pointer">
            <img
              src={item.img}
              alt={item.name}
              className="w-44 h-44 object-cover mx-auto rounded-full border"
            />
            <p className="mt-2 text-lg font-semibold text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Restaurant Cards */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Top restaurant chains in Chandigarh
      </h2>
      <div className="flex flex-wrap gap-6">
        {restaurants.map((rest, index) => (
          <div
            key={index}
            className="w-60 bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
          >
            <div className="relative">
              <img
                src={rest.image}
                alt={rest.name}
                className="w-full h-36 object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent text-white px-3 py-1 text-sm font-bold">
                {rest.offer}
              </div>
            </div>
            <div className="p-3">
              <p className="text-md font-semibold text-gray-800">{rest.name}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <span className="text-green-600 font-semibold">{rest.rating}★</span> • {rest.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
