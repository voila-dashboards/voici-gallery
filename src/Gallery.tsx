import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import { GalleryItem, IGalleryItemProps } from './GalleryItem';

import dashboards from './dashboard.json';

export function Gallery() {
  return (
    <Box className="vg-gallery">
      <Container className="vg-gallery-content" maxWidth="lg">
        <Grid container spacing={4}>
          {(dashboards as IGalleryItemProps[]).map((item, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4}>
              <GalleryItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box className={'vg-footer'}>Powered by Voici and GitHub </Box>
    </Box>
  );
}
