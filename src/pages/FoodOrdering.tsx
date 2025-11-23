import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ShoppingCart, Plus, Minus, Clock, Star, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { toast } from 'sonner';

const RESTAURANTS = [
  {
    id: 1,
    name: 'Night Canteen',
    description: 'Quick bites and beverages',
    rating: 4.5,
    hours: '8:00 PM - 2:00 AM',
    categories: ['Snacks', 'Beverages', 'Fast Food'],
    menu: [
      { id: 101, name: 'Veg Sandwich', price: 40, category: 'Snacks', veg: true },
      { id: 102, name: 'Cheese Maggi', price: 50, category: 'Snacks', veg: true },
      { id: 103, name: 'Samosa (2 pcs)', price: 20, category: 'Snacks', veg: true },
      { id: 104, name: 'Tea', price: 15, category: 'Beverages', veg: true },
      { id: 105, name: 'Cold Coffee', price: 60, category: 'Beverages', veg: true },
    ]
  },
  {
    id: 2,
    name: 'Dominos Express',
    description: 'Pizza & Italian',
    rating: 4.3,
    hours: '7:00 PM - 1:00 AM',
    categories: ['Pizza', 'Pasta'],
    menu: [
      { id: 201, name: 'Margherita Pizza', price: 199, category: 'Pizza', veg: true },
      { id: 202, name: 'Peppy Paneer Pizza', price: 249, category: 'Pizza', veg: true },
      { id: 203, name: 'Chicken Dominator', price: 399, category: 'Pizza', veg: false },
      { id: 204, name: 'Pasta Italiana', price: 149, category: 'Pasta', veg: true },
    ]
  },
  {
    id: 3,
    name: 'Cafe Coffee Day',
    description: 'Coffee & Desserts',
    rating: 4.6,
    hours: '6:00 PM - 12:00 AM',
    categories: ['Coffee', 'Desserts'],
    menu: [
      { id: 301, name: 'Cappuccino', price: 120, category: 'Coffee', veg: true },
      { id: 302, name: 'Cafe Latte', price: 130, category: 'Coffee', veg: true },
      { id: 303, name: 'Chocolate Pastry', price: 100, category: 'Desserts', veg: true },
      { id: 304, name: 'Brownie with Ice Cream', price: 150, category: 'Desserts', veg: true },
    ]
  },
  {
    id: 4,
    name: 'Biryani House',
    description: 'Authentic Biryani & Curries',
    rating: 4.7,
    hours: '8:00 PM - 1:30 AM',
    categories: ['Biryani', 'Curry'],
    menu: [
      { id: 401, name: 'Veg Biryani', price: 140, category: 'Biryani', veg: true },
      { id: 402, name: 'Chicken Biryani', price: 180, category: 'Biryani', veg: false },
      { id: 403, name: 'Paneer Butter Masala', price: 160, category: 'Curry', veg: true },
      { id: 404, name: 'Dal Makhani', price: 120, category: 'Curry', veg: true },
    ]
  },
];

interface CartItem {
  restaurantId: number;
  item: typeof RESTAURANTS[0]['menu'][0];
  quantity: number;
}

export default function FoodOrdering() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addToCart = (item: typeof RESTAURANTS[0]['menu'][0]) => {
    setCart(prev => {
      const existing = prev.find(
        ci => ci.item.id === item.id && ci.restaurantId === selectedRestaurant.id
      );
      if (existing) {
        return prev.map(ci =>
          ci.item.id === item.id && ci.restaurantId === selectedRestaurant.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { restaurantId: selectedRestaurant.id, item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(ci =>
          ci.item.id === itemId ? { ...ci, quantity: ci.quantity + delta } : ci
        )
        .filter(ci => ci.quantity > 0)
    );
  };

  const getCartQuantity = (itemId: number) => {
    const item = cart.find(ci => ci.item.id === itemId);
    return item ? item.quantity : 0;
  };

  const cartTotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  const filteredMenu = selectedCategory === 'all'
    ? selectedRestaurant.menu
    : selectedRestaurant.menu.filter(item => item.category === selectedCategory);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    toast.success('Order placed successfully!');
    setCart([]);
  };

  return (
    <Layout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">Night Food Ordering</h1>
          <p className="text-muted-foreground">Order from restaurants open late night</p>
        </div>

        {/* Restaurant Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {RESTAURANTS.map(restaurant => (
            <Card
              key={restaurant.id}
              className={`cursor-pointer transition-all ${
                selectedRestaurant.id === restaurant.id
                  ? 'ring-2 ring-primary'
                  : 'hover:shadow-md'
              }`}
              onClick={() => {
                setSelectedRestaurant(restaurant);
                setSelectedCategory('all');
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-4" />
                    <span className="text-xs">Open</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{restaurant.hours}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Menu */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{selectedRestaurant.name} Menu</CardTitle>
                <CardDescription>Select items to add to your cart</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {selectedRestaurant.categories.map(category => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="space-y-3">
                    {filteredMenu.map(item => {
                      const quantity = getCartQuantity(item.id);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{item.name}</p>
                              <Badge variant={item.veg ? 'secondary' : 'destructive'} className="text-xs">
                                {item.veg ? 'VEG' : 'NON-VEG'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">₹{item.price}</p>
                          </div>
                          {quantity > 0 ? (
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="size-8"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="size-4" />
                              </Button>
                              <span className="w-8 text-center">{quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="size-8"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="size-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" onClick={() => addToCart(item)}>
                              <Plus className="size-4 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Cart - Desktop */}
          <div className="hidden lg:block">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="size-5" />
                  Your Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                      {cart.map((ci, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex-1">
                            <p className="font-medium">{ci.item.name}</p>
                            <p className="text-muted-foreground">
                              ₹{ci.item.price} × {ci.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">₹{ci.item.price * ci.quantity}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-6"
                              onClick={() => updateQuantity(ci.item.id, -ci.quantity)}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span className="text-xl">₹{cartTotal}</span>
                      </div>
                      <Button className="w-full" onClick={handlePlaceOrder}>
                        Place Order
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cart - Mobile */}
          <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-background border-t">
            <Sheet>
              <SheetTrigger asChild>
                <button className="w-full h-11 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 inline-flex items-center justify-center gap-2">
                  <ShoppingCart className="size-5" />
                  View Cart ({cart.length}) - ₹{cartTotal}
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                        {cart.map((ci, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium">{ci.item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ₹{ci.item.price} × {ci.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">₹{ci.item.price * ci.quantity}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="size-8"
                                onClick={() => updateQuantity(ci.item.id, -ci.quantity)}
                              >
                                <X className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex items-center justify-between text-lg">
                          <span>Total</span>
                          <span className="font-semibold">₹{cartTotal}</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                          Place Order
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </Layout>
  );
}