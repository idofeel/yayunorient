import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
// #F6AA00

// 设置全局默认主题
export default createMuiTheme({
    palette: {
        primary: {
            main: '#F6AA00', //主要样式
            // light: '#757ce8', 
            // dark: '#002884',
            contrastText: '#fff',
        },
        secondary: green,
        text: {
            primary: "#F6AA00",
            secondary: "#F6AA00",
        },
    },
    status: {
        danger: 'orange',
    },
    typography: {
        useNextVariants: true,
    }
});


