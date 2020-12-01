import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface PasswordInputProps {
  showPassword: boolean;
  passwordValue: string;
  changePasswordDisplay: (showPassword: boolean) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  showPassword,
  passwordValue,
  changePasswordDisplay,
}) => {
  return (
    <Input
      fullWidth={true}
      id="standard-adornment-password"
      type={showPassword ? "text" : "password"}
      value={passwordValue}
      inputProps={{ readOnly: true }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => changePasswordDisplay(!showPassword)}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordInput;
