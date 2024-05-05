import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons"

export const SignOutButton = () => {
    return (
        <Button endIcon={<FontAwesomeIcon icon={faRightFromBracket} />}>Se déconnecter</Button>
    )
};