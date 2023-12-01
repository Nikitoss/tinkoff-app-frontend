export async function getProjectById(projectId: string): Promise<MyHandsomeProject> {
    try {
        return await fetch(`/api/projects/${projectId}`);
    } catch (error) {
        console.error(error)
    }
}

// export async function getProjects(): Promise<MyHandsomeProject>{
//     try {
//         return await fetch(`/api/projects`);
//     } catch(error) {
//         console.error(error)
//     }
// }

// export async function getTaskById(taskId: string): Promise<MyHandsomeProject>{
//     try {
//         return await fetch(`/api/projects/[projectId]/tasks/${taskId}`);
//     } catch(error) {
//         console.error(error)
//     }
// }

// export async function getTasks(): Promise<MyHandsomeProject>{
//     try {
//         return await fetch(`/api/projects/[projectId]/tasks`);
//     } catch(error) {
//         console.error(error)
//     }
// }