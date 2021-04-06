import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface FeedbackProps {
  open: boolean;
  handleClose: () => void;
  severity: "success" | "info" | "warning" | "error";
  message: string;
}
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Feedback: React.FC<FeedbackProps> = ({
  open,
  handleClose,
  severity,
  message,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
