import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  dateSubmitted: { type: Date, default: Date.now }
});

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema); 