import { Button, Input, Textarea, InputWrapper, FileInput } from '@mantine/core';
import { useState } from 'react';

function RestaurantCategory() {
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    available: true,
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Menu Item:', menuItem);
    console.log('Selected File:', file);
    alert('Menu item submitted!');
  };

  return (
    <div className="grid grid-cols-12 h-screen bg-gray-100 pt-16">
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
          <Input name="category" value={menuItem.category} onChange={handleChange} />
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
            value={file}
            onChange={setFile}
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
        <h2 className="text-xl font-bold mb-2">Live Preview</h2>
        <p className="text-gray-500 mb-4">Check your entered details below:</p>

        <div className="mb-4">
          <strong>Dish Name:</strong> {menuItem.name}
        </div>
        <div className="mb-4">
          <strong>Category:</strong> {menuItem.category}
        </div>
        <div className="mb-4">
          <strong>Price:</strong> ₹{menuItem.price}
        </div>
        <div className="mb-4">
          <strong>Description:</strong> {menuItem.description}
        </div>

        {file && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Image Preview:</h3>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-48 h-auto rounded border shadow"
            />
            <p className="text-sm mt-2 text-gray-600">
              <strong>Name:</strong> {file.name} <br />
              <strong>Type:</strong> {file.type} <br />
              <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantCategory;
