export default function BokehDots({
	className = "",
	opacity = 0.4,
	colors = [
		"rgba(157, 0, 255, 0.45)",      // brand-purple
		"rgba(217, 3, 104, 0.40)",      // brand-magenta
		"rgba(255, 215, 0, 0.35)",      // brand-gold
		"rgba(157, 0, 255, 0.38)",      // brand-purple
		"rgba(217, 3, 104, 0.32)",      // brand-magenta
		"rgba(255, 215, 0, 0.35)",      // brand-gold
		"rgba(157, 0, 255, 0.28)",      // brand-purple
		"rgba(217, 3, 104, 0.35)"       // brand-magenta
	]
}: {
	className?: string
	opacity?: number
	colors?: string[]
}) {
	const gradients = [
		`radial-gradient(circle at 14% 20%, ${colors[0]} 0%, transparent 30%)`,
		`radial-gradient(circle at 22% 72%, ${colors[1]} 0%, transparent 30%)`,
		`radial-gradient(circle at 36% 44%, ${colors[2]} 0%, transparent 25%)`,
		`radial-gradient(circle at 48% 18%, ${colors[3]} 0%, transparent 35%)`,
		`radial-gradient(circle at 64% 62%, ${colors[4]} 0%, transparent 25%)`,
		`radial-gradient(circle at 76% 30%, ${colors[5]} 0%, transparent 30%)`,
		`radial-gradient(circle at 84% 78%, ${colors[6]} 0%, transparent 35%)`,
		`radial-gradient(circle at 92% 12%, ${colors[7]} 0%, transparent 30%)`
	];

	return (
		<div
			className={`pointer-events-none absolute inset-0 z-50 ${className}`}
			style={{
				opacity,
				background: gradients.join(', ')
			}}
		/>
	)
}
