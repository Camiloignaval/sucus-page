import { useRouteError } from "react-router-dom";
import { Typography } from "@mui/material";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Typography sx={{ mt: 5 }} variant="h2">
      Ooops... Parece que te has perdido
    </Typography>
  );
};
