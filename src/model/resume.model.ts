import mongoose, { Schema, Document } from "mongoose";
import {
  Resume as ResumeInterface,
  Award,
  Certification,
  Education,
  Experience,
  Other,
  Project,
  Skill,
  Social,
  Volunteer,
} from "@/Types/resume.types";

const skillSchema: Schema<Skill> = new Schema({
  category: {
    type: String,
    required: [true, "Skill category is required"],
  },
  skill: [String],
});

const educationSchema: Schema<Education> = new Schema({
  degree: String,
  institute: String,
  cgpa: Number,
  field: String,
  city: String,
  country: String,
  startMonth: Date,
  startYear: Date,
  endMonth: Date,
  endYear: Date,
  currentlyStudying: Boolean,
});

const experienceSchema: Schema<Experience> = new Schema({
  companyName: String,
  jobTitle: String,
  city: String,
  country: String,
  remotePosition: String,
  startMonth: Date,
  startYear: Date,
  endMonth: Date,
  endYear: Date,
  currentlyWorking: Boolean,
  description: String,
  bullets: [String],
});

const projectSchema: Schema<Project> = new Schema({
  title: String,
  link: String,
  organization: String,
  city: String,
  country: String,
  startMonth: Date,
  startYear: Date,
  endMonth: Date,
  endYear: Date,
  currentlyWorking: Boolean,
  bullets: [String],
});

const socialSchema: Schema<Social> = new Schema({
  name: String,
  link: String,
});

const awardSchema: Schema<Award> = new Schema({
  name: String,
  issuer: String,
  date: Date,
  link: String,
  description: String,
});

const certificationSchema: Schema<Certification> = new Schema({
  name: String,
  authority: String,
  date: Date,
  link: String,
});

const volunteerSchema: Schema<Volunteer> = new Schema({
  position: String,
  organization: String,
  location: String,
  startMonth: Date,
  startYear: Date,
  endMonth: Date,
  endYear: Date,
  currentlyWorking: Boolean,
});

const otherSchema: Schema<Other> = new Schema({
  description: String,
  bullets: [String],
});

const resumeSchema: Schema<ResumeInterface> = new Schema(
  {
    resumeName: {
      type: String,
      required: [true, "Resume name is required"],
    },
    fullName: String,
    socials: [socialSchema],
    skills: [skillSchema],
    summary: String,
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    awards: [awardSchema],
    certifications: [certificationSchema],
    volunteering: [volunteerSchema],
    unknownSection: [otherSchema],
  },
  { timestamps: true }
);

const Resume =
  (mongoose.models.Resume as mongoose.Model<ResumeInterface>) ||
  mongoose.model<ResumeInterface>("Resume", resumeSchema);

export default Resume;
