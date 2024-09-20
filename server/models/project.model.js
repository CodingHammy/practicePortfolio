import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    repoLink: {
      type: String,
      required: true,
    },
    siteLink: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    blurb: {
      type: String,
      required: true,
    },
    tech: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = mongoose.model('Project', projectSchema);
