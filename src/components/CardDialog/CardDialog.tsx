import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

const CardDialog = ({
	title,
	onClose,
	children,
}: {
	title?: string;
	onClose: any;
	children?: any;
}) => {
	return (
		<>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={onClose}>
					Close
				</Button>
			</DialogActions>
		</>
	);
};

export default CardDialog;
