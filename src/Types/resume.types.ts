import mongoose, { Schema, Document } from "mongoose";

export interface Social extends Document {
  name: String;
  link: String;
}

export interface Education extends Document {
  degree: String;
  institute: String;
  cgpa: Number;
  field: String;
  city: String;
  country: String;
  startMonth: Date;
  startYear: Date;
  endMonth: Date;
  endYear: Date;
  currentlyStudying: Boolean;
}

export interface Skill extends Document {
  category: String;
  skills: [String];
}

export interface Experience extends Document {
  companyName: String;
  jobTitle: String;
  city: String;
  country: String;
  remotePosition: String;
  startMonth: Date;
  startYear: Date;
  endMonth: Date;
  endYear: Date;
  currentlyWorking: Boolean;
  description: String;
  bullets: [String];
}

export interface Project extends Document {
  title: String;
  link: String;
  organization: String;
  city: String;
  country: String;
  startMonth: Date;
  startYear: Date;
  endMonth: Date;
  endYear: Date;
  currentlyWorking: Boolean;
  bullets: [String];
}

export interface Award extends Document {
  name: String;
  issuer: String;
  date: Date;
  link: String;
  description: String;
}

export interface Certification extends Document {
  name: String;
  authority: String;
  date: Date;
  link: String;
}

export interface Volunteer extends Document {
  position: String;
  organization: String;
  location: String;
  startMonth: Date;
  startYear: Date;
  endMonth: Date;
  endYear: Date;
  currentlyWorking: Boolean;
}

export interface Other extends Document {
  description: String;
  bullets: [String];
}

export interface Resume extends Document {
  fullName: String;
  socials: Social[];
  summary: String;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  awards: Award[];
  certifications: Certification[];
  volunteering: Volunteer[];
  unknownSection: Other[];
}
