const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// create
router.post('/', async (req, res) => {
  try {
    const { title, url, description, tags } = req.body;
    if (!title || !url) return res.status(400).json({ message: 'title and url required' });
    const bm = new Bookmark({ user: req.user._id, title, url, description, tags });
    await bm.save();
    res.json(bm);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// list with optional search & tag filter
router.get('/', async (req, res) => {
  try {
    const q = req.query.q || '';
    const tag = req.query.tag;
    const filter = { user: req.user._id };
    if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }];
    if (tag) filter.tags = tag;
    const items = await Bookmark.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// update
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, description, tags } = req.body;
    const bm = await Bookmark.findOneAndUpdate({ _id: id, user: req.user._id }, { title, url, description, tags, updatedAt: Date.now() }, { new: true });
    if (!bm) return res.status(404).json({ message: 'Not found' });
    res.json(bm);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bm = await Bookmark.findOneAndDelete({ _id: id, user: req.user._id });
    if (!bm) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
