import dbConnect from '../../lib/mongodb';
import Complaint from '../../models/Complaint';
import nodemailer from 'nodemailer';

export async function POST(req) {
  await dbConnect();
  const { title, description, category, priority } = await req.json();
  // Validation: all fields must be present and non-empty
  if (!title || !description || !category || !priority) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }
  try {
    const complaint = await Complaint.create({ title, description, category, priority });
    // Email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Complaint Submitted',
      text: `Title: ${title}\nCategory: ${category}\nPriority: ${priority}\nDescription: ${description}`,
    });
    return new Response(JSON.stringify(complaint), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const complaints = await Complaint.find({});
  return new Response(JSON.stringify(complaints), { status: 200 });
} 