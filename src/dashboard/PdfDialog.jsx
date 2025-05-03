import React, { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  Tooltip as MuiTooltip,
  Avatar,
  useTheme,
  alpha,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  PictureAsPdf,
  Close as CloseIcon,
  Download as DownloadIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Card } from "@mui/material";

const PdfDialog = ({
  open,
  onClose,
  docsLoading,
  selectedDocs = [],
  userRole,
  onVerify,
  processing = false,
  snackbar = { open: false },
  handleSnackbarClose = () => {},
}) => {
  const theme = useTheme();

  // Debug: Log the documents to console to check their structure
  useEffect(() => {
    // Check for required props
    if (typeof open === 'undefined' || !onClose) {
      console.warn('Required props missing in PdfDialog');
      return;
    }

    if (selectedDocs && selectedDocs.length > 0) {
      console.log("PDF Dialog Documents:", selectedDocs);
    }
  }, [open, onClose, selectedDocs]);

  // Function to safely get document ID
  const getDocumentId = (doc) => {
    if (!doc) return null;
    // Try different common ID properties
    return doc.id || doc.documentId || doc._id || doc.docId || doc.document_id;
  };

  // Don't render if required props are missing
  if (typeof open === 'undefined' || !onClose) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.9)
            : '#fff',
          backdropFilter: 'blur(10px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.18)',
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          }}
        >
          Loan Documents
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, minHeight: 400 }}>
        {docsLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <CircularProgress />
          </Box>
        ) : selectedDocs.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography 
              variant="body1"
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.text.primary
                  : undefined,
              }}
            >
              No documents found
            </Typography>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: theme.palette.mode === 'dark'
                  ? theme.palette.text.primary
                  : undefined,
              }}
            >
              Available Documents
            </Typography>
            {selectedDocs.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 2px 8px rgba(0,0,0,0.2)'
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.paper, 0.6)
                      : 'linear-gradient(135deg, #fffbe0, #f7f0c8)',
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="medium"
                        sx={{
                          color: theme.palette.mode === 'dark'
                            ? theme.palette.text.primary
                            : undefined,
                        }}
                      >
                        {doc.fileName || doc.documentType || "PDF Document"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          color: theme.palette.mode === 'dark'
                            ? theme.palette.text.secondary
                            : undefined,
                        }}
                      >
                        Uploaded on: {doc.uploadDate}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={doc.documentType}
                        size="small"
                        color="info"
                        sx={{ 
                          mr: 2,
                          background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.info.main, 0.2)
                            : '#e3f0ff',
                          color: theme.palette.mode === 'dark'
                            ? theme.palette.info.light
                            : '#1976d2',
                        }}
                      />

                      <MuiTooltip title="Download PDF" arrow>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            minWidth: 110,
                            textTransform: "none",
                            fontWeight: 600,
                            borderWidth: 2,
                          }}
                          href={`http://localhost:8732${doc.downloadUrl}`}
                          target="_blank"
                          startIcon={<DownloadIcon />}
                        >
                          Download
                        </Button>
                      </MuiTooltip>
                      {/* ADMIN VERIFY BUTTON - WITH FIX */}
                      {userRole === "ADMIN" && !doc.isVerified && getDocumentId(doc) && (
                        <MuiTooltip title="Verify Document" arrow>
                          <Button
                            variant="outlined"
                            color="success"
                            sx={{ ml: 1, minWidth: 100, fontWeight: 600 }}
                            onClick={() => onVerify(getDocumentId(doc))}
                            startIcon={<CheckCircleIcon />}
                          >
                            Verify
                          </Button>
                        </MuiTooltip>
                      )}
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{
            borderColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.5)
              : undefined,
            color: theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : undefined,
          }}
        >
          Close
        </Button>
      </DialogActions>

      <Backdrop
        open={Boolean(processing)}
        sx={{ 
          color: "#fff", 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : undefined,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={Boolean(snackbar?.open)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar?.severity || 'info'}
          sx={{ 
            width: "100%",
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.9)
              : undefined,
          }}
        >
          {snackbar?.message || ''}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default PdfDialog;
