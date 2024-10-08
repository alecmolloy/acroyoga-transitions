const EmptyTransitionToRatings = {
  FP: 0,
  FB: 0,
  F2S: 0,
  T: 0,
  RT: 0,
  BP: 0,
  SB: 0,
  RF2S: 0,
  S2F: 0,
  S: 0,
  f2h: 0,
  Rf2h: 0,
  TS: 0,
  RTS: 0,
  SS: 0,
  RSS: 0,
  Iss: 0,
  RIss: 0,
  Oss: 0,
  ROss: 0,
  RFP: 0,
  RBP: 0,
  RS2F: 0,
  RS: 0,
  Bi: 0,
  Croc: 0,
  F2F: 0,
  RF2F: 0,
  BH2H: 0,
  RBH2H: 0,
  h2h: 0,
  Rh2h: 0,
  FL: 0,
  LB: 0,
  HFW: 0,
  RP: 0,
  Wa: 0,
  BL: 0,
  BAT: 0,
}

export type TransitionToRatings = typeof EmptyTransitionToRatings
export type ShorthandName = keyof TransitionToRatings

export const ShorthandNames = Object.keys(
  EmptyTransitionToRatings,
) as Array<ShorthandName>

export function isShorthandName(
  value: string,
): value is ShorthandName {
  return ShorthandNames.includes(value as ShorthandName)
}

export const shorthandToFullNameDictionary: {
  [key in ShorthandName]: string
} = {
  FP: 'Front Plank',
  FB: 'Front Bird',
  F2S: 'Foot-to-Shin',
  T: 'Throne',
  RT: 'Reverse Throne',
  BP: 'Back Plank',
  SB: 'Straddle Bat',
  RF2S: 'Reverse Foot-to-Shin',
  S2F: 'Shin-to-Foot',
  S: 'Star',
  f2h: 'Foot-to-Hand',
  Rf2h: 'Reverse Foot-to-Hand',
  TS: 'Tuck Sit',
  RTS: 'Reverse Tuck Sit',
  SS: 'Shoulderstand',
  RSS: 'Reverse Shoulderstand',
  Iss: 'Inside Star',
  RIss: 'Reverse Inside Star',
  Oss: 'Outside Star',
  ROss: 'Reverse Outside Star',
  RFP: 'Reverse Front Plank',
  RBP: 'Reverse Back Plank',
  RS2F: 'Reverse Shin-to-Foot',
  RS: 'Reverse Star',
  Bi: 'Bicepstand',
  Croc: 'Crocodile',
  F2F: 'Foot-to-Foot',
  RF2F: 'Reverse Foot-to-Foot',
  BH2H: 'Baby Hand-to-Hand',
  RBH2H: 'Reverse Baby Hand-to-Hand',
  h2h: 'Hand-to-Hand',
  Rh2h: 'Reverse Hand-to-Hand',
  FL: 'Folded Leaf',
  LB: 'Lifted Butterfly',
  HFW: 'High-Flying Whale',
  RP: 'Reverse Prayer',
  Wa: 'Walnut',
  BL: 'Back Leaf',
  BAT: 'Bat',
}

export const prettyShorthand: {
  [key in ShorthandName]: React.ReactNode
} = {
  FP: 'FP',
  FB: 'FB',
  F2S: (
    <>
      F<sub>2</sub>S
    </>
  ),
  T: 'T',
  RT: 'RT',
  BP: 'BP',
  SB: 'SB',
  RF2S: (
    <>
      RF<sub>2</sub>S
    </>
  ),
  S2F: (
    <>
      S<sub>2</sub>F
    </>
  ),
  S: 'S',
  f2h: (
    <>
      f<sub>2</sub>h
    </>
  ),
  Rf2h: (
    <>
      Rf<sub>2</sub>h
    </>
  ),
  TS: 'TS',
  RTS: 'RTS',
  SS: 'SS',
  RSS: 'RSS',
  Iss: 'Iss',
  RIss: 'RIss',
  Oss: 'Oss',
  ROss: 'ROss',
  RFP: 'RFP',
  RBP: 'RBP',
  RS2F: (
    <>
      RS<sub>2</sub>F
    </>
  ),
  RS: 'RS',
  Bi: 'Bi',
  Croc: 'Croc',
  F2F: (
    <>
      F<sub>2</sub>F
    </>
  ),
  RF2F: (
    <>
      RF<sub>2</sub>F
    </>
  ),
  BH2H: (
    <>
      BH<sub>2</sub>H
    </>
  ),
  RBH2H: (
    <>
      BH<sub>2</sub>H
    </>
  ),
  h2h: (
    <>
      h<sub>2</sub>h
    </>
  ),
  Rh2h: (
    <>
      Rh<sub>2</sub>h
    </>
  ),
  FL: 'FL',
  LB: 'LB',
  HFW: 'HFW',
  RP: 'RP',
  Wa: 'Wa',
  BL: 'BL',
  BAT: 'BAT',
}

export const getEmptyTransitionToRatings = (): TransitionToRatings => ({
  ...EmptyTransitionToRatings,
})

export interface PoseAndRatings {
  name: ShorthandName
  transitionToRatings: TransitionToRatings
}

export function poseAndRatings(
  name: ShorthandName,
  transitionToRatings: TransitionToRatings,
): PoseAndRatings {
  return { name, transitionToRatings }
}

export type AllPoses = Array<PoseAndRatings>
