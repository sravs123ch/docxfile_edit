// // import { Button, Divider, Grid, Box, Popover } from "@mui/material";
// // import toolbarIconsList from "./toolbarIconsList";
// // import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// // import useOnClickListener from "./useOnClickListener";
// // import { createPortal } from "react-dom";
// // import FloatingLinkEditor from "./FloatingLinkEditor";
// // import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
// // import { useState } from "react";
// // import { TwitterPicker } from "react-color";
// // import { eventTypes } from "./toolbarIconsList";
// // import ColorPlugin from "../CustomPlugins/ColorPlugin";
// // import InsertTableButton from "../InsertTableButton";
// // import { $getRoot } from "lexical";
// // import { $generateNodesFromDOM } from "@lexical/html";
// // import { renderAsync } from "docx-preview";
// // import TablePlugin from "../CustomPlugins/TablePlugin";
// // import FontPlugin from "../CustomPlugins/FontPlugin";
// // import PageBreakPlugin from "../CustomPlugins/PageBreakPlugin";

// // const LexicalEditorTopBar = ({ onDownloadDocx }) => {
// //   const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
// //     useOnClickListener();
// //   const [textColorAnchorEl, setTextColorAnchorEl] = useState(null);
// //   const [bgColorAnchorEl, setBgColorAnchorEl] = useState(null);
// //   const [selectedTextColor, setSelectedTextColor] = useState("");
// //   const [selectedBgColor, setSelectedBgColor] = useState("");

// //   const isIconSelected = (plugin) =>
// //     selectedEventTypes.includes(plugin.event) ||
// //     blockType.includes(plugin.event);

// //   const handleTextColorClick = (event) => {
// //     setTextColorAnchorEl(event.currentTarget);
// //   };

// //   const handleBgColorClick = (event) => {
// //     setBgColorAnchorEl(event.currentTarget);
// //   };

// //   const handleTextColorChange = (color) => {
// //     setSelectedTextColor(color.hex);
// //     onClick(eventTypes.textColor, color.hex);
// //     setTextColorAnchorEl(null);
// //   };

// //   const handleBgColorChange = (color) => {
// //     setSelectedBgColor(color.hex);
// //     onClick(eventTypes.backgroundColor, color.hex);
// //     setBgColorAnchorEl(null);
// //   };

// //   const handleImportDocx = async (event) => {
// //     const file = event.target.files[0];
// //     if (!file) return;
 
// //     try {
// //       const arrayBuffer = await file.arrayBuffer();
// //       const container = document.createElement("div");
// //       await renderAsync(arrayBuffer, container, undefined, { inWrapper: false, useBase64URL: true });
 
// //       container.style.position = "absolute";
// //       container.style.left = "-99999px";
// //       container.style.top = "-99999px";
// //       document.body.appendChild(container);
// //       const inlineProps = [
// //         "fontFamily",
// //         "fontSize",
// //         "lineHeight",
// //         "color",
// //         "backgroundColor",
// //         "textAlign",
// //         "fontWeight",
// //         "fontStyle",
// //         "textDecorationLine",
// //         "marginTop",
// //         "marginBottom",
// //         "marginLeft",
// //         "marginRight",
// //         "textIndent",
// //       ];
// //       const targets = container.querySelectorAll("p, span, div, li, td, th, h1, h2, h3, h4, h5, h6");
// //       targets.forEach((el) => {
// //         const cs = window.getComputedStyle(el);
// //         inlineProps.forEach((prop) => {
// //           const cssVal = cs[prop];
// //           if (!cssVal) return;
// //           const styleProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
// //           if (!el.style[prop]) {
// //             // Special-case textDecorationLine -> text-decoration
// //             const finalProp = prop === "textDecorationLine" ? "text-decoration" : styleProp;
// //             el.style.setProperty(finalProp, cssVal);
// //           }
// //         });
        
// //         // Fix line height to match editor
// //         if (el.tagName.toLowerCase() === 'p') {
// //           el.style.setProperty('line-height', '1.4');
// //           el.style.setProperty('margin', '0 0 8px 0');
// //         }
// //       });
// //       document.body.removeChild(container);
 
// //       const html = container.innerHTML;
// //       editor.update(() => {
// //         const parser = new DOMParser();
// //         const dom = parser.parseFromString(html, "text/html");
// //         const nodes = $generateNodesFromDOM(editor, dom);
// //         const root = $getRoot();
// //         root.clear();
// //         if (Array.isArray(nodes) && nodes.length > 0) {
// //           root.append(...nodes);
// //         }
// //       });
// //     } catch (error) {
// //       console.error("Error importing DOCX:", error);
// //       alert("Error importing DOCX file. Please try again.");
// //     }
 
// //     event.target.value = "";
// //   };

// //   return (
// //    <>
// //   {/* Top toolbar row */}
// //   <Grid
// //     container
// //     justifyContent="space-between"
// //     spacing={2}
// //     alignItems="center"
// //     sx={{ background: "white", py: 1.5, px: 0.5 }}
// //   >
// //     {/* Import/Export buttons on the left side */}
// //     <Grid
// //       item
// //       sx={{ display: "flex", gap: 1, justifyContent: "flex-end", ml: "auto" }}
// //     >
// //       <Button variant="outlined" component="label">
// //         Import DOCX
// //         <input
// //           type="file"
// //           accept=".docx"
// //           hidden
// //           onChange={handleImportDocx}
// //         />
// //       </Button>
// //       <Button variant="contained" onClick={() => onDownloadDocx(editor)}>
// //         Export DOCX
// //       </Button>
// //     </Grid>

// //     {/* Toolbar icons */}
// //     <Grid item sx={{ display: "flex", gap: 1 }}>
// //       {toolbarIconsList.map((plugin) => (
// //         <Grid
// //           key={plugin.id}
// //           sx={{ cursor: "pointer" }}
// //           item
// //         >
// //           {plugin.event === eventTypes.textColor ? (
// //             <>
// //               <plugin.Icon
// //                 sx={{ fontSize: 24 }}
// //                 onClick={handleTextColorClick}
// //                 color={isIconSelected(plugin) ? "secondary" : undefined}
// //               />
// //               <Popover
// //                 open={Boolean(textColorAnchorEl)}
// //                 anchorEl={textColorAnchorEl}
// //                 onClose={() => setTextColorAnchorEl(null)}
// //                 anchorOrigin={{
// //                   vertical: "bottom",
// //                   horizontal: "left",
// //                 }}
// //               >
// //                 <TwitterPicker
// //                   color={selectedTextColor}
// //                   onChangeComplete={handleTextColorChange}
// //                 />
// //               </Popover>
// //             </>
// //           ) : plugin.event === eventTypes.backgroundColor ? (
// //             <>
// //               <plugin.Icon
// //                 sx={{ fontSize: 24 }}
// //                 onClick={handleBgColorClick}
// //                 color={isIconSelected(plugin) ? "secondary" : undefined}
// //               />
// //               <Popover
// //                 open={Boolean(bgColorAnchorEl)}
// //                 anchorEl={bgColorAnchorEl}
// //                 onClose={() => setBgColorAnchorEl(null)}
// //                 anchorOrigin={{
// //                   vertical: "bottom",
// //                   horizontal: "left",
// //                 }}
// //               >
// //                 <TwitterPicker
// //                   color={selectedBgColor}
// //                   onChangeComplete={handleBgColorChange}
// //                 />
// //               </Popover>
// //             </>
// //           ) : (
// //             <plugin.Icon
// //               sx={{ fontSize: 24 }}
// //               onClick={() => onClick(plugin.event)}
// //               color={isIconSelected(plugin) ? "secondary" : undefined}
// //             />
// //           )}
// //         </Grid>
// //       ))}
// //        <FontPlugin />
// //     </Grid>

// //     {modal}
// //     {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
// //   </Grid>

// //   {/* Second row: Color + Table */}
// //   <Grid
// //     container
// //     spacing={2}
// //     alignItems="center"
// //     sx={{ background: "white", py: 1, px: 0.5 }}
// //   >
// //     <Grid item>
// //         <ColorPlugin />
// //         <TablePlugin />
// //         {/* <PageBreakPlugin /> */}
// //     </Grid>
    
// //   </Grid>
// // </>

// //   );
// // };

// // export default LexicalEditorTopBar;


// import { Button, Divider, Grid, Box, Popover, CircularProgress } from "@mui/material";
// import toolbarIconsList from "./toolbarIconsList";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import useOnClickListener from "./useOnClickListener";
// import { createPortal } from "react-dom";
// import FloatingLinkEditor from "./FloatingLinkEditor";
// import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
// import { useState } from "react";
// import { TwitterPicker } from "react-color";
// import { eventTypes } from "./toolbarIconsList";
// import ColorPlugin from "../CustomPlugins/ColorPlugin";
// import InsertTableButton from "../InsertTableButton";
// import { $getRoot } from "lexical";
// import { $generateNodesFromDOM } from "@lexical/html";
// import { renderAsync } from "docx-preview";
// import TablePlugin from "../CustomPlugins/TablePlugin";
// import FontPlugin from "../CustomPlugins/FontPlugin";
// import PageBreakPlugin from "../CustomPlugins/PageBreakPlugin";
// const LexicalEditorTopBar = ({ onDownloadDocx }) => {
//   const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
//     useOnClickListener();
//   const [textColorAnchorEl, setTextColorAnchorEl] = useState(null);
//   const [bgColorAnchorEl, setBgColorAnchorEl] = useState(null);
//   const [selectedTextColor, setSelectedTextColor] = useState("");
//   const [selectedBgColor, setSelectedBgColor] = useState("");
//   const [isImporting, setIsImporting] = useState(false);

//   const isIconSelected = (plugin) =>
//     selectedEventTypes.includes(plugin.event) ||
//     blockType.includes(plugin.event);

//   const handleTextColorClick = (event) => {
//     setTextColorAnchorEl(event.currentTarget);
//   };

//   const handleBgColorClick = (event) => {
//     setBgColorAnchorEl(event.currentTarget);
//   };

//   const handleTextColorChange = (color) => {
//     setSelectedTextColor(color.hex);
//     onClick(eventTypes.textColor, color.hex);
//     setTextColorAnchorEl(null);
//   };

//   const handleBgColorChange = (color) => {
//     setSelectedBgColor(color.hex);
//     onClick(eventTypes.backgroundColor, color.hex);
//     setBgColorAnchorEl(null);
//   };

// //   const handleImportDocx = async (event) => {
// //   const file = event.target.files[0];
// //   if (!file) return;
  
// //   setIsImporting(true); 
  
// //   try {
// //     const arrayBuffer = await file.arrayBuffer();
// //     const container = document.createElement("div");
    
