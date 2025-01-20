const express = require('express');
const Project = require('../models/project');
const authMiddleware = require('../middlewear/auth');
const roleMiddleware = require('../middlewear/role');

const router = express.Router();

router.post('/project', authMiddleware, roleMiddleware('student'), async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = new Project({ title, description, studentId: req.user.id });
    await project.save();
    res.status(201).json({ message: 'Project created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/get', authMiddleware, async (req, res) => {
  try {
    const projects =
      req.user.role === 'student'
        ? await Project.find({ studentId: req.user.id })
        : await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getby:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (req.user.role === 'student' && project.studentId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, roleMiddleware('supervisor'), async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated successfully', project });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, roleMiddleware('supervisor'), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
