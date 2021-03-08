import { Project } from "../models/project.model";

export interface ProjectListing {
    projects: Project[],
    total: number
}