import { Result } from "../models/itunes.model";

export const groupListByArtistName = (songs: Result[]) => {
  return songs?.reduce((groups: any, result) => {
    const { artistName } = result;
    const lowerCaseArtistName = artistName.toLowerCase();
    if (groups[lowerCaseArtistName]) {
      groups[lowerCaseArtistName].push(result);
    } else {
      groups[lowerCaseArtistName] = [result];
    }
    return groups;
  }, {});
};

export const getArtistMatchingInfo = (
  groupedLists: {
    [artistName: string]: Result[];
  },
  searchTerm: string
) => {
  let bestMatchingGroup: {
    matchedArtistName: string;
    songs: Result[] | null;
  } | null = null;
  let enrichedGroups: {
    matchedArtistName: string;
    matchingWords: number;
    nonMatchingWords: number;
    songs: Result[] | null;
    size: number;
  }[] = [];
  let bestMatchingGroupSize = 0;
  const termWords = searchTerm.toLowerCase().trim().split(" ");
  const pattern = new RegExp(termWords.join("|"), "gi");

  for (const artistName in groupedLists) {
    if (groupedLists.hasOwnProperty(artistName)) {
      const resultList = groupedLists[artistName];
      const lowerArtistName = artistName?.trim().toLowerCase();
      const words = lowerArtistName.split(" ").length;
      const matchCount = (lowerArtistName.match(pattern) || []).length;

      enrichedGroups.push({
        songs: resultList,
        matchedArtistName: artistName,
        matchingWords: matchCount,
        nonMatchingWords: words - matchCount,
        size: resultList.length,
      });
    }
  }

  for (const enrichedGroup of enrichedGroups) {
    if (enrichedGroup) {
      if (enrichedGroup.size >= bestMatchingGroupSize) {
        bestMatchingGroupSize = enrichedGroup.matchingWords
          ? enrichedGroup.matchingWords + enrichedGroup.size
          : enrichedGroup.size;
        bestMatchingGroup = {
          songs: enrichedGroup.songs,
          matchedArtistName: enrichedGroup.matchedArtistName,
        };
      }
    }
  }

  return {
    bestMatchingGroup,
  };
};

export const getPageTitle = (searchName: string, songs: Result[]) => {
  let pageTitle = searchName;

  try {
    const groupedLists: { [artistName: string]: Result[] } =
      groupListByArtistName(songs);
    console.log("grouped lists", groupedLists);
    if (groupedLists) {
      const { bestMatchingGroup } = getArtistMatchingInfo(
        groupedLists,
        searchName
      );
      console.log("bestMatchingGroup Group:", bestMatchingGroup);
      const bestMatchingArtistName = bestMatchingGroup?.matchedArtistName;
      if (bestMatchingArtistName) {
        pageTitle = bestMatchingArtistName;
        if (pageTitle.length > 40) {
          pageTitle = `${pageTitle.substring(0, 40)}...`;
        }
      }
    }
  } catch (error) {
    console.error("Error while matching artistName", error);
    pageTitle = searchName;
  }
  return pageTitle;
};
