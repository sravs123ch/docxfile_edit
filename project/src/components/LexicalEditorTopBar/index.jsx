
import { Button, Divider, Grid, Box, Popover, CircularProgress } from "@mui/material";
import toolbarIconsList from "./toolbarIconsList";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useOnClickListener from "./useOnClickListener";
import { createPortal } from "react-dom";
import FloatingLinkEditor from "./FloatingLinkEditor";
import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import { eventTypes } from "./toolbarIconsList";
import ColorPlugin from "../CustomPlugins/ColorPlugin";
import InsertTableButton from "../InsertTableButton";
import { $getRoot } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { renderAsync } from "docx-preview";
import TablePlugin from "../CustomPlugins/TablePlugin";
import FontPlugin from "../CustomPlugins/FontPlugin";
import PageBreakPlugin from "../CustomPlugins/PageBreakPlugin";
const LexicalEditorTopBar = ({ onDownloadDocx }) => {
  const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
    useOnClickListener();
  const [textColorAnchorEl, setTextColorAnchorEl] = useState(null);
  const [bgColorAnchorEl, setBgColorAnchorEl] = useState(null);
  const [selectedTextColor, setSelectedTextColor] = useState("");
  const [selectedBgColor, setSelectedBgColor] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const isIconSelected = (plugin) =>
    selectedEventTypes.includes(plugin.event) ||
    blockType.includes(plugin.event);

  const handleTextColorClick = (event) => {
    setTextColorAnchorEl(event.currentTarget);
  };

  const handleBgColorClick = (event) => {
    setBgColorAnchorEl(event.currentTarget);
  };

  const handleTextColorChange = (color) => {
    setSelectedTextColor(color.hex);
    onClick(eventTypes.textColor, color.hex);
    setTextColorAnchorEl(null);
  };

  const handleBgColorChange = (color) => {
    setSelectedBgColor(color.hex);
    onClick(eventTypes.backgroundColor, color.hex);
    setBgColorAnchorEl(null);
  };
const handleImportDocx = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  setIsImporting(true); 
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const container = document.createElement("div");
    
    // Use better rendering options
    await renderAsync(arrayBuffer, container, undefined, { 
      inWrapper: false, 
      useBase64URL: true,
      ignoreLastRenderedPageBreak: true,
      experimental: true
    });

    container.style.position = "absolute";
    container.style.left = "-99999px";
    container.style.top = "-99999px";
    document.body.appendChild(container);
    
    // Enhanced style properties with better coverage
    const inlineProps = [
      "fontFamily",
      "fontSize",
      "lineHeight",
      "color",
      "backgroundColor",
      "textAlign",
      "fontWeight",
      "fontStyle",
      "textDecoration",
      "textDecorationLine",
      "marginTop",
      "marginBottom",
      "marginLeft",
      "marginRight",
      "textIndent",
      "paddingTop",
      "paddingBottom",
      "paddingLeft",
      "paddingRight",
      "letterSpacing",
      "wordSpacing",
      "verticalAlign"
    ];
 
    const targets = container.querySelectorAll(
      "p, span, div, li, td, th, h1, h2, h3, h4, h5, h6, img, strong, em, u, s, b, i"
    );
    
    targets.forEach((el) => {
      const cs = window.getComputedStyle(el);
      const tagName = el.tagName.toLowerCase();
    
      // Apply inline styles for text and containers
      inlineProps.forEach((prop) => {
        const cssVal = cs[prop];
        // Skip empty, default, or zero values
        if (!cssVal || cssVal === 'normal' || cssVal === '0px' || cssVal === 'none') return;
        
        const styleProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
        const finalProp = prop === "textDecorationLine" ? "text-decoration" : styleProp;
        
        // Always apply these critical styles, even if they exist
        if (prop === "fontSize" || prop === "color" || prop === "fontFamily") {
          el.style.setProperty(finalProp, cssVal);
        } 
        // For other properties, only apply if not already set
        else if (!el.style[prop]) {
          el.style.setProperty(finalProp, cssVal);
        }
      });
    
      // Handle text formatting elements specifically
      if (tagName === 'strong' || tagName === 'b') {
        el.style.fontWeight = 'bold';
      }
      if (tagName === 'em' || tagName === 'i') {
        el.style.fontStyle = 'italic';
      }
      if (tagName === 'u') {
        el.style.textDecoration = 'underline';
      }
      if (tagName === 's') {
        el.style.textDecoration = 'line-through';
      }
    
      // Special case for images
      if (tagName === "img") {
        const naturalWidth = el.naturalWidth || parseInt(cs.width) || null;
        const naturalHeight = el.naturalHeight || parseInt(cs.height) || null;
        
        // Apply explicit width/height (Word usually provides them in px)
        if (cs.width && cs.width !== 'auto') {
          el.setAttribute("width", parseInt(cs.width));
        } else if (naturalWidth) {
          el.setAttribute("width", naturalWidth);
        }
    
        if (cs.height && cs.height !== 'auto') {
          el.setAttribute("height", parseInt(cs.height));
        } else if (naturalHeight) {
          el.setAttribute("height", naturalHeight);
        }
    
        // Ensure proper image display
        el.style.maxWidth = "100%";
        el.style.height = "auto";
      }
    });
    
    // Additional processing for Word-specific formatting issues
    // Fix for spans that contain formatted text but lose their styles
    const spans = container.querySelectorAll('span');
    spans.forEach(span => {
      const cs = window.getComputedStyle(span);
      
      // If span has meaningful styling, ensure it's preserved
      if (cs.fontSize !== '16px' || cs.color !== 'rgb(0, 0, 0)' || cs.fontWeight !== '400') {
        if (cs.fontSize && cs.fontSize !== '16px') {
          span.style.fontSize = cs.fontSize;
        }
        if (cs.color && cs.color !== 'rgb(0, 0, 0)') {
          span.style.color = cs.color;
        }
        if (cs.fontWeight && cs.fontWeight !== '400') {
          span.style.fontWeight = cs.fontWeight;
        }
        if (cs.fontFamily && cs.fontFamily !== 'Times New Roman') {
          span.style.fontFamily = cs.fontFamily;
        }
      }
    });
    
    // Fix for paragraphs that might have lost their heading styles
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach(p => {
      const cs = window.getComputedStyle(p);
      const fontSize = parseFloat(cs.fontSize);
      
      // Convert large paragraphs to headings
      if (fontSize >= 18) {
        let headingLevel = 3;
        if (fontSize >= 24) headingLevel = 1;
        else if (fontSize >= 22) headingLevel = 2;
        else if (fontSize >= 20) headingLevel = 3;
        else if (fontSize >= 18) headingLevel = 4;
        
        const heading = document.createElement(`h${headingLevel}`);
        heading.innerHTML = p.innerHTML;
        heading.style.cssText = p.style.cssText;
        
        p.parentNode.replaceChild(heading, p);
      }
    });
    
    const pageBreaks = container.querySelectorAll(
      'div[style*="page-break-before"], div[style*="break-before"], .page-break'
    );
    
    pageBreaks.forEach((el) => {
      const replacement = document.createElement("div");
      replacement.className = "page-break";
      replacement.style.pageBreakBefore = "always";
      el.parentNode.replaceChild(replacement, el);
    });
   
    document.body.removeChild(container);

    const html = container.innerHTML;
    
    console.log("Converted HTML:", html);
 
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      if (Array.isArray(nodes) && nodes.length > 0) {
        root.append(...nodes);
      }
    });
  } catch (error) {
    console.error("Error importing DOCX:", error);
    alert("Error importing DOCX file. Please try again.");
  } finally {
    setIsImporting(false); 
    event.target.value = "";
  }
};
  return (
    <>
      {/* Top toolbar row */}
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        alignItems="center"
        sx={{ background: "white", py: 1.5, px: 0.5 }}
      >
        {/* Import/Export buttons on the left side */}
        <Grid
          item
          sx={{ display: "flex", gap: 1, justifyContent: "flex-end", ml: "auto" }}
        >
          <Button 
            variant="outlined" 
            component="label"
            disabled={isImporting} 
          >
            {isImporting ? (
              <CircularProgress size={20} sx={{ mr: 1 }} />
            ) : null}
            Import DOCX
            <input
              type="file"
              accept=".docx"
              hidden
              onChange={handleImportDocx}
              disabled={isImporting} 
            />
          </Button>
          <Button 
            variant="contained" 
            onClick={() => onDownloadDocx(editor)}
            disabled={isImporting} 
          >
            Export DOCX
          </Button>
        </Grid>

        {/* Toolbar icons */}
        <Grid item sx={{ display: "flex", gap: 1 }}>
          {toolbarIconsList.map((plugin) => (
            <Grid
              key={plugin.id}
              sx={{ cursor: "pointer" }}
              item
            >
              {plugin.event === eventTypes.textColor ? (
                <>
                  <plugin.Icon
                    sx={{ fontSize: 24 }}
                    onClick={handleTextColorClick}
                    color={isIconSelected(plugin) ? "secondary" : undefined}
                  />
                  <Popover
                    open={Boolean(textColorAnchorEl)}
                    anchorEl={textColorAnchorEl}
                    onClose={() => setTextColorAnchorEl(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <TwitterPicker
                      color={selectedTextColor}
                      onChangeComplete={handleTextColorChange}
                    />
                  </Popover>
                </>
              ) : plugin.event === eventTypes.backgroundColor ? (
                <>
                  <plugin.Icon
                    sx={{ fontSize: 24 }}
                    onClick={handleBgColorClick}
                    color={isIconSelected(plugin) ? "secondary" : undefined}
                  />
                  <Popover
                    open={Boolean(bgColorAnchorEl)}
                    anchorEl={bgColorAnchorEl}
                    onClose={() => setBgColorAnchorEl(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <TwitterPicker
                      color={selectedBgColor}
                      onChangeComplete={handleBgColorChange}
                    />
                  </Popover>
                </>
              ) : (
                <plugin.Icon
                  sx={{ fontSize: 24 }}
                  onClick={() => onClick(plugin.event)}
                  color={isIconSelected(plugin) ? "secondary" : undefined}
                />
              )}
            </Grid>
          ))}
          <FontPlugin />
        </Grid>

        {modal}
        {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
      </Grid>

      {/* Second row: Color + Table */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ background: "white", py: 1, px: 0.5 }}
      >
        <Grid item>
          <ColorPlugin />
          <TablePlugin />
          <PageBreakPlugin />
        </Grid>
      </Grid>
      
      {/* Global loading overlay */}
      {isImporting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <div>Importing DOCX file...</div>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LexicalEditorTopBar;