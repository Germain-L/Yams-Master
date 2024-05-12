import {Avatar, Box, CssBaseline, Grid, Paper, TextField, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import {Link} from "@react-navigation/native";

export default function ForgotPasswordScreen(){
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        });
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
                        Mot de passe oublié
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Réinitialiser mon mot de passe
                        </Button>

                        <Grid container>
                            <Grid item xs>
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