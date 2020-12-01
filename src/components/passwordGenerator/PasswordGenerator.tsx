import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SavePasswordModal from "./SavePasswordModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const UNInum = [48, 57];
const UNIupper = [65, 90];
const UNIlower = [97, 122];
const UNIsym = [33, 47];

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(20);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowecase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const [generatedPassword, setGeneratedPassword] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const randOptionsRef = useRef<number[]>([]);

  const useStyles = makeStyles((theme) => ({
    passwordGeneratorContainer: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      boxShadow: `0px 2px 10px rgba(31, 28,28, 0.9)`,
      padding: "20px",
      width: "350px",
      maxWidth: "100%",
      borderRadius: "5px",
      margin: "0 auto",
    },
    numInput: {
      width: "50px",
    },
    formControl: {
      justifyContent: "space-between",
      margin: 0,
      padding: "12px 0",
      width: "100%",
    },
    resultContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      position: "relative",
      fontSize: "18px",
      letterSpacing: "1px",
      padding: "12px 10px",
      height: "50px",
      width: "100%",
    },
    copyToClipboardBtn: {
      fontSize: "20px",
      position: "absolute",
      top: "5px",
      right: "5px",
      height: "40px",
      width: "40px",
      cursor: "pointer",
    },
    checkBox: {
      padding: 0,
    },
    btn: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  const changeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lengthNum = parseInt(e.target.value);
    if (lengthNum > 20) setLength(20);
    else if (lengthNum <= 6) setLength(6);
    else setLength(lengthNum);
  };

  const pushOptionIntoRandOptions = (passwordOptionArr: number[]) => {
    const startingIndex = passwordOptionArr[0];
    const condition = passwordOptionArr[1];
    for (let i = startingIndex; i <= condition; i++) {
      randOptionsRef.current.push(i);
    }
  };

  const checkOptionsToPush = () => {
    if (useUppercase) {
      pushOptionIntoRandOptions(UNIupper);
    }
    if (useLowecase) {
      pushOptionIntoRandOptions(UNIlower);
    }
    if (useNumbers) {
      pushOptionIntoRandOptions(UNInum);
    }
    if (useSymbols) {
      pushOptionIntoRandOptions(UNIsym);
    }
  };

  const generatePassword = () => {
    const password: string[] = [];

    if (!useUppercase && !useLowecase && !useNumbers && !useSymbols) {
      return alert("choose atleast one of the settings!");
    }

    checkOptionsToPush();

    for (let i = 0; i < length; i++) {
      password.push(
        String.fromCharCode(
          randOptionsRef.current[
            Math.floor(Math.random() * randOptionsRef.current.length)
          ]
        )
      );
    }

    const newGeneratedPassword = password.join("");

    setGeneratedPassword(newGeneratedPassword);
  };

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    if (!generatedPassword) {
      return;
    }

    textarea.value = generatedPassword;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={classes.passwordGeneratorContainer}>
        <h2 style={{ textAlign: "center" }}>Password Generator</h2>
        <div className={classes.resultContainer}>
          <span id="result">{generatedPassword}</span>
          <button
            className={classes.copyToClipboardBtn}
            onClick={copyToClipboard}
          >
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <FormControlLabel
              className={classes.formControl}
              value="password length"
              labelPlacement="start"
              label="Password length"
              control={
                <Input
                  type="number"
                  className={classes.numInput}
                  value={length}
                  onChange={changeLength}
                />
              }
            />
          </div>
          <div className="setting">
            <FormControlLabel
              className={classes.formControl}
              value="include uppercase characters"
              labelPlacement="start"
              label="Include uppercase characters"
              control={
                <Checkbox
                  className={classes.checkBox}
                  color="primary"
                  checked={useUppercase}
                  onChange={(e) => setUseUppercase(e.target.checked)}
                />
              }
            />
          </div>
          <div className="setting">
            <FormControlLabel
              className={classes.formControl}
              value="include lowercase characters"
              labelPlacement="start"
              label="Include lowercase characters"
              control={
                <Checkbox
                  className={classes.checkBox}
                  color="primary"
                  checked={useLowecase}
                  onChange={(e) => setUseLowercase(e.target.checked)}
                />
              }
            />
          </div>
          <div className="setting">
            <FormControlLabel
              className={classes.formControl}
              value="include numbers"
              labelPlacement="start"
              label="Include numbers"
              control={
                <Checkbox
                  className={classes.checkBox}
                  color="primary"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                />
              }
            />
          </div>
          <div className="setting">
            <FormControlLabel
              className={classes.formControl}
              value="include symbols"
              labelPlacement="start"
              label="Include symbols"
              control={
                <Checkbox
                  className={classes.checkBox}
                  color="primary"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                />
              }
            />
          </div>
        </div>
        <Button
          onClick={generatePassword}
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          Generate password
        </Button>
        {generatedPassword && (
          <Button
            style={{ marginTop: "20px" }}
            className={classes.btn}
            color="secondary"
            variant="contained"
            onClick={() => setGeneratedPassword("")}
          >
            Clear password
          </Button>
        )}
      </div>
      {generatedPassword && (
        <SavePasswordModal
          passwordValue={generatedPassword}
          modalOpen={modalOpen}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default PasswordGenerator;