// //     // Use better rendering options
// //     await renderAsync(arrayBuffer, container, undefined, { 
// //       inWrapper: false, 
// //       useBase64URL: true,
// //       ignoreLastRenderedPageBreak: true,
// //       experimental: true
// //     });

// //     container.style.position = "absolute";
// //     container.style.left = "-99999px";
// //     container.style.top = "-99999px";
// //     document.body.appendChild(container);
    
// //     // Enhanced style properties with better coverage
// //     const inlineProps = [
// //       "fontFamily",
// //       "fontSize",
// //       "lineHeight",
// //       "color",
// //       "backgroundColor",
// //       "textAlign",
// //       "fontWeight",
// //       "fontStyle",
// //       "textDecoration",
// //       "textDecorationLine",
// //       "marginTop",
// //       "marginBottom",
// //       "marginLeft",
// //       "marginRight",
// //       "textIndent",
// //       "paddingTop",
// //       "paddingBottom",
// //       "paddingLeft",
// //       "paddingRight",
// //       "letterSpacing",
// //       "wordSpacing",
// //       "verticalAlign"
// //     ];
 
// //     const targets = container.querySelectorAll(
// //       "p, span, div, li, td, th, h1, h2, h3, h4, h5, h6, img, strong, em, u, s, b, i"
// //     );
    
// //     targets.forEach((el) => {
// //       const cs = window.getComputedStyle(el);
// //       const tagName = el.tagName.toLowerCase();
    
// //       // Apply inline styles for text and containers
// //       inlineProps.forEach((prop) => {
// //         const cssVal = cs[prop];
// //         // Skip empty, default, or zero values
// //         if (!cssVal || cssVal === 'normal' || cssVal === '0px' || cssVal === 'none') return;
        
// //         const styleProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
// //         const finalProp = prop === "textDecorationLine" ? "text-decoration" : styleProp;
        
// //         // Always apply these critical styles, even if they exist
// //         if (prop === "fontSize" || prop === "color" || prop === "fontFamily") {
// //           el.style.setProperty(finalProp, cssVal);
// //         } 
// //         // For other properties, only apply if not already set
// //         else if (!el.style[prop]) {
// //           el.style.setProperty(finalProp, cssVal);
// //         }
// //       });
    
// //       // Handle text formatting elements specifically
// //       if (tagName === 'strong' || tagName === 'b') {
// //         el.style.fontWeight = 'bold';
// //       }
// //       if (tagName === 'em' || tagName === 'i') {
// //         el.style.fontStyle = 'italic';
// //       }
// //       if (tagName === 'u') {
// //         el.style.textDecoration = 'underline';
// //       }
// //       if (tagName === 's') {
// //         el.style.textDecoration = 'line-through';
// //       }
    
// //       // Special case for images
// //       if (tagName === "img") {
// //         const naturalWidth = el.naturalWidth || parseInt(cs.width) || null;
// //         const naturalHeight = el.naturalHeight || parseInt(cs.height) || null;
        
// //         // Apply explicit width/height (Word usually provides them in px)
// //         if (cs.width && cs.width !== 'auto') {
// //           el.setAttribute("width", parseInt(cs.width));
// //         } else if (naturalWidth) {
// //           el.setAttribute("width", naturalWidth);
// //         }
    
// //         if (cs.height && cs.height !== 'auto') {
// //           el.setAttribute("height", parseInt(cs.height));
// //         } else if (naturalHeight) {
// //           el.setAttribute("height", naturalHeight);
// //         }
    
// //         // Ensure proper image display
// //         el.style.maxWidth = "100%";
// //         el.style.height = "auto";
// //       }
// //     });
    
// //     // Additional processing for Word-specific formatting issues
// //     // Fix for spans that contain formatted text but lose their styles
// //     const spans = container.querySelectorAll('span');
// //     spans.forEach(span => {
// //       const cs = window.getComputedStyle(span);
      
// //       // If span has meaningful styling, ensure it's preserved
// //       if (cs.fontSize !== '16px' || cs.color !== 'rgb(0, 0, 0)' || cs.fontWeight !== '400') {
// //         if (cs.fontSize && cs.fontSize !== '16px') {
// //           span.style.fontSize = cs.fontSize;
// //         }
// //         if (cs.color && cs.color !== 'rgb(0, 0, 0)') {
// //           span.style.color = cs.color;
// //         }
// //         if (cs.fontWeight && cs.fontWeight !== '400') {
// //           span.style.fontWeight = cs.fontWeight;
// //         }
// //         if (cs.fontFamily && cs.fontFamily !== 'Times New Roman') {
// //           span.style.fontFamily = cs.fontFamily;
// //         }
// //       }
// //     });
    
// //     // Fix for paragraphs that might have lost their heading styles
// //     const paragraphs = container.querySelectorAll('p');
// //     paragraphs.forEach(p => {
// //       const cs = window.getComputedStyle(p);
// //       const fontSize = parseFloat(cs.fontSize);
      
// //       // Convert large paragraphs to headings
// //       if (fontSize >= 18) {
// //         let headingLevel = 3;
// //         if (fontSize >= 24) headingLevel = 1;
// //         else if (fontSize >= 22) headingLevel = 2;
// //         else if (fontSize >= 20) headingLevel = 3;
// //         else if (fontSize >= 18) headingLevel = 4;
        
// //         const heading = document.createElement(`h${headingLevel}`);
// //         heading.innerHTML = p.innerHTML;
// //         heading.style.cssText = p.style.cssText;
        
// //         p.parentNode.replaceChild(heading, p);
// //       }
// //     });
    
// //     document.body.removeChild(container);

// //     const html = container.innerHTML;
    
// //     // Debug: Check what HTML and styles we're getting
// //     console.log("Converted HTML:", html);
 
// //     editor.update(() => {
// //       const parser = new DOMParser();
// //       const dom = parser.parseFromString(html, "text/html");
// //       const nodes = $generateNodesFromDOM(editor, dom);
// //       const root = $getRoot();
// //       root.clear();
// //       if (Array.isArray(nodes) && nodes.length > 0) {
// //         root.append(...nodes);
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Error importing DOCX:", error);
// //     alert("Error importing DOCX file. Please try again.");
// //   } finally {
// //     setIsImporting(false); 
// //     event.target.value = "";
// //   }
// // };

// const handleImportDocx = async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;
  
//   setIsImporting(true); 
  
//   try {
//     const arrayBuffer = await file.arrayBuffer();
//     const container = document.createElement("div");
    
//     // Use better rendering options
//     await renderAsync(arrayBuffer, container, undefined, { 
//       inWrapper: false, 
//       useBase64URL: true,
//       ignoreLastRenderedPageBreak: true,
//       experimental: true
//     });

//     container.style.position = "absolute";
//     container.style.left = "-99999px";
//     container.style.top = "-99999px";
//     document.body.appendChild(container);
    
//     // Enhanced style properties with better coverage
//     const inlineProps = [
//       "fontFamily",
//       "fontSize",
//       "lineHeight",
//       "color",
//       "backgroundColor",
//       "textAlign",
//       "fontWeight",
//       "fontStyle",
//       "textDecoration",
//       "textDecorationLine",
//       "marginTop",
//       "marginBottom",
//       "marginLeft",
//       "marginRight",
//       "textIndent",
//       "paddingTop",
//       "paddingBottom",
//       "paddingLeft",
//       "paddingRight",
//       "letterSpacing",
//       "wordSpacing",
//       "verticalAlign"
//     ];
 
//     const targets = container.querySelectorAll(
//       "p, span, div, li, td, th, h1, h2, h3, h4, h5, h6, img, strong, em, u, s, b, i"
//     );
    
//     targets.forEach((el) => {
//       const cs = window.getComputedStyle(el);
//       const tagName = el.tagName.toLowerCase();
    
//       // Apply inline styles for text and containers
//       inlineProps.forEach((prop) => {
//         const cssVal = cs[prop];
//         // Skip empty, default, or zero values
//         if (!cssVal || cssVal === 'normal' || cssVal === '0px' || cssVal === 'none') return;
        
//         const styleProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
//         const finalProp = prop === "textDecorationLine" ? "text-decoration" : styleProp;
        
//         // Always apply these critical styles, even if they exist
//         if (prop === "fontSize" || prop === "color" || prop === "fontFamily") {
//           el.style.setProperty(finalProp, cssVal);
//         } 
//         // For other properties, only apply if not already set
//         else if (!el.style[prop]) {
//           el.style.setProperty(finalProp, cssVal);
//         }
//       });
    
//       // Handle text formatting elements specifically
//       if (tagName === 'strong' || tagName === 'b') {
//         el.style.fontWeight = 'bold';
//       }
//       if (tagName === 'em' || tagName === 'i') {
//         el.style.fontStyle = 'italic';
//       }
//       if (tagName === 'u') {
//         el.style.textDecoration = 'underline';
//       }
//       if (tagName === 's') {
//         el.style.textDecoration = 'line-through';
//       }
    
//       // Special case for images
//       if (tagName === "img") {
//         const naturalWidth = el.naturalWidth || parseInt(cs.width) || null;
//         const naturalHeight = el.naturalHeight || parseInt(cs.height) || null;
        
//         // Apply explicit width/height (Word usually provides them in px)
//         if (cs.width && cs.width !== 'auto') {
//           el.setAttribute("width", parseInt(cs.width));
//         } else if (naturalWidth) {
//           el.setAttribute("width", naturalWidth);
//         }
    
//         if (cs.height && cs.height !== 'auto') {
//           el.setAttribute("height", parseInt(cs.height));
//         } else if (naturalHeight) {
//           el.setAttribute("height", naturalHeight);
//         }
    
//         // Ensure proper image display
//         el.style.maxWidth = "100%";
//         el.style.height = "auto";
//       }
//     });
    
//     // Additional processing for Word-specific formatting issues
//     // Fix for spans that contain formatted text but lose their styles
//     const spans = container.querySelectorAll('span');
//     spans.forEach(span => {
//       const cs = window.getComputedStyle(span);
      
//       // If span has meaningful styling, ensure it's preserved
//       if (cs.fontSize !== '16px' || cs.color !== 'rgb(0, 0, 0)' || cs.fontWeight !== '400') {
//         if (cs.fontSize && cs.fontSize !== '16px') {
//           span.style.fontSize = cs.fontSize;
//         }
//         if (cs.color && cs.color !== 'rgb(0, 0, 0)') {
//           span.style.color = cs.color;
//         }
//         if (cs.fontWeight && cs.fontWeight !== '400') {
//           span.style.fontWeight = cs.fontWeight;
//         }
//         if (cs.fontFamily && cs.fontFamily !== 'Times New Roman') {
//           span.style.fontFamily = cs.fontFamily;
//         }
//       }
//     });
    
