import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface IGalleryItemProps {
  title: string;
  repo_url: string;
  dashboard_url: string;
  image_url?: string;
  description?: string;
}

export function GalleryItem(props: IGalleryItemProps) {
  return (
    <Card
      sx={(theme) => ({
        maxWidth: 350,
        height: 350,
        color: theme.palette.text.secondary,
        ":hover": {
          boxShadow: 20,
        },
      })}
      elevation={6}
    >
      <CardMedia
        sx={{ height: 175 }}
        image={props.image_url ?? ""}
        title={props.title}
      />
      <CardContent sx={{ height: 100 }}>
        <Typography gutterBottom variant="h6" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: "row-reverse" }}>
        <Button href={`${props.dashboard_url}`} target="_blank" size="small">
          Start
        </Button>
        <Button href={props.repo_url} target="_blank" color="secondary" size="small">Source</Button>
      </CardActions>
    </Card>
  );
}
