import BadgeCard from "../CustomCard/BadgeCard";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const BookmarkCardContainer = () => {
	console.log("BookmarkCardContainer render");

	return (
		<BadgeCard badgeContent={<BookmarkIcon />}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis
			urna quis nibh aliquet, in pretium dui pharetra. Duis quam ipsum, mattis
			et mattis nec, consequat eget metus. Donec fermentum sapien vitae placerat
			faucibus. Donec nulla nisi, tincidunt at diam et, ultricies convallis sem.
			Donec non gravida lorem. Proin ligula purus, dictum quis bibendum ut,
			aliquam facilisis ante. In et risus augue. Curabitur malesuada purus sit
			amet pellentesque fermentum. Proin mauris sem, volutpat id viverra sed,
			suscipit sed dui. Donec dictum turpis id tortor vestibulum consectetur.
			Duis elementum, turpis vitae convallis rutrum, orci purus pulvinar turpis,
			nec accumsan risus ligula vel velit. Sed iaculis tortor quis nisi
			venenatis cursus.
		</BadgeCard>
	);
};

export default BookmarkCardContainer;
