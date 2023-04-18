import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "350px",
}));

export function Gallery() {
  return (
    <Container
      className="vg-gallery"
      maxWidth="lg"
    >
      <Grid container spacing={4}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4}>
            <Item
              sx={{
                ":hover": {
                  boxShadow: 10,
                },
              }}
              elevation={4}
            >
              <a href="/voici-gallery/voici/0">Link</a>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
