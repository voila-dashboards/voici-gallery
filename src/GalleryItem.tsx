import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

export interface IGalleryItemProps {
  title: string;
  repo_url: string;
  dashboard_url: string;
  image_path?: string;
  description?: string;
}

export function GalleryItem(props: IGalleryItemProps) {
  const openNewTab = useCallback(() => {
    window.open(props.dashboard_url, '_blank')?.focus();
  }, [props.dashboard_url]);
  return (
    <Card
      sx={theme => ({
        maxWidth: 350,
        height: 350,
        color: theme.palette.text.secondary,
        ':hover': {
          boxShadow: 20
        }
      })}
      elevation={6}
    >
      <CardMedia
        sx={{ height: 175, backgroundSize: 'contain', cursor: 'pointer' }}
        image={props.image_path ? `./images/${props.image_path}` : ''}
        title={props.title}
        onClick={openNewTab}
      />
      <CardContent sx={{ height: 100, cursor: 'pointer' }} onClick={openNewTab}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">{props.description}</Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: 'row-reverse', background: '#eaeaea' }}>
        <Button href={`${props.dashboard_url}`} target="_blank" size="small">
          Open
        </Button>
        <Button
          href={props.repo_url}
          target="_blank"
          color="secondary"
          size="small"
        >
          Source
        </Button>
      </CardActions>
    </Card>
  );
}
