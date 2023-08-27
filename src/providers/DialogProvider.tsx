import { createContext, useContext, useRef, useState } from "react";
import DialogContainer from "../components/DialogContainer/DialogContainer";
import { ClickAwayListener } from "@mui/material";

type ProviderContext = readonly [(option: DialogOption) => void, () => void];

const EMPTY_FUNC = () => {};

const DialogContext = createContext<ProviderContext>([EMPTY_FUNC, EMPTY_FUNC]);
export type DialogParams = {
	children: React.ReactNode;
	open: boolean;
	onClose: any;
};
export type DialogOption = Omit<DialogParams, "open">;
export type DialogContainerProps = DialogParams & {
	onClose: () => void;
};

export default function DialogProvider({ children }: any) {
	const [dialogs, setDialogs] = useState<DialogParams[]>([]);

	const openDialog = (option: DialogOption) => {
		const dialog: DialogParams = { ...option, open: true };
		setDialogs((dialogs) => [...dialogs, dialog]);
	};

	const closeDialog = () => {
		setDialogs((dialogs) => {
			const latestDialog = dialogs.pop();
			if (!latestDialog) return dialogs;
			if (latestDialog.onClose) latestDialog.onClose();
			return [...dialogs];
		});
	};
	const contextValue = useRef([openDialog, closeDialog] as const);
	return (
		<DialogContext.Provider value={contextValue.current}>
			{children}
			{dialogs.map((dialog, i) => {
				return (
					<ClickAwayListener key={i} onClickAway={closeDialog}>
						<DialogContainer key={i} {...dialog} onClose={closeDialog} />
					</ClickAwayListener>
				);
			})}
		</DialogContext.Provider>
	);
}

export const useDialog = () => useContext(DialogContext);
