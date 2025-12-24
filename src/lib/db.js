import clientPromise from './mongodb';

export async function getDatabase() {
  const client = await clientPromise;
  return client.db('care-xyz');
}

export async function getCollection(collectionName) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

// User related functions
export async function createUser(userData) {
  const users = await getCollection('users');
  const result = await users.insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result;
}

export async function findUserByEmail(email) {
  const users = await getCollection('users');
  return await users.findOne({ email });
}

export async function findUserByNID(nid) {
  const users = await getCollection('users');
  return await users.findOne({ nid });
}

// Service related functions
export async function getAllServices() {
  const services = await getCollection('services');
  return await services.find({}).toArray();
}

export async function getServiceById(serviceId) {
  const services = await getCollection('services');
  const { ObjectId } = require('mongodb');
  
  if (!ObjectId.isValid(serviceId)) {
    return null;
  }
  
  return await services.findOne({ _id: new ObjectId(serviceId) });
}

// Booking related functions
export async function createBooking(bookingData) {
  const bookings = await getCollection('bookings');
  const result = await bookings.insertOne({
    ...bookingData,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result;
}

export async function getBookingsByUserId(userId) {
  const bookings = await getCollection('bookings');
  return await bookings.find({ userId }).sort({ createdAt: -1 }).toArray();
}

export async function getBookingById(bookingId) {
  const bookings = await getCollection('bookings');
  const { ObjectId } = require('mongodb');
  
  if (!ObjectId.isValid(bookingId)) {
    return null;
  }
  
  return await bookings.findOne({ _id: new ObjectId(bookingId) });
}

export async function updateBookingStatus(bookingId, status) {
  const bookings = await getCollection('bookings');
  const { ObjectId } = require('mongodb');
  
  return await bookings.updateOne(
    { _id: new ObjectId(bookingId) },
    { 
      $set: { 
        status, 
        updatedAt: new Date() 
      } 
    }
  );
}

export async function cancelBooking(bookingId) {
  return await updateBookingStatus(bookingId, 'Cancelled');
}