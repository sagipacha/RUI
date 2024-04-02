import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#35bec3',
                p: 6,
            }}
        >
            <Container maxWidth="lg" sx={{ marginBottom: 10}}>
                <Grid container spacing={5} alignItems="center" justifyContent="center">
                    <Grid item xs={3} sm={1}>
                        <IconButton
                            component={Link} to="/"
                            size="large"
                            color="inherit"
                        >
                            <HomeIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <IconButton
                            component={Link} to="/favourites"
                            size="large"
                            color="inherit"
                        >
                            <FavoriteBorderOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <IconButton
                            component={Link} to="/profile"
                            size="large"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <IconButton
                            component={Link} to="/streetProducts"
                            size="large"
                            color="inherit"
                        >
                            <EmojiTransportationIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h3" color="text.primary" gutterBottom>
                            מי אנחנו
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            RUI
                            אתר שעוזר לך לתרום לאחרים בקלות ובפשטות, לעשות לכלל האוכלוסיות הקיימות בכמה לחיצות פשוטות. <br/>
                            תורמים יחד משנים יחד!
                            </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h3" color="text.primary" gutterBottom>
                            צרו איתנו קשר
                        </Typography>
                        <Typography variant="body2" color="praimary">
                            החילזון 8, תל אביב | ישראל
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: <a href="mailto:WIX2RUI@GMAIL.COM">WIX2RUI@GMAIL.COM</a>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            חייגו: <a href="tel:+972503135340">+972 50 313 5340</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            שמרו איתנו על קשר
                        </Typography>
                        <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Twitter />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://your-website.com/">
                            RUI
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
