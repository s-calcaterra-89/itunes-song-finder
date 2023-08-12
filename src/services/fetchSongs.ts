import { SONG_API_URL } from "../constants/itunes";
import { ITunesSongApiRequest } from "../models/itunes.model";
import apiManager from "./apiManager";

export const fetchSongs = async ({
	term,
	entity = "song",
	media = "music",
	limit = 50,
	attribute = "artistTerm",
}: ITunesSongApiRequest) => {
	const searchTerm = (term || "").trim();
	if (searchTerm === "") return;
	try {
		return apiManager.get(SONG_API_URL, {
			params: {
				entity,
				media,
				limit,
				term: searchTerm,
				attribute,
			},
		});
	} catch (error) {
		// toast.error(`Oops something went wrong... Please try again.`);
	}
};
