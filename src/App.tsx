/// <reference path="../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../node_modules/@types/gapi.client/index.d.ts" />
/// <reference path="../node_modules/@types/gapi.client.sheets/index.d.ts" />

import React from 'react'
import { Helmet } from 'react-helmet'
import config from './config'
import {
  CallbackParams,
  load,
} from './google-sheets-backend'
import { PoseAndTransitions } from './pose-and-transitions'
import {
  AllPoses,
  shorthandToFullNameDictionary,
} from './poses'
import { Header } from './header'
import { isRatingRange } from './transition-range-controls'

export function App() {
  const [allPoses, setAllPoses] = React.useState<AllPoses>(
    [],
  )
  const [error, setError] = React.useState<string | null>(
    null,
  )

  const localRatingRange = (() => {
    try {
      const stringArray =
        window.localStorage.getItem('ratingRange')
      if (stringArray != null) {
        const split = stringArray.split(',')
        if (split.length > 0) {
          const numArray = split.map((v) => {
            const num = Number(v)
            if (isNaN(num)) {
              throw new Error(
                `${v}, stored in localStorage as a difficulty rating range value, is not a number`,
              )
            }
            return num
          })
          if (isRatingRange(numArray)) {
            return numArray
          }
        }
      }
      return null
    } catch {
      return null
    }
  })()
  const [ratingRange, setRatingRange] = React.useState<
    [number, number]
  >(localRatingRange ?? [1, 3])
  const [selectedPose, setSelectedPose] = React.useState<
    string | null
  >(null)

  const localShowShorthand =
    window.localStorage.getItem('showShorthand') === 'true'
  const [showShorthand, setShowShorthand] =
    React.useState<boolean>(localShowShorthand)

  const onLoad = React.useCallback(
    (params: CallbackParams | null, err?: Error) => {
      if (params != null) {
        const { allPoses } = params
        setAllPoses(allPoses)
      } else {
        setError(
          err?.message ??
            'Unknown error occured, bother Alec',
        )
      }
    },
    [],
  )

  const initClient = React.useCallback(() => {
    window.gapi.client.init(config).then(() => load(onLoad))
  }, [onLoad])

  React.useEffect(() => {
    window.gapi.load('client', initClient)
  }, [initClient])

  return allPoses != null ? (
    <div className='App'>
      <Helmet>
        <style type='text/css'>{`
          body, html {
            box-sizing: border-box
          }
        `}</style>
      </Helmet>
      <Header
        ratingRange={ratingRange}
        setRatingRange={setRatingRange}
        showShorthand={showShorthand}
        setShowShorthand={setShowShorthand}
      />
      <hr />
      {error != null ? (
        <div>
          <span role='img' aria-label='warning-icon'>
            ⚠️
          </span>{' '}
          Error: {error}
        </div>
      ) : null}
      {selectedPose === null
        ? allPoses.map((pose) => {
            return (
              <PoseAndTransitions
                key={pose.name}
                setSelectedPose={setSelectedPose}
                pose={pose}
                ratingRange={ratingRange}
                showShorthand={showShorthand}
              />
            )
          })
        : (() => {
            const pose = allPoses.find(
              (v) => v.name === selectedPose,
            )
            if (pose != null) {
              return (
                <>
                  <div
                    onClick={() => setSelectedPose(null)}
                    style={{
                      cursor: 'pointer',
                      marginBottom: 10,
                    }}
                  >
                    &lt; all poses
                  </div>
                  <PoseAndTransitions
                    key={pose.name}
                    setSelectedPose={setSelectedPose}
                    pose={pose}
                    ratingRange={ratingRange}
                    showShorthand={showShorthand}
                  />
                  <img
                    alt={
                      shorthandToFullNameDictionary[
                        pose.name
                      ]
                    }
                    src={`/poses/${pose.name}.jpg`}
                    style={{ maxWidth: 200 }}
                  />
                </>
              )
            }
          })()}
      <hr style={{ marginTop: 50 }} />
      <div>
        App by{' '}
        <a href='https://alecmolloy.com'>Alec Molloy</a>,
        ratings and idea by{' '}
        <a href='https://acroyoga.org/'>Jason Nemer</a>
      </div>
    </div>
  ) : null
}
