import { Dialog } from "@mui/material";
import { forwardRef } from "react";
import { DialogContainerProps } from "../../providers/DialogProvider";

const DialogContainer = forwardRef((props: DialogContainerProps, ref) => {
	console.log("DialogContainer render", props);
	const { children, open, onClose } = props;

	return (
		<Dialog open={open} onClose={onClose}>
			{children}
		</Dialog>
	);
});

export default DialogContainer;
