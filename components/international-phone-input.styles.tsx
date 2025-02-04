import { View } from "react-native";
import { IModalStyles } from "react-native-international-phone-number/lib/interfaces/modalStyles"
import { IPhoneInputStyles } from "react-native-international-phone-number/lib/interfaces/phoneInputStyles"
import { styled } from "styled-components";


export const PhoneInputContainer = styled(View)`
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 100%;
`;


export const phoneInputStyles: IPhoneInputStyles = {
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(18, 3, 58, 0.1)',
    height: 60,
    borderRadius: 16,
    overflow: 'hidden',
    paddingLeft: 8,
  },
  flagContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginLeft: 4,
  },
  flag: {},
  // caret: {
  //   color: 'rgba(18, 3, 58, 0.4)',
  //   fontSize: 16,
  //   backgroundImage: require('@/assets/images/input-caret.svg'),
  // },
  divider: {
    backgroundColor: 'transparent',
  },
  callingCode: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    color: 'rgba(18, 3, 58, 1)',
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    color: 'rgba(18, 3, 58, 1)',
    backgroundColor: '#fff',
  },
}

export const modalStyles: IModalStyles = {
  modal: {
    backgroundColor: '#333333',
    borderWidth: 1,
  },
  backdrop: {},
  divider: {
    backgroundColor: 'transparent',
  },
  countriesList: {},
  searchInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    color: '#F3F3F3',
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    height: 46,
  },
  countryButton: {
    borderWidth: 1,
    borderColor: '#F3F3F3',
    backgroundColor: '#666666',
    marginVertical: 4,
    paddingVertical: 0,
  },
  noCountryText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    color: '#F3F3F3',
  },
  noCountryContainer: {},
  flag: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  callingCode: {
    color: '#F3F3F3',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
  },
  countryName: {
    color: '#F3F3F3',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
  },
}