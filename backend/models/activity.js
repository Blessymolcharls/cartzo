import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  activity_id: { type: String, required: true },
  todo_description: { type: String, required: true }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
