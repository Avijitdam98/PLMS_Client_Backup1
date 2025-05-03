import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/Article';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const IconHero = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: '#fff',
  fontSize: 36,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
}));

const EventCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const NewsEvents = () => {
  const theme = useTheme();

  const newsItems = [
    {
      id: 1,
      title: "FinTech Finance Launches New Digital Lending Platform",
      date: "March 15, 2024",
      icon: <ArticleIcon sx={{ fontSize: 36 }} />,
      category: "Company News",
      excerpt: "FinTech Finance introduces its next-generation digital lending platform, revolutionizing the loan application process with AI-powered assessments."
    },
    {
      id: 2,
      title: "Record Growth in SME Lending Portfolio",
      date: "March 10, 2024",
      icon: <TrendingUpIcon sx={{ fontSize: 36 }} />,
      category: "Business Growth",
      excerpt: "FinTech Finance reports 45% growth in SME lending portfolio, supporting over 1000 small businesses across India."
    },
    {
      id: 3,
      title: "Partnership with Leading Tech Companies",
      date: "March 5, 2024",
      icon: <GroupWorkIcon sx={{ fontSize: 36 }} />,
      category: "Partnerships",
      excerpt: "Strategic partnership announced with leading technology companies to enhance digital banking solutions."
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Financial Technology Summit 2024",
      date: "April 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Taj Coromandel, Chennai",
      icon: <EventIcon sx={{ fontSize: 36 }} />,
      category: "Conference"
    },
    {
      id: 2,
      title: "SME Growth Workshop",
      date: "April 20, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "ITC Grand Chola, Chennai",
      icon: <SchoolIcon sx={{ fontSize: 36 }} />,
      category: "Workshop"
    },
    {
      id: 3,
      title: "Digital Banking Innovation Day",
      date: "May 5, 2024",
      time: "9:30 AM - 4:00 PM",
      location: "Leela Palace, Chennai",
      icon: <LightbulbIcon sx={{ fontSize: 36 }} />,
      category: "Seminar"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Latest News Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 6,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Latest News
          </Typography>

          <Grid container spacing={4}>
            {newsItems.map((news) => (
              <Grid item xs={12} md={4} key={news.id}>
                <StyledCard>
                  <IconHero>{news.icon}</IconHero>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip
                      label={news.category}
                      size="small"
                      sx={{
                        mb: 2,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                      }}
                    />
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        color: theme.palette.text.primary,
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {news.date}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {news.excerpt}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 'auto',
                        borderRadius: 2,
                        textTransform: 'none',
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Upcoming Events Section */}
        <Box>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 6,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Upcoming Events
          </Typography>

          <Grid container spacing={4}>
            {upcomingEvents.map((event) => (
              <Grid item xs={12} md={4} key={event.id}>
                <EventCard>
                  <IconHero>{event.icon}</IconHero>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {event.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">{event.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">{event.time}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">{event.location}</Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: 'auto',
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                  >
                    Register Now
                  </Button>
                </EventCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsEvents; 