//     // Fix for paragraphs that might have lost their heading styles
//     const paragraphs = container.querySelectorAll('p');
//     paragraphs.forEach(p => {
//       const cs = window.getComputedStyle(p);
//       const fontSize = parseFloat(cs.fontSize);
      
//       // Convert large paragraphs to headings
//       if (fontSize >= 18) {
//         let headingLevel = 3;
//         if (fontSize >= 24) headingLevel = 1;
//         else if (fontSize >= 22) headingLevel = 2;
//         else if (fontSize >= 20) headingLevel = 3;
//         else if (fontSize >= 18) headingLevel = 4;
        
//         const heading = document.createElement(`h${headingLevel}`);
//         heading.innerHTML = p.innerHTML;
//         heading.style.cssText = p.style.cssText;
        
//         p.parentNode.replaceChild(heading, p);
//       }
//     });
    
//     const pageBreaks = container.querySelectorAll(
//       'div[style*="page-break-before"], div[style*="break-before"], .page-break'
//     );
    
//     pageBreaks.forEach((el) => {
//       const replacement = document.createElement("div");
//       replacement.className = "page-break";
//       replacement.style.pageBreakBefore = "always";
//       el.parentNode.replaceChild(replacement, el);
//     });
   
//     document.body.removeChild(container);

//     const html = container.innerHTML;
    
//     console.log("Converted HTML:", html);
 
//     editor.update(() => {
//       const parser = new DOMParser();
//       const dom = parser.parseFromString(html, "text/html");
//       const nodes = $generateNodesFromDOM(editor, dom);
//       const root = $getRoot();
//       root.clear();
//       if (Array.isArray(nodes) && nodes.length > 0) {
//         root.append(...nodes);
//       }
//     });
//   } catch (error) {
//     console.error("Error importing DOCX:", error);
//     alert("Error importing DOCX file. Please try again.");
//   } finally {
//     setIsImporting(false); 
//     event.target.value = "";
//   }
// };

// // const handleImportDocx = async (event) => {
// //   const file = event.target.files[0];
// //   if (!file) return;

// //   setIsImporting(true);

// //   try {
// //     const arrayBuffer = await file.arrayBuffer();
// //     const container = document.createElement("div");

// //     // Render DOCX into hidden container
// //     await renderAsync(arrayBuffer, container, undefined, {
// //       inWrapper: false,
// //       useBase64URL: true,
// //       ignoreLastRenderedPageBreak: true,
// //       experimental: true,
// //     });

// //     container.style.position = "absolute";
// //     container.style.left = "-99999px";
// //     container.style.top = "-99999px";
// //     document.body.appendChild(container);

// //     // ✅ Preserve Word stylesheet instead of recomputing inline
// //     const styleEl = container.querySelector("style");
// //     let wordCss = "";
// //     if (styleEl) {
// //       wordCss = styleEl.outerHTML; // keep original styles
// //     }

// //     // ✅ Fix images only (Word often gives px, ensure they render)
// //     const images = container.querySelectorAll("img");
// //     images.forEach((img) => {
// //       const width = img.getAttribute("width");
// //       const height = img.getAttribute("height");

// //       if (!width && img.naturalWidth) {
// //         img.setAttribute("width", img.naturalWidth);
// //       }
// //       if (!height && img.naturalHeight) {
// //         img.setAttribute("height", img.naturalHeight);
// //       }

// //       img.style.maxWidth = "100%";
// //       img.style.height = "auto";
// //     });

// //     // ✅ Handle page breaks explicitly
// //     const pageBreaks = container.querySelectorAll(
// //       'div[style*="page-break-before"], div[style*="break-before"], .page-break'
// //     );
// //     pageBreaks.forEach((el) => {
// //       const replacement = document.createElement("div");
// //       replacement.className = "page-break";
// //       replacement.style.pageBreakBefore = "always";
// //       el.parentNode.replaceChild(replacement, el);
// //     });

// //     // ✅ Extract final HTML with preserved styles
// //     const html = wordCss + container.innerHTML;

// //     // Clean up DOM to free memory (important for 30MB+ files)
// //     document.body.removeChild(container);

// //     console.log("Converted HTML:", html);

// //     // ✅ Insert into Lexical editor
// //     editor.update(() => {
// //       const parser = new DOMParser();
// //       const dom = parser.parseFromString(html, "text/html");

// //       const nodes = $generateNodesFromDOM(editor, dom);
// //       const root = $getRoot();
// //       root.clear();
// //       if (Array.isArray(nodes) && nodes.length > 0) {
// //         root.append(...nodes);
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Error importing DOCX:", error);
// //     alert("Error importing DOCX file. Please try again.");
// //   } finally {
// //     setIsImporting(false);
// //     event.target.value = "";
// //   }
// // };

// // const handleImportDocx = async (event) => {
// //   const file = event.target.files[0];
// //   if (!file) return;

// //   setIsImporting(true);

// //   try {
// //     const arrayBuffer = await file.arrayBuffer();
// //     const container = document.createElement("div");

// //     await renderAsync(arrayBuffer, container, undefined, {
// //       inWrapper: false,
// //       useBase64URL: true,
// //       ignoreLastRenderedPageBreak: true,
// //       experimental: true,
// //     });

// //     container.style.position = "absolute";
// //     container.style.left = "-99999px";
// //     container.style.top = "-99999px";
// //     document.body.appendChild(container);

// //     // ✅ Keep Word stylesheet
// //     const styleEl = container.querySelector("style");
// //     let wordCss = "";
// //     if (styleEl) {
// //       wordCss = styleEl.outerHTML;
// //     }

// //     // ✅ Only fix images with computed styles
// //     const images = container.querySelectorAll("img");
// //     images.forEach((img) => {
// //       const cs = window.getComputedStyle(img);
    
// //       // Size fix
// //       const width = parseInt(cs.width);
// //       const height = parseInt(cs.height);
// //       if (width) img.setAttribute("width", width);
// //       if (height) img.setAttribute("height", height);
    
// //       // ✅ Positioning fix
// //       if (cs.float && cs.float !== "none") {
// //         img.style.float = cs.float;
// //       }
// //       if (cs.display && cs.display !== "inline") {
// //         img.style.display = cs.display;
// //       }
// //       if (cs.verticalAlign && cs.verticalAlign !== "baseline") {
// //         img.style.verticalAlign = cs.verticalAlign;
// //       }
    
// //       // Preserve margins
// //       img.style.marginTop = cs.marginTop;
// //       img.style.marginBottom = cs.marginBottom;
// //       img.style.marginLeft = cs.marginLeft;
// //       img.style.marginRight = cs.marginRight;
    
// //       // Scale safety
// //       img.style.maxWidth = "100%";
// //       img.style.height = "auto";
// //     });
    

// //     // ✅ Handle page breaks
// //     const pageBreaks = container.querySelectorAll(
// //       'div[style*="page-break-before"], div[style*="break-before"], .page-break'
// //     );
// //     pageBreaks.forEach((el) => {
// //       const replacement = document.createElement("div");
// //       replacement.className = "page-break";
// //       replacement.style.pageBreakBefore = "always";
// //       el.parentNode.replaceChild(replacement, el);
// //     });

// //     // ✅ Extract final HTML
// //     const html = wordCss + container.innerHTML;

// //     document.body.removeChild(container);

// //     console.log("Converted HTML:", html);

// //     editor.update(() => {
// //       const parser = new DOMParser();
// //       const dom = parser.parseFromString(html, "text/html");

// //       const nodes = $generateNodesFromDOM(editor, dom);
// //       const root = $getRoot();
// //       root.clear();
// //       if (Array.isArray(nodes) && nodes.length > 0) {
// //         root.append(...nodes);
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Error importing DOCX:", error);
// //     alert("Error importing DOCX file. Please try again.");
// //   } finally {
// //     setIsImporting(false);
// //     event.target.value = "";
// //   }
// // };

//   return (
//     <>
//       {/* Top toolbar row */}
//       <Grid
//         container
//         justifyContent="space-between"
//         spacing={2}
//         alignItems="center"
//         sx={{ background: "white", py: 1.5, px: 0.5 }}
//       >
//         {/* Import/Export buttons on the left side */}
//         <Grid
//           item
//           sx={{ display: "flex", gap: 1, justifyContent: "flex-end", ml: "auto" }}
//         >
//           <Button 
//             variant="outlined" 
//             component="label"
//             disabled={isImporting} 
//           >
//             {isImporting ? (
//               <CircularProgress size={20} sx={{ mr: 1 }} />
//             ) : null}
//             Import DOCX
//             <input
//               type="file"
//               accept=".docx"
//               hidden
//               onChange={handleImportDocx}
//               disabled={isImporting} 
//             />
//           </Button>
//           <Button 
//             variant="contained" 
//             onClick={() => onDownloadDocx(editor)}
//             disabled={isImporting} 
//           >
//             Export DOCX
//           </Button>
//         </Grid>

//         {/* Toolbar icons */}
//         <Grid item sx={{ display: "flex", gap: 1 }}>
//           {toolbarIconsList.map((plugin) => (
//             <Grid
//               key={plugin.id}
//               sx={{ cursor: "pointer" }}
//               item
//             >
//               {plugin.event === eventTypes.textColor ? (
//                 <>
//                   <plugin.Icon
//                     sx={{ fontSize: 24 }}
//                     onClick={handleTextColorClick}
//                     color={isIconSelected(plugin) ? "secondary" : undefined}
//                   />
//                   <Popover
//                     open={Boolean(textColorAnchorEl)}
//                     anchorEl={textColorAnchorEl}
//                     onClose={() => setTextColorAnchorEl(null)}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "left",
//                     }}
//                   >
//                     <TwitterPicker
//                       color={selectedTextColor}
//                       onChangeComplete={handleTextColorChange}
//                     />
//                   </Popover>
//                 </>
//               ) : plugin.event === eventTypes.backgroundColor ? (
//                 <>
//                   <plugin.Icon
//                     sx={{ fontSize: 24 }}
//                     onClick={handleBgColorClick}
//                     color={isIconSelected(plugin) ? "secondary" : undefined}
//                   />
//                   <Popover
//                     open={Boolean(bgColorAnchorEl)}
//                     anchorEl={bgColorAnchorEl}
//                     onClose={() => setBgColorAnchorEl(null)}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "left",
//                     }}
//                   >
//                     <TwitterPicker
//                       color={selectedBgColor}
//                       onChangeComplete={handleBgColorChange}
//                     />
//                   </Popover>
//                 </>
//               ) : (
//                 <plugin.Icon
//                   sx={{ fontSize: 24 }}
//                   onClick={() => onClick(plugin.event)}
//                   color={isIconSelected(plugin) ? "secondary" : undefined}
//                 />
//               )}
//             </Grid>
//           ))}
//           <FontPlugin />
//         </Grid>

