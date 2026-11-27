export interface IProfData {
  profName: string; // Prof. XYZ
  role?: string; // Dept. of Whatever faculty
  rating: number; // 0.0-5.0
  reviews: string[];
  description?: string;
  schedule: string; // Mon-Wed 9:00 AM - 5:00 PM
}
export interface ICourseResource {
  title: string;
  description: string;
  link?: string;
}
export interface ICourseData {
  name: string;
  prof: IProfData;
  description: string;
  resources: ICourseResource[];
}
