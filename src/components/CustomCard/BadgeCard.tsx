import { CardHeader, Divider, SxProps, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";

interface BadgeCardModel {
	titleNode?: { title: any; subHeader?: any };
	badgeContent?: any;
	badgeAction?: any;
	cardProps?: SxProps;
	cardHeaderSxProps?: SxProps;
	badgeSxProps?: SxProps;
	children?: any;
}

const defaultRemValue = "0.5rem";

const defaultBadgeElementStyle: SxProps = {
	position: "relative",
	top: defaultRemValue,
	left: defaultRemValue,
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
	cursor: "auto",
};

const BadgeCard = ({
	titleNode,
	badgeContent,
	badgeSxProps,
	cardHeaderSxProps,
	badgeAction,
	children,
}: BadgeCardModel) => {
	const badgeProps: SxProps = badgeSxProps
		? {
				...defaultBadgeElementStyle,
				cursor: !!badgeAction ? "pointer" : "auto",
				top: titleNode
					? titleNode.subHeader
						? "-0.45rem"
						: "0.25rem"
					: defaultRemValue,
				padding: titleNode?.subHeader ? "-0.39rem" : defaultRemValue,
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
			<Typography
				component={"div"}
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "end",
					justifyContent: "space-between",
				}}
			>
				{badgeContent && (
					<IconButton sx={badgeProps} onClick={badgeAction}>
						{badgeContent}
					</IconButton>
				)}
				{titleNode && (
					<>
						<CardHeader
							title={titleNode.title}
							subheader={titleNode.subHeader}
							sx={{ padding: "0.75rem", ...cardHeaderSxProps }}
							titleTypographyProps={{ variant: "body1" }}
							subheaderTypographyProps={{ variant: "subtitle2" }}
						/>
					</>
				)}
			</Typography>
			{titleNode && (
				<Divider
					sx={{
						flexShrink: 0,
						backgroundColor: "transparent",
						height: "0.0625rem",
						borderBottom: "none",
						opacity: "0.35",
						backgroundImage:
							"linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52,71, 103, 0.4), rgba(52, 71, 103, 0)) !important",
					}}
				/>
			)}
			{/* flex-shrink: 0; border-top: 0px solid rgba(0, 0, 0, 0.12); border-right:
			0px solid rgba(0, 0, 0, 0.12); border-left: 0px solid rgba(0, 0, 0, 0.12);
			background-color: transparent; height: 0.0625rem; margin: 1rem 0px;
			border-bottom: none; opacity: 0.25; background-image: linear-gradient(to
			right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0))
			!important; */}
			<CardContent sx={{ overflow: "auto", maxHeight: "15rem" }}>
				{children}
			</CardContent>
		</Card>
	);
};

export default BadgeCard;
