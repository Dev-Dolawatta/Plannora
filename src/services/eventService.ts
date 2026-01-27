import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { Event } from '../types';

export const eventService = {
  //creating 
  async createEvent(event: Omit<Event, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...event,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  //fetching all
  async getEvents(userId: string): Promise<Event[]> {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(
        eventsRef,
        where('userId', '==', userId),
        orderBy('date', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const events: Event[] = [];
      
      querySnapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data(),
        } as Event);
      });
      
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  //updating
  async updateEvent(eventId: string, eventData: Partial<Event>): Promise<void> {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        ...eventData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  //deleting
  async deleteEvent(eventId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'events', eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
};