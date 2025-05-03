import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent admin from accessing profile page
    if (!localUser.id || localUser.role === "ADMIN") {
      toast.error("Admins do not have a profile page.");
      navigate(localUser.role === "ADMIN" ? "/admin-dashboard" : "/login", {
        replace: true,
      });
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8732/api/users/${localUser.id}`
        );
        setUser(res.data);
        setName(res.data.name);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [localUser.id, localUser.role, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(
        `http://localhost:8732/api/users/${user.id}`,
        {
          ...user,
          name: name,
        }
      );
      setUser(res.data);
      setEdit(false);
      // Update name in localStorage for Navbar/avatar
      localStorage.setItem(
        "user",
        JSON.stringify({ ...localUser, name: res.data.name })
      );
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  if (!user)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Typography color="error">User not found</Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          minWidth: 340,
          maxWidth: 400,
          background: "linear-gradient(135deg, #f8fafc 60%, #e3f2fd 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#002D62",
              width: 80,
              height: 80,
              fontSize: 36,
              mb: 1,
            }}
          >
            {user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </Avatar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            {edit ? (
              <TextField
                margin="normal"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                autoFocus
              />
            ) : (
              <Typography variant="h5" fontWeight={700} mt={2} sx={{ flex: 1 }}>
                {user.name}
              </Typography>
            )}
            {!edit ? (
              <Tooltip title="Edit Name">
                <IconButton
                  color="primary"
                  onClick={() => setEdit(true)}
                  sx={{ mt: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Save">
                  <span>
                    <IconButton
                      color="success"
                      onClick={handleSave}
                      disabled={saving || !name.trim()}
                      sx={{ mt: 1 }}
                    >
                      {saving ? <CircularProgress size={22} /> : <SaveIcon />}
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Cancel">
                  <IconButton
                    color="error"
                    onClick={() => {
                      setEdit(false);
                      setName(user.name);
                    }}
                    sx={{ mt: 1 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
          <Divider sx={{ my: 2, width: "100%" }} />
          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" color="text.secondary" mt={0.5}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={0.5}>
              <strong>Role:</strong> {user.role}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
