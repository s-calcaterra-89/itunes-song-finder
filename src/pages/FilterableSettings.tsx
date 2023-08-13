import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Key, SetStateAction, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import {
	fakeApiCallSecurity,
	useGetGeneral,
	useGetSecurity,
	useGetTwoFactor,
} from "../hooks/fakeApis";

// Mocked Nested Components
const LanguageSettings = (hidden: boolean) => {
	console.log("LanguageSettings - hidden", hidden);
	const { isLoading, isError, data, refetch } = useGetGeneral(!hidden);
	const queryClient = useQueryClient();

	return isLoading ? (
		<div>Loading Language Settings...</div>
	) : (
		<>
			<div>Language Settings...</div>
			<button
				onClick={() => {
					queryClient.invalidateQueries(["general-settings"]);
				}}
			>
				update language
			</button>
			{(data as any)?.map((item: any) => (
				<div>{item?.name}</div>
			))}
		</>
	);
};
const NotificationSettings = (hidden: boolean) => {
	console.log("NotificationSettings - hidden", hidden);
	const { isLoading, isError, data, refetch } = useGetGeneral(!hidden);
	const queryClient = useQueryClient();

	return isLoading ? (
		<div>Loading Notification Settings...</div>
	) : (
		<>
			<div>Notification Settings...</div>
			<button
				onClick={() => {
					queryClient.invalidateQueries(["general-settings"]);
				}}
			>
				update notifications
			</button>
			{(data as any)?.map((item: any) => (
				<div>{item?.name}</div>
			))}
		</>
	);
	return <div>Notification Settings</div>;
};
const PasswordSettings = (hidden: boolean) => {
	console.log("PasswordSettings - hidden", hidden);
	const { isLoading, isError, data, refetch } = useGetSecurity(!hidden);
	const queryClient = useQueryClient();

	return isLoading ? (
		<div>Loading Password Settings...</div>
	) : (
		<>
			<div>Password Settings...</div>
			<button
				onClick={() => {
					queryClient.invalidateQueries(["security-settings"]);
				}}
			>
				update Password
			</button>
			{(data as any)?.map((item: any) => (
				<div>{item?.name}</div>
			))}
		</>
	);
	return <div>Password Settings</div>;
};
const TwoFactorSettings = (hidden: boolean) => {
	console.log("TwoFactorSettings - hidden", hidden);
	const { isLoading, isError, data, refetch } = useGetTwoFactor(!hidden);
	const queryClient = useQueryClient();

	return isLoading ? (
		<div>Loading TwoFactor Settings...</div>
	) : (
		<>
			<div>TwoFactor Settings...</div>
			<button
				onClick={() => {
					queryClient.invalidateQueries(["security-settings"]);
				}}
			>
				update TwoFactor
			</button>
			{(data as any)?.map((securityLevel: any) => (
				<div>{securityLevel}</div>
			))}
		</>
	);
	return <div>TwoFactor Settings</div>;
};
const ThemeSettings = () => <div>Theme Settings</div>;
const FontSettings = () => <div>Font Settings</div>;
const GeneralSettings = () => <div>General Settings</div>;
const SecuritySettings = () => <div>Security Settings</div>;
const AppearanceSettings = () => <div>Appearance Settings</div>;

const settingsComponents = [
	{
		name: "General",
		component: GeneralSettings,
		keywords: ["general", "common", "basic"],
		queryKey: "general-settings",
		nestedComponents: [
			{
				name: "Language",
				component: LanguageSettings,
				keywords: ["language", "locale", "i18n"],
			},
			{
				name: "Notification",
				component: NotificationSettings,
				keywords: ["notification", "alerts", "emails"],
			},
		],
	},
	{
		name: "Security",
		component: SecuritySettings,
		keywords: ["security", "password", "authentication"],
		queryKey: "security-settings",
		nestedComponents: [
			{
				name: "Password",
				component: PasswordSettings,
				keywords: ["password", "change password", "reset password"],
				hidden: true,
			},
			{
				name: "Two-Factor",
				component: TwoFactorSettings,
				keywords: ["two-factor", "authentication", "OTP"],
				hidden: true,
			},
		],
	},
	{
		name: "Appearance",
		component: AppearanceSettings,
		keywords: ["appearance", "theme", "style"],
		queryKey: "appearance-settings",
		nestedComponents: [
			{
				name: "Theme",
				component: ThemeSettings,
				keywords: ["theme", "color", "palette"],
				hidden: true,
			},
			{
				name: "Font",
				component: FontSettings,
				keywords: ["font", "typography", "size"],
				hidden: true,
			},
		],
	},
	// Add more top-level settings components here
];

