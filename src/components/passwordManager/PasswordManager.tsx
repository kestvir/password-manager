import React, { useState, useContext, useEffect } from "react";
import firebase from "../../firebase";
import Container from "@material-ui/core/Container";
import MaterialTable from "material-table";
import PasswordInput from "../shared/PasswordInput";
import {
  PasswordsContext,
  PasswordDataObj,
} from "../../contexts/PasswordsContext";

type UpdatedPasswordsDataObj = {
  id: string;
  service?: string;
  username?: string;
};

const PasswordManager: React.FC = () => {
  const { passwords } = useContext(PasswordsContext);
  const [passwordsData, setPasswordsData] = useState<PasswordDataObj[] | []>(
    []
  );

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
        alert("Password deleted!");
      })
      .catch(function (err) {
        console.error("Error removing password: ", err);
        alert(err);
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
        alert("Password data updated!");
      })
      .catch((err) => {
        console.error("Error updating document: ", err);
        alert(err);
      });
  };

  console.log(passwords);
  return (
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
                changePasswordDisplay={() => changePasswordDisplay(rowData.id)}
              />
            ),
          },
          { title: "Created at", field: "createdAt", type: "date" },
        ]}
        data={passwordsData as PasswordDataObj[]}
        editable={{
          onRowUpdate: (newPasswordData, oldPasswordData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const updatedPasswordsDataObj: UpdatedPasswordsDataObj = {
                  id: newPasswordData.id,
                };
                if (newPasswordData.service !== oldPasswordData!.service) {
                  updatedPasswordsDataObj.service = newPasswordData.service;
                } else if (
                  newPasswordData.username !== oldPasswordData!.username
                ) {
                  updatedPasswordsDataObj.username = newPasswordData.username;
                } else return;
                updatePasswordData(updatedPasswordsDataObj);
              }, 600);
            }),
          onRowDelete: (passwordDataObj) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                deletePassword(passwordDataObj.id);
              }, 600);
            }),
        }}
      />
    </Container>
  );
};

export default PasswordManager;
