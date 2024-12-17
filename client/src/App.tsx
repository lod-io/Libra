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
} from "@mui/material";
import ChatInterface from "./components/ChatInterface";
import { TOPICS, DEFAULT_SYSTEM_PROMPT } from "./constants";
import { Topic } from "./types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SelectChangeEvent } from "@mui/material";
import { getAvailableModels } from "./services/api";

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
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Libra
          </Typography>

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
