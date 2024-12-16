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
import CloseIcon from "@mui/icons-material/Close";
import { getLLMResponse, summarizeChat } from "../services/api";
import { Message } from "../types";
import { MESSAGE_COUNT } from "../constants";

interface ChatInterfaceProps {
  model1: string;
  model2: string;
  topic: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  model1,
  model2,
  topic,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isActiveRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef<{ [key: string]: number }>({});
  const [summary, setSummary] = useState<string>("");
  const [showSummary, setShowSummary] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

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
        const summaryText = await summarizeChat(currentMessages);
        setSummary(summaryText);
        setShowSummary(true);
        setAnchorEl(messagesEndRef.current);
      } catch (error) {
        console.error("Error getting summary:", error);
      } finally {
        setIsSummarizing(false);
      }
    }
  };

  const generateResponse = async (
    currentModel: string,
    currentMessages: Message[]
  ) => {
    try {
      const currentCount = messageCountRef.current[currentModel] || 0;

      if (currentCount >= MESSAGE_COUNT) {
        setIsConversationActive(false);
        isActiveRef.current = false;
        handleConversationEnd(currentMessages);
        return null;
      }
      const response = await getLLMResponse(currentMessages, currentModel);

      const newMessage: Message = {
        model: currentModel,
        content: response,
      };

      const updatedMessages = [...currentMessages, newMessage];
      setMessages(updatedMessages);

      const newCount = currentCount + 1;
      messageCountRef.current = {
        ...messageCountRef.current,
        [currentModel]: newCount,
      };

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
      content: `Let's debate this: ${topic}`,
    };

    setIsConversationActive(true);
    isActiveRef.current = true;
    setMessages([initialMessage]);

    messageCountRef.current = {
      [model1]: 1,
      [model2]: 0,
    };

    let currentModel = model2;
    let currentMessages = [initialMessage];

    setIsLoading(true);
    while (isActiveRef.current) {
      const updatedMessages = await generateResponse(
        currentModel,
        currentMessages
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));

      if (!updatedMessages) break;

      currentMessages = updatedMessages;
      currentModel = currentModel === model1 ? model2 : model1;
    }
  };

  const handleStopConversation = () => {
    setIsConversationActive(false);
    isActiveRef.current = false;
    handleConversationEnd(messages);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    setAnchorEl(null);
  };

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
          {isLoading ? "Conversing..." : "Start Conversation"}
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<StopIcon />}
          onClick={handleStopConversation}
          disabled={!isConversationActive}
        >
          Stop Conversation
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
        open={showSummary}
        anchorEl={null}
        onClose={handleCloseSummary}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Paper sx={{ p: 3, maxWidth: 400, position: "relative" }}>
          <IconButton
            onClick={handleCloseSummary}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Debate Summary
          </Typography>
          <Divider sx={{ my: 1 }} />
          {isSummarizing ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Typography>{summary}</Typography>
          )}
        </Paper>
      </Popover>
    </Box>
  );
};

export default ChatInterface;
