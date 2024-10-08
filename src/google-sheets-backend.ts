import config from './config'
import {
  AllPoses,
  getEmptyTransitionToRatings,
  isShorthandName,
  poseAndRatings,
} from './poses'

export interface CallbackParams {
  allPoses: AllPoses
  poseIndices: Array<string>
}

export function load(
  callback: (
    params: CallbackParams | null,
    err?: Error,
  ) => void,
) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: 'Sheet1!A1:AN',
      })
      .then(
        (response) => {
          const rows: undefined | string[][] =
            response.result.values
          if (rows != null) {
            const fromPoses = rows[0].slice(1)
            const toPoses = rows
              .slice(1)
              .map((row) => row[0])
            if (
              !fromPoses.every(
                (pose, i) => pose === toPoses[i],
              )
            ) {
              throw new Error(
                'From and To Poses are not in the same order. Please check the Google Sheet and make sure all poses on the left and top are in the same order, and have the exact same name.',
              )
            }
            const allPoses: AllPoses = rows
              .slice(1)
              .map((row, y) => {
                const name = row[0]
                if (!isShorthandName(name)) {
                  throw new Error(
                    `The shorthand name '${name} is not known. The Google Sheet may have had this shorthand added without it being updated here.`,
                  )
                }
                return poseAndRatings(
                  name,
                  row
                    .slice(1)
                    .reduce((working, column, x) => {
                      const ratingAsNumber = Number(column)
                      if (isNaN(ratingAsNumber)) {
                        throw new Error(
                          `Encountered a transition rating that isn't a number, please check the rating for ${fromPoses[y]} to ${toPoses[x]} in the Google Sheet.`,
                        )
                      }
                      return {
                        ...working,
                        [toPoses[x]]: ratingAsNumber,
                      }
                    }, getEmptyTransitionToRatings()),
                )
              })
            console.log(allPoses[5])
            callback({
              allPoses: allPoses,
              poseIndices: fromPoses,
            })
          }
        },
        (response) => {
          callback(null, response.result.error)
        },
      )
      .catch((response) => {
        callback(null, response)
      })
  })
}
