import BusinessIcon from "@mui/icons-material/Business";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const teamMembers = [
  {
    name: "Avijit",

    image:
      "https://avatars.githubusercontent.com/u/84221186?s=400&u=a96d86bd5930864c3f1994be6a7909aa51bd447e&v=4",
  },
  {
    name: "Himanshu",

    image:
      "https://avatars.githubusercontent.com/u/198864095?s=400&u=f904bb92d8431a6d3dab81475e3e44dd4da062fc&v=4",
  },
  {
    name: "Rahul",

    image:
      "https://avatars.githubusercontent.com/u/206446477?s=400&u=5a26e8da393412051f97edb1a0cd4120b9cf4471&v=4",
  },
  {
    name: "Suman",

    image:
      "https://avatars.githubusercontent.com/u/182713931?s=400&u=018cb83bbe18030001933bfbab71449ba0009fff&v=4",
  },
  {
    name: "Aryan",
    image:
      "https://avatars.githubusercontent.com/u/187367139?s=400&u=2e90fd35211770138b63950609ddb75580ed604f&v=4",
  },
  {
    name: "Chaitanya",
    image:
      "https://avatars.githubusercontent.com/u/170529120?s=400&u=efda94b8d657f05f5e9de88c5b4a6dccba1a6fc0&v=4",
  },
];

const stats = [
  {
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    value: "10+",
    label: "Years in Business",
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    value: "1000+",
    label: "Happy Clients",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    value: "50+",
    label: "Awards Won",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    value: "99%",
    label: "Success Rate",
  },
];

export default function AboutUs() {
  return (
    <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            About Us
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            We are a leading financial services company dedicated to providing
            innovative solutions and exceptional service to our clients.
          </Typography>
        </Box>

        {/* Mission and Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To empower individuals and businesses with accessible
                  financial solutions, helping them achieve their goals and
                  secure their future through innovative technology and
                  personalized service.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  Our Vision
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To be the most trusted and preferred financial partner,
                  recognized for our commitment to excellence, innovation, and
                  customer satisfaction in the financial services industry.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Our Achievements
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StyledCard>
                  {stat.icon}
                  <Typography
                    variant="h4"
                    sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StyledCard>
                  <Avatar
                    src={member.image}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {member.position}
                  </Typography>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
