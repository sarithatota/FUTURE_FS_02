const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

// READ
router.get("/", auth, async (req, res) => {
  const leads = await Lead.find().sort({ _id: -1 });
  res.json(leads);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
