import { useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ITunesSongApiRequest } from "../models/itunes.model";
import { fetchSongs } from "../services/fetchSongs";

const useGet = ({
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
		staleTime: 60000,
	});
	if (outerData) {
		const { data } = outerData as any;
		return { data, ...restOfProps };
	}
	return { data: outerData, ...restOfProps };
};

export default useGet;
