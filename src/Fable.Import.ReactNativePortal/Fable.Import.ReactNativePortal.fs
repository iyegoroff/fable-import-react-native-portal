[<RequireQualifiedAccess>]
module Fable.Import.ReactNativePortal

open Fable.Core.JsInterop

module R = Fable.Helpers.React

let inline blackPortal (name: string) (children: React.ReactElement list): React.ReactElement =
    R.createElement(
        import "BlackPortal" "react-native-portal",
        createObj ["name" ==> name],
        children
    )

let inline whitePortal (name: string) (children: React.ReactElement list): React.ReactElement =
    R.createElement(
        import "WhitePortal" "react-native-portal",
        createObj ["name" ==> name],
        children
    )

let inline portalProvider (children: React.ReactElement list): React.ReactElement =
    R.createElement(
        import "PortalProvider" "react-native-portal",
        createEmpty,
        children
    )

let inline enterPortal<'a> = blackPortal

let inline exitPortal<'a> = whitePortal
