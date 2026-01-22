import React from "react";
import "./App.css";

function hashString(str) {
  let hash = 0;
  for (const char of str) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

// Simplified core implementation
function styled(tag) {
  return function css(strings, ...expressions) {
    const componentId = "sc-" + Math.random().toString(36).substr(2, 9);

    return function StyledComponent(props) {
      // Compute CSS with current props
      let cssText = "";
      for (let i = 0; i < strings.length; i++) {
        cssText += strings[i];
        if (i < expressions.length) {
          const expr = expressions[i];
          const value = typeof expr === "function" ? expr(props) : expr;
          cssText += value || "";
        }
      }

      // Create unique class name based on actual CSS content
      const hash = hashString(cssText);
      const className = `${componentId}-${hash}`;
      const styleId = `style-${className}`;

      // Only inject if this specific variant doesn't exist
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `.${className}{${cssText}}`;
        document.head.appendChild(style);
      }

      // Merge with user's className
      const finalClassName = props.className
        ? `${className} ${props.className}`
        : className;

      // Remove className from props to avoid duplication
      const { className: _, ...restProps } = props;

      return React.createElement(tag, {
        ...restProps,
        className: finalClassName,
      });
    };
  };
}

function App() {
  let el = styled("div");
  let color = "red";
  let MyComponent = el`
       color: ${(props) => (props.primary ? "white" : "black")};
       background: ${(props) => (props.primary ? "blue" : "gray")};
       padding: ${(props) => (props.large ? "20px" : "10px")};
    `;

  // let MyComponent = el`
  //    color: red;
  //    background: blue;
  //    padding: 10px;
  // `;
  return (
    <MyComponent primary>
      <p>Hello World</p>
    </MyComponent>
  );
}

export default App;
