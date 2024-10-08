import 'rc-slider/assets/index.css'
import * as React from 'react'
import { Range } from 'rc-slider'

interface TransitionRangeControlsProps {
  ratingRange: [number, number]
  setRatingRange: React.Dispatch<
    React.SetStateAction<[number, number]>
  >
}

export function isRatingRange(
  value: Array<number>,
): value is [number, number] {
  return value.length === 2
}

export const TransitionRangeControls: React.FunctionComponent<TransitionRangeControlsProps> = ({
  ratingRange,
  setRatingRange,
}) => {
  const onChange = React.useCallback(
    (newValue: Array<number>) => {
      if (isRatingRange(newValue)) {
        setRatingRange(newValue)
        window.localStorage.setItem(
          'ratingRange',
          newValue + '',
        )
      }
    },
    [setRatingRange],
  )
  return (
    <div
      style={{
        display: 'flex',
        minWidth: 300,
        height: 46,
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 15,
      }}
    >
      <div style={{ marginRight: 10, flexShrink: 0 }}>
        Difficulty Range:{` `}
      </div>
      <Range
        min={1}
        max={5}
        value={ratingRange}
        onChange={onChange}
        style={{ width: 200 }}
        marks={{
          '1': (
            <>
              1<br />
              (Easy)
            </>
          ),
          '2': '2',
          '3': '3',
          '4': '4',
          '5': (
            <>
              5<br />
              (Hard)
            </>
          ),
        }}
      />
    </div>
  )
}
