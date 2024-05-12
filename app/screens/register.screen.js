import {faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    Avatar,
    Box,
    Checkbox, Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from '@react-navigation/native';
import AuthController from "../controllers/auth.controller";

export default function RegisterScreen({navigation}){

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const authController = new AuthController();

        authController.register(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password')).then(r => console.log(r));

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <FontAwesomeIcon icon={faLock} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Créer mon compte
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Prénom"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Nom de famille"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Addresse Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                required={true}
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="En vous inscrivant, vous acceptez le traitement de vos données personnelles par Yams Master, tel que décrit dans la déclaration de confidentialité."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        S'inscrire
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={{screen: 'LoginScreen'}} variant="body2">
                                Vous avez déjà un compte ? S'identifier
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};