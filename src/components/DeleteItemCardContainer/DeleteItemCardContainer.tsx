import DeleteIcon from "@mui/icons-material/Delete";
import BadgeCard from "../CustomCard/BadgeCard";
import { useState } from "react";
import { CardContainerState } from "../../models/card.model";
import { Dialog, Typography } from "@mui/material";

interface DeleteItemCardContainerState extends CardContainerState {}

const DeleteItemCardContainer = () => {
	console.log("DeleteItemCardContainer render");
	const [state, setState] = useState<DeleteItemCardContainerState>({
		openModal: false,
	});

	return (
		<>
			<BadgeCard
				titleNode={{
					title: "Unnecessary Items",
					// subHeader: "October 14, 2016",
				}}
				cardHeaderSxProps={{ color: "red", fontWeight: "bolder" }}
				badgeContent={<DeleteIcon />}
				badgeAction={() => {
					console.log("item deleted");
					return setState((state) => ({ ...state, openModal: true }));
				}}
				badgeSxProps={{
					background:
						"linear-gradient(195deg, rgb(222, 62, 62), rgb(114, 41, 41))",
				}}
			>
				Things to be deleted...
			</BadgeCard>
			{state.openModal && (
				<Dialog
					open={state.openModal}
					onClose={() => setState((state) => ({ ...state, openModal: false }))}
				>
					<Typography sx={{ p: 5 }} component={"p"}>
						item deleted!
					</Typography>
				</Dialog>
			)}
		</>
	);
};

export default DeleteItemCardContainer;
