import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: followUnfollow, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          method: "POST",
        });
        if (!res.ok) {
          throw new Error("Failed to follow user");
        }

        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
    onSuccess: (data) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]).then(() => {
        toast.success("Followed successfully");
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { followUnfollow, isPending };
};

export default useFollow;
