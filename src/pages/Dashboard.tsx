import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, UtensilsCrossed, ShoppingBag, TrendingUp, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';

const UPCOMING_PLACEMENTS = [
  { id: 1, company: 'Google', date: '2025-11-25', role: 'Software Engineer' },
  { id: 2, company: 'Microsoft', date: '2025-11-27', role: 'Product Manager' },
  { id: 3, company: 'Amazon', date: '2025-11-30', role: 'SDE-1' },
];

const RECENT_LISTINGS = [
  { id: 1, title: 'Programming Books Bundle', price: 500, seller: 'Rahul Kumar' },
  { id: 2, title: 'Study Table & Chair', price: 2000, seller: 'Priya Sharma' },
  { id: 3, title: 'Calculator TI-84', price: 800, seller: 'Amit Patel' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">{user?.hostel}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Upcoming Placements</CardTitle>
              <Calendar className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">12</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Active Listings</CardTitle>
              <ShoppingBag className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">48</div>
              <p className="text-xs text-muted-foreground">In marketplace</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Restaurants Open</CardTitle>
              <UtensilsCrossed className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">5</div>
              <p className="text-xs text-muted-foreground">Available tonight</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Your Activity</CardTitle>
              <TrendingUp className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">8</div>
              <p className="text-xs text-muted-foreground">Actions this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Placements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Placements</CardTitle>
                  <CardDescription>Don't miss these opportunities</CardDescription>
                </div>
                <Link to="/placements">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {UPCOMING_PLACEMENTS.map((placement) => (
                <div key={placement.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{placement.company}</p>
                    <p className="text-sm text-muted-foreground">{placement.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(placement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <Badge variant="secondary" className="mt-1">
                      <Bell className="size-3 mr-1" />
                      Reminder Set
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Marketplace Listings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Marketplace</CardTitle>
                  <CardDescription>Latest items for sale</CardDescription>
                </div>
                <Link to="/marketplace">
                  <Button variant="outline" size="sm">Browse</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {RECENT_LISTINGS.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{listing.title}</p>
                    <p className="text-sm text-muted-foreground">by {listing.seller}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{listing.price}</p>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>What would you like to do?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/food">
                  <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                    <UtensilsCrossed className="size-6" />
                    Order Food
                  </Button>
                </Link>
                <Link to="/marketplace/add">
                  <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                    <ShoppingBag className="size-6" />
                    Sell Item
                  </Button>
                </Link>
                <Link to="/placements">
                  <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                    <Calendar className="size-6" />
                    View Calendar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
