import React, { useState } from 'react';

import { eventService } from '../services/eventService';
import { Alert } from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

const EditEventScreen: React.FC<Props> = ({ navigation, route }) => {
  const { event } = route.params;
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    title: event.title,
    description: event.description,
    date: new Date(event.date),
    time: event.time,
    location: event.location,
  };

  const handleSubmit = async (data: any) => {
    if (!event.id) return;

    setLoading(true);

    try {
      const eventData = {
        ...data,
        date: data.date.toISOString(),
      };

      await eventService.updateEvent(event.id, eventData);
      Alert.alert('Success', 'Event updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return ()
}  