import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, loading }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<EventFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: '',
      description: '',
      date: new Date(),
      time: '10:00',
      location: '',
    },
  });

  return ()
}