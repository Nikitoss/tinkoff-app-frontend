import { projects } from '../../../data/projects'

export default function handler(req, res) {
    const { projectId } = req.query
    if (req.method === 'GET') {
        const project = projects.find(project => project.id === parseInt(projectId))
        res.status(200).json(project)
    } else if (req.method === 'POST') {
        const newProject = {
          id: 0,
          title: "string",
          authorId: 0,
          createAt: "2023-11-28T17:26:43.670Z"
        }
        projects.push(newProject)
        res.status(201).json(newProject)
    }
}