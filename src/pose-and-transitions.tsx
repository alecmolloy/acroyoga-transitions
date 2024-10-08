/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {
  PoseAndRatings,
  prettyShorthand,
  ShorthandName,
  shorthandToFullNameDictionary,
} from './poses'

interface PoseAndTransitionsProps {
  pose: PoseAndRatings
  ratingRange: [number, number]
  setSelectedPose: (selectedPose: string) => void
  showShorthand: boolean
}

interface Rating {
  shorthand: ShorthandName
  rating: number
}

export const PoseAndTransitions: React.FunctionComponent<PoseAndTransitionsProps> = ({
  pose,
  ratingRange,
  setSelectedPose,
  showShorthand,
}) => {
  const ratings = Object.keys(
    pose.transitionToRatings,
  ).reduce((working: Array<Rating>, poseName) => {
    const shorthand = poseName as ShorthandName
    const rating = pose.transitionToRatings[shorthand]
    if (
      rating >= ratingRange[0] &&
      rating <= ratingRange[1] &&
      rating !== 0
    ) {
      const newWorking: Array<Rating> = [
        ...working,
        {
          shorthand,
          rating,
        },
      ]
      return newWorking
    } else {
      return working
    }
  }, [] as Array<Rating>)
  const orderedRatings = ratings.sort(
    (a, b) => a.rating - b.rating,
  )
  return (
    <div style={{ display: 'flex', marginBottom: 20 }}>
      <div
        css={{
          border: '1px solid black',
          width: 100,
          height: 95,
          textAlign: 'center',
          cursor: 'pointer',
          padding: 10,
          paddingTop: 15,
          marginRight: 10,
          flexShrink: 0,
        }}
        onClick={() => setSelectedPose(pose.name)}
        title={shorthandToFullNameDictionary[pose.name]}
      >
        <div
          style={{
            fontSize: '2.5em',
          }}
        >
          {prettyShorthand[pose.name]}
        </div>
        <div
          style={{
            fontSize: '1em',
          }}
        >
          {shorthandToFullNameDictionary[pose.name]}
        </div>
      </div>
      <div>
        {orderedRatings.length > 0
          ? orderedRatings.map(({ shorthand, rating }) => (
              <span
                key={pose.name + shorthand}
                css={{
                  cursor: 'pointer',
                  '&:not(:last-of-type)::after': {
                    content: '", "',
                  },
                  ':hover > .label': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={() => setSelectedPose(shorthand)}
              >
                <span
                  className='label'
                  title={`${shorthandToFullNameDictionary[shorthand]} (${shorthand})`}
                >
                  {showShorthand
                    ? prettyShorthand[shorthand]
                    : shorthandToFullNameDictionary[
                        shorthand
                      ]}
                </span>{' '}
                ({rating})
              </span>
            ))
          : 'No poses to transition to.'}
      </div>
    </div>
  )
}
