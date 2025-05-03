import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const InvestorRelations = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Investor Relations
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to FinTech Finance Investor Relations
          </Typography>
          <Typography paragraph>
            We are committed to maintaining transparent and open communication with our investors.
            This section provides comprehensive information about our financial performance,
            corporate governance, and strategic initiatives.
          </Typography>
          
          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            Financial Reports
          </Typography>
          <Typography paragraph>
            Access our latest quarterly and annual financial reports, including balance sheets,
            income statements, and cash flow statements.
          </Typography>

          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            Corporate Governance
          </Typography>
          <Typography paragraph>
            Learn about our board of directors, corporate policies, and commitment to
            maintaining the highest standards of corporate governance.
          </Typography>

          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            Investor Resources
          </Typography>
          <Typography paragraph>
            Find important documents, presentations, and other resources for current and
            potential investors.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default InvestorRelations; 