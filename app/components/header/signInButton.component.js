import Button from '@mui/material/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindows} from "@fortawesome/free-brands-svg-icons";

export const SignInButton = () => {
  return (
      <Button endIcon={<FontAwesomeIcon icon={faWindows} />}>Se connecter avec </Button>
  )
};