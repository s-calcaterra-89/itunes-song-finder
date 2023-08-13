import { useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ITunesSongApiRequest } from "../models/itunes.model";
import { fetchSongs } from "../services/fetchSongs";

const useGetAlbum = ({
	term,
	entity = "song",
	media = "music",
	limit = 50,
	attribute = "artistTerm",
}: ITunesSongApiRequest) => {
	const { data: outerData, ...restOfProps } = useQuery({
		queryKey: ["songs", term, entity, media, limit, attribute],
		queryFn: () =>
			fetchSongs({
				term,
				entity,
				media,
				limit,
				attribute,
			}),
		staleTime: 10000,
		// refetchInterval: 1000,
		refetchIntervalInBackground: true,
	});
	if (outerData) {
		const { data } = outerData as any;
		return {
			data: data.results.map(
				(item: { collectionName: any }) => item.collectionName
			),
			...restOfProps,
		};
	}
	return { data: outerData, ...restOfProps };
};

export default useGetAlbum;
