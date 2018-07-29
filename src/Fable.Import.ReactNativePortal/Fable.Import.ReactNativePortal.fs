module Fable.Import.ReactNativePortal

open Fable.Import.React
open Fable.Core.JsInterop

module R = Fable.Helpers.React

let inline blackPortal (name: string) (children: ReactElement list): ReactElement =
  R.createElement(import "BlackPortal" "react-native-portal", createObj ["name" ==> name], children)

let inline whitePortal (name: string) (children: ReactElement list): ReactElement =
  R.createElement(import "WhitePortal" "react-native-portal", createObj ["name" ==> name], children)

let inline portalProvider (children: ReactElement list): ReactElement =
  R.createElement(import "PortalProvider" "react-native-portal", createEmpty, children)

let inline enterPortal<'a> = blackPortal

let inline exitPortal<'a> = whitePortal
