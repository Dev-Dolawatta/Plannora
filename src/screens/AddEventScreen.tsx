import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';
import { Alert } from 'react-native';
interface Props {
  navigation: any;
}

const AddEventScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    if (!user) return;

    setLoading(true);

    try {
      const eventData = {
        ...data,
        date: data.date.toISOString(),
        userId: user.uid,
      };

      await eventService.createEvent(eventData);
      Alert.alert('Success', 'Event created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return ()
}  