//         {modal}
//         {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
//       </Grid>

//       {/* Second row: Color + Table */}
//       <Grid
//         container
//         spacing={2}
//         alignItems="center"
//         sx={{ background: "white", py: 1, px: 0.5 }}
//       >
//         <Grid item>
//           <ColorPlugin />
//           <TablePlugin />
//           <PageBreakPlugin />
//         </Grid>
//       </Grid>
      
//       {/* Global loading overlay */}
//       {isImporting && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "white",
//               padding: 3,
//               borderRadius: 2,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <CircularProgress size={40} sx={{ mb: 2 }} />
//             <div>Importing DOCX file...</div>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// };

// export default LexicalEditorTopBar;


// import { Button, Divider, Grid, Box, Popover } from "@mui/material";
// import toolbarIconsList from "./toolbarIconsList";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import useOnClickListener from "./useOnClickListener";
// import { createPortal } from "react-dom";
// import FloatingLinkEditor from "./FloatingLinkEditor";
// import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
// import { useState } from "react";
// import { TwitterPicker } from "react-color";
// import { eventTypes } from "./toolbarIconsList";
// import ColorPlugin from "../CustomPlugins/ColorPlugin";
// import InsertTableButton from "../InsertTableButton";
// import { $getRoot } from "lexical";
// import { $generateNodesFromDOM } from "@lexical/html";
// import { renderAsync } from "docx-preview";
// import TablePlugin from "../CustomPlugins/TablePlugin";
// import FontPlugin from "../CustomPlugins/FontPlugin";
// import PageBreakPlugin from "../CustomPlugins/PageBreakPlugin";

// const LexicalEditorTopBar = ({ onDownloadDocx }) => {
//   const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
//     useOnClickListener();
//   const [textColorAnchorEl, setTextColorAnchorEl] = useState(null);
//   const [bgColorAnchorEl, setBgColorAnchorEl] = useState(null);
//   const [selectedTextColor, setSelectedTextColor] = useState("");
//   const [selectedBgColor, setSelectedBgColor] = useState("");

//   const isIconSelected = (plugin) =>
//     selectedEventTypes.includes(plugin.event) ||
//     blockType.includes(plugin.event);

//   const handleTextColorClick = (event) => {
//     setTextColorAnchorEl(event.currentTarget);
//   };

//   const handleBgColorClick = (event) => {
//     setBgColorAnchorEl(event.currentTarget);
//   };

//   const handleTextColorChange = (color) => {
//     setSelectedTextColor(color.hex);
//     onClick(eventTypes.textColor, color.hex);
//     setTextColorAnchorEl(null);
//   };

//   const handleBgColorChange = (color) => {
//     setSelectedBgColor(color.hex);
//     onClick(eventTypes.backgroundColor, color.hex);
//     setBgColorAnchorEl(null);
//   };

//   const handleImportDocx = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
 
//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const container = document.createElement("div");
//       await renderAsync(arrayBuffer, container, undefined, { inWrapper: false, useBase64URL: true });
 
//       container.style.position = "absolute";
//       container.style.left = "-99999px";
//       container.style.top = "-99999px";
//       document.body.appendChild(container);
//       const inlineProps = [
//         "fontFamily",
//         "fontSize",
//         "lineHeight",
//         "color",
//         "backgroundColor",
//         "textAlign",
//         "fontWeight",
//         "fontStyle",
//         "textDecorationLine",
//         "marginTop",
//         "marginBottom",
//         "marginLeft",
//         "marginRight",
//         "textIndent",
//       ];
//       const targets = container.querySelectorAll("p, span, div, li, td, th, h1, h2, h3, h4, h5, h6");
//       targets.forEach((el) => {
//         const cs = window.getComputedStyle(el);
//         inlineProps.forEach((prop) => {
//           const cssVal = cs[prop];
//           if (!cssVal) return;
//           const styleProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
//           if (!el.style[prop]) {
//             // Special-case textDecorationLine -> text-decoration
//             const finalProp = prop === "textDecorationLine" ? "text-decoration" : styleProp;
//             el.style.setProperty(finalProp, cssVal);
//           }
//         });
        
//         // Fix line height to match editor
//         if (el.tagName.toLowerCase() === 'p') {
//           el.style.setProperty('line-height', '1.4');
//           el.style.setProperty('margin', '0 0 8px 0');
//         }
//       });
//       document.body.removeChild(container);
 
//       const html = container.innerHTML;
//       editor.update(() => {
//         const parser = new DOMParser();
//         const dom = parser.parseFromString(html, "text/html");
//         const nodes = $generateNodesFromDOM(editor, dom);
//         const root = $getRoot();
//         root.clear();
//         if (Array.isArray(nodes) && nodes.length > 0) {
//           root.append(...nodes);
//         }
//       });
//     } catch (error) {
//       console.error("Error importing DOCX:", error);
//       alert("Error importing DOCX file. Please try again.");
//     }
 
//     event.target.value = "";
//   };

//   return (
//    <>
//   {/* Top toolbar row */}
//   <Grid
//     container
//     justifyContent="space-between"
//     spacing={2}
//     alignItems="center"
//     sx={{ background: "white", py: 1.5, px: 0.5 }}
//   >
//     {/* Import/Export buttons on the left side */}
//     <Grid
//       item
//       sx={{ display: "flex", gap: 1, justifyContent: "flex-end", ml: "auto" }}
//     >
//       <Button variant="outlined" component="label">
//         Import DOCX
//         <input
//           type="file"
//           accept=".docx"
//           hidden
//           onChange={handleImportDocx}
//         />
//       </Button>
//       <Button variant="contained" onClick={() => onDownloadDocx(editor)}>
//         Export DOCX
//       </Button>
//     </Grid>

//     {/* Toolbar icons */}
//     <Grid item sx={{ display: "flex", gap: 1 }}>
//       {toolbarIconsList.map((plugin) => (
//         <Grid
//           key={plugin.id}
//           sx={{ cursor: "pointer" }}
//           item
//         >
//           {plugin.event === eventTypes.textColor ? (
//             <>
//               <plugin.Icon
//                 sx={{ fontSize: 24 }}
//                 onClick={handleTextColorClick}
//                 color={isIconSelected(plugin) ? "secondary" : undefined}
//               />
//               <Popover
//                 open={Boolean(textColorAnchorEl)}
//                 anchorEl={textColorAnchorEl}
//                 onClose={() => setTextColorAnchorEl(null)}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//               >
//                 <TwitterPicker
//                   color={selectedTextColor}
//                   onChangeComplete={handleTextColorChange}
//                 />
//               </Popover>
//             </>
//           ) : plugin.event === eventTypes.backgroundColor ? (
//             <>
//               <plugin.Icon
//                 sx={{ fontSize: 24 }}
//                 onClick={handleBgColorClick}
//                 color={isIconSelected(plugin) ? "secondary" : undefined}
//               />
//               <Popover
//                 open={Boolean(bgColorAnchorEl)}
//                 anchorEl={bgColorAnchorEl}
//                 onClose={() => setBgColorAnchorEl(null)}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//               >
//                 <TwitterPicker
//                   color={selectedBgColor}
//                   onChangeComplete={handleBgColorChange}
//                 />
//               </Popover>
//             </>
//           ) : (
//             <plugin.Icon
//               sx={{ fontSize: 24 }}
//               onClick={() => onClick(plugin.event)}
//               color={isIconSelected(plugin) ? "secondary" : undefined}
//             />
//           )}
//         </Grid>
//       ))}
//        <FontPlugin />
//     </Grid>

//     {modal}
//     {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
//   </Grid>

//   {/* Second row: Color + Table */}
//   <Grid
//     container
//     spacing={2}
//     alignItems="center"
//     sx={{ background: "white", py: 1, px: 0.5 }}
//   >
//     <Grid item>
//         <ColorPlugin />
//         <TablePlugin />
//         {/* <PageBreakPlugin /> */}
//     </Grid>
    
//   </Grid>
// </>

//   );
// };

// export default LexicalEditorTopBar;


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

// import { Button, Divider, Grid, Box, Popover, CircularProgress, Paper } from "@mui/material";
// import toolbarIconsList from "./toolbarIconsList";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import useOnClickListener from "./useOnClickListener";
// import { createPortal } from "react-dom";
// import FloatingLinkEditor from "./FloatingLinkEditor";
// import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
// import { useState, useEffect, useRef, useCallback } from "react";
// import { TwitterPicker } from "react-color";
// import { eventTypes } from "./toolbarIconsList";
// import ColorPlugin from "../CustomPlugins/ColorPlugin";
// import InsertTableButton from "../InsertTableButton";
// import { $getRoot, $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
// import { $generateNodesFromDOM } from "@lexical/html";
// import { $generateHtmlFromNodes } from "@lexical/html";
// import { renderAsync } from "docx-preview";
// import TablePlugin from "../CustomPlugins/TablePlugin";
// import FontPlugin from "../CustomPlugins/FontPlugin";
// import PageBreakPlugin from "../CustomPlugins/PageBreakPlugin";

// const LexicalEditorTopBar = ({ onDownloadDocx }) => {
//   const [editor] = useLexicalComposerContext();
//   const { onClick, selectedEventTypes, blockType, isLink, modal } = useOnClickListener();
//   const [textColorAnchorEl, setTextColorAnchorEl] = useState(null);
//   const [bgColorAnchorEl, setBgColorAnchorEl] = useState(null);
//   const [selectedTextColor, setSelectedTextColor] = useState("");
//   const [selectedBgColor, setSelectedBgColor] = useState("");
//   const [isImporting, setIsImporting] = useState(false);
//   const [pages, setPages] = useState([{ id: 1, content: '', isActive: true }]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [allContent, setAllContent] = useState('');
  
//   // Refs for measuring content height
//   const editorRefs = useRef({});
//   const measurementRef = useRef(null);
//   const pageHeight = 11 * 96; // 11 inches * 96 DPI = 1056px
//   const pageContentHeight = pageHeight - (2 * 96); // Subtract top and bottom margins (1 inch each)
  
//   const isIconSelected = (plugin) =>
//     selectedEventTypes.includes(plugin.event) ||
//     blockType.includes(plugin.event);

//   const handleTextColorClick = (event) => {
//     setTextColorAnchorEl(event.currentTarget);
//   };

//   const handleBgColorClick = (event) => {
//     setBgColorAnchorEl(event.currentTarget);
//   };

//   const handleTextColorChange = (color) => {
//     setSelectedTextColor(color.hex);
//     onClick(eventTypes.textColor, color.hex);
//     setTextColorAnchorEl(null);
//   };

