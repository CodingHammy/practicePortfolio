import { Project } from '../models/project.model.js';
import mongoose from 'mongoose';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log('error fetching projects', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const addNewProject = async (req, res) => {
  const project = req.body;
  if (
    !project.name ||
    !project.repoLink ||
    !project.siteLink ||
    !project.image ||
    !project.blurb ||
    !project.tech
  ) {
    return res
      .status(400)
      .json({ success: false, message: 'please provide all required fields' });
  }
  const newProject = new Project(project);
  try {
    await newProject.save();
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.error(`Error creating new project: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateOneProject = async (req, res) => {
  const { id } = req.params;
  const project = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Project ID' });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, project, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
};

export const deleteOneProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Project ID' });
  }
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Project Deleted' });
  } catch (error) {
    console.log('error deleting project', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
