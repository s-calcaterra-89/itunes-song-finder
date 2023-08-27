import AddIcon from "@mui/icons-material/Add";
import BadgeCard from "../CustomCard/BadgeCard";
import { useState } from "react";
import { CardContainerState } from "../../models/card.model";
import { Dialog, Typography } from "@mui/material";

interface AddItemCardContainerState extends CardContainerState {}

const AddItemCardContainer = () => {
	console.log("AddItemCardContainer render");
	const [state, setState] = useState<AddItemCardContainerState>({
		openModal: false,
	});

	return (
		<>
			<BadgeCard
				titleNode={{
					title: "Necessary Items",
					subHeader: "September 14, 2016",
				}}
				badgeContent={<AddIcon />}
				badgeAction={() => {
					console.log("item added");
					return setState((state) => ({ ...state, openModal: true }));
				}}
				badgeSxProps={{
					background:
						"linear-gradient(195deg, rgb(2, 137, 38), rgb(25, 192, 36))",
				}}
			>
				Things to be added...
			</BadgeCard>
			{state.openModal && (
				<Dialog
					open={state.openModal}
					onClose={() => setState((state) => ({ ...state, openModal: false }))}
				>
					<Typography sx={{ p: 5 }} component={"p"}>
						item added!
					</Typography>
				</Dialog>
			)}
		</>
	);
};

export default AddItemCardContainer;
