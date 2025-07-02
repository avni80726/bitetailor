import { useEffect, useState } from 'react';
import { Button, Input, Textarea, InputWrapper, FileInput, Select, Skeleton } from '@mantine/core';
import axios from 'axios';
import Image1 from "./images/food.jpeg";

function RestaurantCategory() {

  const [file, setFile] = useState<File[]>([]);
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true,
  });
  const [foodList, setFoodList] = useState<{
    id: number;
    name: string;
    category: string;
    description: string;
    price: string;
    image: string;
  }[]>([]);
  const [isLoadingFoodList, setIsLoadingFoodList] = useState<boolean>(false);


  useEffect(() => {
    getFoodList();
  }, []);

  // HANDELR FUNCTIONS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  function handleFileChange(file: File | null) {
    if (file) {
      setFile((prev) => ([...prev, file]))
    }
  };


  // API CALLS
  const handleSubmit = async (e: React.FormEvent) => {
    const fileId = await Promise.all(file.map(async (file) => {
      const formdata = new FormData()
      formdata.append('file', file)
      const res = await axios.post('http://localhost:8055/files', formdata)
      console.log('fileid working')
      return res.data.data.id

    }))

    const payload = {
      ...menuItem,
      image: fileId.join(',')
    }
    console.log(payload)
    if (fileId) {
      axios.post('http://localhost:8055/items/Restaurant_category', payload).then(
        (res) => {
          console.log("data posted", res);
          getFoodList();
        }, (error) => {
          console.log("Error while posting data: ", error?.response);
        })
    }
    console.log('Menu item submitted!');
  };

  const getFoodList = () => {

    setIsLoadingFoodList(true);

    axios.get("http://localhost:8055/items/Restaurant_category").then(
      (response) => {
        console.log("Response for food list: ", response.data?.data);
        setFoodList(response.data?.data);
      }, (error) => {
        console.log("Error while fetching food list: ", error);
      }
    ).finally(() => setIsLoadingFoodList(false));

  };

  return (
    <div
    className="h-screen bg-cover bg-center w-screen"
    style={{
      backgroundImage: `url(${Image1})`, 
    }}
    >
    <div className="grid grid-cols-12 h-screen bg-gray-100 pt-16 w-fit m-auto">
      {/* Left Form Section */}
      <div className="col-span-7 p-10 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add / Edit Menu Item</h2>
        <p className="text-gray-600 mb-6">
          Add details of your dish to be displayed on the platform.
        </p>

        <Input.Wrapper label="Dish Name*" className="mb-4">
          <Input name="name" value={menuItem.name} onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper label="Category (e.g., Main Course, Dessert)*" className="mb-4">
          <Select
            name="category"
            data={[
              { value: 'starter', label: 'Starter' },
              { value: 'main', label: 'Main Course' },
              { value: 'dessert', label: 'Dessert' },
              { value: 'beverage', label: 'Beverage' },
            ]}
            placeholder="Select category"
            value={menuItem.category}
            onChange={(value) =>
              setMenuItem((prev) => ({ ...prev, category: value || '' }))
            }
          />
        </Input.Wrapper>

        <Input.Wrapper label="Price (₹)*" className="mb-4">
          <Input
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            type="number"
          />
        </Input.Wrapper>

        <InputWrapper label="Dish Image (File Upload)*" className="mb-4">
          <FileInput
            name="image"
            onChange={handleFileChange}
            placeholder="Upload image"
            accept="image/*"
          />
        </InputWrapper>

        <InputWrapper label="Description (optional)" className="mb-6">
          <Textarea
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            autosize
            minRows={3}
          />
        </InputWrapper>

        <Button fullWidth onClick={handleSubmit}>
          Save Menu Item
        </Button>
      </div>


      {/* Right Side Info / Preview */}
      <div className="col-span-5 p-10 bg-white overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Your Menu Items</h3>

        {isLoadingFoodList ? (
          <div className="p-3 flex flex-col gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} h={100} radius="md" />
            ))}
          </div>
        ) : foodList.length ? (
          <div className="grid gap-4">
            {foodList.map((food, index) => (
              <div
                key={food.id + "_food_" + index}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <img
                  src={`http://localhost:8055/assets/${food.image}`}
                  alt={food.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{food.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{food.category}</p>
                    {food.description && (
                      <p className="text-sm text-gray-600 mt-1">{food.description}</p>
                    )}
                  </div>
                  <p className="text-md font-semibold text-green-600 mt-2">₹ {food.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No food items found.</p>
        )}
      </div>

    </div>
    </div>
  );
}

export default RestaurantCategory;