//   const handleBgColorChange = (color) => {
//     setSelectedBgColor(color.hex);
//     onClick(eventTypes.backgroundColor, color.hex);
//     setBgColorAnchorEl(null);
//   };

//   // Function to measure content height and split into pages
//   const measureAndSplitContent = useCallback((htmlContent) => {
//     if (!measurementRef.current || !htmlContent) return [htmlContent];
    
//     const tempDiv = document.createElement('div');
//     tempDiv.style.width = '6.5in'; // Page width minus margins
//     tempDiv.style.fontFamily = 'inherit';
//     tempDiv.style.fontSize = 'inherit';
//     tempDiv.style.lineHeight = '1.15'; // Word-like line height
//     tempDiv.style.position = 'absolute';
//     tempDiv.style.top = '-9999px';
//     tempDiv.style.visibility = 'hidden';
//     tempDiv.innerHTML = htmlContent;
    
//     // Apply Word-like styling to measurement div
//     tempDiv.style.wordSpacing = 'normal';
//     tempDiv.style.letterSpacing = 'normal';
    
//     document.body.appendChild(tempDiv);
    
//     const pages = [];
//     let currentPageContent = '';
//     let currentHeight = 0;
    
//     // Process each child node
//     const childNodes = Array.from(tempDiv.childNodes);
    
//     for (let i = 0; i < childNodes.length; i++) {
//       const node = childNodes[i];
//       const nodeHTML = node.outerHTML || node.textContent;
      
//       // Check for explicit page breaks
//       if (node.classList?.contains('page-break') || 
//           node.style?.pageBreakBefore === 'always' ||
//           node.getAttribute?.('data-page-break')) {
//         if (currentPageContent.trim()) {
//           pages.push(currentPageContent);
//           currentPageContent = '';
//           currentHeight = 0;
//         }
//         continue;
//       }
      
//       // Create a test div to measure this node
//       const testDiv = document.createElement('div');
//       testDiv.style.width = '6.5in';
//       testDiv.style.lineHeight = '1.15';
//       testDiv.innerHTML = currentPageContent + nodeHTML;
//       document.body.appendChild(testDiv);
      
//       const totalHeight = testDiv.scrollHeight;
//       document.body.removeChild(testDiv);
      
//       // If adding this node would overflow the page
//       if (totalHeight > pageContentHeight && currentPageContent.trim()) {
//         pages.push(currentPageContent);
//         currentPageContent = nodeHTML;
//         currentHeight = 0;
//       } else {
//         currentPageContent += nodeHTML;
//         currentHeight = totalHeight;
//       }
//     }
    
//     // Add the last page
//     if (currentPageContent.trim()) {
//       pages.push(currentPageContent);
//     }
    
//     document.body.removeChild(tempDiv);
    
//     return pages.length > 0 ? pages : [''];
//   }, [pageContentHeight]);

//   // Function to update pages based on editor content
//   const updatePagesFromContent = useCallback(() => {
//     if (!editor) return;
    
//     editor.getEditorState().read(() => {
//       const htmlContent = $generateHtmlFromNodes(editor, null);
//       setAllContent(htmlContent);
      
//       // Split content into pages
//       const pageContents = measureAndSplitContent(htmlContent);
      
//       setPages(prevPages => {
//         const newPages = pageContents.map((content, index) => ({
//           id: index + 1,
//           content: content,
//           isActive: false // All pages show static content initially
//         }));
        
//         // Ensure at least one page exists
//         return newPages.length > 0 ? newPages : [{ id: 1, content: '', isActive: false }];
//       });
//     });
//   }, [editor, measureAndSplitContent]);

//   // Monitor editor content changes
//   useEffect(() => {
//     if (!editor) return;

//     const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
//       // Delay content update to allow DOM updates
//       setTimeout(() => {
//         updatePagesFromContent();
//       }, 100);
//     });

//     return () => {
//       removeUpdateListener();
//     };
//   }, [editor, updatePagesFromContent]);

//   // Function to focus on a specific page (currently just visual feedback)
//   const focusPage = (pageId) => {
//     setCurrentPage(pageId);
//     // The editor is always active, just scroll to the page
//     const pageElement = document.getElementById(`page-${pageId}`);
//     if (pageElement) {
//       pageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   // Function to add a new page manually (insert page break)
//   const addNewPage = () => {
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         // Insert a page break at cursor position
//         const pageBreak = document.createElement('div');
//         pageBreak.className = 'page-break';
//         pageBreak.setAttribute('data-page-break', 'true');
//         pageBreak.style.pageBreakBefore = 'always';
        
//         selection.insertRawText('\n');
//         // Note: You might need to implement a custom page break node for Lexical
//         // For now, we'll trigger content update
//         setTimeout(() => updatePagesFromContent(), 100);
//       }
//     });
//   };

//   // Enhanced function to split DOCX content into proper pages
//   const splitDocxIntoPages = (htmlContent) => {
//     if (!htmlContent) return [''];
    
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = htmlContent;
    
//     // Look for Word-specific page break indicators
//     const pageBreakSelectors = [
//       '.page-break',
//       '[style*="page-break-before: always"]',
//       '[style*="break-before: page"]',
//       'div[style*="page-break"]',
//       'br[style*="page-break"]',
//       // Word-specific selectors
//       'div[style*="mso-element:footnote-separator"]',
//       'div[class*="WordSection"]',
//       'p[style*="page-break-before"]'
//     ];
    
//     const pageBreaks = tempDiv.querySelectorAll(pageBreakSelectors.join(', '));
    
//     if (pageBreaks.length === 0) {
//       // No explicit page breaks, split by content height
//       return measureAndSplitContent(htmlContent);
//     }
    
//     const pages = [];
//     let currentPageContent = '';
//     let lastProcessedNode = null;
    
//     // Process nodes in order
//     const walker = document.createTreeWalker(
//       tempDiv,
//       NodeFilter.SHOW_ALL,
//       null,
//       false
//     );
    
//     let node;
//     while (node = walker.nextNode()) {
//       // Check if this is a page break
//       const isPageBreak = pageBreakSelectors.some(selector => {
//         try {
//           return node.matches && node.matches(selector.replace(/^\[/, '').replace(/\]$/, ''));
//         } catch (e) {
//           return false;
//         }
//       }) || node.getAttribute?.('data-page-break') === 'true';
      
//       if (isPageBreak) {
//         if (currentPageContent.trim()) {
//           pages.push(currentPageContent);
//           currentPageContent = '';
//         }
//       } else if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
//         const content = node.outerHTML || node.textContent;
//         if (content && content.trim()) {
//           currentPageContent += content;
//         }
//       }
//     }
    
//     // Add the last page
//     if (currentPageContent.trim()) {
//       pages.push(currentPageContent);
//     }
    
//     return pages.length > 0 ? pages : [''];
//   };

//   const handleImportDocx = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
    
//     setIsImporting(true);
    
//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const container = document.createElement("div");
      
//       // Use better rendering options
//       await renderAsync(arrayBuffer, container, undefined, { 
//         inWrapper: false, 
//         useBase64URL: true,
//         ignoreLastRenderedPageBreak: false,
//         experimental: true,
//         breakPages: true // Enable page breaking
//       });

//       container.style.position = "absolute";
//       container.style.left = "-99999px";
//       container.style.top = "-99999px";
//       document.body.appendChild(container);
      
//       // Enhanced style properties with better coverage
//       const inlineProps = [
//         "fontFamily", "fontSize", "lineHeight", "color", "backgroundColor",
//         "textAlign", "fontWeight", "fontStyle", "textDecoration", "textDecorationLine",
//         "marginTop", "marginBottom", "marginLeft", "marginRight", "textIndent",
//         "paddingTop", "paddingBottom", "paddingLeft", "paddingRight",
//         "letterSpacing", "wordSpacing", "verticalAlign", "borderSpacing"
//       ];
   
//       const targets = container.querySelectorAll(
//         "p, span, div, li, td, th, h1, h2, h3, h4, h5, h6, img, strong, em, u, s, b, i"
//       );
      
//       targets.forEach((el) => {
//         const cs = window.getComputedStyle(el);
//         const tagName = el.tagName.toLowerCase();
      
//         // Apply inline styles for text and containers
//         inlineProps.forEach((prop) => {
//           const cssVal = cs[prop];
//           if (!cssVal || cssVal === 'normal' || cssVal === '0px' || cssVal === 'none') return;
          
//           const styleProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
//           const finalProp = prop === "textDecorationLine" ? "text-decoration" : styleProp;
          
//           // Always apply critical spacing and typography properties
//           if (prop === "fontSize" || prop === "color" || prop === "fontFamily" || 
//               prop === "lineHeight" || prop === "marginTop" || prop === "marginBottom") {
//             el.style.setProperty(finalProp, cssVal, 'important');
//           } else if (!el.style[prop]) {
//             el.style.setProperty(finalProp, cssVal);
//           }
//         });
      
//         // Handle text formatting elements specifically
//         if (tagName === 'strong' || tagName === 'b') {
//           el.style.fontWeight = 'bold';
//         }
//         if (tagName === 'em' || tagName === 'i') {
//           el.style.fontStyle = 'italic';
//         }
//         if (tagName === 'u') {
//           el.style.textDecoration = 'underline';
//         }
//         if (tagName === 's') {
//           el.style.textDecoration = 'line-through';
//         }
      
//         // Special case for images
//         if (tagName === "img") {
//           const naturalWidth = el.naturalWidth || parseInt(cs.width) || null;
//           const naturalHeight = el.naturalHeight || parseInt(cs.height) || null;
          
//           if (cs.width && cs.width !== 'auto') {
//             el.setAttribute("width", parseInt(cs.width));
//           } else if (naturalWidth) {
//             el.setAttribute("width", naturalWidth);
//           }
      
//           if (cs.height && cs.height !== 'auto') {
//             el.setAttribute("height", parseInt(cs.height));
//           } else if (naturalHeight) {
//             el.setAttribute("height", naturalHeight);
//           }
      
//           el.style.maxWidth = "100%";
//           el.style.height = "auto";
//         }
//       });
      
//       const html = container.innerHTML;
//       document.body.removeChild(container);

//       console.log("Converted HTML:", html);
      
//       // Split content into pages using enhanced method
//       const pageContents = splitDocxIntoPages(html);
//       const newPages = pageContents.map((content, index) => ({
//         id: index + 1,
//         content: content,
//         isActive: false
//       }));
      
//       setPages(newPages);
//       setCurrentPage(1);
//       setAllContent(html);
   
