export default function Cell({
	updateFlag,
	details,
	handleClick,
	columns,
	lost,
	won,
	doubleClickHandler,
}) {
	const { value, revealed, flagged, struck } = details

	return (
		<button
			className={`m-[1.5px] flex select-none items-center justify-center border-[0.5px] border-submarine-400 font-goblin text-xs sm:text-sm ${
				(revealed && struck && 'bg-orange-400/50') ||
				(revealed && !struck && flagged && 'bg-emerald-500/70') ||
				(revealed && !struck && 'bg-submarine-700') ||
				(!revealed && ' bg-submarine-800/30') ||
				''
			} ${
				((revealed || flagged || won || lost) && 'cursor-default') ||
				(!won && !lost && 'cursor-pointer hover:bg-submarine-800')
			} ${
				(value === 1 && 'text-sky-400') ||
				(value === 2 && 'text-emerald-400') ||
				(value === 3 && 'text-rose-400') ||
				(value === 4 && 'text-fuchsia-400') ||
				(value === 5 && 'text-orange-400') ||
				(value === 6 && 'text-teal-300') ||
				(value === 7 && 'text-neutral-900') ||
				(value === 8 && 'text-neutral-900/60') ||
				''
			} ${
				(columns === 9 && 'h-8 w-8') ||
				(columns > 9 && 'h-6 max-h-[5vw] w-6 max-w-[5vw]')
			}`}
			onClick={e => doubleClickHandler(e, details)}
			onContextMenu={() => updateFlag(details)}
			onMouseDown={e => handleClick(e, details)}
			onMouseUp={e => handleClick(e, details)}
		>
			{(revealed && value !== 'X' && value) ||
				(revealed && value === 'X' && '💥') ||
				(!revealed && flagged && '⛳️')}
		</button>
	)
}
