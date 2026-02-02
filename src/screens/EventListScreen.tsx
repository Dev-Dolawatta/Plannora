import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';
import { Event } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';


interface Props {
  navigation: any;
}

const EventListScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = async () => {
    if (!user) return;

    try {
      const fetchedEvents = await eventService.getEvents(user.uid);
      setEvents(fetchedEvents);
    } catch (error) {
      Alert.alert('Error', 'Failed to load events');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadEvents();
  };

  const handleEdit = (event: Event) => {
    navigation.navigate('EditEvent', { event });
  };

  const handleDelete = (eventId: string) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await eventService.deleteEvent(eventId);
              setEvents(events.filter(e => e.id !== eventId));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete event');
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return ();
}  