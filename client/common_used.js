// use Query

const { isLoading, error, data } = useQuery({
  queryKey: "userId",
  queryFn: () => NewRequest(`users/${UserId}`).then((res) => res.data),
});

// use Mutation
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (newReview) => NewRequest.post("/reviews", newReview),
  onSuccess: () => {
    queryClient.invalidateQueries("reviews");
  },
  onError: (error) => {
    setError(error.response.data);
  },
});
