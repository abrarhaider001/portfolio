import { StarIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { serviceFeatures } from "@/sections/services/_constants/services";

import { ServiceCard as Card } from "./_components/service-card";

export default function Services() {
	return (
		<Section
			id="services"
			title="Custom software, design handoff, and engineering discipline"
			description="Three ways I work with teams: tailored product builds guided by agile delivery, turning product and UI intent into shipped features, and keeping code reviewable and ready for the next release."
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
			badgeText="Services"
			badgeIcon={<StarIcon aria-hidden="true" />}
		>
			{serviceFeatures.map((feature) => {
				const featureId = `service-title-${feature.name
					.toLowerCase()
					.replace(/\s+/g, "-")}`;

				return (
					<Card key={feature.name} {...feature} aria-labelledby={featureId} />
				);
			})}
		</Section>
	);
}
