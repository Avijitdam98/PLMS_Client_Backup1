import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const projectOptions = [
  "Check EMI Status",
  "Pay EMI",
  "Loan Application Status",
  "Apply for a New Loan",
  "Document Assistance",
  "Contact Support",
];

const mockLoanData = {
  userLoans: [
    { id: "LN12345", status: "Active", emiDue: "₹12,500 due on May 10, 2025" },
    { id: "LN67890", status: "Under Review", emiDue: null },
  ],
  requiredDocuments: [
    "PAN Card",
    "Aadhar Card",
    "Bank Statement (last 6 months)",
    "Salary Slips (last 3 months)",
  ],
};

const Chatbot = ({ isLoggedIn, username }) => {
  const [messages, setMessages] = useState([
    {
      text: `👋 Hello${
        username ? ", " + username : ""
      }! I'm your PLMS Assistant. Ask me about EMIs, loan status, or documents. What would you like to do today?`,
      sender: "bot",
      options: projectOptions,
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (query) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let response;

      switch (query.toLowerCase()) {
        case "check emi status":
          if (!isLoggedIn) {
            response = {
              text: `ℹ️ You're not logged in, so here’s a sample EMI overview:\n\n• Loan ID: LN12345 (Active)\n  EMI: ₹12,500 due on May 10, 2025\n\nLogin to view your actual EMIs.`,
              options: ["Login", "Back to Main Menu"],
            };
            break;
          }
          response = {
            text:
              mockLoanData.userLoans.length > 0
                ? `Your active loans:\n${mockLoanData.userLoans
                    .map(
                      (loan) =>
                        `• Loan ID: ${loan.id} (${loan.status})\n  EMI: ${
                          loan.emiDue || "No EMI due"
                        }`
                    )
                    .join("\n")}`
                : "You have no active loans.",
            options: ["Back to Main Menu"],
          };
          break;

        case "pay emi":
          if (!isLoggedIn) {
            response = {
              text: `🔐 Please log in to proceed with EMI payment.`,
              options: ["Login", "Back to Main Menu"],
            };
            break;
          }
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setMessages((prev) => [
              ...prev,
              {
                text: "✅ Redirecting to the EMI payment portal...",
                sender: "bot",
                options: ["Back to Main Menu"],
              },
            ]);
            navigate("/pay-emi");
          }, 1500);
          response = { text: "Initiating payment session...", options: [] };
          break;

        case "loan application status":
          if (!isLoggedIn) {
            response = {
              text: `ℹ️ Here's a sample of your loan applications:\n\n• Loan ID: LN67890 (Under Review)\n\nLogin to view your actual applications.`,
              options: ["Login", "Back to Main Menu"],
            };
            break;
          }
          response = {
            text:
              mockLoanData.userLoans.length > 0
                ? `Your applications:\n${mockLoanData.userLoans
                    .map((loan) => `• Loan ID: ${loan.id} (${loan.status})`)
                    .join("\n")}`
                : "No loan applications found.",
            options: ["Back to Main Menu"],
          };
          break;

        case "apply for a new loan":
          if (!isLoggedIn) {
            response = {
              text: `🔐 Please log in to apply for a loan.`,
              options: ["Login", "Back to Main Menu"],
            };
            break;
          }
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/apply-loan");
          }, 1500);
          response = {
            text: "Redirecting to the loan application form...",
            options: [],
          };
          break;

        case "document assistance":
          response = {
            text: `📄 I can assist with document requirements or uploads.`,
            options: [
              "View Required Documents",
              "Upload Documents",
              "Back to Main Menu",
            ],
          };
          break;

        case "view required documents":
          response = {
            text: `📋 Required Documents:\n${mockLoanData.requiredDocuments
              .map((doc) => `• ${doc}`)
              .join("\n")}`,
            options: ["Upload Documents", "Back to Main Menu"],
          };
          break;

        case "upload documents":
          if (!isLoggedIn) {
            response = {
              text: `🔐 Please log in to upload your documents.`,
              options: ["Login", "Back to Main Menu"],
            };
            break;
          }
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/upload-documents");
          }, 1500);
          response = {
            text: "Redirecting to the document upload page...",
            options: [],
          };
          break;

        case "contact support":
          response = {
            text: `📞 Contact us at:\n• Email: support@plms.com\n• Phone: 1800-123-4567\nWould you like to start a live chat?`,
            options: ["Start Live Chat", "Back to Main Menu"],
          };
          break;

        case "start live chat":
          response = {
            text: "Connecting to a support agent... Please wait.",
            options: ["Back to Main Menu"],
          };
          break;

        case "back to main menu":
          response = {
            text: "How can I assist you today?",
            options: projectOptions,
          };
          break;

        case "login":
          navigate("/login");
          return;

        default:
          if (query.toLowerCase().startsWith("loan id")) {
            const loanId = query.split(" ").slice(-1)[0].toUpperCase();
            const loan = mockLoanData.userLoans.find((l) => l.id === loanId);
            response = loan
              ? {
                  text: `Loan ID: ${loan.id}\nStatus: ${loan.status}\nEMI: ${
                    loan.emiDue || "No EMI due"
                  }`,
                  options: ["Back to Main Menu"],
                }
              : {
                  text: `Loan ID ${loanId} not found.`,
                  options: ["Back to Main Menu"],
                };
          } else if (
            query.toLowerCase().includes("hello") ||
            query.toLowerCase().includes("hi")
          ) {
            response = {
              text: "👋 Hi there! I'm your PLMS Assistant. Ask me anything related to loans, documents, or EMI payments.",
              options: projectOptions,
            };
          } else if (query.toLowerCase().includes("thank")) {
            response = {
              text: "😊 You're welcome! Let me know if I can assist you with anything else.",
              options: ["Back to Main Menu"],
            };
          } else {
            response = {
              text: "🤔 Sorry, I didn’t get that. Please select an option or try asking again.",
              options: projectOptions,
            };
          }
      }

      setMessages((prev) => [
        ...prev,
        { text: response.text, sender: "bot", options: response.options },
      ]);
    }, 1000 + Math.random() * 400); // Slightly varied typing delay
  };

  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { text: option, sender: "user" }]);
    getBotResponse(option);
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const temp = input;
    setInput("");
    getBotResponse(temp);
  };

  return (
    <>
      <Tooltip title="Chat with PLMS Assistant">
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: "#1a73e8",
            color: "white",
            width: 56,
            height: 56,
            "&:hover": { backgroundColor: "#1557b0" },
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </IconButton>
      </Tooltip>

      {/* Chat Window */}
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            zIndex: 1000,
            width: 380,
            height: 520,
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1a73e8",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SmartToyIcon />
            <Typography variant="h6" fontWeight={500}>
              PLMS Assistant
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#f9fafb",
            }}
          >
            {messages.map((message, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {message.sender === "bot" && (
                    <Avatar sx={{ bgcolor: "#1a73e8", width: 32, height: 32 }}>
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: "75%",
                      backgroundColor:
                        message.sender === "user" ? "#1a73e8" : "#fff",
                      color: message.sender === "user" ? "white" : "black",
                      borderRadius:
                        message.sender === "user"
                          ? "16px 16px 0 16px"
                          : "16px 16px 16px 0",
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {message.text}
                    </Typography>
                  </Paper>
                  {message.sender === "user" && (
                    <Avatar sx={{ bgcolor: "#1a73e8", width: 32, height: 32 }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  )}
                </Box>
                {message.sender === "bot" && message.options?.length > 0 && (
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    {message.options.map((option, idx) => (
                      <Grid item xs={6} key={idx}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleOptionClick(option)}
                          sx={{
                            textTransform: "none",
                            fontSize: "0.85rem",
                            borderColor: "#1a73e8",
                            color: "#1a73e8",
                            "&:hover": {
                              backgroundColor: "rgba(26, 115, 232, 0.04)",
                              borderColor: "#1557b0",
                            },
                          }}
                        >
                          {option}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "#1a73e8", width: 32, height: 32 }}>
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Paper sx={{ p: 1.5, borderRadius: "16px 16px 16px 0" }}>
                  <Typography variant="body2">Typing...</Typography>
                </Paper>
              </Box>
            )}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress size={24} color="primary" />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: 1,
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about your loan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  backgroundColor: "#f1f3f4",
                },
              }}
              disabled={loading}
            />
            <IconButton
              onClick={handleSend}
              disabled={loading || !input.trim()}
              sx={{
                backgroundColor: "#1a73e8",
                color: "white",
                "&:hover": { backgroundColor: "#1557b0" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chatbot;
