import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  resumeId: { type: String },
  userId: { type: String, required: true },
  userEmail: { type: String },
  userName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  jobTitle: { type: String },
  phone: { type: String },
  email: { type: String },
  summery: { type: String },
  education: { type: Array }, // You may want to define a sub-schema for education
  experience: { type: Array }, // You may want to define a sub-schema for experience
  skills: { type: Array }, // You may want to define a sub-schema for skills
  themeColor: { type: String },
  locale: { type: String },
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema); 