//       // Update the editor with imported content
//       editor.update(() => {
//         const parser = new DOMParser();
//         const dom = parser.parseFromString(html, "text/html");
//         const nodes = $generateNodesFromDOM(editor, dom);
//         const root = $getRoot();
//         root.clear();
//         if (Array.isArray(nodes) && nodes.length > 0) {
//           root.append(...nodes);
//         }
//       });
//     } catch (error) {
//       console.error("Error importing DOCX:", error);
//       alert("Error importing DOCX file. Please try again.");
//     } finally {
//       setIsImporting(false);
//       event.target.value = "";
//     }
//   };

//   return (
//     <>
//       {/* Hidden measurement div */}
//       <div 
//         ref={measurementRef}
//         style={{
//           position: 'absolute',
//           top: '-9999px',
//           left: '-9999px',
//           width: '6.5in',
//           visibility: 'hidden'
//         }}
//       />
      
//       {/* Top toolbar row */}
//       <Grid
//         container
//         justifyContent="space-between"
//         spacing={2}
//         alignItems="center"
//         sx={{ background: "white", py: 1.5, px: 0.5 }}
//       >
//         {/* Import/Export buttons on the left side */}
//         <Grid
//           item
//           sx={{ display: "flex", gap: 1, justifyContent: "flex-end", ml: "auto" }}
//         >
//           <Button 
//             variant="outlined" 
//             component="label"
//             disabled={isImporting} 
//           >
//             {isImporting ? (
//               <CircularProgress size={20} sx={{ mr: 1 }} />
//             ) : null}
//             Import DOCX
//             <input
//               type="file"
//               accept=".docx"
//               hidden
//               onChange={handleImportDocx}
//               disabled={isImporting} 
//             />
//           </Button>
//           <Button 
//             variant="contained" 
//             onClick={() => onDownloadDocx(editor)}
//             disabled={isImporting} 
//           >
//             Export DOCX
//           </Button>
//           <Button 
//             variant="outlined" 
//             onClick={addNewPage}
//             disabled={isImporting}
//             sx={{ ml: 1 }}
//           >
//             Page Break
//           </Button>
//         </Grid>

//         {/* Toolbar icons */}
//         <Grid item sx={{ display: "flex", gap: 1 }}>
//           {toolbarIconsList.map((plugin) => (
//             <Grid
//               key={plugin.id}
//               sx={{ cursor: "pointer" }}
//               item
//             >
//               {plugin.event === eventTypes.textColor ? (
//                 <>
//                   <plugin.Icon
//                     sx={{ fontSize: 24 }}
//                     onClick={handleTextColorClick}
//                     color={isIconSelected(plugin) ? "secondary" : undefined}
//                   />
//                   <Popover
//                     open={Boolean(textColorAnchorEl)}
//                     anchorEl={textColorAnchorEl}
//                     onClose={() => setTextColorAnchorEl(null)}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "left",
//                     }}
//                   >
//                     <TwitterPicker
//                       color={selectedTextColor}
//                       onChangeComplete={handleTextColorChange}
//                     />
//                   </Popover>
//                 </>
//               ) : plugin.event === eventTypes.backgroundColor ? (
//                 <>
//                   <plugin.Icon
//                     sx={{ fontSize: 24 }}
//                     onClick={handleBgColorClick}
//                     color={isIconSelected(plugin) ? "secondary" : undefined}
//                   />
//                   <Popover
//                     open={Boolean(bgColorAnchorEl)}
//                     anchorEl={bgColorAnchorEl}
//                     onClose={() => setBgColorAnchorEl(null)}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "left",
//                     }}
//                   >
//                     <TwitterPicker
//                       color={selectedBgColor}
//                       onChangeComplete={handleBgColorChange}
//                     />
//                   </Popover>
//                 </>
//               ) : (
//                 <plugin.Icon
//                   sx={{ fontSize: 24 }}
//                   onClick={() => onClick(plugin.event)}
//                   color={isIconSelected(plugin) ? "secondary" : undefined}
//                 />
//               )}
//             </Grid>
//           ))}
//           <FontPlugin />
//         </Grid>

//         {modal}
//         {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
//       </Grid>

//       {/* Second row: Color + Table */}
//       <Grid
//         container
//         spacing={2}
//         alignItems="center"
//         sx={{ background: "white", py: 1, px: 0.5 }}
//       >
//         <Grid item>
//           <ColorPlugin />
//           <TablePlugin />
//           <PageBreakPlugin />
//         </Grid>
//       </Grid>
      
//       {/* Page counter */}
//       <Box sx={{ 
//         textAlign: "center", 
//         py: 1, 
//         backgroundColor: "#f5f5f5",
//         borderBottom: "1px solid #ddd"
//       }}>
//         Page {currentPage} of {pages.length}
//       </Box>
      
//       {/* Main editor area - single Lexical instance */}
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: "column",
//         alignItems: "center", 
//         backgroundColor: "#f5f5f5", 
//         py: 3,
//         minHeight: "calc(100vh - 200px)",
//         position: 'relative'
//       }}>
//         {/* Invisible but active Lexical editor overlay */}
//         <Box 
//           className="editor-shell" 
//           sx={{ 
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 10,
//             pointerEvents: 'auto',
//             '& .editor-inner': {
//               position: 'absolute',
//               top: '3rem',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               width: '8.5in',
//               minHeight: 'calc(100% - 6rem)',
//               padding: '1in',
//               outline: 'none',
//               background: 'transparent'
//             }
//           }}
//         >
//           {/* The actual Lexical editor renders here invisibly over the pages */}
//         </Box>
        
//         {/* Visual page representation */}
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: 'relative', zIndex: 1 }}>
//           {pages.map((page, index) => (
//             <Paper 
//               key={page.id}
//               id={`page-${page.id}`}
//               elevation={3} 
//               sx={{ 
//                 width: "8.5in", 
//                 height: "11in",
//                 padding: "1in", 
//                 backgroundColor: "white",
//                 boxShadow: currentPage === page.id 
//                   ? "0 0 20px rgba(33, 150, 243, 0.3)" 
//                   : "0 0 10px rgba(0,0,0,0.1)",
//                 display: "flex",
//                 flexDirection: "column",
//                 position: "relative",
//                 cursor: "text",
//                 border: currentPage === page.id ? "2px solid #2196F3" : "1px solid transparent",
//                 pointerEvents: 'none' // Let clicks pass through to the editor
//               }}
//               onClick={() => focusPage(page.id)}
//             >
//               {/* Page number */}
//               <Box sx={{
//                 position: "absolute",
//                 bottom: "0.5in",
//                 right: "0.5in",
//                 fontSize: "12px",
//                 color: "#666",
//                 pointerEvents: "none"
//               }}>
//                 {page.id}
//               </Box>
              
//               {/* Page content display */}
//               <Box 
//                 className="editor-page-content"
//                 sx={{ 
//                   flex: 1,
//                   outline: "none",
//                   overflow: "hidden",
//                   wordWrap: "break-word",
//                   // Preserve Word-like spacing
//                   "& p": {
//                     margin: "0",
//                     lineHeight: "inherit",
//                     "&:not(:last-child)": {
//                       marginBottom: "0"
//                     }
//                   },
//                   "& div": {
//                     lineHeight: "inherit"
//                   },
//                   "& h1, & h2, & h3, & h4, & h5, & h6": {
//                     margin: "0",
//                     lineHeight: "inherit"
//                   },
//                   // Preserve original spacing from Word
//                   "& *": {
//                     lineHeight: "inherit !important"
//                   },
//                   "& .page-break": {
//                     display: "block",
//                     height: "20px",
//                     borderTop: "1px dashed #ccc",
//                     margin: "10px 0",
//                     textAlign: "center",
//                     "&::before": {
//                       content: '"Page Break"',
//                       color: "#999",
//                       fontSize: "12px"
//                     }
//                   }
//                 }}
//                 dangerouslySetInnerHTML={{ __html: page.content || '' }}
//               />
//             </Paper>
//           ))}
//         </Box>
//       </Box>
      
//       {/* Global loading overlay */}
//       {isImporting && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "white",
//               padding: 3,
//               borderRadius: 2,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <CircularProgress size={40} sx={{ mb: 2 }} />
//             <div>Importing DOCX file...</div>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// };

// export default LexicalEditorTopBar;

// // import { Button, Divider, Grid, Box, Popover, CircularProgress, Paper } from "@mui/material";
// // import toolbarIconsList from "./toolbarIconsList";
// // import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// // import useOnClickListener from "./useOnClickListener";
// // import { createPortal } from "react-dom";
// // import FloatingLinkEditor from "./FloatingLinkEditor";
// // import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
// // import { useState, useEffect, useRef, useCallback } from "react";
// // import { TwitterPicker } from "react-color";
// // import { eventTypes } from "./toolbarIconsList";
// // import ColorPlugin from "../CustomPlugins/ColorPlugin";
// // import InsertTableButton from "../InsertTableButton";
// // import { $getRoot, $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
// // import { $generateNodesFromDOM } from "@lexical/html";
// // import { $generateHtmlFromNodes } from "@lexical/html";
// // import { renderAsync } from "docx-preview";
// // import TablePlugin from "../CustomPlugins/TablePlugin";
// // import FontPlugin from "../CustomPlugins/FontPlugin";
// // import PageBreakPlugin from "../CustomPlugins/PageBreakPlugin";

// // const LexicalEditorTopBar = ({ onDownloadDocx }) => {
// //   const [editor] = useLexicalComposerContext();
// //   const { onClick, selectedEventTypes, blockType, isLink, modal } = useOnClickListener();
// //   const [textColorAnchorEl, setTextColorAnchorEl] = useState(null);
// //   const [bgColorAnchorEl, setBgColorAnchorEl] = useState(null);
// //   const [selectedTextColor, setSelectedTextColor] = useState("");
// //   const [selectedBgColor, setSelectedBgColor] = useState("");
// //   const [isImporting, setIsImporting] = useState(false);
// //   const [pages, setPages] = useState([{ id: 1, content: '', isActive: true }]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [allContent, setAllContent] = useState('');
  
// //   // Refs for measuring content height
// //   const editorRefs = useRef({});
// //   const measurementRef = useRef(null);
// //   const pageHeight = 11 * 96; // 11 inches * 96 DPI = 1056px
// //   const pageContentHeight = pageHeight - (2 * 96); // Subtract top and bottom margins (1 inch each)
  
// //   const isIconSelected = (plugin) =>
// //     selectedEventTypes.includes(plugin.event) ||
// //     blockType.includes(plugin.event);

// //   const handleTextColorClick = (event) => {
// //     setTextColorAnchorEl(event.currentTarget);
// //   };

// //   const handleBgColorClick = (event) => {
// //     setBgColorAnchorEl(event.currentTarget);
// //   };

