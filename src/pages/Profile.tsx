import { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Edit2, Save, ShoppingBag, Calendar, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';

const MY_LISTINGS = [
  { id: 1, title: 'Programming Books Bundle', price: 500, status: 'Active', views: 45 },
  { id: 2, title: 'Old Laptop Charger', price: 300, status: 'Sold', views: 23 },
];

const MY_ORDERS = [
  { id: 1, restaurant: 'Night Canteen', items: 'Maggi, Tea', total: 65, date: '2025-11-22', status: 'Delivered' },
  { id: 2, restaurant: 'Dominos Express', items: 'Margherita Pizza', total: 199, date: '2025-11-20', status: 'Delivered' },
];

const PLACEMENT_REMINDERS = [
  { id: 1, company: 'Google', date: '2025-11-25', role: 'Software Engineer' },
  { id: 2, company: 'Amazon', date: '2025-11-30', role: 'SDE-1' },
];

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    hostel: user?.hostel || ''
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <Layout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="size-24">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl mb-1">{user?.name}</h1>
                  <p className="text-muted-foreground mb-4">{user?.hostel}</p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Active Listings:</span>
                      <span className="ml-2 font-medium">1</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Orders:</span>
                      <span className="ml-2 font-medium">2</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reminders:</span>
                      <span className="ml-2 font-medium">2</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="size-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="size-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostel">Hostel</Label>
                  <Input
                    id="hostel"
                    value={formData.hostel}
                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Tabs */}
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="listings">
                <ShoppingBag className="size-4 mr-2" />
                My Listings
              </TabsTrigger>
              <TabsTrigger value="orders">
                <UtensilsCrossed className="size-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="placements">
                <Calendar className="size-4 mr-2" />
                Reminders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <CardTitle>My Marketplace Listings</CardTitle>
                  <CardDescription>Items you've listed for sale</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MY_LISTINGS.map(listing => (
                      <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{listing.title}</p>
                          <p className="text-sm text-muted-foreground">₹{listing.price} • {listing.views} views</p>
                        </div>
                        <Badge variant={listing.status === 'Active' ? 'default' : 'secondary'}>
                          {listing.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Food Order History</CardTitle>
                  <CardDescription>Your past orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MY_ORDERS.map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{order.restaurant}</p>
                          <p className="text-sm text-muted-foreground">{order.items}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{order.total}</p>
                          <Badge variant="secondary" className="mt-1">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="placements">
              <Card>
                <CardHeader>
                  <CardTitle>Placement Reminders</CardTitle>
                  <CardDescription>Drives you've set reminders for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {PLACEMENT_REMINDERS.map(reminder => (
                      <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{reminder.company}</p>
                          <p className="text-sm text-muted-foreground">{reminder.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            {new Date(reminder.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
