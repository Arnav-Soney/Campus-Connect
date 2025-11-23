import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Calendar as CalendarIcon, Building2, MapPin, Users, Clock, Search, Filter, Bell, BellOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const PLACEMENTS = [
  {
    id: 1,
    company: 'Google',
    logo: '🔷',
    role: 'Software Engineer',
    date: '2025-11-25',
    time: '10:00 AM',
    location: 'Auditorium A',
    eligibility: 'CSE, IT - CGPA ≥ 7.5',
    package: '₹25-30 LPA',
    type: 'Full-time',
    reminded: true
  },
  {
    id: 2,
    company: 'Microsoft',
    logo: '🟦',
    role: 'Product Manager',
    date: '2025-11-27',
    time: '2:00 PM',
    location: 'Conference Hall',
    eligibility: 'All Branches - CGPA ≥ 8.0',
    package: '₹28-35 LPA',
    type: 'Full-time',
    reminded: false
  },
  {
    id: 3,
    company: 'Amazon',
    logo: '🟧',
    role: 'SDE-1',
    date: '2025-11-30',
    time: '11:00 AM',
    location: 'Seminar Hall',
    eligibility: 'CSE, ECE - CGPA ≥ 7.0',
    package: '₹22-28 LPA',
    type: 'Full-time',
    reminded: true
  },
  {
    id: 4,
    company: 'Flipkart',
    logo: '🟨',
    role: 'Software Engineer',
    date: '2025-12-02',
    time: '9:00 AM',
    location: 'Auditorium B',
    eligibility: 'CSE, IT - CGPA ≥ 7.0',
    package: '₹18-24 LPA',
    type: 'Full-time',
    reminded: false
  },
  {
    id: 5,
    company: 'Deloitte',
    logo: '🟩',
    role: 'Business Analyst',
    date: '2025-12-05',
    time: '3:00 PM',
    location: 'Room 301',
    eligibility: 'All Branches - CGPA ≥ 6.5',
    package: '₹12-18 LPA',
    type: 'Full-time',
    reminded: false
  },
  {
    id: 6,
    company: 'Adobe',
    logo: '🔴',
    role: 'UI/UX Designer',
    date: '2025-12-08',
    time: '10:30 AM',
    location: 'Design Lab',
    eligibility: 'All Branches - Portfolio Required',
    package: '₹15-20 LPA',
    type: 'Full-time',
    reminded: true
  },
];

export default function PlacementCalendar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterType, setFilterType] = useState('all');
  const [reminders, setReminders] = useState<number[]>(
    PLACEMENTS.filter(p => p.reminded).map(p => p.id)
  );

  const toggleReminder = (id: number) => {
    setReminders(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const filteredPlacements = PLACEMENTS.filter(placement => {
    const matchesSearch = placement.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         placement.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || placement.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const placementsByDate = filteredPlacements.reduce((acc, placement) => {
    const date = placement.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(placement);
    return acc;
  }, {} as Record<string, typeof PLACEMENTS>);

  return (
    <Layout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">Placement Calendar</h1>
          <p className="text-muted-foreground">Stay updated with upcoming placement drives</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="size-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {Object.entries(placementsByDate).map(([date, placements]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    <h3 className="font-medium">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {placements.map((placement) => (
                      <Card key={placement.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{placement.logo}</div>
                              <div>
                                <CardTitle>{placement.company}</CardTitle>
                                <CardDescription>{placement.role}</CardDescription>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleReminder(placement.id)}
                            >
                              {reminders.includes(placement.id) ? (
                                <Bell className="size-4 text-primary" />
                              ) : (
                                <BellOff className="size-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="size-4 text-muted-foreground" />
                            <span>{placement.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="size-4 text-muted-foreground" />
                            <span>{placement.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="size-4 text-muted-foreground" />
                            <span>{placement.eligibility}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <Badge variant="secondary">{placement.package}</Badge>
                            <Badge>{placement.type}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                {selectedDate && placementsByDate[selectedDate.toISOString().split('T')[0]] ? (
                  placementsByDate[selectedDate.toISOString().split('T')[0]].map((placement) => (
                    <Card key={placement.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{placement.logo}</div>
                            <div>
                              <CardTitle>{placement.company}</CardTitle>
                              <CardDescription>{placement.role}</CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleReminder(placement.id)}
                          >
                            {reminders.includes(placement.id) ? (
                              <Bell className="size-4 text-primary" />
                            ) : (
                              <BellOff className="size-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="size-4 text-muted-foreground" />
                          <span>{placement.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="size-4 text-muted-foreground" />
                          <span>{placement.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="size-4 text-muted-foreground" />
                          <span>{placement.eligibility}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <Badge variant="secondary">{placement.package}</Badge>
                          <Badge>{placement.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64">
                      <p className="text-muted-foreground">No placements scheduled for this date</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
