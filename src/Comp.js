import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { MyContext } from './App';
import {useContext} from "react";
function MainData(){
    let {apidata,load} = useContext(MyContext);
    if(apidata.message){
      return <h1>{apidata.message}</h1>
    }
    if(apidata.hits !== undefined && apidata.hits.length === 0){
      return <h1>no records found</h1>
    }
    function CardBox(){
      let {del} = useContext(MyContext);
      return apidata.hits.map((val,ind) => {
        let {author,num_comments,title,url} = val;
        return <Grid item xs={12} md={12} key={ind}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {author} | {num_comments} comments
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><a href={url} target="_blank" rel="noreferrer">read more</a></Button>
            <Button size="small" color="error" onClick={() => del(ind)}>remove</Button>
          </CardActions>
        </Card>
      </Grid>
      })
    }
    return <Grid container spacing={2}>
      {load && <h1>Loading...</h1>}
      {apidata.hits && !load && <CardBox />}
    </Grid>
}
function MainCompo(){
  let {apidata,inpch,pagech} = useContext(MyContext);
  let {nbPages,page} = apidata;
    return <Container maxWidth="sm">
              <h1>NEWS API</h1>
              <input type="search" className="search" onChange={(e) => inpch(e.target.value)} placeholder="search something..." />
              <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center','& > *': {m: 1,},}}>
                <ButtonGroup variant="contained" aria-label="outlined button group">
                  {page > 1 && <Button color="info" onClick={() => pagech(page - 1)}>prev</Button>}
                  <Button>{page} of {nbPages}</Button>
                  {page < nbPages && <Button color="info" onClick={() => pagech(page + 1)}>next</Button>}
                </ButtonGroup>
              </Box>
              <Box sx={{ flexGrow: 1 }}> <MainData /> </Box>
          </Container>
}
export default MainCompo;