import {
    Avatar,
    Box,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from '@react-navigation/native';
import {faMicrosoft} from "@fortawesome/free-brands-svg-icons";
import AuthController from "../controllers/auth.controller";

export default function LoginScreen({navigation}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const authController = new AuthController();
        authController.login(data.get('email'), data.get('password')).then(r => console.log(r))
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <FontAwesomeIcon icon={faLock} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Addresse mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Se souvenir de moi"
                        />

                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Button type="submit" variant="outlined">Se connecter</Button>
                            <Button endIcon={<FontAwesomeIcon icon={faMicrosoft} />} variant="outlined">Se connecter avec Microsoft 365 </Button>
                        </div>

                        <Grid container>
                            <Grid item xs>
                                <Link to={{screen: 'ForgotPasswordScreen'}} variant="body2">
                                    Mot de passe oublié ?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={{screen: 'RegisterScreen'}} variant="body2">
                                    Vous n'avez pas de compte ? S'inscrire
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
};