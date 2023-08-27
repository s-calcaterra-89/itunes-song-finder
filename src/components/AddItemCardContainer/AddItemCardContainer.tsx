import AddIcon from "@mui/icons-material/Add";
import { Dialog, Divider, Typography } from "@mui/material";
import { useReducer } from "react";
import { items } from "../../data";
import { cardReducer } from "../../reducers/cardReducer";
import BadgeCard from "../CustomCard/BadgeCard";
import { useDialog } from "../../providers/DialogProvider";

const AddItemCardContainer = () => {
	console.log("AddItemCardContainer render");

	const [state, dispatch] = useReducer(cardReducer, {
		items: items,
	});

	const { openDialog, closeDialog } = useDialog();

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
					dispatch({
						type: "add_item",
						nextItem: {
							name: "Paperoga",
							age: 80,
						},
					});
					openDialog({
						onClose: closeDialog,
						children: (
							<Typography sx={{ p: 5 }} component={"p"}>
								item added!
							</Typography>
						),
					});
				}}
				badgeSxProps={{
					background:
						"linear-gradient(195deg, rgb(2, 137, 38), rgb(25, 192, 36))",
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
					onClose={() => dispatch({ type: "close_modal" })}
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
