import dbConnect from '../../../lib/mongodb';
import Complaint from '../../../models/Complaint';
import nodemailer from 'nodemailer';

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const { status } = await req.json();
  try {
    const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
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
      subject: 'Complaint Status Updated',
      text: `Title: ${complaint.title}\nNew Status: ${status}\nDate: ${new Date().toLocaleString()}`,
    });
    return new Response(JSON.stringify(complaint), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  try {
    await Complaint.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
} 