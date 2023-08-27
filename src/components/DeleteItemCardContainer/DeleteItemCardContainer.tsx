import DeleteIcon from "@mui/icons-material/Delete";
import BadgeCard from "../CustomCard/BadgeCard";
import { useState } from "react";
import { CardContainerState } from "../../models/card.model";
import { Dialog, Divider, Typography } from "@mui/material";
import { itemsToBeDeleted } from "../../data";

interface DeleteItemCardContainerState extends CardContainerState {}

const DeleteItemCardContainer = () => {
	console.log("DeleteItemCardContainer render");
	const [state, setState] = useState<DeleteItemCardContainerState>({
		openModal: false,
		items: itemsToBeDeleted,
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
					return setState((state) => ({
						...state,
						openModal: true,
						items: state.items.splice(0, state.items.length - 1),
					}));
				}}
				badgeSxProps={{
					background:
						"linear-gradient(195deg, rgb(222, 62, 62), rgb(114, 41, 41))",
				}}
			>
				{state.items.map((item: any) => (
					<div key={Math.random()}>
						<div>Name: {item.name}</div>
						<div>Age: {item.age}</div>
						<Divider></Divider>
					</div>
				))}
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
