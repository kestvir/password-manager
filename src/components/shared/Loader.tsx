import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const Loader: React.FC = () => {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main,
    },
  }))(LinearProgress);

  return <BorderLinearProgress />;
};

export default Loader;
