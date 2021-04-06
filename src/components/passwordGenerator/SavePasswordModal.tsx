import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import SavePasswordForm from "./SavePasswordForm";

interface SavePasswordModalProps {
  modalOpen: boolean;
  passwordValue: string;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const getModalStyle = () => {
  const top = "50%";
  const left = "50%";

  return {
    top,
    left,
    transform: `translate(-${top}, -${left})`,
  };
};

const SavePasswordModal: React.FC<SavePasswordModalProps> = ({
  modalOpen,
  passwordValue,
  handleOpenModal,
  handleCloseModal,
}) => {
  const [modalStyle] = useState(getModalStyle);
  const [showSaveForm, setShowSaveForm] = useState(false);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    savePassworsBtn: {
      display: "flex",
      margin: "10px auto 0",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Fab
        className={classes.savePassworsBtn}
        color="primary"
        aria-label="add"
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {showSaveForm ? (
          <div style={modalStyle} className={classes.paper}>
            <SavePasswordForm
              handleCloseModal={handleCloseModal}
              passwordValue={passwordValue}
            />
          </div>
        ) : (
          <div style={modalStyle} className={classes.paper}>
            <h2>Do you want to save this password?</h2>
            <div
              className="modal-button-container"
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowSaveForm(true)}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModal}
              >
                No
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SavePasswordModal;
