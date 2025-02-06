import { View } from "react-native";
import { BaseToast, SuccessToast, ErrorToast } from "react-native-toast-message";

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'DMSans-Regular',
      }}
    />

  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'DMSans-Regular'
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'DMSans-Regular'
      }}

    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
};