import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Link, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from '@mui/material';
import ListIcon from '@mui/icons-material/List';

// const drawerWidth = 200;

export default function NavBar(props) {
    const {drawerWidth, content} = props
    const location = useLocation()
    const path = location.pathname
    // console.log(location);
    // control navbar for small
    const [open, setOpen] = React.useState(false);
    function changeOpen(){
        setOpen(!open);
    }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <IconButton
        onClick={changeOpen}
        color="inherit"
        sx={{mr:2, display:{sm:"none"}}}
        >
            <ListIcon/>
        </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Application
          </Typography>
        </Toolbar>
      </AppBar>
      {/*big screens */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: {xs:"none", sm:"block"},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        {/* MAIN STUFF */}
          <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/" selected={"/" === path}>
                  <ListItemIcon>
                        <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/about" selected={"/about" === path}>
                  <ListItemIcon>
                        <InfoIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/create" selected={"/create" === path}>
                  <ListItemIcon>
                        <AddBoxIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Create"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* second on click for sm devices */}
      <Drawer
        variant="temporary"
        open = {open}
        onClose = {changeOpen}
        sx={{
          width: drawerWidth,
          display: {xs:"block", sm:"none"},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        {/* MAIN STUFF */}
          <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/" selected={"/" === path}>
                  <ListItemIcon>
                        <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/about" selected={"/about" === path}>
                  <ListItemIcon>
                        <InfoIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/create" selected={"/create" === path}>
                  <ListItemIcon>
                        <AddBoxIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Create"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
    
      </Box>
    </Box>
  );
}
