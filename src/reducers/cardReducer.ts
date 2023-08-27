import {
	CardContainerReducerPayload,
	CardContainerState,
} from "../models/card.model";

export const cardReducer = (
	state: CardContainerState,
	action: CardContainerReducerPayload
): CardContainerState => {
	switch (action.type) {
		case "delete_item": {
			return action.nextItem
				? {
						...state,
						openModal: true,
						items: state.items.splice(0, state.items.length - 1),
				  }
				: state;
		}
		case "add_item": {
			return action.nextItem
				? {
						...state,
						openModal: true,
						items: [...state.items, action.nextItem],
				  }
				: state;
		}
		case "open_modal": {
			return {
				...state,
				openModal: true,
			};
		}
		case "close_modal": {
			return {
				...state,
				openModal: false,
			};
		}
	}
	throw Error("Unknown action: " + action.type);
};
