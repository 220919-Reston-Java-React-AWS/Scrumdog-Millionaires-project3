import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Box, Grid } from '@mui/material';
import Navbar from '../../navbar/Navbar';


export default function Places(){
 
      const [checked, setChecked] = React.useState([1]);

      const continents = ['Antartica','Asia', 'Africa', 'Europe', 'North America', 'Oceania', 'South America']
    
      const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };
    
      return (
        <>

        <Navbar/>
        
        <Grid container  direction={'column'} display ={'flex'} alignItems={'center'} justifyContent={'center'} marginTop={30}>
        <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper'}}>

           
          {[0, 1, 2, 3,4,5,6].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={` ${continents[value]}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        </Grid>
        </>
      );
    }
    