const FilterableSettingsPage = () => {
	const [filter, setFilter] = useState("");
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		// Find the best matching tab
		let bestMatchTabIndex = -1;
		let bestMatchScore = 0;

		for (let i = 0; i < settingsComponents.length; i++) {
			const component = settingsComponents[i];
			const score = calculateRelevanceScore(component);
			if (score > bestMatchScore) {
				bestMatchTabIndex = i;
				bestMatchScore = score;
			}
		}

		setSelectedTab(bestMatchTabIndex);
	}, [filter]);

	// Function to recursively calculate the relevance score of a component and its nested components
	const calculateRelevanceScore = (component: {
		name: any;
		component?: () => JSX.Element;
		keywords: any;
		nestedComponents: any;
	}) => {
		let score = 0;

		if (component.name.toLowerCase().includes(filter.toLowerCase())) {
			score += 2;
		}

		for (const keyword of component.keywords) {
			if (keyword.toLowerCase().includes(filter.toLowerCase())) {
				score += 1;
			}
		}

		if (component.nestedComponents) {
			for (const nestedComponent of component.nestedComponents) {
				score += calculateRelevanceScore(nestedComponent);
			}
		}

		return score;
	};

	// Function to recursively filter nested components
	const filterComponents = (components: any[], query: string): any[] => {
		console.debug("filterComponents ", components);
		console.debug("query ", query);

		if (query.trim() !== "") {
			const filteredComp = components.map((component: any) => {
				if (
					component.name.toLowerCase().includes(query.toLowerCase()) ||
					component.keywords.some((keyword: string) =>
						keyword.toLowerCase().includes(query.toLowerCase())
					)
				) {
					return { ...component, hidden: false } as any;
				}

				if (component.nestedComponents) {
					const nestedComponents = component.nestedComponents;
					return {
						...component,
						hidden: !filterComponents(nestedComponents, query).some(
							(item) => !item.hidden
						),
					} as any;
				}

				return { ...component, hidden: true };
			});
			console.debug("final filteredComp", filteredComp);
			return filteredComp;
		}
		return components;
	};

	// Filter the tabs based on the search query
	const filteredTabs = filterComponents(settingsComponents, filter);
	const queryClient = useQueryClient();

	const handleTabChange = async (
		event: any,
		newValue: SetStateAction<number>
	) => {
		setFilter("");
		setSelectedTab(newValue);
		filteredTabs[newValue as number].nestedComponents = filteredTabs[
			newValue as number
		]?.nestedComponents?.map((item: any) => ({ ...item, hidden: false }));

		console.log(filteredTabs[newValue as number]);

		filteredTabs.forEach((item: any, index) => {
			if (index !== newValue) {
				item.nestedComponents = item.nestedComponents?.map((item: any) => ({
					...item,
					hidden: true,
				}));
			}
		});

		// The results of this query will be cached like a normal query
		await queryClient.prefetchQuery({
			queryKey: [filteredTabs[newValue as number].queryKey],
			queryFn: fakeApiCallSecurity,
			staleTime: 60000,
		});
	};

	return (
		<div>
			<Typography variant='h4' gutterBottom>
				Filterable Settings Page
			</Typography>
			<input
				type='text'
				placeholder='Search settings...'
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
			<div style={{ display: "flex" }}>
				{/* Vertical Tabs */}
				<Tabs
					orientation='vertical'
					variant='scrollable'
					value={selectedTab}
					onChange={handleTabChange}
					sx={{ borderRight: 1, borderColor: "divider" }}
				>
					{filteredTabs.map((setting: { name: any }, index: any) => (
						<Tab key={index} label={setting.name} />
					))}
				</Tabs>
				{/* Content */}
				<div style={{ flex: 1, paddingLeft: "20px" }}>
					{filteredTabs.map(
						(
							setting: {
								name: any;
								component: () => any;
								nestedComponents: any;
							},
							index: Key | null | undefined
						) => (
							<div key={index} hidden={selectedTab !== index}>
								<Typography variant='h6'>{setting.name} Settings</Typography>
								{setting.component && setting.component()}
								{setting.nestedComponents && (
									<div style={{ paddingLeft: "20px" }}>
										<Grid container spacing={2}>
											{filterComponents(setting.nestedComponents, filter).map(
												(nestedSetting, nestedIndex) => (
													<>
														<Grid
															item
															// direction={"row"}
															// xs={6}
															// lg={6}
															// xl={6}
															key={nestedIndex}
															hidden={
																selectedTab !== index && nestedSetting.hidden
															}
														>
															{nestedSetting.component &&
																nestedSetting.component(nestedSetting.hidden)}
														</Grid>
													</>
												)
											)}
										</Grid>
									</div>
								)}
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default FilterableSettingsPage;
