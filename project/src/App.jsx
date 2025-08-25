import React, { useRef } from 'react';
import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LexicalEditorWrapper from "./components/LexicalEditorWrapper";
import theme from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{ minHeight: "250vh" }}
        flexDirection="column"
        alignItems="center"
      >
        <Grid sx={{ my: 4 }}>
          <Typography variant="h4">Lexical Editor</Typography>
        </Grid>
        <Grid sx={{ width: 750, overflow: "hidden" }}>
          <LexicalEditorWrapper />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;