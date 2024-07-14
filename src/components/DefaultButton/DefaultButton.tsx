import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants";

interface IDefaultButtonProps {
  label: string;
  handlePress: () => void;
}
export const DefaultButton: FC<IDefaultButtonProps> = ({
  label,
  handlePress,
}) => {
  return (
    <TouchableOpacity style={s.button} onPress={handlePress}>
      <Text
        style={[
          GlobalStyles.text.textButton,
          { color: GlobalStyles.colors.lightSkyBlue },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const s = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.gray700,
  },
});
