import { AppBar, Box, Button, Toolbar } from "@material-ui/core";
import LogoPomocny from "../../assets/img/logo-pomocny.svg";
import LogoSignet from "../../assets/img/hand-peace-solid.svg";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { openDialog, FormType } from '../common/Dialog/store/dialogSlice';
import PersistentDrawerRight from "../Drawer/Drawer";
import { styled } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";

const LogoBox = styled(Box)(({ theme }) => ({
    height: "46px",
    cursor: "pointer",
    padding: "1rem 0",
}));

const StyledAppBar= styled(AppBar)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
       '& span': {
           fontSize: '0.8rem'
       }
    },
    
}));

const AppHeader = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const matches = useMediaQuery('(min-width:600px)', { noSsr: true });
    let buttons;


    function getLogo() {
        
        const logo = <LogoBox className="logo" component="img" alt="Logo pomocny.pl" type="button" 
                        src={ 
                            matches ?  LogoPomocny :  LogoSignet
                        }                     
                        onClick={(e)=>{
                            e.preventDefault();
                            navigate('/');
                        }}
                    />
        return logo;
     };

     function setAppBar() {

              matches ? (
                buttons = <><Button 
                            style={{height: '2.5rem', marginTop:'1rem'}}
                            variant="contained" 
                            color='primary' 
                            size={'medium'} 
                            type="button" 
                            onClick={(e)=>{
                                e.preventDefault();
                                navigate('/TaskForm');
                            }}
                        >
                            Stw??rz zadanie
                        </Button>
                        <Button 
                            variant="text" 
                            size={'medium'}
                            type="button"
                            onClick={() => dispatch(openDialog({ formType: FormType.loginDialog }))} 
                        >
                            Zaloguj si??
                        </Button>
                        <Button 
                            variant="text" 
                            size={'medium'}
                            onClick={() => dispatch(openDialog({ formType: FormType.rejestracja }))}
                        >
                            Zarejestruj si??
                        </Button>
                        </>

        ) : buttons = null;
        return buttons;
     };
    
    return (
    <header>
        <StyledAppBar position='static' color={'inherit'}>
            <Toolbar >
                    {getLogo()}
                    <Box display={"flex"} justifyContent={"flex-end"} flexGrow={"1"} gridColumnGap={"1.4rem"}>
                        {setAppBar()}
                        <PersistentDrawerRight />
                    </Box>              
            </Toolbar>
        </StyledAppBar>
    </header>
)}

export default AppHeader;