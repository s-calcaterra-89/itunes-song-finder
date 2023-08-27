import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Grid } from "@mui/material";
import BadgeCard from "../components/CustomCard/BadgeCard";

import DeleteIcon from "@mui/icons-material/Delete";

const CardPage = () => {
	return (
		<Grid container sx={{ my: 5, mx: 5 }} rowSpacing={6} columnSpacing={2}>
			<Grid item>
				<BadgeCard badgeContent={<BookmarkIcon />}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
					iaculis urna quis nibh aliquet, in pretium dui pharetra. Duis quam
					ipsum, mattis et mattis nec, consequat eget metus. Donec fermentum
					sapien vitae placerat faucibus. Donec nulla nisi, tincidunt at diam
					et, ultricies convallis sem. Donec non gravida lorem. Proin ligula
					purus, dictum quis bibendum ut, aliquam facilisis ante. In et risus
					augue. Curabitur malesuada purus sit amet pellentesque fermentum.
					Proin mauris sem, volutpat id viverra sed, suscipit sed dui. Donec
					dictum turpis id tortor vestibulum consectetur. Duis elementum, turpis
					vitae convallis rutrum, orci purus pulvinar turpis, nec accumsan risus
					ligula vel velit. Sed iaculis tortor quis nisi venenatis cursus.
				</BadgeCard>
			</Grid>
			<Grid item>
				<BadgeCard
					titleNode={{
						title: "Necessary Items",
						subHeader: "September 14, 2016",
					}}
					badgeContent={<AddIcon />}
					badgeAction={() => console.log("item added")}
					badgeSxProps={{
						background:
							"linear-gradient(195deg, rgb(2, 137, 38), rgb(25, 192, 36))",
					}}
				>
					Things to be added...
				</BadgeCard>
			</Grid>
			<Grid item>
				<BadgeCard
					titleNode={{
						title: "Unnecessary Items",
						// subHeader: "October 14, 2016",
					}}
					badgeContent={<DeleteIcon />}
					badgeAction={() => console.log("item deleted")}
					badgeSxProps={{
						background:
							"linear-gradient(195deg, rgb(222, 62, 62), rgb(114, 41, 41))",
					}}
				>
					Things to be deleted...
				</BadgeCard>
			</Grid>
		</Grid>
	);
};

export default CardPage;
