const asyncHandler = require('express-async-handler');
const Lead = require('../models/Lead');
const { sendLeadNotifications } = require('../services/emailService');

// POST /api/leads
const createLead = asyncHandler(async (req, res) => {
  const {
    fullName,
    phone,
    email,
    address,
    service,
    message,
    preferredContactMethod,
    preferredContactTime,
  } = req.body;

  const lead = await Lead.create({
    fullName,
    phone,
    email,
    address,
    service,
    message,
    preferredContactMethod,
    preferredContactTime,
  });

  sendLeadNotifications(lead).catch((err) =>
    console.error('Failed to send lead notification emails:', err.message)
  );

  res.status(201).json({
    success: true,
    message: 'Thanks for contacting Nova Hardscapes. We will be in touch shortly.',
    data: lead,
  });
});

// GET /api/leads (admin)
const getLeads = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: leads.length, data: leads });
});

// GET /api/leads/:id (admin)
const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }
  res.json({ success: true, data: lead });
});

// PUT /api/leads/:id (admin)
const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  const { status, note } = req.body;
  if (status) lead.status = status;
  if (note) lead.notes.push({ text: note });

  await lead.save();
  res.json({ success: true, data: lead });
});

// DELETE /api/leads/:id (admin)
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }
  await lead.deleteOne();
  res.json({ success: true, message: 'Lead deleted' });
});

// GET /api/leads/stats (admin)
const getLeadStats = asyncHandler(async (req, res) => {
  const total = await Lead.countDocuments();
  const newLeads = await Lead.countDocuments({ status: 'New' });
  res.json({ success: true, data: { total, newLeads } });
});

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead, getLeadStats };
