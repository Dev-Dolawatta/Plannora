import React, { useState } from 'react';

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

    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Event</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <EventForm
          onSubmit={handleSubmit}
          initialData={initialFormData}
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

export default EditEventScreen;