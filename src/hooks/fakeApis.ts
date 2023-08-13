import { useQuery, useQueryClient } from "@tanstack/react-query";

export const fakeApiCallGeneral = () => {
	// Simulate a delay to mimic API response time
	console.log("Api general settings called");
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 1, name: `General Item ${Math.random()}` },
				{ id: 2, name: `General Item ${Math.random()}` },
				{ id: 3, name: `General Item ${Math.random()}` },
			]);
		}, 1000); // Simulate 1 second delay
	});
};

export const fakeApiCallSecurity = () => {
	// Simulate a delay to mimic API response time
	console.log("Api security settings called");
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 1, name: `Security Item ${Math.random()}`, securityLevel: 1 },
				{ id: 2, name: `Security Item ${Math.random()}`, securityLevel: 2 },
				{ id: 3, name: `Security Item ${Math.random()}`, securityLevel: 5 },
			]);
		}, 1000); // Simulate 1 second delay
	});
};

export const useGetGeneral = (enabled: boolean) => {
	return useQuery({
		queryKey: ["general-settings"],
		queryFn: fakeApiCallGeneral,
		staleTime: 20000,
		enabled,
	});
};

export const useGetTwoFactor = (enabled: boolean) => {
	const { data, ...restOfProps } = useQuery({
		queryKey: ["security-settings"],
		queryFn: fakeApiCallSecurity,
		staleTime: 60000,
		enabled,
	});

	return {
		data: (data as any)?.map((item: any) => {
			const secLevel = item.securityLevel++;
			return secLevel;
		}),
		...restOfProps,
	};
};

export const useGetSecurity = (enabled: boolean) => {
	return useQuery({
		queryKey: ["security-settings"],
		queryFn: fakeApiCallSecurity,
		staleTime: 60000,
		enabled,
	});
};
export const usePrefetchSecurity = async () => {
	const queryClient = useQueryClient();
	// The results of this query will be cached like a normal query
	await queryClient.prefetchQuery({
		queryKey: ["security-settings"],
		queryFn: fakeApiCallSecurity,
		staleTime: 60000,
	});
};
