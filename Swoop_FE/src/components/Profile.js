
import { useEffect } from 'react'
import Box from '@mui/material/Box';
import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { profile } from '../services'
import AddItem from './AddItem';
import Cart from './cart';
import { useContext } from 'react'
import DataContext from '../context'
import EditItem from './EditItem';
import Delete from './Delete';



export default function Profile({ items, setItems, setFilteredItems }) {

  const { user, setUser } = useContext(DataContext);

  const firstName = user.firstName || 'Missing';
  const lastName = user.lastName || 'No.';
  const email = user.email || 'Missing';
  const phoneNumber = user.phoneNumber || 'missing';

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await profile();
      if (userInfo) {
        const { firstName, lastName, email, phoneNumber, _id, itemsForSale, itemsBought } = userInfo;
        setUser((prevState) => {
          return {
            ...prevState,
            firstName,
            lastName,
            email,
            phoneNumber,
            _id,
            itemsForSale,
            itemsBought
          };
        });
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile();
  }, []);

  return (
    <Box >
      <Typography variant='h4' m={4}>
        Welcome {firstName}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {xs:'column', md: 'row'},
          alignItems: 'center',
          p: 1,
          m: 1,
          borderRadius: 1
        }}
      >
        <Box sx={{
          width: {xs: '250px', sm: '400px'},
          height: {xs: '350px', md: '450px'},
          margin: {xs: '2px', sm: '20px'},
          marginTop: '5px',
          marginBottom: '5px',
        }}>

          <Card sx={{ maxWidth: 350, padding: {xs: '2px', sm: '10px'}, height: '100%', background: '#EBE6DD' }}>
            <CardHeader sx={{ height: 5 }}></CardHeader>
            <CardMedia sx={{ height: 100 }} >
              <Avatar sx={{ backgroundColor: '#E25F1C', width: 70, height: 70, fontSize: 30, margin: 'auto' }}>{firstName.slice(0,1) + lastName.slice(0,1)}</Avatar>
            </CardMedia>
            <CardContent sx={{ alignFont: 'center' }}>
              <Typography gutterBottom variant='h5' component='div' align='center'>
                {firstName + ' ' + lastName}
              </Typography>
              <List sx={{ width: '100%', maxWidth: 360, marginTop: 1 }}>
                <ListItem>
                  <ListItemText primary='Email address' secondary={email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Phone number' secondary={phoneNumber} />
                </ListItem>
              </List>
            </CardContent>

          </Card>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            border: '1',
            borderColor: '#EBE6DD',
            p: 1,
            ml: 10,
            height: 450,
          }}
        >
          <Box>
            <AddItem setItems={setItems} setFilteredItems={setFilteredItems} items={items} />
            <Typography variant='h5' m={2}>
              Items for sale
            </Typography>
            <Grid container
              direction='row'
              alignItems='center'
              columnSpacing={2}

              sx= {{overflow: 'auto'}}
            >
              {items ? items.filter((item) => item.seller === user._id).sort((a, b) => new Date(b.date_added) - new Date(a.date_added)).slice(0, 5).map((item, index) =>
              (
                <Grid item key={item._id} >
                  <Card m={2} sx={{ width: 135, height: 190 }}>
                      <CardContent sx={{ padding: 0 }}>
                        <img
                          src={`${item.image.url}`}
                          height='100px'
                          width='100%'
                          alt={item.title}
                        />
                      </CardContent>
                    <CardHeader
                      sx={{padding: 1, margin: 0}}
                      titleTypographyProps={{
                        fontSize: 14,
                        margin: 0
                      }}
                      subheaderTypographyProps={{
                        fontSize: 12,
                        margin: 0,
                      }}
                      title={item.title}
                      subheader={'£' + item.price}

                    />
                    <CardContent sx={{ padding: 0}}>
                      <Stack direction={'row'} spacing={1}>
                        <EditItem setFilteredItems={setFilteredItems} setItems={setItems}
                        items={items} item={item}/>
                         <Delete setFilteredItems={setFilteredItems} setItems={setItems}
                        items={items} item={item}/>
                        </Stack>
                    </CardContent>
                  </Card>
                </Grid>)) : <p>No items for sale yet..</p>
              }
            </Grid>
          </Box>
        </Box>
      </Box>
      <Cart />
    </Box>

  )
}