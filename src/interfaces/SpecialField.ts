export interface SpecialField {
	position: number;
	action: "gameover" | "move";
	target?: number;
}
