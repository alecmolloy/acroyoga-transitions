import { TransitionRangeControls } from './transition-range-controls'

interface HeaderProps {
  ratingRange: [number, number]
  setRatingRange: React.Dispatch<
    React.SetStateAction<[number, number]>
  >
  showShorthand: boolean
  setShowShorthand: React.Dispatch<
    React.SetStateAction<boolean>
  >
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  ratingRange,
  setRatingRange,
  showShorthand,
  setShowShorthand,
}) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0 15px',
    }}
  >
    <h1
      style={{
        flexShrink: 0,
        fontSize: 32,
        marginTop: 12,
        flexGrow: 1,
      }}
    >
      AcroYoga Transitions
    </h1>
    <TransitionRangeControls
      ratingRange={ratingRange}
      setRatingRange={setRatingRange}
    />
    <div>
      <input
        type='checkbox'
        checked={showShorthand}
        onChange={(e) => {
          const newValue = e.target.checked
          setShowShorthand(newValue)
          window.localStorage.setItem(
            'showShorthand',
            newValue + '',
          )
        }}
      />
      Use Shorthand
    </div>
  </div>
)
