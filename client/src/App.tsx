import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Popover,
} from "@mui/material";
import ChatInterface from "./components/ChatInterface";
import { TOPICS, DEFAULT_SYSTEM_PROMPT } from "./constants";
import { Topic } from "./types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SelectChangeEvent } from "@mui/material";
import { getAvailableModels } from "./services/api";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloudIcon from "@mui/icons-material/Cloud";
import ShareIcon from "@mui/icons-material/Share";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  XIcon,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [model1, setModel1] = useState("");
  const [model2, setModel2] = useState("");
  const [topic, setTopic] = useState<Topic>({
    kind: "",
    content: "",
  });
  const [customTopicInput, setCustomTopicInput] = useState<Topic>({
    kind: "custom",
    content: "",
  });
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [models, setModels] = useState<string[]>([]);
  const [infoAnchorEl, setInfoAnchorEl] = useState<HTMLElement | null>(null);
  const [shareAnchorEl, setShareAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    setTopic(randomTopic);
    const fetchModels = async () => {
      const models = await getAvailableModels();
      setModels(models);
      const randomIndex1 = Math.floor(Math.random() * models.length);
      const randomModel1 = models[randomIndex1];

      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * models.length);
      } while (randomIndex2 === randomIndex1);
      const randomModel2 = models[randomIndex2];
      setModel1(randomModel1);
      setModel2(randomModel2);
    };
    fetchModels();
  }, []);

  const handleModel1Change = (value: string) => {
    if (value !== model2) {
      setModel1(value);
    }
  };

  const handleModel2Change = (value: string) => {
    if (value !== model1) {
      setModel2(value);
    }
  };

  const handleGithubClick = () => {
    window.open("https://github.com/lod-io/Libra", "_blank");
  };

  const handleCloudClick = () => {
    window.open("https://clod.io", "_blank");
  };

  const handleTopicChange = (event: SelectChangeEvent<string>) => {
    const selectedTopicContent = event.target.value;
    if (selectedTopicContent === "custom") {
      setTopic({ kind: "custom", content: "" });
    } else {
      const selectedTopic = TOPICS.find(
        (topic) => topic.content === selectedTopicContent
      );
      if (selectedTopic) {
        setTopic(selectedTopic);
      }
    }
  };

  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setCustomTopicInput({ kind: "custom", content });
    setTopic({ kind: "custom", content });
  };

  const handleCustomTopicSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && customTopicInput.content.trim()) {
      const newTopic: Topic = {
        kind: "predefined",
        content: customTopicInput.content.trim(),
      };
      TOPICS.push(newTopic);
      setTopic(newTopic);
      setCustomTopicInput({ kind: "custom", content: "" });
    }
  };

  const handleSystemPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystemPrompt(e.target.value);
  };

  const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            py: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" component="h1">
              Libra: Controversial AI Chats
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                color="inherit"
                aria-label="description"
                onClick={handleInfoClick}
              >
                <InfoIcon />
              </IconButton>
              <Popover
                open={Boolean(infoAnchorEl)}
                anchorEl={infoAnchorEl}
                onClose={handleInfoClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box sx={{ p: 2, maxWidth: 600 }}>
                  <Typography variant="body1" gutterBottom>
                    Welcome to Libra, where AI chats with AI!
                  </Typography>
                  <Typography component="ul" sx={{ pl: 2 }}>
                    <li>🔥 Stir the pot between AI models in real-time</li>
                    <li>💡 Choose from predefined topics or create your own</li>
                    <li>🌈 Customize the system prompt</li>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    We're powered by{" "}
                    <a
                      href="https://www.clod.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#00BFFF" }}
                    >
                      CLōD
                    </a>
                    , an AI inference cloud platform.
                  </Typography>
                </Box>
              </Popover>
              <IconButton
                color="inherit"
                aria-label="github"
                onClick={handleGithubClick}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="cloud"
                onClick={handleCloudClick}
              >
                <CloudIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="share"
                onClick={handleShareClick}
              >
                <ShareIcon />
              </IconButton>
              <Popover
                open={Boolean(shareAnchorEl)}
                anchorEl={shareAnchorEl}
                onClose={handleShareClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 1, display: "flex", gap: 1 }}>
                  <TwitterShareButton
                    url={window.location.href}
                    title="Check out Libra - Compare AI Models in Real-time!"
                  >
                    <XIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={window.location.href}
                    title="Libra - Compare AI Models"
                    summary="A platform for comparing different AI models in real-time conversation"
                    source="Libra"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <FacebookShareButton
                    url={window.location.href}
                    hashtag="#Libra #AI #Chatrooms"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </Box>
              </Popover>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Topic</InputLabel>
              <Select
                value={topic.kind === "custom" ? "custom" : topic.content}
                label="Topic"
                onChange={handleTopicChange}
              >
                <MenuItem value="custom">Custom</MenuItem>
                {TOPICS.map((topic, index) => (
                  <MenuItem
                    key={`${topic.kind}-${index}`}
                    value={topic.content}
                  >
                    {topic.content.length > 90
                      ? topic.content.substring(0, 90) + "..."
                      : topic.content}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {topic.kind === "custom" && (
              <TextField
                fullWidth
                label="Custom Topic"
                variant="outlined"
                value={customTopicInput.content}
                onChange={handleCustomTopicChange}
                onKeyDown={handleCustomTopicSubmit}
                placeholder="Enter custom topic"
              />
            )}
          </Box>

          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Left Model</InputLabel>
                    <Select
                      value={model1}
                      label="Left Model"
                      onChange={(e) => handleModel1Change(e.target.value)}
                    >
                      {models.map((model) => (
                        <MenuItem
                          key={model}
                          value={model}
                          disabled={model === model2}
                        >
                          {model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Right Model</InputLabel>
                    <Select
                      value={model2}
                      label="Right Model"
                      onChange={(e) => handleModel2Change(e.target.value)}
                    >
                      {models.map((model) => (
                        <MenuItem
                          key={model}
                          value={model}
                          disabled={model === model1}
                        >
                          {model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  fullWidth
                  label="System Prompt"
                  variant="outlined"
                  value={systemPrompt}
                  onChange={handleSystemPromptChange}
                  multiline
                  rows={4}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <ChatInterface
              model1={model1}
              model2={model2}
              topic={topic.kind === "custom" ? customTopicInput : topic}
              systemPrompt={systemPrompt}
            />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