// //   const handleTextColorChange = (color) => {
// //     setSelectedTextColor(color.hex);
// //     onClick(eventTypes.textColor, color.hex);
// //     setTextColorAnchorEl(null);
// //   };

// //   const handleBgColorChange = (color) => {
// //     setSelectedBgColor(color.hex);
// //     onClick(eventTypes.backgroundColor, color.hex);
// //     setBgColorAnchorEl(null);
// //   };

// //   // Function to measure content height and split into pages
// //   const measureAndSplitContent = useCallback((htmlContent) => {
// //     if (!measurementRef.current || !htmlContent) return [htmlContent];
    
// //     const tempDiv = document.createElement('div');
// //     tempDiv.style.width = '6.5in'; // Page width minus margins
// //     tempDiv.style.fontFamily = 'inherit';
// //     tempDiv.style.fontSize = 'inherit';
// //     tempDiv.style.lineHeight = '1.15'; // Word-like line height
// //     tempDiv.style.position = 'absolute';
// //     tempDiv.style.top = '-9999px';
// //     tempDiv.style.visibility = 'hidden';
// //     tempDiv.innerHTML = htmlContent;
    
// //     // Apply Word-like styling to measurement div
// //     tempDiv.style.wordSpacing = 'normal';
// //     tempDiv.style.letterSpacing = 'normal';
    
// //     document.body.appendChild(tempDiv);
    
// //     const pages = [];
// //     let currentPageContent = '';
// //     let currentHeight = 0;
    
// //     // Process each child node
// //     const childNodes = Array.from(tempDiv.childNodes);
    
// //     for (let i = 0; i < childNodes.length; i++) {
// //       const node = childNodes[i];
// //       const nodeHTML = node.outerHTML || node.textContent;
      
// //       // Check for explicit page breaks
// //       if (node.classList?.contains('page-break') || 
// //           node.style?.pageBreakBefore === 'always' ||
// //           node.getAttribute?.('data-page-break')) {
// //         if (currentPageContent.trim()) {
// //           pages.push(currentPageContent);
// //           currentPageContent = '';
// //           currentHeight = 0;
// //         }
// //         continue;
// //       }
      
// //       // Create a test div to measure this node
// //       const testDiv = document.createElement('div');
// //       testDiv.style.width = '6.5in';
// //       testDiv.style.lineHeight = '1.15';
// //       testDiv.innerHTML = currentPageContent + nodeHTML;
// //       document.body.appendChild(testDiv);
      
// //       const totalHeight = testDiv.scrollHeight;
// //       document.body.removeChild(testDiv);
      
// //       // If adding this node would overflow the page
// //       if (totalHeight > pageContentHeight && currentPageContent.trim()) {
// //         pages.push(currentPageContent);
// //         currentPageContent = nodeHTML;
// //         currentHeight = 0;
// //       } else {
// //         currentPageContent += nodeHTML;
// //         currentHeight = totalHeight;
// //       }
// //     }
    
// //     // Add the last page
// //     if (currentPageContent.trim()) {
// //       pages.push(currentPageContent);
// //     }
    
// //     document.body.removeChild(tempDiv);
    
// //     return pages.length > 0 ? pages : [''];
// //   }, [pageContentHeight]);

// //   // Function to update pages based on editor content
// //   const updatePagesFromContent = useCallback(() => {
// //     if (!editor) return;
    
// //     editor.getEditorState().read(() => {
// //       const htmlContent = $generateHtmlFromNodes(editor, null);
// //       setAllContent(htmlContent);
      
// //       // Split content into pages
// //       const pageContents = measureAndSplitContent(htmlContent);
      
// //       setPages(prevPages => {
// //         const newPages = pageContents.map((content, index) => ({
// //           id: index + 1,
// //           content: content,
// //           isActive: false // All pages show static content initially
// //         }));
        
// //         // Ensure at least one page exists
// //         return newPages.length > 0 ? newPages : [{ id: 1, content: '', isActive: false }];
// //       });
// //     });
// //   }, [editor, measureAndSplitContent]);

// //   // Monitor editor content changes
// //   useEffect(() => {
// //     if (!editor) return;

// //     const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
// //       // Delay content update to allow DOM updates
// //       setTimeout(() => {
// //         updatePagesFromContent();
// //       }, 100);
// //     });

// //     return () => {
// //       removeUpdateListener();
// //     };
// //   }, [editor, updatePagesFromContent]);

// //   // Function to focus on a specific page (currently just visual feedback)
// //   const focusPage = (pageId) => {
// //     setCurrentPage(pageId);
// //     // The editor is always active, just scroll to the page
// //     const pageElement = document.getElementById(`page-${pageId}`);
// //     if (pageElement) {
// //       pageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
// //     }
// //   };

// //   // Function to add a new page manually (insert page break)
// //   const addNewPage = () => {
// //     editor.update(() => {
// //       const selection = $getSelection();
// //       if ($isRangeSelection(selection)) {
// //         // Insert a page break at cursor position
// //         const pageBreak = document.createElement('div');
// //         pageBreak.className = 'page-break';
// //         pageBreak.setAttribute('data-page-break', 'true');
// //         pageBreak.style.pageBreakBefore = 'always';
        
// //         selection.insertRawText('\n');
// //         // Note: You might need to implement a custom page break node for Lexical
// //         // For now, we'll trigger content update
// //         setTimeout(() => updatePagesFromContent(), 100);
// //       }
// //     });
// //   };

// //   // Enhanced function to split DOCX content into proper pages
// //   const splitDocxIntoPages = (htmlContent) => {
// //     if (!htmlContent) return [''];
    
// //     const tempDiv = document.createElement('div');
// //     tempDiv.innerHTML = htmlContent;
    
// //     // Look for Word-specific page break indicators
// //     const pageBreakSelectors = [
// //       '.page-break',
// //       '[style*="page-break-before: always"]',
// //       '[style*="break-before: page"]',
// //       'div[style*="page-break"]',
// //       'br[style*="page-break"]',
// //       // Word-specific selectors
// //       'div[style*="mso-element:footnote-separator"]',
// //       'div[class*="WordSection"]',
// //       'p[style*="page-break-before"]'
// //     ];
    
// //     const pageBreaks = tempDiv.querySelectorAll(pageBreakSelectors.join(', '));
    
// //     if (pageBreaks.length === 0) {
// //       // No explicit page breaks, split by content height
// //       return measureAndSplitContent(htmlContent);
// //     }
    
// //     const pages = [];
// //     let currentPageContent = '';
// //     let lastProcessedNode = null;
    
// //     // Process nodes in order
// //     const walker = document.createTreeWalker(
// //       tempDiv,
// //       NodeFilter.SHOW_ALL,
// //       null,
// //       false
// //     );
    
// //     let node;
// //     while (node = walker.nextNode()) {
// //       // Check if this is a page break
// //       const isPageBreak = pageBreakSelectors.some(selector => {
// //         try {
// //           return node.matches && node.matches(selector.replace(/^\[/, '').replace(/\]$/, ''));
// //         } catch (e) {
// //           return false;
// //         }
// //       }) || node.getAttribute?.('data-page-break') === 'true';
      
// //       if (isPageBreak) {
// //         if (currentPageContent.trim()) {
// //           pages.push(currentPageContent);
// //           currentPageContent = '';
// //         }
// //       } else if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
// //         const content = node.outerHTML || node.textContent;
// //         if (content && content.trim()) {
// //           currentPageContent += content;
// //         }
// //       }
// //     }
    
// //     // Add the last page
// //     if (currentPageContent.trim()) {
// //       pages.push(currentPageContent);
// //     }
    
// //     return pages.length > 0 ? pages : [''];
// //   };

// //   const handleImportDocx = async (event) => {
// //     const file = event.target.files[0];
// //     if (!file) return;
    
// //     setIsImporting(true);
    
// //     try {
// //       const arrayBuffer = await file.arrayBuffer();
// //       const container = document.createElement("div");
      
// //       // Use better rendering options
// //       await renderAsync(arrayBuffer, container, undefined, { 
// //         inWrapper: false, 
// //         useBase64URL: true,
// //         ignoreLastRenderedPageBreak: false,
// //         experimental: true,
// //         breakPages: true // Enable page breaking
// //       });

// //       container.style.position = "absolute";
// //       container.style.left = "-99999px";
// //       container.style.top = "-99999px";
// //       document.body.appendChild(container);
      
// //       // Enhanced style properties with better coverage
// //       const inlineProps = [
// //         "fontFamily", "fontSize", "lineHeight", "color", "backgroundColor",
// //         "textAlign", "fontWeight", "fontStyle", "textDecoration", "textDecorationLine",
// //         "marginTop", "marginBottom", "marginLeft", "marginRight", "textIndent",
// //         "paddingTop", "paddingBottom", "paddingLeft", "paddingRight",
// //         "letterSpacing", "wordSpacing", "verticalAlign", "borderSpacing"
// //       ];
   
// //       const targets = container.querySelectorAll(
// //         "p, span, div, li, td, th, h1, h2, h3, h4, h5, h6, img, strong, em, u, s, b, i"
// //       );
      
// //       targets.forEach((el) => {
// //         const cs = window.getComputedStyle(el);
// //         const tagName = el.tagName.toLowerCase();
      
// //         // Apply inline styles for text and containers
// //         inlineProps.forEach((prop) => {
// //           const cssVal = cs[prop];
// //           if (!cssVal || cssVal === 'normal' || cssVal === '0px' || cssVal === 'none') return;
          
// //           const styleProp = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
// //           const finalProp = prop === "textDecorationLine" ? "text-decoration" : styleProp;
          
// //           // Always apply critical spacing and typography properties
// //           if (prop === "fontSize" || prop === "color" || prop === "fontFamily" || 
// //               prop === "lineHeight" || prop === "marginTop" || prop === "marginBottom") {
// //             el.style.setProperty(finalProp, cssVal, 'important');
// //           } else if (!el.style[prop]) {
// //             el.style.setProperty(finalProp, cssVal);
// //           }
// //         });
      
// //         // Handle text formatting elements specifically
// //         if (tagName === 'strong' || tagName === 'b') {
// //           el.style.fontWeight = 'bold';
// //         }
// //         if (tagName === 'em' || tagName === 'i') {
// //           el.style.fontStyle = 'italic';
// //         }
// //         if (tagName === 'u') {
// //           el.style.textDecoration = 'underline';
// //         }
// //         if (tagName === 's') {
// //           el.style.textDecoration = 'line-through';
// //         }
      
// //         // Special case for images
// //         if (tagName === "img") {
// //           const naturalWidth = el.naturalWidth || parseInt(cs.width) || null;
// //           const naturalHeight = el.naturalHeight || parseInt(cs.height) || null;
          
