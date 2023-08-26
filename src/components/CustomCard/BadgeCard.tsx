import { SxProps } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";

interface BadgeCardModel {
	badgeContent?: any;
	badgeAction?: any;
	cardProps?: SxProps;
	badgeSxProps?: SxProps;
	children?: any;
}

const defaultBadgeElementStyle: SxProps = {
	position: "relative",
	top: "-1rem",
	left: "0.5rem",
	zIndex: 1,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "4rem",
	height: "4rem",
	marginTop: "-24px",
	opacity: 1,
	background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
	color: " rgb(255, 255, 255)",
	borderRadius: "0.75rem",
	boxShadow:
		"rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
};

const BadgeCard = ({
	badgeContent,
	badgeSxProps,
	badgeAction,
	children,
}: BadgeCardModel) => {
	const badgeProps: SxProps = badgeSxProps
		? {
				...defaultBadgeElementStyle,
				cursor: badgeAction ? "pointer" : "auto",
				...badgeSxProps,
		  }
		: defaultBadgeElementStyle;

	return (
		<Card
			sx={{
				minWidth: "20rem",
				minHeight: "10rem",
				maxWidth: "41rem",
				maxHeight: "40rem",
				overflow: "visible",
				wordWrap: "break-word",
			}}
		>
			{badgeContent && (
				<IconButton sx={badgeProps} onClick={badgeAction}>
					{badgeContent}
				</IconButton>
			)}
			<CardContent sx={{ overflow: "auto", maxHeight: "15rem" }}>
				{children}
			</CardContent>
		</Card>
	);
};

export default BadgeCard;
