import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useDialog } from "../../providers/DialogProvider";
import BadgeCard from "../CustomCard/BadgeCard";

const BookmarkCardContainer = () => {
	console.log("BookmarkCardContainer render");

	const [openDialog, closeDialog] = useDialog();
	const openNestedDialog = () => {
		openDialog({
			children: (
				<>
					<DialogTitle>Nested Dialog</DialogTitle>
					<DialogContent>Nothing much here</DialogContent>
					<DialogActions>
						<Button color='primary' onClick={() => closeDialog()}>
							Close
						</Button>
					</DialogActions>
				</>
			),
			onClose: undefined,
		});
	};
	return (
		<BadgeCard
			badgeContent={<BookmarkIcon />}
			badgeAction={() =>
				openDialog({
					children: (
						<>
							<DialogTitle>This dialog is opened imperatively</DialogTitle>
							<DialogContent>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
								totam accusamus corporis, aliquid optio accusantium expedita
								nihil illo qui, commodi voluptatibus? Ducimus nesciunt animi,
								nulla rem at obcaecati aperiam eos!
							</DialogContent>
							<DialogActions>
								<Button color='primary' onClick={() => closeDialog()}>
									Close
								</Button>
								<Button color='primary' onClick={() => openNestedDialog()}>
									Another one
								</Button>
							</DialogActions>
						</>
					),
					onClose: undefined,
				})
			}
		>
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
