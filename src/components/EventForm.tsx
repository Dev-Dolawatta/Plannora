import React from 'react';
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface EventFormData {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  initialData?: EventFormData;
  loading?: boolean;
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required'),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
  location: yup.string().required('Location is required'),
});

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, loading }) =>{
  const { control, handleSubmit, formState: { errors } } = useForm<EventFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData||{
      title: '',
      description: '',
      date: new Date(),
      time: '10:00',
      location: '',
    },
  });

 return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={value}
              onChangeText={onChange}
              placeholderTextColor="#9ca3af"
            />
            {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              placeholderTextColor="#9ca3af"
            />
            {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>Date</Text>
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) onChange(selectedDate);
              }}
              style={styles.datePicker}
            />
            {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="time"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={value}
              onChangeText={onChange}
              placeholderTextColor="#9ca3af"
            />
            {errors.time && <Text style={styles.error}>{errors.time.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={value}
              onChangeText={onChange}
              placeholderTextColor="#9ca3af"
            />
            {errors.location && <Text style={styles.error}>{errors.location.message}</Text>}
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Saving...' : 'Save Event'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  datePicker: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default EventForm;