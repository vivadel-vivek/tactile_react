// Home page
import { useState, useContext } from "react";
import { Context as ThemeContext } from "context/ColorThemeContext";

const Colors = () => {
  const { state: theme, setColorScheme } = useContext(ThemeContext);

  const [chosenColor, setChosenColor] = useState("");

  const handleInputChange = ({ target: { value } }) => {
    setChosenColor(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(chosenColor);
    setColorScheme({ baseColor: chosenColor });
  };

  return (
    <>
      <h1 style={{ color: theme.base }}>Color Theme Test Page</h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label>
            Pick Base Color:
            <input
              type="text"
              name="name"
              value={chosenColor}
              onChange={handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <h2>Main Color Palette</h2>
      {Object.keys(theme).map(
        (key, index) =>
          key !== "colors" && (
            <div
              style={{
                height: 100,
                width: 100,
                backgroundColor: theme[key],
                display: "inline-block",
              }}
              key={index}
            >
              {key}
              <br />
              {theme[key]}
              <br />
            </div>
          )
      )}
      <h2>All Theme Colors:</h2>
      <div>
        {Object.keys(theme.colors).map((key, index) =>
          key[key.length - 1] === "9" ? (
            <span key={index + key}>
              <div
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: theme.colors[key],
                  display: "inline-block",
                }}
              >
                {key}
                <br />
                {theme.colors[key]}
                <br />
              </div>
              <br />
            </span>
          ) : (
            <span key={index + key}>
              <div
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: theme.colors[key],
                  display: "inline-block",
                }}
                key={index}
              >
                {key}
                <br />
                {theme.colors[key]}
                <br />
              </div>
            </span>
          )
        )}
      </div>
    </>
  );
};

export default Colors;
