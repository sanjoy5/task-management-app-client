import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {

    const { data: tasks = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('http://127.0.0.1:5000/tasks')
            return res.json()
        }

    })

    return [tasks, loading, refetch]
};

