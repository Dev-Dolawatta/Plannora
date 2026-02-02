import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import EventForm from '../components/EventForm';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Event</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <EventForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
});

export default AddEventScreen;