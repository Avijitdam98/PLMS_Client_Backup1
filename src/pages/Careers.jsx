import React from 'react';
import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

const Careers = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Careers at FinTech Finance
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Join Our Team
          </Typography>
          <Typography paragraph>
            At FinTech Finance, we're always looking for talented individuals who are passionate
            about making a difference in the financial technology sector. Join us in our mission
            to revolutionize the lending industry.
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <WorkIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Current Openings
                </Typography>
                <Typography paragraph>
                  Explore our current job opportunities and find the perfect role for your skills
                  and aspirations.
                </Typography>
                <Button variant="contained" color="primary">
                  View Openings
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Internship Program
                </Typography>
                <Typography paragraph>
                  Launch your career with our comprehensive internship program designed for
                  students and recent graduates.
                </Typography>
                <Button variant="contained" color="primary">
                  Learn More
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <GroupsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Life at FinTech
                </Typography>
                <Typography paragraph>
                  Discover our company culture, benefits, and what makes FinTech Finance a
                  great place to work.
                </Typography>
                <Button variant="contained" color="primary">
                  Explore Culture
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Careers; 