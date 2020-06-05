/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '10px',
    border: '1px solid rgba(0,0,0,0.125)'
  },
  note: {
      display:'flex',
      justifyContent: 'left'  
  }
});

const agendaNotes = ({ notes }) => {
  const classes = useStyles();
  return (
    <Fragment>
        {notes ?
            (notes.map((note, index) => 
                (<Card className={classes.root} key={index} raised={true}>
                    <CardActionArea>
                        <CardHeader
                        title={` Voice: ${note.voice}`}
                        subheader={note.createdAt}/>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.note}>
                               {`NOTES: ${note.note}`} 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                ))): null
        }
    </Fragment>
  )
};

export default agendaNotes;