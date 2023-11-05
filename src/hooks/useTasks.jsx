import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {

    const { data: tasks = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('https://task-management-app-server-eight.vercel.app/tasks')
            return res.json()
        }

    })

    return [tasks, loading, refetch]
};

