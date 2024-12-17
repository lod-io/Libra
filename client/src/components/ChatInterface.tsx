import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Popover,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CloseIcon from "@mui/icons-material/Close";
import { getLLMResponse, summarizeChat } from "../services/api";
import { Message, Topic } from "../types";
import { MESSAGE_COUNT } from "../constants";
import ReactMarkdown from "react-markdown";

interface ChatInterfaceProps {
  model1: string;
  model2: string;
  topic: Topic;
  systemPrompt: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  model1,
  model2,
  topic,
  systemPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isActiveRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef<{ [key: string]: number }>({});
  const [summary, setSummary] = useState<string>("");
  const [showSummary, setShowSummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>(model2);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [summaryAnchorEl, setSummaryAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const summaryContentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const canStartConversation =
    model1 && model2 && topic && !isConversationActive && !isLoading;

  const handleConversationEnd = async (currentMessages: Message[]) => {
    if (currentMessages.length > 1) {
      setIsSummarizing(true);
      try {
        const summaryText = await summarizeChat(topic.kind, currentMessages);
        setSummary(summaryText);
        setShowSummary(true);
        const centerElement = document.body;
        setSummaryAnchorEl(centerElement);
      } catch (error) {
        console.error("Error getting summary:", error);
      } finally {
        setIsSummarizing(false);
      }
    }
  };

  const generateResponse = async (
    model: string,
    currentMessages: Message[]
  ) => {
    try {
      const currentCount = messageCountRef.current[model] || 0;

      if (currentCount >= MESSAGE_COUNT) {
        setIsConversationActive(false);
        isActiveRef.current = false;
        handleConversationEnd(currentMessages);
        return null;
      }
      const response = await getLLMResponse(
        currentMessages,
        model,
        systemPrompt
      );

      const newMessage: Message = {
        model: model,
        content: response,
      };

      const updatedMessages = [...currentMessages, newMessage];
      setMessages(updatedMessages);

      const newCount = currentCount + 1;
      messageCountRef.current = {
        ...messageCountRef.current,
        [model]: newCount,
      };

      if (updatedMessages) {
        setCurrentModel(model === model1 ? model2 : model1);
      }

      return updatedMessages;
    } catch (error) {
      console.error("Error generating response:", error);
      setIsConversationActive(false);
      isActiveRef.current = false;
      handleConversationEnd(currentMessages);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const startConversation = async () => {
    const initialMessage: Message = {
      model: model1,
      content: topic.content,
    };

    setIsConversationActive(true);
    isActiveRef.current = true;
    setMessages([initialMessage]);
    setCurrentModel(model2);

    messageCountRef.current = {
      [model1]: 1,
      [model2]: 0,
    };

    let currentMessages = [initialMessage];
    let model = model2;

    setIsLoading(true);
    while (isActiveRef.current) {
      const updatedMessages = await generateResponse(model, currentMessages);
      if (!updatedMessages) break;

      currentMessages = updatedMessages;
      model = model === model1 ? model2 : model1;
      setCurrentModel(model);

      if (isActiveRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 2500));
      }
    }
  };

  const handleStopConversation = () => {
    setIsConversationActive(false);
    isActiveRef.current = false;
    handleConversationEnd(messages);
  };

  const handlePauseResume = () => {
    if (isPaused) {
      setIsPaused(false);
      isActiveRef.current = true;
      continueConversation(currentModel, messages);
    } else {
      setIsPaused(true);
      isActiveRef.current = false;
    }
  };

  const continueConversation = async (
    model: string,
    currentMessages: Message[]
  ) => {
    let localModel = model;
    let msgs = currentMessages;

    setIsLoading(true);
    while (isActiveRef.current) {
      const updatedMessages = await generateResponse(localModel, msgs);
      if (!updatedMessages) break;

      msgs = updatedMessages;
      localModel = localModel === model1 ? model2 : model1;
      setCurrentModel(localModel);
    }
  };

  const handleCloseSummary = () => {
    setSummaryAnchorEl(null);
    setShowSummary(false);
  };

  useEffect(() => {
    if (showSummary && summaryContentRef.current) {
      summaryContentRef.current.focus();
    }
  }, [showSummary]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<PlayArrowIcon />}
          onClick={startConversation}
          disabled={!canStartConversation}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
          onClick={handlePauseResume}
          disabled={!isConversationActive || isLoading}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<StopIcon />}
          onClick={handleStopConversation}
          disabled={!isConversationActive}
        >
          End
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mb: 2,
              flexDirection: message.model === model1 ? "row" : "row-reverse",
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: "70%",
                ml: message.model === model1 ? 0 : "auto",
                mr: message.model === model1 ? "auto" : 0,
                backgroundColor:
                  message.model === model1 ? "primary.dark" : "secondary.dark",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <SmartToyIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{message.model}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography>{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Popover
        open={showSummary && Boolean(summaryAnchorEl)}
        anchorEl={summaryAnchorEl}
        onClose={handleCloseSummary}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            elevation: 8,
            sx: { outline: "none" },
          },
        }}
      >
        <Paper
          sx={{ p: 3, maxWidth: 800, position: "relative" }}
          ref={summaryContentRef}
          tabIndex={-1}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Summary</Typography>
            <IconButton onClick={handleCloseSummary} aria-label="Close summary">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          {isSummarizing ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Box
              sx={{
                "& p": { margin: "0.5em 0" },
                "& ul, & ol": { marginLeft: "1em" },
                "& code": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  padding: "0.2em 0.4em",
                  borderRadius: "3px",
                },
              }}
            >
              <ReactMarkdown>{summary}</ReactMarkdown>
            </Box>
          )}
        </Paper>
      </Popover>
    </Box>
  );
};

export default ChatInterface;
