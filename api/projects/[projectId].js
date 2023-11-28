// import { projects } from '../../../data/projects'

// export default function handler(req, res) {
//   const { projectId } = req.query
//   if (req.method === 'GET') {
//     const project = projects.find(project => project.id === parseInt(projectId))
//     res.status(200).json(project)
//   } else if (req.method === 'DELETE') {
//     const deletedproject = projects.find(
//       project => project.id === parseInt(projectId)
//     )
//     const index = projects.findIndex(
//       project => project.id === parseInt(projectId)
//     )
//     projects.splice(index, 1)
//     res.status(200).json(deletedproject)
//   }
// }