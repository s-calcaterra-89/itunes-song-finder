import { ReducerPayload } from "./reducer.model";

export interface DisneyItem {
	name: string;
	age: number;
}

export interface CardContainerState {
	openModal?: boolean;
	items: DisneyItem[];
}
export interface CardContainerReducerPayload extends ReducerPayload {
	nextItem?: DisneyItem;
}
