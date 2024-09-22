export type ProjectType = {
  _id: string;
  name: string;
  repoLink: string;
  siteLink: string;
  image: string;
  blurb: string;
  tech: string[];
  createdAT: string;
  updatedAT: string;
};

export type ProjectFormType = Omit<ProjectType, 'createdAT' | 'updatedAT'>;
