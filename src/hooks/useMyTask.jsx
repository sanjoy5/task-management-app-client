import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useMyTask = () => {

    const { user, loading } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()

    const { data: myTasks, isLoading: isMyTaskLoading, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${user?.email}`)
            return res.data
        }
    })
    return [myTasks, isMyTaskLoading, refetch]
};

export default useMyTask;