// //           if (cs.width && cs.width !== 'auto') {
// //             el.setAttribute("width", parseInt(cs.width));
// //           } else if (naturalWidth) {
// //             el.setAttribute("width", naturalWidth);
// //           }
      
// //           if (cs.height && cs.height !== 'auto') {
// //             el.setAttribute("height", parseInt(cs.height));
// //           } else if (naturalHeight) {
// //             el.setAttribute("height", naturalHeight);
// //           }
      
// //           el.style.maxWidth = "100%";
// //           el.style.height = "auto";
// //         }
// //       });
      
// //       const html = container.innerHTML;
// //       document.body.removeChild(container);

// //       console.log("Converted HTML:", html);
      
// //       // Split content into pages using enhanced method
// //       const pageContents = splitDocxIntoPages(html);
// //       const newPages = pageContents.map((content, index) => ({
// //         id: index + 1,
// //         content: content,
// //         isActive: false
// //       }));
      
// //       setPages(newPages);
// //       setCurrentPage(1);
// //       setAllContent(html);
   
// //       // Update the editor with imported content
// //       editor.update(() => {
// //         const parser = new DOMParser();
// //         const dom = parser.parseFromString(html, "text/html");
// //         const nodes = $generateNodesFromDOM(editor, dom);
// //         const root = $getRoot();
// //         root.clear();
// //         if (Array.isArray(nodes) && nodes.length > 0) {
// //           root.append(...nodes);
// //         }
// //       });
// //     } catch (error) {
// //       console.error("Error importing DOCX:", error);
// //       alert("Error importing DOCX file. Please try again.");
// //     } finally {
// //       setIsImporting(false);
// //       event.target.value = "";
// //     }
// //   };

// //   return (
// //     <>
// //       {/* Hidden measurement div */}
// //       <div 
// //         ref={measurementRef}
// //         style={{
// //           position: 'absolute',
// //           top: '-9999px',
// //           left: '-9999px',
// //           width: '6.5in',
// //           visibility: 'hidden'
// //         }}
// //       />
      
// //       {/* Top toolbar row */}
// //       <Grid
// //         container
// //         justifyContent="space-between"
// //         spacing={2}
// //         alignItems="center"
// //         sx={{ background: "white", py: 1.5, px: 0.5 }}
// //       >
// //         {/* Import/Export buttons on the left side */}
// //         <Grid
// //           item
// //           sx={{ display: "flex", gap: 1, justifyContent: "flex-end", ml: "auto" }}
// //         >
// //           <Button 
// //             variant="outlined" 
// //             component="label"
// //             disabled={isImporting} 
// //           >
// //             {isImporting ? (
// //               <CircularProgress size={20} sx={{ mr: 1 }} />
// //             ) : null}
// //             Import DOCX
// //             <input
// //               type="file"
// //               accept=".docx"
// //               hidden
// //               onChange={handleImportDocx}
// //               disabled={isImporting} 
// //             />
// //           </Button>
// //           <Button 
// //             variant="contained" 
// //             onClick={() => onDownloadDocx(editor)}
// //             disabled={isImporting} 
// //           >
// //             Export DOCX
// //           </Button>
// //           <Button 
// //             variant="outlined" 
// //             onClick={addNewPage}
// //             disabled={isImporting}
// //             sx={{ ml: 1 }}
// //           >
// //             Page Break
// //           </Button>
// //         </Grid>

// //         {/* Toolbar icons */}
// //         <Grid item sx={{ display: "flex", gap: 1 }}>
// //           {toolbarIconsList.map((plugin) => (
// //             <Grid
// //               key={plugin.id}
// //               sx={{ cursor: "pointer" }}
// //               item
// //             >
// //               {plugin.event === eventTypes.textColor ? (
// //                 <>
// //                   <plugin.Icon
// //                     sx={{ fontSize: 24 }}
// //                     onClick={handleTextColorClick}
// //                     color={isIconSelected(plugin) ? "secondary" : undefined}
// //                   />
// //                   <Popover
// //                     open={Boolean(textColorAnchorEl)}
// //                     anchorEl={textColorAnchorEl}
// //                     onClose={() => setTextColorAnchorEl(null)}
// //                     anchorOrigin={{
// //                       vertical: "bottom",
// //                       horizontal: "left",
// //                     }}
// //                   >
// //                     <TwitterPicker
// //                       color={selectedTextColor}
// //                       onChangeComplete={handleTextColorChange}
// //                     />
// //                   </Popover>
// //                 </>
// //               ) : plugin.event === eventTypes.backgroundColor ? (
// //                 <>
// //                   <plugin.Icon
// //                     sx={{ fontSize: 24 }}
// //                     onClick={handleBgColorClick}
// //                     color={isIconSelected(plugin) ? "secondary" : undefined}
// //                   />
// //                   <Popover
// //                     open={Boolean(bgColorAnchorEl)}
// //                     anchorEl={bgColorAnchorEl}
// //                     onClose={() => setBgColorAnchorEl(null)}
// //                     anchorOrigin={{
// //                       vertical: "bottom",
// //                       horizontal: "left",
// //                     }}
// //                   >
// //                     <TwitterPicker
// //                       color={selectedBgColor}
// //                       onChangeComplete={handleBgColorChange}
// //                     />
// //                   </Popover>
// //                 </>
// //               ) : (
// //                 <plugin.Icon
// //                   sx={{ fontSize: 24 }}
// //                   onClick={() => onClick(plugin.event)}
// //                   color={isIconSelected(plugin) ? "secondary" : undefined}
// //                 />
// //               )}
// //             </Grid>
// //           ))}
// //           <FontPlugin />
// //         </Grid>

// //         {modal}
// //         {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
// //       </Grid>

// //       {/* Second row: Color + Table */}
// //       <Grid
// //         container
// //         spacing={2}
// //         alignItems="center"
// //         sx={{ background: "white", py: 1, px: 0.5 }}
// //       >
// //         <Grid item>
// //           <ColorPlugin />
// //           <TablePlugin />
// //           <PageBreakPlugin />
// //         </Grid>
// //       </Grid>
      
// //       {/* Page counter */}
// //       <Box sx={{ 
// //         textAlign: "center", 
// //         py: 1, 
// //         backgroundColor: "#f5f5f5",
// //         borderBottom: "1px solid #ddd"
// //       }}>
// //         Page {currentPage} of {pages.length}
// //       </Box>
      
// //       {/* Main editor area - single Lexical instance */}
// //       <Box sx={{ 
// //         display: "flex", 
// //         flexDirection: "column",
// //         alignItems: "center", 
// //         backgroundColor: "#f5f5f5", 
// //         py: 3,
// //         minHeight: "calc(100vh - 200px)",
// //         position: 'relative'
// //       }}>
// //         {/* Invisible but active Lexical editor overlay */}
// //         <Box 
// //           className="editor-shell" 
// //           sx={{ 
// //             position: 'absolute',
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             zIndex: 10,
// //             pointerEvents: 'auto',
// //             '& .editor-inner': {
// //               position: 'absolute',
// //               top: '3rem',
// //               left: '50%',
// //               transform: 'translateX(-50%)',
// //               width: '8.5in',
// //               minHeight: 'calc(100% - 6rem)',
// //               padding: '1in',
// //               outline: 'none',
// //               background: 'transparent'
// //             }
// //           }}
// //         >
// //           {/* The actual Lexical editor renders here invisibly over the pages */}
// //         </Box>
        
// //         {/* Visual page representation */}
// //         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: 'relative', zIndex: 1 }}>
// //           {pages.map((page, index) => (
// //             <Paper 
// //               key={page.id}
// //               id={`page-${page.id}`}
// //               elevation={3} 
// //               sx={{ 
// //                 width: "8.5in", 
// //                 height: "11in",
// //                 padding: "1in", 
// //                 backgroundColor: "white",
// //                 boxShadow: currentPage === page.id 
// //                   ? "0 0 20px rgba(33, 150, 243, 0.3)" 
// //                   : "0 0 10px rgba(0,0,0,0.1)",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 position: "relative",
// //                 cursor: "text",
// //                 border: currentPage === page.id ? "2px solid #2196F3" : "1px solid transparent",
// //                 pointerEvents: 'none' // Let clicks pass through to the editor
// //               }}
// //               onClick={() => focusPage(page.id)}
// //             >
// //               {/* Page number */}
// //               <Box sx={{
// //                 position: "absolute",
// //                 bottom: "0.5in",
// //                 right: "0.5in",
// //                 fontSize: "12px",
// //                 color: "#666",
// //                 pointerEvents: "none"
// //               }}>
// //                 {page.id}
// //               </Box>
              
// //               {/* Page content display */}
// //               <Box 
// //                 className="editor-page-content"
// //                 sx={{ 
// //                   flex: 1,
// //                   outline: "none",
// //                   overflow: "hidden",
// //                   wordWrap: "break-word",
// //                   // Preserve Word-like spacing
// //                   "& p": {
// //                     margin: "0",
// //                     lineHeight: "inherit",
// //                     "&:not(:last-child)": {
// //                       marginBottom: "0"
// //                     }
// //                   },
// //                   "& div": {
// //                     lineHeight: "inherit"
// //                   },
// //                   "& h1, & h2, & h3, & h4, & h5, & h6": {
// //                     margin: "0",
// //                     lineHeight: "inherit"
// //                   },
// //                   // Preserve original spacing from Word
// //                   "& *": {
// //                     lineHeight: "inherit !important"
// //                   },
// //                   "& .page-break": {
// //                     display: "block",
// //                     height: "20px",
// //                     borderTop: "1px dashed #ccc",
// //                     margin: "10px 0",
// //                     textAlign: "center",
// //                     "&::before": {
// //                       content: '"Page Break"',
// //                       color: "#999",
// //                       fontSize: "12px"
// //                     }
// //                   }
// //                 }}
// //                 dangerouslySetInnerHTML={{ __html: page.content || '' }}
// //               />
// //             </Paper>
// //           ))}
// //         </Box>
// //       </Box>
      
// //       {/* Global loading overlay */}
// //       {isImporting && (
// //         <Box
// //           sx={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             width: "100%",
// //             height: "100%",
// //             backgroundColor: "rgba(0, 0, 0, 0.5)",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             zIndex: 9999,
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               backgroundColor: "white",
// //               padding: 3,
// //               borderRadius: 2,
// //               display: "flex",
// //               flexDirection: "column",
// //               alignItems: "center",
// //             }}
// //           >
// //             <CircularProgress size={40} sx={{ mb: 2 }} />
// //             <div>Importing DOCX file...</div>
// //           </Box>
// //         </Box>
// //       )}
// //     </>
// //   );
// // };

// // export default LexicalEditorTopBar;