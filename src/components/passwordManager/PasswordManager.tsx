import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import Container from "@material-ui/core/Container";
import MaterialTable from "material-table";
import PasswordInput from "../shared/PasswordInput";
import {
  PasswordsContext,
  PasswordDataObj,
} from "../../contexts/PasswordsContext";
import { encryptPassword } from "../shared/funcs";
import Feedback from "../shared/Feedback";

type UpdatedPasswordsDataObj = {
  id: string;
  service?: string;
  username?: string;
  password?: string;
};

const PasswordManager: React.FC = () => {
  const { passwords } = useContext(PasswordsContext);
  const [passwordsData, setPasswordsData] = useState<PasswordDataObj[] | []>(
    []
  );
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (passwords) setPasswordsData(passwords);
  }, [passwords]);

  const changePasswordDisplay = (clikedPasswordObjID: string) => {
    const updatedPasswordsData = (passwordsData as PasswordDataObj[]).map(
      (passwordsDataObj: PasswordDataObj) =>
        passwordsDataObj.id === clikedPasswordObjID
          ? {
              ...passwordsDataObj,
              showPassword: !passwordsDataObj.showPassword,
            }
          : passwordsDataObj
    );

    setPasswordsData(updatedPasswordsData);
  };

  const deletePassword = (passwordDataObjID: string) => {
    const db = firebase.firestore();

    db.collection("passwords")
      .doc(passwordDataObjID)
      .delete()
      .then(() => {
        setSnackbarMessage("Password deleted!");
        setOpenSuccessSnackbar(true);
      })
      .catch(function (err) {
        console.error("Error removing password: ", err);
        setSnackbarMessage("Something went wrong...");
        setOpenErrorSnackbar(true);
      });
  };

  const updatePasswordData = (
    updatedPasswordDataObj: UpdatedPasswordsDataObj
  ) => {
    const db = firebase.firestore();

    const transactionRef = db
      .collection("passwords")
      .doc(updatedPasswordDataObj.id);
    transactionRef
      .update(updatedPasswordDataObj)
      .then(() => {
        setSnackbarMessage("Password updated!");
        setOpenSuccessSnackbar(true);
      })
      .catch((err) => {
        console.error("Error updating document: ", err);
        setSnackbarMessage("Something went wrong...");
        setOpenErrorSnackbar(true);
      });
  };

  console.log(passwords);
  return (
    <>
      <Feedback
        open={openSuccessSnackbar}
        handleClose={() => setOpenSuccessSnackbar(false)}
        severity="success"
        message={snackbarMessage}
      />
      <Feedback
        open={openErrorSnackbar}
        handleClose={() => setOpenErrorSnackbar(false)}
        severity="warning"
        message={snackbarMessage}
      />
      <Container id="material-table-container" maxWidth="md">
        <MaterialTable
          title="Passwords"
          columns={[
            { title: "Service", field: "service" },
            { title: "Username", field: "username" },
            {
              title: "Password",
              field: "password",
              render: (rowData) => (
                <PasswordInput
                  showPassword={rowData.showPassword}
                  passwordValue={rowData.password}
                  changePasswordDisplay={() =>
                    changePasswordDisplay(rowData.id)
                  }
                />
              ),
            },
            { title: "Created at", field: "createdAt", type: "date" },
          ]}
          data={passwordsData as PasswordDataObj[]}
          editable={{
            onRowUpdate: (newPasswordData, oldPasswordData) =>
              new Promise<void>((resolve) => {
                setTimeout(() => {
                  const updatedPasswordsDataObj: UpdatedPasswordsDataObj = {
                    id: newPasswordData.id,
                  };
                  if (newPasswordData.service !== oldPasswordData!.service) {
                    updatedPasswordsDataObj.service = newPasswordData.service;
                  } else if (
                    newPasswordData.username !== oldPasswordData!.username
                  ) {
                    updatedPasswordsDataObj.username = newPasswordData.username;
                  } else if (
                    updatedPasswordsDataObj.password !==
                    oldPasswordData!.password
                  ) {
                    updatedPasswordsDataObj.password = encryptPassword(
                      newPasswordData.password
                    );
                  } else return;
                  updatePasswordData(updatedPasswordsDataObj);
                  resolve();
                }, 600);
              }),
            onRowDelete: (passwordDataObj) =>
              new Promise<void>((resolve) => {
                setTimeout(() => {
                  deletePassword(passwordDataObj.id);
                  resolve();
                }, 600);
              }),
          }}
        />
      </Container>
    </>
  );
};

export default PasswordManager;
