import { TextStyle } from "react-native";

const colors = {
  primary50: "#e4d9fd",
  primary100: "#c6affc",
  primary200: "#a281f0",
  primary400: "#5721d4",
  primary500: "#3e04c3",
  primary700: "#2d0689",
  primary800: "#200364",
  accent500: "#f7bc0c",
  error50: "#fcc4e4",
  error500: "#9b095c",
  gray500: "#39324a",
  gray700: "#221c30",

  primary: "#fff",
  sopistaBlue: "#161E29",
  vividTangelo: "#F15E21",
  romanSilver: "#8C8D94",
  gray: "#6E6F75",
  skyBlue: "#A3C7EA",
  slateGray: "#7D848D",
  lightSkyBlue: "#CFDEED",
  white: "#fff",
};

export const GlobalStyles = {
  colors,
  text: {
    screenSubtitle: {
      color: colors.sopistaBlue,
      fontFamily: "Avenir-Roman",
      fontWeight: "400",
      fontSize: 20,
      lineHeight: 28,
      textAlign: "left",
    } as TextStyle,
  },
  heights: {
    BackBar: 44,
    BottomBar: 74,
    reservedHeightTop: 118,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  guideButton: {
    position: "absolute",
    bottom: 50,
    left: "25%",
    transform: [{ translateX: -50 }],
  },
  recomendButton: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  refreshButton: {
    position: "absolute",
    bottom: 50,
    left: "85%",
    transform: [{ translateX: -50 }],
  },
	mapBox: {
		flex: 1,
		backgroundColor: colors.gray,
		width: "100%",
		alignItems: "center",
	}
};
