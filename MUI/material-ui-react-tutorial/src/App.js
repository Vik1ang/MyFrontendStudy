import logo from './logo.svg';
import './App.css';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save"
import DeleteIcon from "@material-ui/icons/Delete"
import MenuIcon from "@material-ui/icons/Menu"
import {useState} from "react";
import 'fontsource-roboto';

import Typography from "@material-ui/core/Typography";

import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@material-ui/core";

import {makeStyles, ThemeProvider, createMuiTheme} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #333, #FF8E53)',
        border: 0,
        marginBottom: 15,
        borderRadius: 15,
        color: 'white',
        padding: '0 30px'
    }
})

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500],
        }
    }
})

function ButtonStyled() {
    const classes = useStyles();
    return <Button className={classes.root}>Test Styled Button</Button>;
}

function CheckboxExample() {
    const [checked, setChecked] = useState();

    return (
        <div>
            <FormControlLabel control={<Checkbox checked={checked}
                                                 onChange={(e) => setChecked(e.target.checked)}
                                                 color="primary"
                                                 icon={<DeleteIcon/>}
                                                 checkedIcon={<SaveIcon/>}
                                                 inputProps={{'arial-label': 'secondary checkbox'}}
            />} label="Testing checkbox"/>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <div className="App">
                    <header className="App-header">
                        <AppBar>
                            <Toolbar>
                                <IconButton>
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="h6">
                                    MUI Themeing
                                </Typography>
                                <Button>
                                    Login
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Typography variant="h1">
                            Welcome to MUI
                        </Typography>
                        <Typography variant="h2">
                            Learn how to use MUI
                        </Typography>
                        <ButtonStyled/>
                        <TextField variant="outlined" color="secondary" type="email" label="The time"
                                   value="test@test.com"/>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={3} sm={6}>
                                <Paper style={{height: 75, width: 50,}}/>
                            </Grid>
                            <Grid item xs={3} sm={6}>
                                <Paper style={{height: 75, width: 50,}}/>
                            </Grid>
                            <Grid item xs={3} lg={12}>
                                <Paper style={{height: 75, width: 50,}}/>
                            </Grid>
                        </Grid>

                        <CheckboxExample/>
                        <ButtonGroup variant="contained" color="primary">
                            <Button startIcon={<SaveIcon/>} endIcon={<SaveIcon/>} size="large" style={{fontSize: 24}}
                                    onClick={() => alert('hello')}
                                    variant="contained"
                                    color="primary">
                                Save
                            </Button>
                            <Button startIcon={<DeleteIcon/>} endIcon={<DeleteIcon/>} size="large"
                                    style={{fontSize: 24}}
                                    onClick={() => alert('hello')}
                                    variant="contained"
                                    color="secondary">
                                Discard
                            </Button>
                        </ButtonGroup>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>
                </div>
            </Container>
        </ThemeProvider>

    );
}

export default App;
