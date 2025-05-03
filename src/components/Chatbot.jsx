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
import { keyframes } from '@mui/system';

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

// Modern fade-in animation for messages
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
      const q = query.toLowerCase();

      // Project-specific Q&A
      if (q.includes("document") && q.includes("professional loan")) {
        response = {
          text: `📄 For a professional loan, you typically need:
• PAN Card
• Aadhar Card
• Bank Statement (last 6 months)
• Salary Slips (last 3 months)
• Professional qualification proof (if applicable)`,
          options: ["Upload Documents", "Back to Main Menu"],
        };
      } else if (q.includes("minimum loan amount") || q.includes("min loan")) {
        response = {
          text: `💡 The minimum loan amount for a professional loan is ₹1,00,000.`,
          options: ["Apply for a New Loan", "Back to Main Menu"],
        };
      } else if (q.includes("interest rate")) {
        response = {
          text: `💰 Our professional loan interest rates start from 10.5% per annum. The exact rate depends on your profile and loan amount.`,
          options: ["Apply for a New Loan", "Back to Main Menu"],
        };
      } else if (q.includes("eligibility") && (q.includes("business") || q.includes("professional"))) {
        response = {
          text: `✅ Eligibility for a professional/business loan:
• Indian resident, age 21-65
• Practicing professional (doctor, CA, lawyer, etc.)
• Minimum 2 years of work experience
• Satisfactory credit score` ,
          options: ["Apply for a New Loan", "Back to Main Menu"],
        };
      } else if (q.includes("kyc")) {
        response = {
          text: `🆔 KYC documents required:
• PAN Card
• Aadhar Card
• Address Proof
You can upload these in the 'Upload Documents' section.`,
          options: ["Upload Documents", "Back to Main Menu"],
        };
      } else if (q.includes("prepay") || q.includes("prepayment")) {
        response = {
          text: `🔄 Yes, you can prepay your loan. Prepayment charges may apply as per your loan agreement. Please contact support for details.`,
          options: ["Contact Support", "Back to Main Menu"],
        };
      } else if (q.includes("approval time") || q.includes("how long") || q.includes("processing time")) {
        response = {
          text: `⏳ Loan approval usually takes 2-3 business days after document submission. We'll notify you by email/SMS.`,
          options: ["Check Loan Application Status", "Back to Main Menu"],
        };
      } else if (q.includes("reset password") || q.includes("forgot password")) {
        response = {
          text: `🔑 To reset your password, click 'Forgot Password' on the login page and follow the instructions.`,
          options: ["Go to Login", "Back to Main Menu"],
        };
      } else if (q.includes("contact") && (q.includes("support") || q.includes("customer"))) {
        response = {
          text: `📞 Contact us at:
• Email: support@plms.com
• Phone: 1800-123-4567
Would you like to start a live chat?`,
          options: ["Start Live Chat", "Back to Main Menu"],
        };
      } else if (q.includes("loan status") || q.includes("application status")) {
        response = {
          text: `🔎 You can check your loan application status in your dashboard or by selecting 'Loan Application Status' below.`,
          options: ["Loan Application Status", "Back to Main Menu"],
        };
      } else if (q.includes("emi") && q.includes("pay")) {
        response = {
          text: `💳 To pay your EMI, go to the 'Pay EMI' section in your dashboard or select 'Pay EMI' below.`,
          options: ["Pay EMI", "Back to Main Menu"],
        };
      } else if (q.includes("emi") && (q.includes("due") || q.includes("status"))) {
        response = {
          text: `📅 You can check your EMI status in your dashboard or by selecting 'Check EMI Status' below.`,
          options: ["Check EMI Status", "Back to Main Menu"],
        };
      } else if (q.includes("apply") && q.includes("loan")) {
        response = {
          text: `📝 You can apply for a new professional loan by clicking 'Apply for a New Loan' below or visiting the loan application page.`,
          options: ["Apply for a New Loan", "Back to Main Menu"],
        };
      } else if (q.includes("upload") && q.includes("document")) {
        response = {
          text: `📤 You can upload your documents in the 'Upload Documents' section of your dashboard.`,
          options: ["Upload Documents", "Back to Main Menu"],
        };
      } else if (q.includes("dashboard")) {
        response = {
          text: `🏠 Your dashboard provides access to your loan applications, EMI status, and document uploads.`,
          options: ["Go to Dashboard", "Back to Main Menu"],
        };
      } else if (q.includes("news") || q.includes("events")) {
        response = {
          text: `📰 You can view the latest news and upcoming events in the 'News & Events' section.`,
          options: ["Go to News & Events", "Back to Main Menu"],
        };
      } else {
        switch (q) {
        case "check emi status":
          if (!isLoggedIn) {
            response = {
                text: `ℹ️ You're not logged in, so here's a sample EMI overview:\n\n• Loan ID: LN12345 (Active)\n  EMI: ₹12,500 due on May 10, 2025\n\nLogin to view your actual EMIs.`,
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
            if (q.toLowerCase().startsWith("loan id")) {
              const loanId = q.split(" ").slice(-1)[0].toUpperCase();
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
              q.toLowerCase().includes("hello") ||
              q.toLowerCase().includes("hi")
          ) {
            response = {
              text: "👋 Hi there! I'm your PLMS Assistant. Ask me anything related to loans, documents, or EMI payments.",
              options: projectOptions,
            };
            } else if (q.toLowerCase().includes("thank")) {
            response = {
              text: "😊 You're welcome! Let me know if I can assist you with anything else.",
              options: ["Back to Main Menu"],
            };
          } else {
            response = {
                text: "🤔 Sorry, I didn't get that. Please select an option or try asking again.",
              options: projectOptions,
            };
            }
          }
      }

      setMessages((prev) => [
        ...prev,
        { text: response.text, sender: "bot", options: response.options },
      ]);
    }, 1000 + Math.random() * 400);
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
            background: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)",
            color: "white",
            width: 60,
            height: 60,
            borderRadius: '50%',
            boxShadow: "0 6px 24px rgba(109, 40, 217, 0.18)",
            border: 'none',
            '&:hover': { background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)" },
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
            width: { xs: 320, sm: 380 },
            height: { xs: 420, sm: 520 },
            display: "flex",
            flexDirection: "column",
            borderRadius: "24px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 12px 40px rgba(109, 40, 217, 0.18)",
            border: '1px solid rgba(109, 40, 217, 0.10)',
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SmartToyIcon />
            <Typography variant="h6" fontWeight={600}>
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
              background: "rgba(245,247,255,0.7)",
            }}
          >
            {messages.map((message, index) => (
              <Box key={index} sx={{ animation: `${fadeIn} 0.4s` }}>
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
                    <Avatar sx={{ bgcolor: "#6d28d9", width: 32, height: 32 }}>
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: "75%",
                      background:
                        message.sender === "user"
                          ? "linear-gradient(90deg, #6d28d9 0%, #4c1d95 100%)"
                          : "rgba(255,255,255,0.95)",
                      color: message.sender === "user" ? "white" : "#1e293b",
                      borderRadius:
                        message.sender === "user"
                          ? "20px 20px 0 20px"
                          : "20px 20px 20px 0",
                      boxShadow: '0 2px 8px rgba(109, 40, 217, 0.08)',
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {message.text}
                    </Typography>
                  </Paper>
                  {message.sender === "user" && (
                    <Avatar sx={{ bgcolor: "#6d28d9", width: 32, height: 32 }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  )}
                </Box>
                {message.sender === "bot" && message.options?.length > 0 && (
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    {message.options.map((option, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleOptionClick(option)}
                          sx={{
                            textTransform: "none",
                            fontSize: "0.95rem",
                            borderColor: "#6d28d9",
                            color: "#6d28d9",
                            borderRadius: 2,
                            fontWeight: 600,
                            '&:hover': {
                              background: "rgba(109, 40, 217, 0.06)",
                              borderColor: "#4c1d95",
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
                <Avatar sx={{ bgcolor: "#6d28d9", width: 32, height: 32 }}>
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Paper sx={{ p: 1.5, borderRadius: "20px 20px 20px 0" }}>
                  <Typography variant="body2">Typing...</Typography>
                </Paper>
              </Box>
            )}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress size={24} color="secondary" />
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
              background: "rgba(255,255,255,0.95)",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about your loan, documents, or support..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  background: "rgba(245,247,255,0.7)",
                  fontSize: '1rem',
                },
              }}
              disabled={loading}
            />
            <IconButton
              onClick={handleSend}
              disabled={loading || !input.trim()}
              sx={{
                background: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)",
                color: "white",
                borderRadius: '50%',
                width: 44,
                height: 44,
                '&:hover': { background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)" },
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
