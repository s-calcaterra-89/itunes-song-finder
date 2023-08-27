import { Grid } from "@mui/material";

import BookmarkCardContainer from "../components/BookmarkCardContainer/BookmarkCardContainer";
import AddItemCardContainer from "../components/AddItemCardContainer/AddItemCardContainer";
import DeleteItemCardContainer from "../components/DeleteItemCardContainer/DeleteItemCardContainer";

const CardPage = () => {
	return (
		<Grid container sx={{ my: 5, mx: 5 }} rowSpacing={6} columnSpacing={2}>
			<Grid item>
				<BookmarkCardContainer />
			</Grid>
			<Grid item>
				<AddItemCardContainer />
			</Grid>
			<Grid item>
				<DeleteItemCardContainer />
			</Grid>
		</Grid>
	);
};

export default CardPage;
